<template>
  <el-card class="logic-flow" :header="'Logic-Flow流程编排'">
    <template class="flex" style="height: 100%">
      <div class="logic-flow__left" ref="flowRef" id="graph"></div>
      <TeleportContainer :flow-id="flowId" />
      <div class="logic-flow__right flex">
        <div class="logic-flow__right__aside">
          <el-icon :size="20" class="mt40"><Expand /></el-icon>
          <el-icon :size="20" class="mt40"><Warning /></el-icon>
          <el-icon :size="20" class="mt40"><Monitor /></el-icon>
          <el-icon :size="20" class="mt40"><Refresh /></el-icon>
        </div>
        <div class="logic-flow__right__content">
          <el-button type="primary" @click="getGraphData">获取数据</el-button>
          <SetTimeOut
            :stepShow="stepShow"
            :properties="properties"
            class="mt20"
          />
        </div>
      </div>
    </template>
  </el-card>
</template>

<script lang="ts" setup>
import LogicFlow from '@logicflow/core';
import { DndPanel, Control, Menu, Highlight } from '@logicflow/extension';
import { register, getTeleport } from '@logicflow/vue-node-registry';
import '@logicflow/core/es/index.css';
import '@logicflow/extension/es/index.css';

import ProgressNode from '@/components/lf-elements/progress-node.vue';
import AddStepNode from '@/components/lf-elements/add-step-node.vue';
import JudgeNode from '@/components/lf-elements/judge-node.vue';
import SelectApp from '@/components/lf-elements/select-app';

import TriggerNode from '@/components/nodes/TriggerNode';
import ActionNode from '@/components/nodes/ActionNode';
// import AddStepNode from '@/components/nodes/AddStepNode';
import BaseNodeLine from '@/components/nodes/base-node-line';

import BaseNode from '@/components/vue-html/base';

import SetTimeOut from '@/components/setTime-out.vue';

// 启用 LogicFlow 扩展
LogicFlow.use(DndPanel); // 拖拽面板
LogicFlow.use(Control); // 控制面板
LogicFlow.use(Menu); // 右键菜单
// LogicFlow.use(Highlight); // 高亮

const flowRef = ref<any>(null);
let lf: any = null;
const TeleportContainer = getTeleport();
const flowId = ref('');

let stepShow = ref(true);
let properties = ref({});

let graphData = null;

const getGraphData = () => {
  graphData = lf.getGraphData();
  console.log('获取到数据：', graphData);
};

let nodeList = reactive([
  {
    id: 'trigger-1',
    type: 'trigger-node',
    x: 200,
    y: 90,
    text: {
      value: '请选择触发操作',
      x: 200,
      y: 100,
      draggable: false,
      editable: false
    },
    properties: {
      order: 1, // 动态设置序号
      title: '定时触发器', // 动态设置标题
      description: '请选择触发操作' // 动态设置描述文本
    }
  },
  {
    id: 'action-1',
    type: 'action-node',
    x: 200,
    y: 290,
    text: {
      value: '请选择应用',
      x: 200,
      y: 300,
      draggable: false,
      editable: false
    },
    properties: {
      order: 2, // 动态设置序号
      title: '执行应用',
      description: '请选择动作'
    }
  },
  {
    id: 'add-step-1',
    type: 'add-step-node',
    x: 200,
    y: 400,
    properties: { width: 100, height: 30 }
  },
  {
    id: 'base-node-1',
    type: 'base-node',
    x: 600,
    y: 100,
    properties: {
      type: 'setTime',
      name: 'base-node-test',
      isHovered: false,
      title: '定时触发器',
      desc: '周期时间触发',
      isDropdownHovered: false
    }
  },
  {
    id: 'base-node-2',
    type: 'base-node',
    x: 600,
    y: 300,
    properties: {
      type: 'setApp',
      name: 'base-node-test',
      isHovered: false,
      title: '请选择执行应用',
      desc: '请选择动作',
      isDropdownHovered: false
    }
  }
]);
let edgeList = reactive([
  {
    type: 'polyline',
    sourceNodeId: 'trigger-1',
    targetNodeId: 'action-1',
    text: '执行操作'
  },
  { type: 'polyline', sourceNodeId: 'action-1', targetNodeId: 'add-step-1' },
  {
    type: 'polyline',
    sourceNodeId: 'base-node-1',
    targetNodeId: 'base-node-2',
    text: '执行操作'
  }
]);

