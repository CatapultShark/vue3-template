<template>
  <div>
    <el-dialog v-model="dialogVisible" title="选择任务类型">
      <el-form>
        <el-form-item>
          <el-select v-model="taskValue" placeholder="请选择任务类型">
            <el-option
              v-for="item in taskOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="sure"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emits = defineEmits(['update:taskValue']);

const dialogVisible: any = inject('taskVisible');

let taskValue = ref('');

const taskOptions = [
  {
    value: 'HandleHttpRequest',
    label: 'HandleHttpRequest'
  },
  {
    value: 'ExecuteSQL',
    label: 'ExecuteSQL'
  },
  {
    value: 'ConvertAvroToJSON',
    label: 'ConvertAvroToJSON'
  },
  {
    value: 'JoltTransformJSON',
    label: 'JoltTransformJSON'
  },
  {
    value: 'HandleHttpResponse',
    label: 'HandleHttpResponse'
  }
];

const sure = () => {
  dialogVisible.value = false;
  console.log('taskValue', taskValue.value);
  emits('update:taskValue', taskValue.value);
};
</script>

<style lang="less" scoped></style>
