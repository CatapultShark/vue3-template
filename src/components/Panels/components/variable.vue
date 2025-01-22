<template>
  <div>
    <!-- <p class="form-label">变量</p>
      <input
        autocomplete="off"
        style="margin: 6px 0px"
        :value="target.properties.variable"
        id="name-input"
        type="text"
        class="form-control"
        @input="onConditionInput"
      /> -->
    <el-tag type="primary" class="mb10 mt10">变量</el-tag>
    <el-input
      class="mb10"
      clearable
      v-model="target.properties.variable"
      placeholder="请输入变量"
      @input="onConditionInput"
    />
  </div>
</template>
<script setup lang="ts">
const target: any = inject('target');

function onConditionInput(val: any) {
  target.value.setProperties({
    variable: val
  });
}
</script>
