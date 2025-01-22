<!--
 * @FileOverview: 条件
 * @Description: 弹窗-条件
-->
<template>
  <div>
    <el-tag type="primary" class="mb10">条件</el-tag>
    <el-input
      v-model="target.properties.conditionExpression"
      placeholder="请输入条件"
      @input="onConditionInput"
      clearable
    />
  </div>
</template>
<script setup lang="ts">
const target: any = inject('target');

function onConditionInput(val: any) {
  target.value.setProperties({
    conditionExpression: val
    // conditionExpression: e.currentTarget.value,
  });
}
</script>
