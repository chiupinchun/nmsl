import * as VueRouter from 'vue-router';

import Lesson from '@/views/lesson/index.vue';

const routes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/lesson'
  },
  {
    path: '/lesson',
    component: Lesson
  }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

export default router;