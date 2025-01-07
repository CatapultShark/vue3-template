import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import * as PAGE_URL from '@/constant/page-url-constants';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: PAGE_URL.PAGE_URL_LOGIN
  },
  {
    path: PAGE_URL.PAGE_URL_LOGIN,
    name: PAGE_URL.PAGE_URL_LOGIN,
    meta: {
      title: '登录'
    },
    component: () => import('@/components/HelloWorld.vue')
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  next();
});

router.afterEach((to) => {
  // 修改当前标签页的名称
  const title = to.meta.title;
  const titleNode = document.querySelector('head > title');
  if (title && titleNode) {
    titleNode.textContent = title.toString();
  }
});

export default router;
