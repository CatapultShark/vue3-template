<template>
  <div class="bpmn" id="main-graph" ref="bpmnRef"></div>
  <template v-if="logicFlowInstance">
    <Pattern :lf="logicFlowInstance" />
    <FlowController
      v-if="flowControllerVisible"
      :engine="engineInstance"
      :lf="logicFlowInstance"
    />
  </template>
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
  Menu
} from '@logicflow/extension';

LogicFlow.use(BPMNAdapter);
LogicFlow.use(BPMNElements);
LogicFlow.use(Group);
LogicFlow.use(SelectionSelect);
LogicFlow.use(DndPanel);
LogicFlow.use(Control);
LogicFlow.use(Menu);

import Pattern from '@/components/Pattern.vue';
import FlowController from '@/components/FlowController.vue';
import TimerStart from '@/engines/nodes/start.ts';
import ManualTask from '@/engines/nodes/task.ts';
import Gateway from '@/engines/nodes/gateway.ts';
import ParallelGateway from '@/engines/nodes/parallel-gateway.ts';
import End from '@/engines/nodes/end.ts';

import CurvedEdge from '@/custom/edges/curvedEdge.ts';
import mountPanel from '../components/Panels/index.ts';

const logicFlowInstance = ref();
const bpmnRef = ref<any>(null);
const flowControllerVisible = ref(false);
const engineInstance = ref();

// 执行器
const engine = new Engine({
  context: {},
  debug: true
});
engine.register({
  type: 'bpmn:startEvent',
  model: TimerStart
});
engine.register({
  type: 'bpmn:userTask',
  model: ManualTask
});
engine.register({
  type: 'bpmn:exclusiveGateway',
  model: Gateway
});
engine.register({
  type: 'bpmn:parallelGateway',
  model: ParallelGateway
});
engine.register({
  type: 'bpmn:endEvent',
  model: End
});
engineInstance.value = engine;

provide('flowControllerVisible', flowControllerVisible);

