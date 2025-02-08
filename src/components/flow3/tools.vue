<template>
  <div class="tools">
    <div
      v-for="(item, index) in baseNodes"
      :key="index"
      @mousedown="startDrag(item)"
    >
      <!-- <component :is="item.component"></component> -->
      <div class="tools-item">{{ item.title }}</div>
    </div>
    <hr style="width: 70%" />
    <div class="pointer" @click="showFlowData">查看数据</div>
  </div>
</template>

<script lang="ts" setup>
import LogicFlow from '@logicflow/core';
import SqlElement from './sql-element.vue';

const props = defineProps({
  lf: {
    type: LogicFlow,
    required: true
  }
});

const startDrag = (item: any) => {
  console.log(item, 'startDrag');
  const { lf } = props;
  lf.dnd.startDrag({
    type: item.type,
    text: item.title || '未定义'
  });
};

const baseNodes = ref([
  {
    type: 'sql-element',
    title: 'SQL',
    component: SqlElement
  }
]);

const showFlowData = () => {
  console.log(props.lf.getGraphData(), 'lf.getGraphData()');
  console.log(props.lf.getGraphRawData(), 'lf.getGraphRawData()');
};
</script>

<style lang="less" scoped>
.tools {
  width: 100px;
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

  .tools-item {
    padding: 5px 10px;
    border: 1px solid #ff8b47;
    border-radius: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }
}
</style>
