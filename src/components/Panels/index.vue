<template>
  <!-- <div class="panel-wrap" v-if="visible">
    <panels v-if="visible" :key="selectedOne" />
  </div> -->
  <PanelDialog :key="selectedOne" v-if="visible" />
</template>

<script setup lang="ts">
import panels from './components/panels.vue';
import PanelDialog from '@/components/panel-dialog.vue';

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
function panelVisible(type: 'node' | 'edge') {
  console.log('panelVisible', type);
  return (e: any) => {
    console.log('panelVisible', e, type);
    if (
      e.data.type === 'bpmn:sequenceFlow' &&
      !e.data.properties.conditionExpression &&
      type == 'edge'
    ) {
      lf.getEdgeModelById(e.data.id)?.setProperties({
        conditionExpression: ''
      });
    }
    if (visible.value) {
      if (e.data.id === selectedOne.value) {
        visible.value = false;
      }
    } else {
      visible.value = true;
    }
    selectedOne.value = e.data.id;
    selectedType.value = type;
  };
}
const target: any = ref({});
watchEffect(() => {
  target.value =
    selectedType.value === 'node'
      ? lf.getNodeModelById(selectedOne.value)
      : lf.getEdgeModelById(selectedOne.value);
  panels.value =
    selectedType.value === 'node' ? ['normal'] : ['normal', 'condition'];
});

provide('target', target);

lf.on('node:dbclick', panelVisible('node'));
lf.on('node:delete', panelVisible('node'));
lf.on('blank:mousedown', (_e: any) => {
  if (visible.value) {
    visible.value = false;
  }
});
lf.on('edge:dbclick', panelVisible('edge'));
lf.on('edge:delete', panelVisible('edge'));

onUnmounted(() => {
  lf.off('node:dbclick', panelVisible('node'));
  lf.off('edge:dbclick', panelVisible('edge'));
});
</script>

<style lang="less">
#my-panel {
  position: absolute;
  top: 0px;
  right: 0px;
  height: 100%;
}
.panel-wrap {
  width: 300px;
  height: 100%;
  display: block;
  background-color: #efefef;
  padding: 20px;
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  overflow: scroll;
}
.panel-wrap::-webkit-scrollbar {
  display: none;
}
</style>
