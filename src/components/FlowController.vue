<template>
  <div class="flow-controller">
    <div v-for="(item, index) in config" :key="index">
      <SvgIcon
        :iconClass="item.class"
        @mousedown.native="item.onClick"
        style="width: 20px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import SvgIcon from './SvgIcon.vue';
const props = defineProps({
  engine: Object,
  lf: Object
});

const path: any = ref([]);

/**
 * 路径查找
 * 递归查找执行记录中的所有路径，并将这些路径添加到 path 列表中。然后为每条路径开启动画效果。
 * @param records
 */
function findExecutePath(records: any[]) {
  records.forEach((record: any) => {
    const { outgoing } = record;
    outgoing.forEach((item: any) => {
      const p = records.find((r: any) => r.nodeId === item.target);
      if (p) {
        path.value.push(item);
      }
    });
  });
  path.value.forEach((item: any) => {
    props.lf!.openEdgeAnimation(item.id);
  });
}

// 在组件卸载前关闭所有路径的动画效果。
onBeforeUnmount(() => {
  path.value.forEach((item: any) => {
    props.lf!.closeEdgeAnimation(item.id);
  });
});

const config = [
  {
    text: '执行',
    class: 'flow-control-play',
    onClick: async () => {
      if (path.value.length) {
        path.value.forEach((item: any) => {
          props.lf!.getEdgeModelById(item.id) &&
            props.lf!.closeEdgeAnimation(item.id);
        });
      }
      const data = props.lf!.getGraphRawData();
      const flowData = props.engine!.load({
        graphData: data,
        startNodeType: 'bpmn:startEvent'
      });
      console.log('flowData', flowData);
      console.log('props.engine', props.engine);
      const result = await props.engine!.execute();
      console.log('result', result);
      const records = await props.engine!.getExecutionRecord(
        result.executionId
      );
      console.log('records', records);
      findExecutePath(records);
    }
  },
  {
    text: '重置',
    class: 'flow-control-refresh',
    onClick: () => {
      path.value.forEach((item: any) => {
        props.lf!.getEdgeModelById(item.id) &&
          props.lf!.closeEdgeAnimation(item.id);
      });
      path.value = [];
    }
  }
];
</script>
<style lang="less" scoped>
.flow-controller {
  display: flex;
  background: #ebebeb;
  position: fixed;
  top: 60px;
  right: 50%;
  border-radius: 5px;
  box-shadow: 0px 1px 4px 0px #a6a6a6;
}
.svg-icon {
  margin: 0px 5px;
}
</style>
