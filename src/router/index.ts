import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

import * as PAGE_URL from '@/constant/page-url-constants';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: PAGE_URL.PAGE_URL_LOGIC_FLOW_1
  },

  {
    path: '/layout',
    name: '/layout',
    component: () => import('@/pages/layout.vue'),
    children: [
      {
        path: PAGE_URL.PAGE_URL_LOGIC_FLOW_1,
        name: PAGE_URL.PAGE_URL_LOGIC_FLOW_1,
        meta: {
          title: 'logic-flow'
        },
        component: () => import('@/pages/logic-flow.vue')
      },
      {
        path: PAGE_URL.PAGE_URL_LOGIC_FLOW_2,
        name: PAGE_URL.PAGE_URL_LOGIC_FLOW_2,
        meta: {
          title: 'logic-flow'
        },
        component: () => import('@/pages/logic-flow-2.vue')
      },
      {
        path: PAGE_URL.PAGE_URL_LOGIC_FLOW_3,
        name: PAGE_URL.PAGE_URL_LOGIC_FLOW_3,
        meta: {
          title: 'logic-flow'
        },
        component: () => import('@/pages/logic-flow-3.vue')
      },
      {
        path: PAGE_URL.PAGE_URL_LOGIC_FLOW_4,
        name: PAGE_URL.PAGE_URL_LOGIC_FLOW_4,
        meta: {
          title: 'logic-flow'
        },
        component: () => import('@/pages/logic-flow-4.vue')
      }
    ]
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