const data: any = {
  // 排他网关
  // nodes: [
  //   {
  //     id: 'Event_bfba389',
  //     type: 'bpmn:startEvent',
  //     x: 303,
  //     y: 232,
  //     properties: {
  //       panels: ['timerDefinition'],
  //       definitionType: 'bpmn:timerEventDefinition',
  //       timerValue: 2,
  //       timerType: 'timeDuration'
  //     },
  //     rotate: 0.015871682991790315,
  //     zIndex: 1004,
  //     text: {
  //       x: 303,
  //       y: 272,
  //       value: '开始'
  //     }
  //   },
  //   {
  //     id: 'Gateway_76d07c3',
  //     type: 'bpmn:exclusiveGateway',
  //     x: 439,
  //     y: 232,
  //     properties: {
  //       panels: ['variable'],
  //       variable: 'imLucky',
  //       flag: '排他网关1'
  //     },
  //     rotate: -0.013697773372865818,
  //     zIndex: 1002,
  //     text: {
  //       x: 439,
  //       y: 272,
  //       value: '排他网关1'
  //     }
  //   },
  //   {
  //     id: 'Activity_639a2d9',
  //     type: 'bpmn:userTask',
  //     x: 660,
  //     y: 149,
  //     properties: {
  //       panels: ['multiInstance'],
  //       flag: '人工任务1'
  //     },
  //     zIndex: 1007,
  //     text: {
  //       x: 660,
  //       y: 149,
  //       value: '人工任务1'
  //     }
  //   },
  //   {
  //     id: 'Activity_a29d1de',
  //     type: 'bpmn:userTask',
  //     x: 660,
  //     y: 308,
  //     properties: {
  //       panels: ['multiInstance'],
  //       flag: '人工任务2'
  //     },
  //     rotate: -0.003220600781238425,
  //     zIndex: 1010,
  //     text: {
  //       x: 660,
  //       y: 308,
  //       value: '人工任务2'
  //     }
  //   },
  //   {
  //     id: 'Event_6fced6f',
  //     type: 'bpmn:endEvent',
  //     x: 839,
  //     y: 231,
  //     properties: {},
  //     zIndex: 1013,
  //     text: {
  //       x: 839,
  //       y: 271,
  //       value: '结束'
  //     }
  //   }
  // ],
  // edges: [
  //   {
  //     id: 'Flow_6096f47',
  //     type: 'bpmn:sequenceFlow',
  //     sourceNodeId: 'Event_bfba389',
  //     targetNodeId: 'Gateway_76d07c3',
  //     startPoint: {
  //       x: 321,
  //       y: 232.36,
  //       id: 'Event_bfba389_1'
  //     },
  //     endPoint: {
  //       x: 414,
  //       y: 232.25,
  //       id: 'Gateway_76d07c3_3'
  //     },
  //     properties: {
  //       isDefaultFlow: false
  //     },
  //     zIndex: 1005,
  //     pointsList: [
  //       {
  //         x: 321,
  //         y: 232.36
  //       },
  //       {
  //         x: 367.5,
  //         y: 232.36
  //       },
  //       {
  //         x: 367.5,
  //         y: 232.25
  //       },
  //       {
  //         x: 414,
  //         y: 232.25
  //       }
  //     ]
  //   },
  //   {
  //     id: 'Flow_9f50d54',
  //     type: 'bpmn:sequenceFlow',
  //     sourceNodeId: 'Gateway_76d07c3',
  //     targetNodeId: 'Activity_639a2d9',
  //     text: {
  //       value: 'yes'
  //     },
  //     startPoint: {
  //       x: 464,
  //       y: 231.75
  //     },
  //     endPoint: {
  //       x: 610,
  //       y: 149
  //     },
  //     properties: {
  //       isDefaultFlow: false,
  //       conditionExpression: 'imLucky === "yes"'
  //     },
  //     zIndex: 1008,
  //     pointsList: [
  //       {
  //         x: 464,
  //         y: 231.75
  //       },
  //       {
  //         x: 494,
  //         y: 231.75
  //       },
  //       {
  //         x: 494,
  //         y: 149
  //       },
  //       {
  //         x: 610,
  //         y: 149
  //       }
  //     ]
  //   },
  //   {
  //     id: 'Flow_0e3575d',
  //     type: 'bpmn:sequenceFlow',
  //     sourceNodeId: 'Gateway_76d07c3',
  //     targetNodeId: 'Activity_a29d1de',
  //     text: {
  //       value: 'no'
  //     },
  //     startPoint: {
  //       x: 464,
  //       y: 231.75
  //     },
  //     endPoint: {
  //       x: 610,
  //       y: 308,
  //       id: 'Activity_a29d1de_3'
  //     },
  //     properties: {
  //       isDefaultFlow: false,
  //       conditionExpression: 'imLucky === "no"'
  //     },
  //     zIndex: 1011,
  //     pointsList: [
  //       {
  //         x: 464,
  //         y: 231.75
  //       },
  //       {
  //         x: 494,
  //         y: 231.75
  //       },
  //       {
  //         x: 494,
  //         y: 308
  //       },
  //       {
  //         x: 610,
  //         y: 308
  //       }
  //     ]
  //   },
  //   {
  //     id: 'Flow_0b1b6d8',
  //     type: 'bpmn:sequenceFlow',
  //     sourceNodeId: 'Activity_639a2d9',
  //     targetNodeId: 'Event_6fced6f',
  //     startPoint: {
  //       x: 710,
  //       y: 149
  //     },
  //     endPoint: {
  //       x: 821,
  //       y: 231
  //     },
  //     properties: {
  //       isDefaultFlow: false
  //     },
  //     zIndex: 1014,
  //     pointsList: [
  //       {
  //         x: 710,
  //         y: 149
  //       },
  //       {
  //         x: 791,
  //         y: 149
  //       },
  //       {
  //         x: 791,
  //         y: 231
  //       },
  //       {
  //         x: 821,
  //         y: 231
  //       }
  //     ]
  //   },
  //   {
  //     id: 'Flow_46e3a9b',
  //     type: 'bpmn:sequenceFlow',
  //     sourceNodeId: 'Activity_a29d1de',
  //     targetNodeId: 'Event_6fced6f',
  //     startPoint: {
  //       x: 710,
  //       y: 308,
  //       id: 'Activity_a29d1de_1'
  //     },
  //     endPoint: {
  //       x: 821,
  //       y: 231
  //     },
  //     properties: {
  //       isDefaultFlow: false
  //     },
  //     zIndex: 1015,
  //     pointsList: [
  //       {
  //         x: 710,
  //         y: 308
  //       },
  //       {
  //         x: 791,
  //         y: 308
  //       },
  //       {
  //         x: 791,
  //         y: 231
  //       },
  //       {
  //         x: 821,
  //         y: 231
  //       }
  //     ]
  //   }
  // ]
  // 并行网关
  // nodes: [
  //   {
  //     id: 'Event_0c8b988',
  //     type: 'bpmn:startEvent',
  //     x: 272,
  //     y: 244,
  //     properties: {
  //       definitionType: 'bpmn:timerEventDefinition',
  //       timerValue: 2,
  //       timerType: 'timeDuration',
  //       panels: ['timerDefinition'],
  //       definitionId: 'Definition_2d31cb3',
  //       width: 36,
  //       height: 36
  //     },
  //     text: {
  //       x: 272,
  //       y: 284,
  //       value: '时间开始'
  //     }
  //   },
  //   {
  //     id: 'Gateway_7e3cdac',
  //     type: 'bpmn:parallelGateway',
  //     x: 412,
  //     y: 244,
  //     properties: {
  //       panels: ['variable'],
  //       variable: 'user',
  //       width: 50,
  //       height: 50
  //     },
  //     text: {
  //       x: 412,
  //       y: 284,
  //       value: '并行网关'
  //     }
  //   },
  //   {
  //     id: 'Activity_11b9a57',
  //     type: 'bpmn:userTask',
  //     x: 609,
  //     y: 174,
  //     properties: {
  //       panels: ['multiInstance'],
  //       flag: '任务1',
  //       width: 100,
  //       height: 80
  //     },
  //     text: {
  //       x: 609,
  //       y: 174,
  //       value: '任务1'
  //     }
  //   },
  //   {
  //     id: 'Activity_3662472',
  //     type: 'bpmn:userTask',
  //     x: 610,
  //     y: 301,
  //     properties: {
  //       panels: ['multiInstance'],
  //       flag: '任务2',
  //       width: 100,
  //       height: 80
  //     },
  //     text: {
  //       x: 610,
  //       y: 301,
  //       value: '任务2'
  //     }
  //   },
  //   {
  //     id: 'Event_7980743',
  //     type: 'bpmn:endEvent',
  //     x: 1188,
  //     y: 237,
  //     properties: {
  //       width: 36,
  //       height: 36
  //     },
  //     text: {
  //       x: 1188,
  //       y: 277,
  //       value: '结束'
  //     }
  //   },
  //   {
  //     id: 'Gateway_16282a6',
  //     type: 'bpmn:exclusiveGateway',
  //     x: 820,
  //     y: 235,
  //     properties: {
  //       panels: ['variable'],
  //       variable: 'buy',
  //       width: 50,
  //       height: 50
  //     },
  //     text: {
  //       x: 820,
  //       y: 275,
  //       value: '排他网关'
  //     }
  //   },
  //   {
  //     id: 'Activity_9705d99',
  //     type: 'bpmn:userTask',
  //     x: 981,
  //     y: 174,
  //     properties: {
  //       panels: ['multiInstance'],
  //       flag: '任务3',
  //       width: 100,
  //       height: 80
  //     },
  //     text: {
  //       x: 981,
  //       y: 174,
  //       value: '任务3'
  //     }
  //   },
  //   {
  //     id: 'Activity_73f75e7',
  //     type: 'bpmn:userTask',
  //     x: 992,
  //     y: 300,
  //     properties: {
  //       panels: ['multiInstance'],
  //       flag: '任务4',
  //       width: 100,
  //       height: 80
  //     },
  //     text: {
  //       x: 992,
  //       y: 300,
  //       value: '任务4'
  //     }
  //   }
  // ],
  // edges: [
  //   {
  //     id: '5aed925c-2d58-460e-a40a-c7c44946f10f',
  //     type: 'bpmn:sequenceFlow',
  //     properties: {
  //       isDefaultFlow: false
  //     },
  //     sourceNodeId: 'Event_0c8b988',
  //     targetNodeId: 'Gateway_7e3cdac',
  //     sourceAnchorId: 'Event_0c8b988_1',
  //     targetAnchorId: 'Gateway_7e3cdac_3',
  //     startPoint: {
  //       x: 290,
  //       y: 244
  //     },
  //     endPoint: {
  //       x: 387,
  //       y: 244
  //     },
  //     pointsList: [
  //       {
  //         x: 290,
  //         y: 244
  //       },
  //       {
  //         x: 387,
  //         y: 244
  //       }
  //     ]
  //   },
  //   {
  //     id: '1680646c-e128-45a3-9e00-6106440a025b',
  //     type: 'bpmn:sequenceFlow',
  //     properties: {
  //       isDefaultFlow: false,
  //       conditionExpression: 'user.name === "tb" || user.age === "18"'
  //     },
  //     sourceNodeId: 'Gateway_7e3cdac',
  //     targetNodeId: 'Activity_11b9a57',
  //     sourceAnchorId: 'Gateway_7e3cdac_1',
  //     targetAnchorId: 'Activity_11b9a57_3',
  //     startPoint: {
  //       x: 437,
  //       y: 244
  //     },
  //     endPoint: {
  //       x: 559,
  //       y: 174
  //     },
  //     text: {
  //       x: 513,
  //       y: 174,
  //       value: 'tb'
  //     },
  //     pointsList: [
  //       {
  //         x: 437,
  //         y: 244
  //       },
  //       {
  //         x: 467,
  //         y: 244
  //       },
  //       {
  //         x: 467,
  //         y: 174
  //       },
  //       {
  //         x: 559,
  //         y: 174
  //       }
  //     ]
  //   },
  //   {
  //     id: 'c4445117-9270-4125-8d36-b7d480ea5c42',
  //     type: 'bpmn:sequenceFlow',
  //     properties: {
  //       isDefaultFlow: false,
  //       conditionExpression: 'user.age === "18" || user.role === "admin"'
  //     },
  //     sourceNodeId: 'Gateway_7e3cdac',
  //     targetNodeId: 'Activity_3662472',
  //     sourceAnchorId: 'Gateway_7e3cdac_1',
  //     targetAnchorId: 'Activity_3662472_3',
  //     startPoint: {
  //       x: 437,
  //       y: 244
  //     },
  //     endPoint: {
  //       x: 560,
  //       y: 301
  //     },
  //     text: {
  //       x: 477.5,
  //       y: 301,
  //       value: 'tm'
  //     },
  //     pointsList: [
  //       {
  //         x: 437,
  //         y: 244
  //       },
  //       {
  //         x: 467,
  //         y: 244
  //       },
  //       {
  //         x: 467,
  //         y: 301
  //       },
  //       {
  //         x: 560,
  //         y: 301
  //       }
  //     ]
  //   },
  //   {
  //     id: 'c5777383-79bc-4b30-ae2a-3af3215f9fe8',
  //     type: 'bpmn:sequenceFlow',
  //     properties: {
  //       isDefaultFlow: false,
  //       conditionExpression: ''
  //     },
  //     sourceNodeId: 'Activity_11b9a57',
  //     targetNodeId: 'Gateway_16282a6',
  //     sourceAnchorId: 'Activity_11b9a57_1',
  //     targetAnchorId: 'Gateway_16282a6_3',
  //     startPoint: {
  //       x: 659,
  //       y: 174
  //     },
  //     endPoint: {
  //       x: 795,
  //       y: 235
  //     },
  //     pointsList: [
  //       {
  //         x: 659,
  //         y: 174
  //       },
  //       {
  //         x: 765,
  //         y: 174
  //       },
  //       {
  //         x: 765,
  //         y: 235
  //       },
  //       {
  //         x: 795,
  //         y: 235
  //       }
  //     ]
  //   },
  //   {
  //     id: '49e83fee-e212-4694-8137-b24f28829858',
  //     type: 'bpmn:sequenceFlow',
  //     properties: {
  //       isDefaultFlow: false,
  //       conditionExpression: 'buy === "true"'
  //     },
  //     sourceNodeId: 'Gateway_16282a6',
  //     targetNodeId: 'Activity_9705d99',
  //     sourceAnchorId: 'Gateway_16282a6_1',
  //     targetAnchorId: 'Activity_9705d99_3',
  //     startPoint: {
  //       x: 845,
  //       y: 235
  //     },
  //     endPoint: {
  //       x: 931,
  //       y: 174
  //     },
  //     text: {
  //       x: 898,
  //       y: 174,
  //       value: 'true'
  //     },
  //     pointsList: [
  //       {
  //         x: 845,
  //         y: 235
  //       },
  //       {
  //         x: 875,
  //         y: 235
  //       },
  //       {
  //         x: 875,
  //         y: 174
  //       },
  //       {
  //         x: 931,
  //         y: 174
  //       }
  //     ]
  //   },
  //   {
  //     id: 'd21af5e1-bae5-474b-a3dd-699feb5f7734',
  //     type: 'bpmn:sequenceFlow',
  //     properties: {
  //       isDefaultFlow: false
  //     },
  //     sourceNodeId: 'Activity_9705d99',
  //     targetNodeId: 'Event_7980743',
  //     sourceAnchorId: 'Activity_9705d99_1',
  //     targetAnchorId: 'Event_7980743_3',
  //     startPoint: {
  //       x: 1031,
  //       y: 174
  //     },
  //     endPoint: {
  //       x: 1170,
  //       y: 237
  //     },
  //     pointsList: [
  //       {
  //         x: 1031,
  //         y: 174
  //       },
  //       {
  //         x: 1140,
  //         y: 174
  //       },
  //       {
  //         x: 1140,
  //         y: 237
  //       },
  //       {
  //         x: 1170,
  //         y: 237
  //       }
  //     ]
  //   },
  //   {
  //     id: 'd207d625-b2d6-4c88-b10c-6d2d2789ac45',
  //     type: 'bpmn:sequenceFlow',
  //     properties: {
  //       isDefaultFlow: false
  //     },
  //     sourceNodeId: 'Activity_3662472',
  //     targetNodeId: 'Gateway_16282a6',
  //     sourceAnchorId: 'Activity_3662472_1',
  //     targetAnchorId: 'Gateway_16282a6_3',
  //     startPoint: {
  //       x: 660,
  //       y: 301
  //     },
  //     endPoint: {
  //       x: 795,
  //       y: 235
  //     },
  //     pointsList: [
  //       {
  //         x: 660,
  //         y: 301
  //       },
  //       {
  //         x: 765,
  //         y: 301
  //       },
  //       {
  //         x: 765,
  //         y: 235
  //       },
  //       {
  //         x: 795,
  //         y: 235
  //       }
  //     ]
  //   },
  //   {
  //     id: 'dbffb1c7-12d2-427f-8dc8-971d42e70101',
  //     type: 'bpmn:sequenceFlow',
  //     properties: {
  //       isDefaultFlow: false,
  //       conditionExpression: 'buy === "false"'
  //     },
  //     sourceNodeId: 'Gateway_16282a6',
  //     targetNodeId: 'Activity_73f75e7',
  //     sourceAnchorId: 'Gateway_16282a6_1',
  //     targetAnchorId: 'Activity_73f75e7_3',
  //     startPoint: {
  //       x: 845,
  //       y: 235
  //     },
  //     endPoint: {
  //       x: 942,
  //       y: 300
  //     },
  //     text: {
  //       x: 907.5,
  //       y: 300,
  //       value: 'false'
  //     },
  //     pointsList: [
  //       {
  //         x: 845,
  //         y: 235
  //       },
  //       {
  //         x: 875,
  //         y: 235
  //       },
  //       {
  //         x: 875,
  //         y: 300
  //       },
  //       {
  //         x: 942,
  //         y: 300
  //       }
  //     ]
  //   },
  //   {
  //     id: '5db19f5c-5910-4908-8bd0-1c11fce63852',
  //     type: 'bpmn:sequenceFlow',
  //     properties: {
  //       isDefaultFlow: false
  //     },
  //     sourceNodeId: 'Activity_73f75e7',
  //     targetNodeId: 'Event_7980743',
  //     sourceAnchorId: 'Activity_73f75e7_1',
  //     targetAnchorId: 'Event_7980743_3',
  //     startPoint: {
  //       x: 1042,
  //       y: 300
  //     },
  //     endPoint: {
  //       x: 1170,
  //       y: 237
  //     },
  //     pointsList: [
  //       {
  //         x: 1042,
  //         y: 300
  //       },
  //       {
  //         x: 1140,
  //         y: 300
  //       },
  //       {
  //         x: 1140,
  //         y: 237
  //       },
  //       {
  //         x: 1170,
  //         y: 237
  //       }
  //     ]
  //   }
  // ]

  nodes: [
    {
      id: 'Event_7930646',
      type: 'bpmn:startEvent',
      x: 306,
      y: 271,
      properties: {
        width: 36,
        height: 36
      },
      text: {
        x: 306,
        y: 311,
        value: '开始'
      }
    },
    {
      id: 'Gateway_33d0ea6',
      type: 'bpmn:exclusiveGateway',
      x: 453,
      y: 271,
      properties: {
        panels: ['variable'],
        variable: 'userInfo',
        width: 50,
        height: 50
      },
      text: {
        x: 453,
        y: 311,
        value: '登录'
      }
    },
    {
      id: 'Activity_8dc5ea6',
      type: 'bpmn:userTask',
      x: 632,
      y: 271,
      properties: {
        panels: ['multiInstance'],
        flag: '任务',
        width: 100,
        height: 80
      },
      text: {
        x: 632,
        y: 271,
        value: '任务'
      }
    },
    {
      id: 'Event_10e6c3b',
      type: 'bpmn:endEvent',
      x: 1187,
      y: 480,
      properties: {
        width: 36,
        height: 36
      },
      text: {
        x: 1187,
        y: 520,
        value: '结束'
      }
    },
    {
      id: 'Activity_18670bf',
      type: 'bpmn:userTask',
      x: 1011,
      y: 203,
      properties: {
        panels: ['multiInstance'],
        flag: '任务',
        width: 100,
        height: 80
      },
      text: {
        x: 1011,
        y: 203,
        value: '跳转API页面'
      }
    },
    {
      id: 'Activity_4a3007b',
      type: 'bpmn:userTask',
      x: 1013,
      y: 331,
      properties: {
        panels: ['multiInstance'],
        flag: '任务',
        width: 100,
        height: 80
      },
      text: {
        x: 1013,
        y: 331,
        value: '跳转应用页面'
      }
    },
    {
      id: 'Gateway_7f51bd3',
      type: 'bpmn:parallelGateway',
      x: 814,
      y: 271,
      properties: {
        panels: ['variable'],
        variable: 'query',
        width: 50,
        height: 50
      },
      text: {
        x: 814,
        y: 311,
        value: '页面跳转'
      }
    }
  ],
  edges: [
    {
      id: '3c10ded8-9d75-481b-b337-40dd3a0adc99',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: 'Event_7930646',
      targetNodeId: 'Gateway_33d0ea6',
      sourceAnchorId: 'Event_7930646_1',
      targetAnchorId: 'Gateway_33d0ea6_3',
      startPoint: {
        x: 324,
        y: 271
      },
      endPoint: {
        x: 428,
        y: 271
      },
      pointsList: [
        {
          x: 324,
          y: 271
        },
        {
          x: 428,
          y: 271
        }
      ]
    },
    {
      id: '4b20fbe2-97ef-4898-9777-b1537896f8ab',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false,
        conditionExpression:
          'userInfo.username === "webadmin" && userInfo.password === "Qzkj@1001"'
      },
      sourceNodeId: 'Gateway_33d0ea6',
      targetNodeId: 'Activity_8dc5ea6',
      sourceAnchorId: 'Gateway_33d0ea6_1',
      targetAnchorId: 'Activity_8dc5ea6_3',
      startPoint: {
        x: 478,
        y: 271
      },
      endPoint: {
        x: 582,
        y: 271
      },
      text: {
        x: 530,
        y: 271,
        value: '登录成功'
      },
      pointsList: [
        {
          x: 478,
          y: 271
        },
        {
          x: 582,
          y: 271
        }
      ]
    },
    {
      id: '5569333d-6395-4184-b22d-ef30e8c60e81',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false,
        conditionExpression:
          'userInfo.username != "webadmin" || userInfo.password != "Qzkj@1001"'
      },
      sourceNodeId: 'Gateway_33d0ea6',
      targetNodeId: 'Event_10e6c3b',
      sourceAnchorId: 'Gateway_33d0ea6_2',
      targetAnchorId: 'Event_10e6c3b_0',
      startPoint: {
        x: 453,
        y: 296
      },
      endPoint: {
        x: 1187,
        y: 462
      },
      text: {
        x: 820,
        y: 432,
        value: '登录失败'
      },
      pointsList: [
        {
          x: 453,
          y: 296
        },
        {
          x: 453,
          y: 432
        },
        {
          x: 1187,
          y: 432
        },
        {
          x: 1187,
          y: 462
        }
      ]
    },
    {
      id: '8d5e79da-9b9a-4cd6-996a-de14bd42d72f',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: 'Activity_4a3007b',
      targetNodeId: 'Event_10e6c3b',
      sourceAnchorId: 'Activity_4a3007b_1',
      targetAnchorId: 'Event_10e6c3b_0',
      startPoint: {
        x: 1063,
        y: 331
      },
      endPoint: {
        x: 1187,
        y: 462
      },
      pointsList: [
        {
          x: 1063,
          y: 331
        },
        {
          x: 1187,
          y: 331
        },
        {
          x: 1187,
          y: 462
        }
      ]
    },
    {
      id: '69986f37-c98b-4a89-8016-93010384a567',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: 'Activity_18670bf',
      targetNodeId: 'Event_10e6c3b',
      sourceAnchorId: 'Activity_18670bf_1',
      targetAnchorId: 'Event_10e6c3b_0',
      startPoint: {
        x: 1061,
        y: 203
      },
      endPoint: {
        x: 1187,
        y: 462
      },
      pointsList: [
        {
          x: 1061,
          y: 203
        },
        {
          x: 1187,
          y: 203
        },
        {
          x: 1187,
          y: 462
        }
      ]
    },
    {
      id: 'd933f3aa-cf9b-4418-92ed-93e596998aef',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false
      },
      sourceNodeId: 'Activity_8dc5ea6',
      targetNodeId: 'Gateway_7f51bd3',
      sourceAnchorId: 'Activity_8dc5ea6_1',
      targetAnchorId: 'Gateway_7f51bd3_3',
      startPoint: {
        x: 682,
        y: 271
      },
      endPoint: {
        x: 789,
        y: 271
      },
      pointsList: [
        {
          x: 682,
          y: 271
        },
        {
          x: 789,
          y: 271
        }
      ]
    },
    {
      id: '3b8605a0-98f1-476c-9089-6f3366d2930a',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false,
        conditionExpression: 'query.type === "api"'
      },
      sourceNodeId: 'Gateway_7f51bd3',
      targetNodeId: 'Activity_18670bf',
      sourceAnchorId: 'Gateway_7f51bd3_1',
      targetAnchorId: 'Activity_18670bf_3',
      startPoint: {
        x: 839,
        y: 271
      },
      endPoint: {
        x: 961,
        y: 203
      },
      text: {
        x: 917,
        y: 203,
        value: 'API'
      },
      pointsList: [
        {
          x: 839,
          y: 271
        },
        {
          x: 869,
          y: 271
        },
        {
          x: 869,
          y: 203
        },
        {
          x: 961,
          y: 203
        }
      ]
    },
    {
      id: '0b334767-c1ad-4ed4-a3b8-2f1345b3238d',
      type: 'bpmn:sequenceFlow',
      properties: {
        isDefaultFlow: false,
        conditionExpression: 'query.type === "app"'
      },
      sourceNodeId: 'Gateway_7f51bd3',
      targetNodeId: 'Activity_4a3007b',
      sourceAnchorId: 'Gateway_7f51bd3_1',
      targetAnchorId: 'Activity_4a3007b_3',
      startPoint: {
        x: 839,
        y: 271
      },
      endPoint: {
        x: 963,
        y: 331
      },
      text: {
        x: 915,
        y: 331,
        value: '应用'
      },
      pointsList: [
        {
          x: 839,
          y: 271
        },
        {
          x: 869,
          y: 271
        },
        {
          x: 869,
          y: 331
        },
        {
          x: 963,
          y: 331
        }
      ]
    }
  ]
};

onMounted(() => {
  const lf = new LogicFlow({
    container: bpmnRef.value,
    grid: true,
    hideAnchors: false, // 设置为 true 隐藏连接点
    stopZoomGraph: true, // 设置为 true 禁止缩放画布
    stopScrollGraph: true, // 设置为 true 禁止滚动画布
    snapline: true // 对齐线
  });

  lf.register(CurvedEdge);
  mountPanel(lf);
  // lf.render(data)
  lf.renderRawData(data);

  logicFlowInstance.value = lf;
  console.log('logicFlowInstance', logicFlowInstance.value);
});
</script>

<style lang="less" scoped>
.bpmn {
  width: 100%;
  height: 100%;
}
</style>
