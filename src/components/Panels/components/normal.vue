<template>
  <strong class="form-label">NORMAL</strong>
  <div>
    <el-tag type="primary" class="mb10">Id</el-tag>
    <el-input v-model="target.id" disabled placeholder="请输入Id" />

    <el-tag type="primary" class="mb10 mt10">Name</el-tag>
    <el-input
      v-model="target.text.value"
      placeholder="请输入Name"
      clearable
      @input="onNameInput"
    />
  </div>
</template>
<script setup lang="ts">
import { inject } from 'vue';

const lf: any = inject('lf');

const target: any = inject('target');
const targetType: string = inject('selectedType') as string;
console.log(target.value, 'target');
console.log(targetType, 'targetType');

function onNameInput(val: any) {
  console.log(val, 'e');
  // console.log(e.currentTarget.value, 'e.currentTarget.value')
  // target.value.updateText(e.currentTarget.value);
  target.value.updateText(val);
}
</script>