onMounted(() => {
  lf = new LogicFlow({
    container: flowRef.value,
    grid: true,
    hideAnchors: true, // 设置为 true 隐藏连接点
    // stopMoveGraph: true, // 设置为 true 禁止移动画布
    stopZoomGraph: true, // 设置为 true 禁止缩放画布
    stopScrollGraph: true // 设置为 true 禁止滚动画布
  });

  // lf.setTheme({
  //   arrow: {
  //     offset: 4,
  //     verticalLength: 3
  //   },
  //   snapline: {
  //     stroke: '#2961EF', // 对齐线颜色
  //     strokeWidth: 1 // 对齐线宽度
  //   },
  //   bezier: {
  //     stroke: '#afafaf',
  //     strokeWidth: 2
  //   }
  // });

  // 注册自定义 vue 节点
  [
    {
      type: 'custom-vue-node',
      component: ProgressNode
    },
    {
      type: 'setTime-out',
      component: SetTimeOut
    },
    {
      type: 'judge-node',
      component: JudgeNode
    },
    {
      type: 'add-step-node',
      component: AddStepNode
    }
  ].forEach((node) => {
    register(
      {
        type: node.type,
        component: node.component
      },
      lf
    );
  });

  // 批量注册
  lf.batchRegister([TriggerNode, ActionNode, SelectApp, BaseNode]);

  // 注册自定义边
  lf.register(BaseNodeLine);

  // 渲染 LogicFlow
  lf.render({
    nodes: nodeList,
    edges: edgeList
  });

  const judgeNode = lf.addNode({
    id: 'judge-node-1',
    type: 'judge-node',
    x: 900,
    y: 100,
    properties: {
      name: 'judge-node-test',
      isHovered: false,
      title: '判断操作',
      desc: '测试判断节点'
    }
  });
  console.log('judgeNode --->>>', judgeNode);

  // judgeNode.setProperty('title', '判断')
  setTimeout(() => {
    judgeNode.setProperty('title', '判断a')
  }, 2000)

  const judgeOutlineStyle = judgeNode.getOutlineStyle()
  judgeOutlineStyle.hover!.stroke = 'none';
  console.log(judgeOutlineStyle, 'judgeOutlineStyle')

  // const node1 = lf.addNode({
  //   id: 'vue-node-1',
  //   type: 'base-node',
  //   x: 300,
  //   y: 400,
  //   properties: {
  //     progress: 60,
  //     width: 80,
  //     height: 80
  //   }
  // });
  // console.log('node1 --->>>', node1);

  // const node1 = lf.addNode({
  //   id: 'vue-node-1',
  //   type: 'custom-vue-node',
  //   x: 80,
  //   y: 80,
  //   properties: {
  //     progress: 60,
  //     width: 80,
  //     height: 80
  //   }
  // });
  // console.log('node1 --->>>', node1);

  // const node2 = lf.addNode({
  //   id: 'vue-node-2',
  //   type: 'setTime-out',
  //   x: 360,
  //   y: 80,
  //   text: {
  //     value: '请选择触发操作',
  //     x: 300,
  //     y: 85,
  //     draggable: false,
  //     editable: false
  //   },
  //   properties: {
  //     progress: 60,
  //     width: 360,
  //     height: 80
  //   }
  // });

  // console.log('node2 --->>>', node2);

  // const node3 = lf.addNode({
  //   id: 'vue-node-3',
  //   type: 'select-app',
  //   x: 360,
  //   y: 200,
  //   text: {
  //     value: '请选择APP',
  //     x: 300,
  //     y: 85,
  //     draggable: false,
  //     editable: false
  //   }
  // });

  // console.log('node3 --->>>', node3);

  // 动态添加触发器节点
  // lf.addNode({
  //   type: 'trigger-node', // 节点类型
  //   x: 200,
  //   y: 100,
  //   properties: {
  //     order: 1, // 动态设置序号
  //     title: '定时触发器', // 动态设置标题
  //     description: '请选择触发操作' // 动态设置描述文本
  //   }
  // });

  // 动态添加操作节点
  // lf.addNode({
  //   type: 'action-node',
  //   x: 200,
  //   y: 200,
  //   properties: {
  //     order: 2, // 动态设置序号
  //     title: '执行应用',
  //     description: '请选择动作'
  //   }
  // });

  // 拖拽完成
  lf.on('node:drop', (data: any) => {
    console.log('drop-data', data);
  });

  // 双击节点
  lf.on('node:dbclick', (data: any) => {
    console.log('dbclick-data', data);
  });

  // 点击节点
  lf.on('node:click', ({ data }: any) => {
    const model = lf.getNodeModelById(data.id);
    model.setProperty('isSelected', true); // 更新 select 状态为 true
    console.log('click-data', data, data.type == 'add-step-node');
    if (data.type === 'add-step-node') {
      addNewStep();
    }
    if (data.id !== 'base-node-1') {
      stepShow.value = false;
    } else {
      stepShow.value = true;
    }
    properties.value = data.properties;
  });

  // 鼠标移入边
  lf.on('edge:mouseenter', ({ data }: any) => {
    console.log('edge:mouseenter', data);
    const { id, startPoint, endPoint } = data;

    // 计算连线中点位置
    const midX = (startPoint.x + endPoint.x) / 2;
    const midY = (startPoint.y + endPoint.y) / 2;

    console.log(midX, midY);
  });

  // 鼠标移出边
  lf.on('edge:mouseleave', () => {
    // console.log('edge:mouseleave', data);
  });

  // 监听鼠标移入事件
  lf.on('node:mouseenter', ({ data }: any) => {
    const model = lf.getNodeModelById(data.id);
    model.setProperty('isHovered', false);
    console.log('鼠标移入', model.getProperties().isDropdownHovered);
    if (model.getProperties().isDropdownHovered)
      model!.setProperty('isDropdownHovered', false);
    model.setProperty('isHovered', true); // 更新 hover 状态为 true
  });

  // 监听鼠标移出事件
  lf.on('node:mouseleave', ({ data }: any) => {
    const model = lf.getNodeModelById(data.id);
    // model.setProperty('isHovered', false); // 恢复 hover 状态
    // 延迟清除 hover 状态，如果在延迟期间进入下拉菜单，则不清除
    console.log('鼠标移出', model.getProperties().isDropdownHovered);
    setTimeout(() => {
      if (!model.getProperties().isDropdownHovered) {
        // model!.setProperty('isDropdownHovered', true);
        model.setProperty('isHovered', false); // 恢复 hover 状态
      }
    }, 200); // 延迟时间可以根据需要调整
  });

  // 自定义监听事件
  lf.on('add-base-node', (data: any) => {
    console.log('add-base-node', data);
    handleAddNode(data);
  });

  graphData = lf.getGraphData();
  console.log(graphData, 'graphData');
});

