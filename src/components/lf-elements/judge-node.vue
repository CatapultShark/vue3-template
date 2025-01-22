<template>
  <div class="judge-node">
    <div>judge-node</div>
    <div>{{ title }}</div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'judge-node'
});

import { EventType } from '@logicflow/core';
import { vueNodesMap } from '@logicflow/vue-node-registry';

const getNode: any = inject('getNode');
const getGraph: any = inject('getGraph');

let graphModel = null;

let title = ref('默认')

onMounted(() => {
  const node = getNode();
  graphModel = getGraph();
  console.log('node-judge-node', node);
  console.log('node-judge-graphModel', graphModel);

  // 监听事件（eventCenter事件中心）
  graphModel.eventCenter.on(
    EventType.NODE_PROPERTIES_CHANGE,
    (eventData: any) => {
      const keys = eventData.keys as string[]
      console.log('eventData', eventData);
      console.log('keys', keys);
      const content = vueNodesMap[node.type]
      console.log('vueNodesMap', vueNodesMap)
      console.log('content', content)
      // if (content && eventData.id === node.id) {
      //   const { effect } = content
      // }

      title.value = eventData.properties?.title || '--'
    }
  );
});
</script>

<style lang="less" scoped></style>
