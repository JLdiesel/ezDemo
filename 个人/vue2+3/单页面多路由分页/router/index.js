import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../view/login/login.vue'),
    },
    {
      path: '/home',
      name: 'home',
      components: {
        default: () => import('../view/home/home.vue'),
        left: () => import('../view/home/left.vue'),
        right: () => import('../view/home/right.vue'),
      },
    },
  ],
})

export default router