const handleAddNode = (data: any) => {
  // 获取当前连线
  const edge = lf.getEdgeDataById(data.edgeId);
  console.log(edge, 'edge');
  const { startPoint, endPoint } = edge;
  // 创建新节点 ID 和默认属性
  const newNodeId1 = `node_${Date.now()}_1`;
  const newNode = {
    id: newNodeId1,
    type: 'base-node',
    x: startPoint.x, // 新节点位置在连线中间
    // x: startPoint.x + 250, // 新节点位置在连线中间
    y: startPoint.y + endPoint.y + 50,
    properties: {
      title: data.command,
      desc: '请配置判断条件'
    }
  };
  const newNodeId2 = `node_${Date.now()}_2`;
  const newNode2 = {
    id: newNodeId2,
    type: 'base-node',
    x: startPoint.x - 150, // 新节点位置在连线中间
    y: startPoint.y + endPoint.y + 50,
    properties: {
      title: data.command,
      desc: '请配置判断条件'
    }
  };

  // 创建新的连线
  const newEdge1 = {
    type: 'polyline',
    sourceNodeId: edge.targetNodeId,
    targetNodeId: newNodeId1,
    text: '执行操作'
  };
  const newEdge2 = {
    type: 'polyline',
    sourceNodeId: edge.targetNodeId,
    targetNodeId: newNodeId2,
    text: '执行操作'
  };

  lf.addNode(newNode);
  // lf.addNode(newNode2);

  lf.addEdge(newEdge1);
  // lf.addEdge(newEdge2);

  // arrangeNodesHorizontally();
};

