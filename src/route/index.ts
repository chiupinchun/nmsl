import * as VueRouter from 'vue-router';

import Lesson from '@/views/lesson/index.vue';
import Announce from '@/views/announce/index.vue';

const routes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/lesson'
  },
  {
    path: '/lesson',
    component: Lesson
  },
  {
    path: '/announce',
    component: Announce
  }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

export default router;