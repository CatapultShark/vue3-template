<template>
  <div class="main">
    <div class="left">
      <div class="custom-bpmn" ref="customBpmnRef"></div>
      <template v-if="logicFlowInstance">
        <Panel :lf="logicFlowInstance" />
        <LeftTool :lf="logicFlowInstance" />
        <FlowController
          v-if="flowControllerVisible"
          :engine="engineInstance"
          :lf="logicFlowInstance"
        />
      </template>
    </div>
    <div class="right">
      <el-card style="max-width: 480px">
        <template #header>操作面板（所有业务流程管理）</template>
        <div
          class="pointer mb10"
          v-for="(item, index) in flowList"
          :key="index"
          @click="handleSelectFlow(item.flowData)"
        >
          {{ item.name }}
        </div>
      </el-card>
    </div>
  </div>
</template>

<script lang="ts" setup>
import LogicFlow from '@logicflow/core';
import Engine from '@logicflow/engine';
import '@logicflow/core/es/index.css';
import '@logicflow/extension/es/index.css';
import {
  BPMNElements,
  BPMNAdapter,
  Group,
  SelectionSelect,
  DndPanel,
  Control,
  Menu,
  MiniMap
} from '@logicflow/extension';

import LeftTool from '@/components2/left-tool.vue';
import FlowController from '@/components/FlowController.vue';
import Panel from '@/components2/panel.vue';

// 自定义节点
import CustomSqlElement from '@/components2/sql-element';
import CustomRequest from '@/components2/request-element';
import CustomToJson from '@/components2/to-json-element';
import CustomFormJson from '@/components2/form-json-element';
import CustomResponse from '@/components2/response-element';

// 任务执行逻辑
import TimerStart from '@/engines/custom-nodes/start.ts';
import ManualTask from '@/engines/custom-nodes/task.ts';
import ParallelGateway from '@/engines/custom-nodes/parallel-gateway';
import End from '@/engines/custom-nodes/end.ts';
import HandleHttpRequest from '@/engines/custom-nodes/handleHttpRequest';
import ExecuteSQL from '@/engines/custom-nodes/executeSql';
import ConvertAvroToJSON from '@/engines/custom-nodes/convertAvroToJson';
import JoltTransformJSON from '@/engines/custom-nodes/joltTransformJson';
import HandleHttpResponse from '@/engines/custom-nodes/handleHttpResponse';

// 全局注册插件
LogicFlow.use(BPMNAdapter);
LogicFlow.use(BPMNElements);
LogicFlow.use(Group);
LogicFlow.use(SelectionSelect);
LogicFlow.use(DndPanel);
LogicFlow.use(Control);
LogicFlow.use(Menu);
LogicFlow.use(MiniMap);

// 自定义插件使用
import { LXBPMNElements } from '@/custom-plugin/custom-bpmn-elements';
LogicFlow.use(LXBPMNElements);

const logicFlowInstance = ref();
const customBpmnRef = ref<any>(null);
const flowControllerVisible = ref(false);
const engineInstance = ref();

// 注册任务执行逻辑
const engine = new Engine({
  context: {},
  debug: true
});
engine.register({
  type: 'bpmn:startEvent',
  model: TimerStart
});
engine.register({
  type: 'lxbpmn:ExecuteSQL',
  model: ManualTask
});
engine.register({
  type: 'bpmn:parallelGateway',
  model: ParallelGateway
});
engine.register({
  type: 'bpmn:endEvent',
  model: End
});

engine.register({
  type: 'lxbpmn:HandleHttpRequest',
  model: HandleHttpRequest
});
engine.register({
  type: 'lxbpmn:ExecuteSQL',
  model: ExecuteSQL
});
engine.register({
  type: 'lxbpmn:ConvertAvroToJSON',
  model: ConvertAvroToJSON
});
engine.register({
  type: 'lxbpmn:JoltTransformJSON',
  model: JoltTransformJSON
});
engine.register({
  type: 'lxbpmn:HandleHttpResponse',
  model: HandleHttpResponse
});

engineInstance.value = engine;

provide('flowControllerVisible', flowControllerVisible);