const handleAddStepToEdge = (edgeId: string) => {
  // 获取当前连线
  const edge = lf.getEdgeDataById(edgeId);
  console.log(edge, 'edge');
  const { startPoint, endPoint } = edge;

  // 创建新节点 ID 和默认属性
  const newNodeId = `node_${Date.now()}`;
  const newNode = {
    id: newNodeId,
    type: 'base-node',
    x: (startPoint.x + endPoint.x) / 2, // 新节点位置在连线中间
    y: (startPoint.y + endPoint.y) / 2 + 100,
    properties: {
      title: '新步骤',
      desc: '请设置操作'
    }
  };

  // 创建新的连线
  const newEdge1 = {
    type: 'polyline',
    sourceNodeId: edge.sourceNodeId,
    targetNodeId: newNodeId
  };

  // const newEdge2 = {
  //   type: 'polyline',
  //   sourceNodeId: newNodeId,
  //   targetNodeId: edge.targetNodeId
  // };

  console.log(newEdge1, 'newEdge1');
  // console.log(newEdge2, 'newEdge2');

  // 删除旧连线，添加新节点和连线
  lf.deleteEdge(edgeId);
  lf.addNode(newNode);
  lf.addEdge(newEdge1);
  // lf.addEdge(newEdge2);

  console.log(lf.getGraphData(), 'lf.getGraphData()');
};

const addNewStep = () => {
  console.log('addNewStep');
  // 节点添加
  lf.on('add-custom-node', (data: any) => {
    console.log('add-custom-node', data);
    handleAddStepToEdge(data.edgeId);
  });
};

const arrangeNodesHorizontally = () => {
  console.log('arrangeNodesHorizontally');
  const nodes = lf.getGraphData().nodes;
  const nodeSpacing = 200; // 节点之间的间距
  const startX = 100; // 第一个节点的 X 坐标
  const fixedY = 200; // 所有节点的固定 Y 坐标

  // 更新每个节点的坐标
  nodes.forEach((node: any, index: number) => {
    const nodeModel = lf.getNodeModelById(node.id);
    nodeModel.x = startX;
    nodeModel.y = fixedY + index * nodeSpacing;
  });

  // // 更新边的连接关系
  // const edges: any = [];
  // nodes.forEach((node: any, index: number) => {
  //   if (index < nodes.length - 1) {
  //     edges.push({
  //       id: `edge-${node.id}-${nodes[index + 1].id}`,
  //       type: 'polyline',
  //       sourceNodeId: node.id,
  //       targetNodeId: nodes[index + 1].id
  //     });
  //   }
  // });

  // 清除旧的边并添加新的边
  // lf.clearEdges();
  // edges.forEach((edge: any) => lf.addEdge(edge));
};
</script>

<style lang="less" scoped>
.logic-flow {
  width: 100%;
  height: 100%;
  :deep(.el-card__body) {
    padding: 0;
    height: calc(100% - 60px);
  }
  &__left {
    width: 75%;
    height: calc(100% - 0px);
    border: 1px solid #ccc;
    border-top: 0px;
  }
  &__right {
    width: 25%;
    &__aside {
      width: 30px;
      display: flex;
      flex-direction: column; /* 竖直排列图标 */
      align-items: center; /* 图标居中对齐 */
      justify-content: flex-start; /* 图标之间有间距 */
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    &__content {
      width: calc(100% - 30px);
    }
  }
}
</style>
