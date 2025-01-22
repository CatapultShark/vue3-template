<template>
  <div class="panel-dialog">
    <el-dialog
      v-model="dialogVisible"
      :title="form.name"
      :before-close="handleClose"
    >
      <el-tabs v-model="tabActiveName" class="demo-tabs">
        <el-tab-pane
          v-for="(item, index) in tabsList"
          :key="index"
          :label="item.label"
          :name="item.name"
        >
          {{ form }}
          <el-form :model="form" label-width="auto">
            <el-form-item label="ID">
              <el-input v-model="form.id" disabled />
            </el-form-item>
            <el-form-item label="名称">
              <el-input
                v-model="form.name"
                clearable
                @input="handleChangeName"
              />
            </el-form-item>
            <el-form-item
              label="任务描述"
              v-if="form.panels.includes('multiInstance')"
            >
              <el-input v-model="form.desc" />
            </el-form-item>
            <el-form-item
              label="类型"
              v-if="form.panels.includes('timerDefinition')"
            >
              <div class="flex">
                <el-select
                  v-model="form.timerType"
                  placeholder="Select"
                  @change="timerTypeChange"
                  style="width: 200px"
                >
                  <el-option :label="'延迟触发'" :value="'timeDuration'" />
                </el-select>
                <el-input
                  v-model="form.timerValue"
                  placeholder="请输入Value"
                  @input="timerValueInput"
                  clearable
                  style="width: 200px"
                >
                  <template #append>s</template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item label="变量" v-if="form.panels.includes('variable')">
              <el-input
                v-model="form.variable"
                clearable
                @input="handleChangeVariable"
              />
            </el-form-item>
            <el-form-item label="条件" v-if="form.panels.length == 0">
              <el-input
                type="textarea"
                clearable
                v-model="form.conditionExpression"
                @input="handleChangeConditionExpression"
              />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
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

const tabsList = [
  {
    label: '设置',
    name: 'setting'
  },
  {
    label: '调度',
    name: 'DISPATCH'
  },
  {
    label: '属性',
    name: 'attribute'
  },
  {
    label: '说明',
    name: 'explain'
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
  id: '',
  name: '',
  desc: '',
  timerType: '',
  timerValue: '',
  variable: '',
  conditionExpression: '',
  panels: [] as string[]
});
const initData = () => {
  target.value.id && (form.id = target.value.id);
  target.value.text.value && (form.name = target.value.text.value);
  target.value.properties.timerType &&
    (form.timerType = target.value.properties.timerType);
  target.value.properties.timerValue &&
    (form.timerValue = target.value.properties.timerValue);
  target.value.properties.variable &&
    (form.variable = target.value.properties.variable);
  target.value.properties.conditionExpression &&
    (form.conditionExpression = target.value.properties.conditionExpression);
  target.value.properties.panels &&
    (form.panels = target.value.properties.panels);
};

initData();

const handleChangeName = (val: string) => {
  target.value.updateText(val);
};
const timerTypeChange = (val: string) => {
  target.value.setProperties({
    // timerType: e.target.value
    timerType: val
  });
  // timerType.value = e.target.value;
  form.timerType = val;
};

const timerValueInput = (val: string) => {
  const time = Number(val);
  if (isNaN(time)) {
    ElMessage.warning('请输入有效数字');
    return;
  }
  target.value.setProperties({
    timerValue: time
  });
};

const handleChangeVariable = (val: string) => {
  target.value.setProperties({
    variable: val
  });
};

const handleChangeConditionExpression = (val: string) => {
  target.value.setProperties({
    conditionExpression: val
  });
};

const save = () => {
  dialogVisible.value = false;
};
</script>

<style lang="less" scoped></style>
