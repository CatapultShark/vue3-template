<template>
  <div id="pattern" class="pattern">
    <template v-for="(item, index) in patternConfig" :key="index">
      <SvgIcon :iconClass="item.class" @mousedown.native="item.fn" />
      <div>{{ item.label }}</div>
    </template>
    <SvgIcon class="entry" iconClass="bpmn-entry" @mousedown.native="noDev" />
    <hr style="width: 50%" />
    <Tools />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { update } from 'lodash-es';
import SvgIcon from './SvgIcon.vue';
import Tools from './Tools.vue';

import { ElMessage } from 'element-plus';
const props = defineProps({
  lf: Object
});
const { lf } = props;

provide('lf', lf);

const noDev = () => {
  ElMessage.info('暂未开发');
};

function addNode(type: string, { text, properties }: any) {
  lf!.dnd.startDrag({
    type,
    text: text,
    properties
  });
}

const patternConfig = [
  {
    class: 'bpmn-icon-script-task',
    label: '脚本任务',
    fn: () => {
      addNode('bpmn:scriptTask', { text: '脚本任务' });
    }
  },
  {
    class: 'bpmn-icon-start-event-none',
    label: '开始',
    fn: () => {
      addNode('bpmn:startEvent', { text: '开始' });
    }
  },
  {
    class: 'bpmn-icon-start-event-timer',
    label: '时间开始',
    fn: () => {
      addNode('bpmn:startEvent', {
        text: '时间开始',
        properties: {
          definitionType: 'bpmn:timerEventDefinition', // 事件类型
          panels: ['timerDefinition'], // 关联面板
          timerValue: 2,
          timerType: 'timeDuration'
        }
      });
    }
  },
  {
    class: 'bpmn-icon-end-event-none',
    label: '结束',
    fn: () => {
      addNode('bpmn:endEvent', { text: '结束' });
    }
  },
  {
    class: 'bpmn-icon-gateway-parallel',
    label: '并行网关',
    fn: () => {
      addNode('bpmn:parallelGateway', {
        text: '并行网关',
        properties: {
          panels: ['variable'], // 关联面板
          variable: '' // 变量
        }
      });
    }
  },
  {
    class: 'bpmn-icon-gateway-xor',
    label: '排他网关',
    fn: () => {
      addNode('bpmn:exclusiveGateway', {
        text: '排他网关',
        properties: {
          panels: ['variable'], // 关联面板
          variable: '' // 变量
        }
      });
    }
  },
  {
    class: 'bpmn-icon-gateway-complex',
    label: '扩展网关',
    fn: () => {
      addNode('bpmn:complexGateway', {
        text: '扩展网关',
        properties: {
          panels: ['variable'], // 关联面板
          variable: '' // 变量
        }
      });
    }
  },
  {
    class: 'bpmn-icon-user-task',
    label: '任务',
    fn: () => {
      addNode('bpmn:userTask', {
        text: '任务',
        properties: {
          panels: ['multiInstance'], // 关联面板
          flag: '任务',
          databaseType: 'task',
          type: 'task'
        }
      });
    }
  }
];

lf &&
  lf!.on('selection:selected', () => {
    lf!.updateEditConfig({
      stopMoveGraph: false
    });
  });
</script>

<style lang="less">
#pattern {
  width: 60px;
  position: absolute;
  left: 10px;
  top: 80px;
  display: flex;
  flex-direction: column;
  z-index: 111;
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  padding: 10px 0;
  font-size: 12px;
  color: #676768;
  user-select: none;
  border-radius: 5px;
}
.pattern__item {
  padding: 5px 10px;
  border: 1px solid #ff8b47;
  border-radius: 5px;
  margin-bottom: 5px;
  cursor: pointer;
}
#pattern svg {
  margin-top: 10px;
}
.entry:hover {
  color: #6e9fda;
  cursor: pointer;
}
</style>
