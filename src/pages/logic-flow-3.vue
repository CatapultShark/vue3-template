<template>
  <div class="sql-flow" id="main-graph" ref="sqlRef"></div>
  <template v-if="logicFlowInstance">
    <SqlPanel :lf="logicFlowInstance" />
    <Tools :lf="logicFlowInstance" />
  </template>
</template>

<script lang="ts" setup>
import LogicFlow from '@logicflow/core';
import '@logicflow/core/es/index.css';
import '@logicflow/extension/es/index.css';
import {
  BPMNElements,
  BPMNAdapter,
  Group,
  SelectionSelect,
  DndPanel,
  Control,
  Menu
} from '@logicflow/extension';

import Tools from '@/components/flow3/tools.vue';
import SqlElement from '@/components/flow3/sql-element';
import SqlPanel from '@/components/flow3/sql-panel.vue';

LogicFlow.use(BPMNAdapter);
LogicFlow.use(BPMNElements);
LogicFlow.use(Group);
LogicFlow.use(SelectionSelect);
LogicFlow.use(DndPanel);
LogicFlow.use(Control);
LogicFlow.use(Menu);

const logicFlowInstance = ref();
const sqlRef = ref<any>(null);
const flowControllerVisible = ref(false);

provide('flowControllerVisible', flowControllerVisible);

const data: any = {
  nodes: [
    {
      id: '955cf7dc-fdde-4eba-9798-58297bd9540b',
      type: 'sql-element',
      x: 495,
      y: 170,
      properties: {
        width: '200px',
        height: '200px'
      },
      text: {
        x: 495,
        y: 170,
        value: '未定义'
      }
    },
    {
      id: '57660605-cd10-4b0d-bd98-efe26c157c66',
      type: 'sql-element',
      x: 939,
      y: 170,
      properties: {
        width: '200px',
        height: '200px'
      },
      text: {
        x: 939,
        y: 170,
        value: '未定义'
      }
    }
  ],
  edges: [
    {
      id: 'Flow_4d7a6f0',
      type: 'polyline',
      // type: 'bpmn:sequenceFlow',
      // properties: {
      //   isDefaultFlow: false
      // },
      sourceNodeId: '955cf7dc-fdde-4eba-9798-58297bd9540b',
      targetNodeId: '57660605-cd10-4b0d-bd98-efe26c157c66',
      sourceAnchorId: '955cf7dc-fdde-4eba-9798-58297bd9540b_1',
      targetAnchorId: '57660605-cd10-4b0d-bd98-efe26c157c66_3',
      startPoint: {
        x: 645,
        y: 170
      },
      endPoint: {
        x: 789,
        y: 170
      },
      text: {
        x: 726,
        y: 170,
        value: '连接线'
      },
      pointsList: [
        {
          x: 645,
          y: 170
        },
        {
          x: 789,
          y: 170
        }
      ]
    }
  ]
};

onMounted(() => {
  const lf = new LogicFlow({
    container: sqlRef.value,
    grid: true,
    hideAnchors: false, // 设置为 true 隐藏连接点
    stopZoomGraph: true, // 设置为 true 禁止缩放画布
    stopScrollGraph: true, // 设置为 true 禁止滚动画布
    snapline: true // 对齐线
  });
  // lf.render(data)
  // lf.renderRawData(data);

  // 注册自定义 vue 节点
  // [
  //   {
  //     type: 'sql-element',
  //     component: SqlElement
  //   }
  // ].forEach((node) => {
  //   register(
  //     {
  //       type: node.type,
  //       component: node.component
  //     },
  //     lf
  //   );
  // });

  // 批量注册（html节点）
  lf.batchRegister([SqlElement]);

  lf.renderRawData(data);

  logicFlowInstance.value = lf;
  console.log('logicFlowInstance', logicFlowInstance.value);
});
</script>

<style lang="less" scoped>
.sql-flow {
  width: 100%;
  height: 100%;
}
</style>
