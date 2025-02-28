<template>
  <div class="sql-element">
    <div class="sql-element__title">
      {{ props.properties!.databaseType || '--' }}
    </div>
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

console.log(props, 'props-bpmn-element');

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
