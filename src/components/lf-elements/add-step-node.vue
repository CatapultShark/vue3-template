<template>
  <div class="add-step-node">
    <el-dropdown placement="top" trigger="click" @command="handleCommand">
      <div class="add-step-node__title">+ 添加新步骤</div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(step, index) in stepTypes"
            :key="index"
            :command="step.id"
            >{{ step.label }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'add-step-node'
});

import { EventType } from '@logicflow/core';
import { vueNodesMap } from '@logicflow/vue-node-registry';

const getNode: any = inject('getNode');
const getGraph: any = inject('getGraph');

let graphModel: any = null;
let edgeModel: any = null;

let stepTypes = [
  {
    id: 'app',
    label: '应用'
  },
  {
    id: 'judge',
    label: '判断'
  },
  {
    id: 'branch',
    label: '分支'
  },
  {
    id: 'loop',
    label: '循环'
  },
  {
    id: 'end',
    label: '结束'
  }
];

onMounted(() => {
  const node = getNode();
  graphModel = getGraph();
  // console.log(node, 'node-add-step-node');
  // console.log(graphModel, 'graph-add-step-node');
  edgeModel = graphModel.edges.find(
    (edge: any) =>
      edge.sourceNodeId === node.id || edge.targetNodeId === node.id
  );
});

const handleCommand = (command: any) => {
  console.log('handleCommand', command);
  graphModel.eventCenter.emit('add-custom-node', {
    command,
    edgeId: edgeModel.id
  });
};
</script>

<style lang="less" scoped>
.add-step-node {
  width: 100%;
  height: 100%;
  padding: 10px;
  &__title {
    color: #ff8b47;
  }
}
</style>
