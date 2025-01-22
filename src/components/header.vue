<template>
  <div class="header">
    <header class="header__wrapper">
      <div class="header__wrapper--left">
        <div class="flex">
          <img
            class="header__wrapper__logo"
            src="@/assets/img/qz-logo.png"
            alt="logo"
          />
          <div class="header__title ml20 fw-b">LogicFlow</div>
        </div>
        <div class="header__wrapper__menu ml20">
          <div
            v-for="(menu, i) in menuList"
            :key="i"
            class="header__wrapper__menu__item"
            @click="handleToPath(menu.path)"
          >
            <div
              class="header__wrapper__menu__title"
              :class="{ active: menu.path.startsWith(activeMenu) }"
            >
              {{ menu.title }}
            </div>
          </div>
        </div>
      </div>
      <div class="header__wrapper--right">
        <div class="header__wrapper__user">
          <el-dropdown>
            <div class="header__wrapper__user--name">
              {{ nickName || 'Kylin' }}
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-for="(dropdown, index) in dropDownList"
                  :key="index"
                  :icon="dropdown.icon"
                  @click="handleDropdownClick(dropdown.path)"
                >
                  {{ dropdown.title }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </header>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import * as PAGE_URL from '@/constant/page-url-constants';

const nickName = ref<string>('');

const activeMenu = ref<string>('');

const menuList = reactive([
  {
    title: 'logicFlow-1',
    path: PAGE_URL.PAGE_URL_LOGIC_FLOW_1
  },
  {
    title: 'logicFlow-BPMN',
    path: PAGE_URL.PAGE_URL_LOGIC_FLOW_2
  },
]);

const router = useRouter();
const route = useRoute();

// 菜单进行高亮
const highlightMenu = () => {
  const currentPathArr = route.path.split('/');
  activeMenu.value = '/' + (currentPathArr[1] || '');
};

watch(
  () => route.path,
  () => {
    highlightMenu();
  }
);

// 跳转页面
const handleToPath = (path: string) => {
  activeMenu.value = path;
  router.push(path);
};

onMounted(() => {
  highlightMenu();
});

const dropDownList = reactive([
  {
    path: '',
    icon: 'Avatar',
    title: '个人信息'
  },
  {
    path: PAGE_URL.PAGE_URL_LOGIN,
    icon: 'SwitchButton',
    title: '退出登录'
  }
]);
const handleDropdownClick = (path: string) => {

};
</script>

<style lang="less" scoped>
.header {
  color: #fff;
  &__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 46px;
    background: #242424;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    &--left,
    &--right {
      display: flex;
      align-items: center;
      height: 100%;
      font-size: 14px;
    }
    &__logo {
      height: 24px;
    }
    &__menu {
      display: flex;
      &__item {
        padding: 10px 5px;
        cursor: pointer;
      }
      &__title {
        padding: 0 15px;
        height: 30px;
        line-height: 30px;
        border-radius: 2px;
        letter-spacing: 1px;
        &.active {
          background: #3876d0;

          &:hover {
            background: #3876d0;
          }
        }

        &:hover {
          background: (rgba(255, 255, 255, 0.15));
        }
      }
    }
    &__user {
      display: flex;
      align-items: center;
      cursor: pointer;
      &--name {
        color: #fff;
      }
    }
  }
}
</style>
