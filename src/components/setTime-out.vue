<template>
  <div class="setTime-out">
    <el-steps
      v-show="props.stepShow"
      :space="200"
      :active="activeStep"
      align-center
      finish-status="success"
    >
      <el-step title="1.选择应用" @click="activeStep = 1" />
      <el-step title="2.选择操作" @click="activeStep = 2" />
      <el-step title="3.配置" @click="activeStep = 3" />
      <el-step title="4.输出" @click="activeStep = 4" />
    </el-steps>
    <div class="setTime-out__header flex">
      <div class="setTime-out__header__icon ml20 mr20">
        <el-icon :size="20" :color="'#ff8b47'"><Clock /></el-icon>
      </div>
      <div class="setTime-out__header__content">
        <!-- 1、定时触发器 <br />
        {{ defaultOperation || '请选择触发操作' }} -->
        {{ props.properties.title || '定时触发器' }}<br />{{
          props.properties.desc || '请选择触发操作'
        }}
      </div>
    </div>
    <div class="setTime-out__content">
      <template v-if="activeStep === 1">
        <div class="setTime-out__content--one">
          <div class="setTime-out__content--one__form flex">
            <el-select
              v-model="appValue"
              placeholder="选择应用"
              style="width: 160px"
            >
              <el-option
                v-for="item in appOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input
              class="ml20"
              v-model="searchAppName"
              placeholder="请输入应用名称回车搜索"
              :prefix-icon="Search"
            />
          </div>
          <el-tabs
            v-model="tabsActiveName"
            class="mt20"
            @tab-click="handleTabsClick"
          >
            <el-tab-pane label="全部" name="all">User</el-tab-pane>
            <el-tab-pane label="企业自建" name="second">Config</el-tab-pane>
            <el-tab-pane label="内置应用" name="third">Role</el-tab-pane>
          </el-tabs>
        </div>
      </template>
      <template v-if="activeStep === 2">
        <div
          v-for="(operation, index) in operationOption"
          :key="index"
          class="setTime-out__content--two flex"
          :class="defaultOperation == operation.title ? 'is-active' : ''"
          @click="handleClick(operation.title)"
        >
          <div class="setTime-out__content--two__icon ml10 mr10">
            <el-icon :size="16"><Clock /></el-icon>
          </div>
          <div>
            <div class="setTime-out__content--two__title">
              {{ operation.title }}
            </div>
            <div class="setTime-out__content--two__desc">
              {{ operation.desc }}
            </div>
          </div>
        </div>
      </template>
      <template v-if="activeStep === 3">
        <div class="setTime-out__content--three">
          <el-form :model="timeForm" label-width="auto" label-position="top">
            <el-form-item label="时间单位">
              <el-select v-model="timeForm.timeType" placeholder="选择时间单位">
                <el-option
                  v-for="item in timeTypeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="触发时间">
              <el-time-picker
                style="width: 100%"
                v-model="timeForm.time"
                placeholder="请选择时间"
              />
            </el-form-item>
          </el-form>
        </div>
      </template>
      <!-- <template v-if="props.properties.type == 'setApp'">
        <div class="setTime-out__content--one">
          <div class="setTime-out__content--one__form flex">
            <el-select
              v-model="appValue"
              placeholder="选择应用"
              style="width: 160px"
            >
              <el-option
                v-for="item in appOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input
              class="ml20"
              v-model="searchAppName"
              placeholder="请输入应用名称回车搜索"
              :prefix-icon="Search"
            />
          </div>
          <el-tabs
            v-model="tabsActiveName"
            class="mt20"
            @tab-click="handleTabsClick"
          >
            <el-tab-pane label="全部" name="all">User</el-tab-pane>
            <el-tab-pane label="企业自建" name="second">Config</el-tab-pane>
            <el-tab-pane label="内置应用" name="third">Role</el-tab-pane>
          </el-tabs>
        </div>
      </template> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'setTime-out'
});

const props = defineProps({
  stepShow: {
    type: Boolean,
    default: true
  },
  properties: {
    type: Object,
    default: () => {}
  }
});

import { Search } from '@element-plus/icons-vue';
import type { TabsPaneContext } from 'element-plus';

const appValue = ref('全部');
const searchAppName = ref('');
const appOptions = [
  {
    value: '全部',
    label: '全部'
  },
  {
    value: '营销工具',
    label: '营销工具'
  },
  {
    value: '协同办公',
    label: '协同办公'
  },
  {
    value: '财税管理',
    label: '财税管理'
  },
  {
    value: '电商平台',
    label: '电商平台'
  },
  {
    value: '销售/客服',
    label: '销售/客服'
  }
];

const tabsActiveName = ref('all');
const handleTabsClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

let activeStep = ref(1);
let defaultOperation = ref('');

const operationOption = [
  {
    title: '周期时间触发',
    desc: '按设定的周期时间开始执行，如每月X执行一次'
  },
  {
    title: '间隔时间触发',
    desc: '按设定的间隔时间开始执行，如间隔X小时执行一次'
  },
  {
    title: 'CRON自定义触发',
    desc: '用户可使用cron表达式自定义时间执行'
  }
];
const handleClick = (title: string) => {
  defaultOperation.value = title;
};

const timeForm = reactive({
  timeType: '',
  time: ''
});
const timeTypeOption = [
  {
    value: 'day',
    label: '每天'
  },
  {
    value: 'week',
    label: '每周'
  },
  {
    value: 'month',
    label: '每月'
  }
];

watch(
  () => props.properties.type,
  (newVal) => {
    if (newVal == 'setTime') {
      activeStep.value = 3;
    } else {
      activeStep.value = 1;
    }
  }
);
</script>

<style lang="less" scoped>
.setTime-out {
  width: 100%;
  :deep(.el-steps) {
    .el-step__icon {
      cursor: pointer;
    }
  }
  &__header {
    padding: 10px 0;
    border-top: 1px solid #ccc;
    box-shadow: 0 2px 4px #ddd;
    background: #fff;
    &__icon {
      display: flex;
      align-items: center;
    }
    &__content {
      font-size: 14px;
      color: #666;
    }
  }
  &__content {
    // background: #f5f6f7;
    padding: 20px;
    &--one {
    }
    &--two {
      border: 1px solid #ccc;
      cursor: pointer;
      padding: 10px;
      margin-bottom: 10px;
      &__title {
        font-size: 14px;
        color: #2f2e3f;
        font-weight: 600;
      }
      &__desc {
        margin-top: 10px;
        font-size: 14px;
        color: #666;
      }
      &.is-active {
        background: #fdf6f0;
        border-color: #ffbb7f;
      }
    }
  }
}
</style>
