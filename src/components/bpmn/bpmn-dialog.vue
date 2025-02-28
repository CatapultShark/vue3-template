<template>
  <div class="panel-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="form.name"
      :before-close="handleClose"
    >
      <el-tabs v-model="tabActiveName" class="demo-tabs">
        <el-tab-pane label="设置" name="setting">
          <el-form :model="form" label-width="auto">
            <el-form-item label="任务类型">
              <el-select v-model="form.taskType" placeholder="请选择任务类型">
                <el-option
                  v-for="item in taskOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称">
              <div class="flex">
                <el-input v-model="form.name" clearable style="width: 400px" />
                <el-checkbox v-model="form.checked" label="启用" class="ml20" />
              </div>
            </el-form-item>
            <el-form-item label="ID">
              <el-input v-model="form.id" disabled />
            </el-form-item>
            <el-form-item label="类型">
              <el-input v-model="form.type" disabled />
            </el-form-item>
            <el-form-item label="Bundle">
              <el-input v-model="form.bundle" disabled />
            </el-form-item>
            <div class="flex">
              <el-form-item label="惩罚持续时间" style="width: 45%">
                <el-input clearable v-model="form.time1" />
              </el-form-item>
              <el-form-item
                label="让步持续时间"
                style="width: 45%"
                class="ml20"
              >
                <el-input clearable v-model="form.time2" />
              </el-form-item>
            </div>
            <el-form-item label="通知级别">
              <el-select
                v-model="form.level"
                placeholder="Select"
                style="width: 200px"
              >
                <el-option label="INFO" value="INFO" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="调度" name="dispatch">
          <el-form :model="dispatchForm" label-width="auto">
            <el-form-item label="调度策略">
              <el-select
                v-model="dispatchForm.schedulingStrategy"
                placeholder="Select"
                style="width: 200px"
              >
                <el-option label="定时驱动" value="定时驱动" />
              </el-select>
            </el-form-item>
            <div class="flex">
              <el-form-item label="并发任务数" style="width: 45%">
                <el-input
                  clearable
                  v-model="dispatchForm.numberConcurrentTasks"
                />
              </el-form-item>
              <el-form-item label="运行计划" style="width: 45%" class="ml20">
                <el-input clearable v-model="dispatchForm.operationPlan" />
              </el-form-item>
            </div>
            <el-form-item label="执行节点">
              <el-select
                v-model="dispatchForm.executionNode"
                placeholder="Select"
                style="width: 200px"
              >
                <el-option label="全部节点" value="全部节点" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="属性" name="attribute">
          <div>
            <div class="flex space-between">
              <div style="font-weight: 600">Required field</div>
              <div>
                <el-icon :size="20" class="mr20 pointer"
                  ><CircleCheck
                /></el-icon>
                <el-icon
                  :size="20"
                  class="pointer"
                  @click="addPropertyVisible = true"
                  ><Plus
                /></el-icon>
              </div>
            </div>
            <div class="mt10">
              <el-row class="header" style="background: #6e8e9a">
                <el-col :span="12" class="pl10">Property</el-col>
                <el-col :span="12" class="pl10">Value</el-col>
              </el-row>
              <el-row
                class="body"
                v-for="(item, index) in attributeList"
                :key="index"
              >
                <el-col :span="12" class="pl10">{{ item.property }}</el-col>
                <el-col :span="10" class="pl10">
                  <el-input v-model="item.value" placeholder="No value set" />
                </el-col>
                <el-col :span="2"
                  ><el-icon
                    class="pl20 pointer"
                    :size="16"
                    v-if="!item.isDefault"
                    @click="deleteProperty(index)"
                    ><Delete /></el-icon
                ></el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="输出数据流" name="outputDataStream">
          <el-form :model="outputDataStreamForm" label-width="auto">
            <el-form-item label="failure">
              <el-checkbox-group v-model="outputDataStreamForm.failure">
                <el-checkbox label="terminate" value="terminate" />
                <el-checkbox label="retry" value="retry" />
              </el-checkbox-group>
            </el-form-item>
            <template v-if="outputDataStreamForm.failure.includes('retry')">
              <el-form-item label="重试次数">
                <el-input v-model="outputDataStreamForm.retryCount" />
              </el-form-item>
              <el-form-item label="重试回退策略">
                <el-radio-group
                  v-model="outputDataStreamForm.retryRollbackStrategy"
                >
                  <el-radio value="惩罚">惩罚</el-radio>
                  <el-radio value="让步">让步</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="最大回退时间">
                <el-input v-model="outputDataStreamForm.maximumRollbackTime" />
              </el-form-item>
            </template>
            <el-form-item label="success">
              <el-checkbox-group v-model="outputDataStreamForm.success">
                <el-checkbox label="terminate" value="terminate" />
                <el-checkbox label="retry" value="retry" />
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="说明" name="explain">
          <el-form :model="explainForm" label-width="auto">
            <el-form-item label="">
              <el-input
                type="textarea"
                :rows="15"
                clearable
                v-model="explainForm.explain"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="apply"> 应用 </el-button>
        </div>
      </template>
    </el-dialog>
    <el-dialog v-model="addPropertyVisible" title="Add Property" width="500px">
      <el-form :model="propertyForm" label-width="auto">
        <el-form-item label="Property name">
          <el-input clearable v-model="propertyForm.property" />
        </el-form-item>
        <el-form-item label="Sensitive Value">
          <el-radio-group v-model="propertyForm.sensi">
            <el-radio :value="true">Yes</el-radio>
            <el-radio :value="false">No</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addPropertyVisible = false">取消</el-button>
          <el-button type="primary" @click="save"> 保存 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus';
