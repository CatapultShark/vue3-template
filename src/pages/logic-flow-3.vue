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

import HtmlEdge from '@/custom/edges/html-edge';

import sqlEdge from '@/custom/edges/sql-edge';

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
        databaseType: 'SQL',
        width: 300,
        height: 145
      },
      text: {
        x: 495,
        y: 170,
        value: 'SQL'
      }
    },
    {
      id: '57660605-cd10-4b0d-bd98-efe26c157c66',
      type: 'sql-element',
      x: 961,
      y: 317,
      properties: {
        databaseType: 'MongoDB',
        width: 300,
        height: 145
      },
      text: {
        x: 961,
        y: 317,
        value: 'MongoDB'
      }
    },
    {
      type: 'rect',
      x: 100,
      y: 100,
      text: '节点1',
      id: 'node_id_1'
    },
    {
      type: 'rect',
      text: '节点2',
      x: 100,
      y: 300,
      id: 'node_id_2'
    }
  ],
  edges: [
    // {
    //   id: 'edge_id_1',
    //   type: 'html-edge',
    //   sourceNodeId: 'node_id_1',
    //   properties: {},
    //   targetNodeId: 'node_id_2'
    // },
    {
      id: '41f06120-3ef6-46f8-846c-b9c8bb0743b5',
      type: 'sql-edge',
      properties: {},
      sourceNodeId: '955cf7dc-fdde-4eba-9798-58297bd9540b',
      targetNodeId: '57660605-cd10-4b0d-bd98-efe26c157c66',
      sourceAnchorId: '955cf7dc-fdde-4eba-9798-58297bd9540b_1',
      targetAnchorId: '57660605-cd10-4b0d-bd98-efe26c157c66_3',
      startPoint: {
        x: 645,
        y: 170
      },
      endPoint: {
        x: 811,
        y: 317
      },
      text: {
        x: 728,
        y: 243.5,
        value: '连接线'
      },
      pointsList: [
        {
          x: 645,
          y: 170
        },
        {
          x: 745,
          y: 170
        },
        {
          x: 711,
          y: 317
        },
        {
          x: 811,
          y: 317
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
  // 注册自定义边
  lf.register(sqlEdge);
  // lf.register(HtmlEdge);
  // lf.setDefaultEdgeType('sql-edge');

  lf.setTheme({
    // 贝塞尔曲线
    bezier: {
      stroke: '#afafaf',
      strokeWidth: 1
    }
  });

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
