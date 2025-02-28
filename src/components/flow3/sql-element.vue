<template>
  <div class="sql-element">
    <div class="sql-element__title">
      {{ props.properties!.databaseType || '--' }}
    </div>
    <el-row
      :gutter="20"
      class="sql-element__body"
      v-for="(item, index) in bodyList"
      :key="index"
    >
      <el-col :span="8">
        <div>{{ item.title }}</div>
      </el-col>
      <el-col :span="11">
        <div v-if="item.title === '输入'">
          <span>{{ item.input }}</span> ({{ item.input }} bytes)
        </div>
        <div v-if="item.title === '读/写'">
          <span>{{ item.read }} bytes</span> /
          <span>{{ item.write }} bytes</span>
        </div>
        <div v-if="item.title === '输出'">
          <span>{{ item.output }}</span> ({{ item.output }} bytes)
        </div>
        <div v-if="item.title === '任务/运行'">
          <span>{{ item.task }} / {{ item.operation }}</span>
        </div>
      </el-col>
      <el-col :span="5">
        <div>{{ item.time }} 分钟</div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  model: Object,
  graphModel: Object,
  properties: Object,
  isSelected: Boolean,
  isHovered: Boolean,
  disabled: Boolean
});

console.log(props, 'props-sql-element');

const bodyList = ref([
  {
    title: '输入',
    input: '0',
    time: '5'
  },
  {
    title: '读/写',
    read: '0',
    write: '0',
    time: '5'
  },
  {
    title: '输出',
    output: '0',
    time: '5'
  },
  {
    title: '任务/运行',
    task: '0',
    operation: '00:00:00',
    time: '5'
  }
]);

onMounted(() => {});
</script>

<style lang="less" scoped>
.sql-element {
  width: 100%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ff8b47;
  border-radius: 10px;
  box-sizing: border-box;
  background-color: #fff;
  &__title {
    color: #ff8b47;
  }
  &__body {
    margin-top: 10px;
    font-size: 12px;
    height: 15px;
    line-height: 15px;
  }
}
</style>