import { ElMessage } from 'element-plus';

const target: any = inject('target');
console.log('dialog', target.value);

const tabActiveName = ref('setting');

// const tabsList = [
//   {
//     label: '设置',
//     name: 'setting'
//   },
//   {
//     label: '调度',
//     name: 'dispatch'
//   },
//   {
//     label: '属性',
//     name: 'attribute'
//   },
//   {
//     label: '说明',
//     name: 'explain'
//   }
// ];

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

const dialogVisible: any = inject('visible');
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
  taskType: '',
  id: '',
  name: '',
  checked: true,
  type: 'ExecuteScript 1.23.2',
  bundle: 'org.apache.nifi - nifi-scripting-nar',
  time1: '30 sec',
  time2: '1sec',
  level: 'INFO'
});

// 赋值
const initData = () => {
  target.value.id && (form.id = target.value.id);
  target.value.text.value && (form.name = target.value.text.value);
  // target.value.properties.timerType &&
  //   (form.timerType = target.value.properties.timerType);
  // target.value.properties.timerValue &&
  //   (form.timerValue = target.value.properties.timerValue);
  // target.value.properties.variable &&
  //   (form.variable = target.value.properties.variable);
  // target.value.properties.conditionExpression &&
  //   (form.conditionExpression = target.value.properties.conditionExpression);
  // target.value.properties.panels &&
  //   (form.panels = target.value.properties.panels);
};

initData();

const dispatchForm = reactive({
  schedulingStrategy: '定时驱动',
  numberConcurrentTasks: '1',
  operationPlan: '0.5 sec',
  executionNode: '全部节点'
});

const attributeList = reactive([
  {
    property: 'Script Engine',
    value: 'Groovy',
    isDefault: true
  },
  {
    property: 'Script File',
    value: '',
    isDefault: true
  },
  {
    property: 'Script Body',
    value: 'import org.apache.nifi.components.state.Scope',
    isDefault: true
  },
  {
    property: 'Module Directory',
    value: '',
    isDefault: true
  },
  {
    property: 'test',
    value: '',
    isDefault: false
  }
]);

let addPropertyVisible = ref(false);

const getDefaultPropertyForm = () => {
  return {
    property: '',
    sensi: false
  };
};

let propertyForm = ref(getDefaultPropertyForm());

const outputDataStreamForm = reactive({
  failure: ['terminate'],
  retryCount: '10',
  retryRollbackStrategy: '惩罚',
  maximumRollbackTime: '10 mins',
  success: []
});

const explainForm = reactive({
  explain: ''
});
const apply = () => {
  dialogVisible.value = false;
};

const save = () => {
  attributeList.push({
    property: propertyForm.value.property,
    value: '',
    isDefault: false
  });
  propertyForm.value = getDefaultPropertyForm();
  addPropertyVisible.value = false;
};

const deleteProperty = (index: number) => {
  attributeList.splice(index, 1);
};
</script>

<style lang="less" scoped>
.el-row {
  height: 42px;
  line-height: 42px;
  color: #666666;
  font-size: 14px;
  font-weight: 400;
  &:first-child {
    font-family: 400;
  }
  &:last-child {
    border-right: none;
  }
  &:hover {
    background-color: #dbe3e6;
  }
  // &:active {
  //   background-color: #ffef8f !important;
  // }
}
.is-active {
  background-color: #ffef8f;
}
.header {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
}
.el-col {
  height: 42px;
  line-height: 42px;
  border-bottom: 1px solid #e4e7ed;
  border-right: 1px solid #e4e7ed;
  &:last-child {
    border-right: none;
  }
}
</style>