const data: any = ref({
  nodes: [
    {
      id: 'Event_4d00b2d',
      type: 'bpmn:startEvent',
      x: 357,
      y: 274,
      properties: {
        width: 36,
        height: 36,
        databaseType: '开始',
        attributeList: []
      },
      text: {
        x: 357,
        y: 314,
        value: '开始'
      }
    },
    {
      id: 'ae5cf5b4-8453-46d5-92cd-4fc09d6f34b2',
      type: 'lxbpmn:HandleHttpRequest',
      x: 584,
      y: 274,
      properties: {
        type: 'HandleHttpRequest',
        variable: '',
        width: 300,
        height: 160,
        attributeList: []
      },
      text: {
        x: 584,
        y: 274,
        value: 'HandleHttpRequest'
      }
    },
    {
      id: '74395c43-e703-4d24-afe0-41ac1f7f84af',
      type: 'lxbpmn:ConvertAvroToJSON',
      x: 1411,
      y: 508,
      properties: {
        type: 'ConvertAvroToJSON',
        variable: '',
        width: 300,
        height: 160,
        attributeList: []
      },
      text: {
        x: 1411,
        y: 508,
        value: 'ConvertAvroToJSON'
      }
    },
    {
      id: '533ebad7-60be-4b96-9ee4-3ba4d4ff3074',
      type: 'lxbpmn:JoltTransformJSON',
      x: 1407,
      y: 274,
      properties: {
        type: 'JoltTransformJSON',
        variable: '',
        width: 300,
        height: 160,
        attributeList: []
      },
      text: {
        x: 1407,
        y: 274,
        value: '扩展网关'
      }
    },
    {
      id: 'e2a9a3a9-f669-45b5-8188-af7cf92345ef',
      type: 'lxbpmn:ExecuteSQL',
      x: 1004,
      y: 274,
      properties: {
        type: 'ExecuteSQL',
        width: 300,
        height: 160,
        attributeList: []
      },
      text: {
        x: 1004,
        y: 274,
        value: 'ExecuteSQL'
      }
    },
    {
      id: '41f750ef-c535-439c-ae05-50cb8481716c',
      type: 'lxbpmn:HandleHttpResponse',
      x: 992,
      y: 508,
      properties: {
        type: 'HandleHttpResponse',
        width: 300,
        height: 160,
        attributeList: []
      },
      text: {
        x: 992,
        y: 508,
        value: 'HandleHttpResponse'
      }
    },
    {
      id: 'Event_306f922',
      type: 'bpmn:endEvent',
      x: 761,
      y: 508,
      properties: {
        width: 36,
        height: 36,
        databaseType: '结束',
        attributeList: []
      },
      text: {
        x: 761,
        y: 548,
        value: '结束'
      }
    }
  ],
  edges: [
    {
      id: 'Flow_0631c97',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: 'Event_4d00b2d',
      targetNodeId: 'ae5cf5b4-8453-46d5-92cd-4fc09d6f34b2',
      sourceAnchorId: 'Event_4d00b2d_1',
      targetAnchorId: 'ae5cf5b4-8453-46d5-92cd-4fc09d6f34b2_0',
      startPoint: {
        x: 375,
        y: 274
      },
      endPoint: {
        x: 434,
        y: 274
      },
      pointsList: [
        {
          x: 375,
          y: 274
        },
        {
          x: 434,
          y: 274
        }
      ]
    },
    {
      id: 'Flow_ac4e433',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: '41f750ef-c535-439c-ae05-50cb8481716c',
      targetNodeId: 'Event_306f922',
      sourceAnchorId: '41f750ef-c535-439c-ae05-50cb8481716c_0',
      targetAnchorId: 'Event_306f922_1',
      startPoint: {
        x: 842,
        y: 508
      },
      endPoint: {
        x: 779,
        y: 508
      },
      pointsList: [
        {
          x: 842,
          y: 508
        },
        {
          x: 779,
          y: 508
        }
      ]
    },
    {
      id: 'Flow_42d6597',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: 'ae5cf5b4-8453-46d5-92cd-4fc09d6f34b2',
      targetNodeId: 'e2a9a3a9-f669-45b5-8188-af7cf92345ef',
      sourceAnchorId: 'ae5cf5b4-8453-46d5-92cd-4fc09d6f34b2_1',
      targetAnchorId: 'e2a9a3a9-f669-45b5-8188-af7cf92345ef_0',
      startPoint: {
        x: 734,
        y: 274
      },
      endPoint: {
        x: 854,
        y: 274
      },
      pointsList: [
        {
          x: 734,
          y: 274
        },
        {
          x: 854,
          y: 274
        }
      ]
    },
    {
      id: 'Flow_3977d83',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: 'e2a9a3a9-f669-45b5-8188-af7cf92345ef',
      targetNodeId: '533ebad7-60be-4b96-9ee4-3ba4d4ff3074',
      sourceAnchorId: 'e2a9a3a9-f669-45b5-8188-af7cf92345ef_1',
      targetAnchorId: '533ebad7-60be-4b96-9ee4-3ba4d4ff3074_0',
      startPoint: {
        x: 1154,
        y: 274
      },
      endPoint: {
        x: 1257,
        y: 274
      },
      pointsList: [
        {
          x: 1154,
          y: 274
        },
        {
          x: 1257,
          y: 274
        }
      ]
    },
    {
      id: 'Flow_85ed4f6',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: '533ebad7-60be-4b96-9ee4-3ba4d4ff3074',
      targetNodeId: '74395c43-e703-4d24-afe0-41ac1f7f84af',
      sourceAnchorId: '533ebad7-60be-4b96-9ee4-3ba4d4ff3074_1',
      targetAnchorId: '74395c43-e703-4d24-afe0-41ac1f7f84af_1',
      startPoint: {
        x: 1557,
        y: 274
      },
      endPoint: {
        x: 1561,
        y: 508
      },
      pointsList: [
        {
          x: 1557,
          y: 274
        },
        {
          x: 1591,
          y: 274
        },
        {
          x: 1591,
          y: 508
        },
        {
          x: 1561,
          y: 508
        }
      ]
    },
    {
      id: 'Flow_3b3ce00',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: '74395c43-e703-4d24-afe0-41ac1f7f84af',
      targetNodeId: '41f750ef-c535-439c-ae05-50cb8481716c',
      sourceAnchorId: '74395c43-e703-4d24-afe0-41ac1f7f84af_0',
      targetAnchorId: '41f750ef-c535-439c-ae05-50cb8481716c_1',
      startPoint: {
        x: 1261,
        y: 508
      },
      endPoint: {
        x: 1142,
        y: 508
      },
      pointsList: [
        {
          x: 1261,
          y: 508
        },
        {
          x: 1142,
          y: 508
        }
      ]
    }
  ]
});

