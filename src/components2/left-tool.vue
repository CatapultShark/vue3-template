<template>
  <div class="left-tools">
    <div
      v-for="(item, index) in patternConfig"
      :key="index"
      @mousedown.native="item.fn"
    >
      <div class="left-tools__item">{{ item.label }}</div>
    </div>
    <!-- <div
      v-for="(item, index) in baseNodes"
      :key="index"
      @mousedown="startDrag(item)"
    >
      <div class="left-tools__item">{{ item.title }}</div>
    </div> -->
    <hr style="width: 70%" />
    <div class="pointer" @click="showFlowData">查看数据</div>
    <div @click="setFlowControllerVisible">流程执行</div>
  </div>
</template>

<script lang="ts" setup>
import LogicFlow from '@logicflow/core';

const props = defineProps({
  lf: {
    type: LogicFlow,
    required: true
  }
});

const flowControllerVisible: any = inject('flowControllerVisible');
const { lf } = props;
const setFlowControllerVisible = () => {
  console.log(lf.getGraphRawData());
  flowControllerVisible.value = !flowControllerVisible.value;
};

const startDrag = (item: any) => {
  console.log(item, 'startDrag');
  const { lf } = props;
  lf.dnd.startDrag({
    type: item.type,
    text: item.title || '未定义',
    properties: item.properties
  });
};

const baseNodes = ref([
  {
    type: 'rect',
    title: '注释',
    properties: {
      databaseType: '注释'
    }
  },
  {
    type: 'custom-sql-element',
    title: 'SQL',
    properties: {
      databaseType: 'SQL'
    }
  }
]);

function addNode(type: string, { text, properties }: any) {
  const { lf } = props;
  lf!.dnd.startDrag({
    type,
    text: text,
    properties
  });
}

const patternConfig = [
  {
    class: 'bpmn-icon-start-event-none',
    label: '开始',
    fn: () => {
      addNode('bpmn:startEvent', {
        text: '开始',
        properties: {
          databaseType: '开始'
        }
      });
    }
  },
  {
    class: 'bpmn-icon-end-event-none',
    label: '结束',
    fn: () => {
      addNode('bpmn:endEvent', {
        text: '结束',
        properties: {
          databaseType: '结束'
        }
      });
    }
  },
  {
    label: 'HandleHttpRequest',
    fn: () => {
      addNode('lxbpmn:HandleHttpRequest', {
        text: 'HandleHttpRequest',
        properties: {
          panels: ['variable'], // 关联面板
          databaseType: 'HandleHttpRequest',
          variable: '' // 变量
        }
      });
    }
  },
  {
    label: 'ConvertAvroToJSON',
    fn: () => {
      addNode('lxbpmn:ConvertAvroToJSON', {
        text: 'ConvertAvroToJSON',
        properties: {
          panels: ['variable'], // 关联面板
          databaseType: 'ConvertAvroToJSON',
          variable: '' // 变量
        }
      });
    }
  },
  {
    label: 'JoltTransformJSON',
    fn: () => {
      addNode('lxbpmn:JoltTransformJSON', {
        text: '扩展网关',
        properties: {
          databaseType: 'JoltTransformJSON',
          variable: '' // 变量
        }
      });
    }
  },
  {
    label: 'ExecuteSQL',
    fn: () => {
      addNode('lxbpmn:ExecuteSQL', {
        text: 'ExecuteSQL',
        properties: {
          flag: '任务',
          databaseType: 'ExecuteSQL',
          type: 'SQL'
        }
      });
    }
  },
  {
    label: 'HandleHttpResponse',
    fn: () => {
      addNode('lxbpmn:HandleHttpResponse', {
        text: 'HandleHttpResponse',
        properties: {
          flag: '任务',
          databaseType: 'HandleHttpResponse',
          type: 'SQL'
        }
      });
    }
  }
];

const showFlowData = () => {
  console.log(props.lf.getGraphData(), 'lf.getGraphData()');
  console.log(props.lf.getGraphRawData(), 'lf.getGraphRawData()');
};
</script>

<style lang="less" scoped>
.left-tools {
  width: 200px;
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

  &__item {
    padding: 5px 10px;
    border: 1px solid #ff8b47;
    border-radius: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
</style>
