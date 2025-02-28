<template>
  <Dialog :key="selectedOne" v-if="visible" />
  <EdgeDialog :key="selectedOne" v-if="edgeVisible" />
</template>

<script setup lang="ts">
import Dialog from './dialog.vue';
import EdgeDialog from './edge-dialog.vue';

const props = defineProps({
  lf: {
    type: Object,
    default: {}
  }
});

const { lf } = props;
const selectedType = ref('');
const selectedOne = ref('');

provide('lf', lf);
provide('selectedOne', selectedOne);
provide('selectedType', selectedType);

const visible = ref(false);
provide('visible', visible);
const edgeVisible = ref(false);
provide('edgeVisible', edgeVisible);
function panelVisible(type: 'node' | 'edge') {
  console.log('panelVisible', type);
  return (e: any) => {
    console.log('panelVisible', e, type);
    selectedOne.value = e.data.id;
    selectedType.value = type;

    if (e.data.type == 'rect') {
      return;
    }
    if (type === 'node') {
      if (visible.value) {
        if (e.data.id === selectedOne.value) {
          visible.value = false;
        }
      } else {
        visible.value = true;
      }
    } else {
      if (edgeVisible.value) {
        if (e.data.id === selectedOne.value) {
          edgeVisible.value = false;
        }
      } else {
        edgeVisible.value = true;
      }
    }
  };
}
const target: any = ref({});

watchEffect(() => {
  target.value =
    selectedType.value === 'node'
      ? lf.getNodeModelById(selectedOne.value)
      : lf.getEdgeModelById(selectedOne.value);
});

provide('target', target);

// 监听
lf.on('node:dbclick', panelVisible('node'));
// lf.on('node:delete', panelVisible('node'));
lf.on('blank:mousedown', (_e: any) => {
  if (visible.value) {
    visible.value = false;
  }
});
lf.on('edge:dbclick', panelVisible('edge'));
// lf.on('edge:delete', panelVisible('edge'));

onUnmounted(() => {
  lf.off('node:dbclick', panelVisible('node'));
  lf.off('edge:dbclick', panelVisible('edge'));
});
</script>

<style lang="less"></style>