/**
 * 扩展任务节点
 */
import { TaskNodeFactory } from '@logicflow/extension';
import { flow } from 'lodash-es';
const request = TaskNodeFactory('lxbpmn:HandleHttpRequest', '');
TaskNodeFactory('lxbpmn:ConvertAvroToJSON', '');
TaskNodeFactory('lxbpmn:JoltTransformJSON', '');
TaskNodeFactory('lxbpmn:ExecuteSQL', '');
TaskNodeFactory('lxbpmn:HandleHttpResponse', '');

// 小地图
const miniMapOptions: MiniMap.MiniMapOption = {
  isShowHeader: false,
  isShowCloseIcon: true,
  headerTitle: 'MiniMap',
  width: 200,
  height: 120
  // leftPosition: 100,
  // topPosition: 100,
};

const data2 = {
  nodes: [
    {
      id: 'Event_4d00b2d',
      type: 'bpmn:startEvent',
      x: 357,
      y: 274,
      properties: {
        width: 36,
        height: 36,
        databaseType: '开始',
        attributeList: []
      },
      text: {
        x: 357,
        y: 314,
        value: '开始'
      }
    },
    {
      id: 'ae5cf5b4-8453-46d5-92cd-4fc09d6f34b2',
      type: 'lxbpmn:HandleHttpRequest',
      x: 584,
      y: 274,
      properties: {
        type: 'HandleHttpRequest',
        variable: '',
        width: 300,
        height: 160,
        attributeList: []
      },
      text: {
        x: 584,
        y: 274,
        value: 'HandleHttpRequest'
      }
    },
    {
      id: 'e2a9a3a9-f669-45b5-8188-af7cf92345ef',
      type: 'lxbpmn:ExecuteSQL',
      x: 940,
      y: 274,
      properties: {
        type: 'ExecuteSQL',
        width: 300,
        height: 160,
        attributeList: []
      },
      text: {
        x: 940,
        y: 274,
        value: 'ExecuteSQL'
      }
    },
    {
      id: '41f750ef-c535-439c-ae05-50cb8481716c',
      type: 'lxbpmn:HandleHttpResponse',
      x: 1304,
      y: 273,
      properties: {
        type: 'HandleHttpResponse',
        width: 300,
        height: 160,
        attributeList: []
      },
      text: {
        x: 1304,
        y: 273,
        value: 'HandleHttpResponse'
      }
    },
    {
      id: 'Event_306f922',
      type: 'bpmn:endEvent',
      x: 1540,
      y: 273,
      properties: {
        width: 36,
        height: 36,
        databaseType: '结束',
        attributeList: []
      },
      text: {
        x: 1540,
        y: 313,
        value: '结束'
      }
    }
  ],
  edges: [
    {
      id: 'Flow_0631c97',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: 'Event_4d00b2d',
      targetNodeId: 'ae5cf5b4-8453-46d5-92cd-4fc09d6f34b2',
      sourceAnchorId: 'Event_4d00b2d_1',
      targetAnchorId: 'ae5cf5b4-8453-46d5-92cd-4fc09d6f34b2_0',
      startPoint: {
        x: 375,
        y: 274
      },
      endPoint: {
        x: 434,
        y: 274
      },
      pointsList: [
        {
          x: 375,
          y: 274
        },
        {
          x: 434,
          y: 274
        }
      ]
    },
    {
      id: 'Flow_42d6597',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: 'ae5cf5b4-8453-46d5-92cd-4fc09d6f34b2',
      targetNodeId: 'e2a9a3a9-f669-45b5-8188-af7cf92345ef',
      sourceAnchorId: 'ae5cf5b4-8453-46d5-92cd-4fc09d6f34b2_1',
      targetAnchorId: 'e2a9a3a9-f669-45b5-8188-af7cf92345ef_0',
      startPoint: {
        x: 734,
        y: 274
      },
      endPoint: {
        x: 790,
        y: 274
      },
      pointsList: [
        {
          x: 734,
          y: 274
        },
        {
          x: 764,
          y: 274
        },
        {
          x: 764,
          y: 274
        },
        {
          x: 760,
          y: 274
        },
        {
          x: 760,
          y: 274
        },
        {
          x: 790,
          y: 274
        }
      ]
    },
    {
      id: 'Flow_c881bed',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: 'e2a9a3a9-f669-45b5-8188-af7cf92345ef',
      targetNodeId: '41f750ef-c535-439c-ae05-50cb8481716c',
      sourceAnchorId: 'e2a9a3a9-f669-45b5-8188-af7cf92345ef_1',
      targetAnchorId: '41f750ef-c535-439c-ae05-50cb8481716c_0',
      startPoint: {
        x: 1090,
        y: 274
      },
      endPoint: {
        x: 1154,
        y: 273
      },
      pointsList: [
        {
          x: 1090,
          y: 274
        },
        {
          x: 1122,
          y: 274
        },
        {
          x: 1122,
          y: 273
        },
        {
          x: 1154,
          y: 273
        }
      ]
    },
    {
      id: 'Flow_1c95e73',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: '41f750ef-c535-439c-ae05-50cb8481716c',
      targetNodeId: 'Event_306f922',
      sourceAnchorId: '41f750ef-c535-439c-ae05-50cb8481716c_1',
      targetAnchorId: 'Event_306f922_3',
      startPoint: {
        x: 1454,
        y: 273
      },
      endPoint: {
        x: 1522,
        y: 273
      },
      pointsList: [
        {
          x: 1454,
          y: 273
        },
        {
          x: 1522,
          y: 273
        }
      ]
    }
  ]
};

