<template>
  <div id="tools">
    <div @click="setFlowControllerVisible">流程执行</div>
    <hr style="width: 70%" />
    <div @click="showFlowData">查看数据</div>

    <el-dialog v-model="dialogVisible" title="logicflow数据" width="800">
      <div class="dialog-content">
        <pre>{{ lf.getGraphRawData() }}</pre>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
const flowControllerVisible: any = inject('flowControllerVisible');
const lf: any = inject('lf');
const setFlowControllerVisible = () => {
  console.log(lf.getGraphRawData());
  flowControllerVisible.value = !flowControllerVisible.value;
};

const dialogVisible = ref(false);

const showFlowData = () => {
  dialogVisible.value = true;
  console.log(lf.getGraphData(), 'lf.getGraphData()');
  console.log(lf.getGraphRawData(), 'lf.getGraphRawData()');
};
</script>
<style lang="less" scoped>
#tools {
  div:hover {
    color: #236eff;
    cursor: pointer;
  }
}
.dialog-content {
  height: 500px;
  overflow: auto;
}
</style>
