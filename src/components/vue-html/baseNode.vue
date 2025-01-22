<template>
  <div
    class="base-node"
    :class="[
      props.isHovered ? 'is-hovered' : '',
      props.isSelected ? 'is-selected' : ''
    ]"
  >
    <div class="flex space-between">
      <div class="flex">
        <div class="base-node__icon mr10">
          <el-icon :size="20" :color="'#ff8b47'"><Clock /></el-icon>
        </div>
        <div class="base-node__center">
          <div>{{ props.properties!.title }}</div>
          <div>{{ props.properties!.desc }}</div>
        </div>
      </div>
      <div class="base-node__right">
        <el-dropdown placement="bottom">
          <el-icon
            :size="16"
            :color="'#000'"
            v-show="props.isSelected || props.isHovered"
            ><MoreFilled
          /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(command, index) in settingList"
                :key="index"
                :disabled="command.disabled"
                :divided="command.divided"
                :command="command.command"
                >{{ command.label }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
    <!-- v-show="props.isSelected || props.isHovered" -->
    <div
      class="base-node__footer"
      v-show="props.isSelected || props.isHovered"
      @mouseenter="handleDropdownMouseEnter"
      @mouseleave="handleDropdownMouseLeave"
    >
      <el-dropdown placement="bottom" @command="handleCommand">
        <el-icon :size="20" :color="'#ff8b47'"><CirclePlus /></el-icon>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(step, index) in stepTypes"
              :key="index"
              :command="step.label"
              >{{ step.label }}</el-dropdown-item
            >
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { MoreFilled, Clock, CirclePlus } from '@element-plus/icons-vue';

const props = defineProps({
  model: Object,
  graphModel: Object,
  properties: Object,
  isSelected: Boolean,
  isHovered: Boolean,
  disabled: Boolean
});

const settingList = [
  {
    command: 'rename',
    label: '重命名',
    disabled: false,
    divided: false
  },
  {
    command: 'paste',
    label: '粘贴',
    disabled: true,
    divided: false
  },
  {
    command: 'log',
    label: '不记录日志',
    disabled: false,
    divided: true
  }
];

let stepTypes = [
  {
    id: 'app',
    label: '应用'
  },
  {
    id: 'judge',
    label: '判断'
  },
  {
    id: 'branch',
    label: '分支'
  },
  {
    id: 'loop',
    label: '循环'
  },
  {
    id: 'end',
    label: '结束'
  }
];

let edgeModel: any = null;
onMounted(() => {
  edgeModel = props.graphModel!.edges.find(
    (edge: any) => edge.targetNodeId === props.model!.id
  );
});

const handleCommand = (command: string) => {
  props.graphModel!.eventCenter.emit('add-base-node', {
    command,
    edgeId: edgeModel.id
  });
};
const isDropdownHovered = ref(false);
const handleDropdownMouseEnter = () => {
  isDropdownHovered.value = false;
  isDropdownHovered.value = true; // 菜单区域悬停
  const model = props.model; // 获取当前节点模型
  model!.setProperty('isDropdownHovered', true); // 设置为true，保证鼠标移入时，下拉菜单显示
  console.log(
    'handleDropdownMouseEnter',
    model!.getProperties().isDropdownHovered
  );
};

const handleDropdownMouseLeave = () => {
  console.log('handleDropdownMouseLeave');
  isDropdownHovered.value = false; // 菜单区域取消悬停

  // const model = props.model; // 获取当前节点模型
  // model!.setProperty('isDropdownHovered', false); // 重置 LogicFlow 模型中的属性
  setTimeout(() => {
    // 延迟处理，避免快速进入菜单后立即消失
    if (!isDropdownHovered.value) {
      // props.model!.setProperty('isHovered', false);
      // const model = props.model; // 获取当前节点模型
      // model!.setProperty('isDropdownHovered', false); // 重置 LogicFlow 模型中的属性
    }
  }, 200);
};

onMounted(() => {});
</script>

<style lang="less" scoped>
.base-node {
  .set-size(100%);
  position: relative;
  overflow: visible;
  z-index: 1000; // 提升层级
  box-sizing: border-box;
  padding: 10px;
  border: 2px solid #ccc;
  background: #fff;
  border-radius: 5px;
  &.is-hovered {
    border: 2px solid #ffbb7f;
  }
  &.is-selected {
    border: 2px solid #ffbb7f;
    background: #fdf6f0;
  }
  &__icon {
    display: flex;
    align-items: center;
  }
  &__footer {
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translate(-50%, -40%);
  }
}
</style>