const flowList = reactive([
  {
    name: '流程1',
    flowData: data.value
  },
  {
    name: '流程2',
    flowData: data2
  }
]);
let lf: any = null;
onMounted(() => {
  lf = new LogicFlow({
    container: customBpmnRef.value,
    grid: true,
    hideAnchors: false, // 设置为 true 隐藏连接点
    stopZoomGraph: true, // 设置为 true 禁止缩放画布
    stopScrollGraph: true, // 设置为 true 禁止滚动画布
    snapline: true // 对齐线
    // pluginsOptions: {
    //   miniMap: {
    //     ...miniMapOptions,
    //     showEdge: true
    //   }
    // }
  });

  // lf.miniMap.show();
  lf.register(request);
  // 批量注册（html节点）
  lf.batchRegister([
    CustomSqlElement,
    CustomRequest,
    CustomToJson,
    CustomFormJson,
    CustomResponse
  ]);

  lf.renderRawData(data.value);

  logicFlowInstance.value = lf;
  console.log('logicFlowInstance', logicFlowInstance.value);
});

const handleSelectFlow = (flow: any) => {
  console.log(flow);
  data.value = flow;
  lf.renderRawData(data.value);
};
</script>

<style lang="less" scoped>
.main {
  display: flex;
  height: 100%;
  .left {
    flex: 1;
    .custom-bpmn {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    width: 300px;
  }
}
</style>
