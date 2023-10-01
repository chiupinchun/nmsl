import * as VueRouter from 'vue-router';

import Index from '@/views/Index.vue';
import Gacha from '@/views/Gacha.vue';
import Card from '@/views/Card.vue';
import Test from '@/views/Test.vue';

const routes: VueRouter.RouteRecordRaw[] = [
  {
    path: '/',
    component: Index
  },
  {
    path: '/gacha',
    component: Gacha
  },
  {
    path: '/card',
    component: Card
  },
  {
    path: '/test',
    component: Test
  }
];

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes
});

export default router;