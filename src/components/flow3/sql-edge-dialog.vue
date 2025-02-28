<template>
  <div class="edge-dialog">
    <el-dialog
      v-model="dialogVisible"
      title="连接线"
      :before-close="handleClose"
    >
    <el-tabs v-model="tabActiveName" class="demo-tabs">
        <el-tab-pane
          label="详细信息"
          name="详细信息"
        >
          <el-form :model="form" label-width="auto">
            <el-form-item label="来自处理器">
              <el-input v-model="form.form" disabled />
            </el-form-item>
            <el-form-item label="到处理器">
              <el-input v-model="form.to" disabled />
            </el-form-item>
            <el-form-item label="所属处理组">
              <el-input v-model="form.group" disabled />
            </el-form-item>
            <el-form-item label="关系名称">
              <el-checkbox v-model="form.relationshipName" label="success" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane
          label="设置"
          name="设置"
        >
          <el-form :model="settingForm" label-width="auto">
            <el-form-item label="名称">
              <el-input v-model="settingForm.name"  />
            </el-form-item>
            <el-form-item label="ID">
              <el-input v-model="settingForm.id" disabled />
            </el-form-item>
            <el-form-item label="FlowFile 过期时间">
              <el-input v-model="settingForm.flowFile"  />
            </el-form-item>
            <div class="flex">
              <el-form-item label="反压力对象阈值">
              <el-input v-model="settingForm.threshold1"  />
            </el-form-item>
              <el-form-item label="大小阈值">
              <el-input v-model="settingForm.threshold1"  />
            </el-form-item>
            </div>
            <el-form-item label="负载均衡策略">
              <el-select
                v-model="settingForm.strategy"
                placeholder="Select"
                style="width: 200px"
              >
                <el-option label="不要负载均衡" value="不要负载均衡" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="save"> 应用 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';

const lf:any = inject('lf');
const target: any = inject('target');
console.log('edge-dialog', target.value);

const tabActiveName = ref('详细信息');

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('确定关闭弹窗？')
    .then(() => {
      done();
    })
    .catch(() => {
      // catch error
    });
};

const form = reactive({
  form: 'GenerateFlowFile',
  to: 'ExecuteScript',
  group: 'Api数据同步',
  relationshipName: true,
});

const settingForm = reactive({
  name: '',
  id: 'e3a7fd67-0194-1000-8d63-1408884024e7',
  flowFile: '',
  threshold1: '10000',
  threshold2: '1 GB',
  strategy: '不要负载均衡'
})

const sourceNode = lf.getNodeModelById(target.value.sourceNodeId);
const targetNode = lf.getNodeModelById(target.value.targetNodeId)

console.log('sourceNode', sourceNode)
console.log('targetNode', targetNode)


const initData = () => {
  sourceNode.properties.databaseType && (form.form = sourceNode.properties.databaseType);
  targetNode.properties.databaseType && (form.to = targetNode.properties.databaseType);
};

initData();

const dialogVisible: any = inject('edgeVisible');

const save = () => {
  dialogVisible.value = false;
  target.value.updateText('连接线');
};
</script>

<style lang="less" scoped></style>
