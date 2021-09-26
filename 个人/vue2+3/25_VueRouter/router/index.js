import { createRouter, createWebHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    redirect: '/home'

  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../Home.vue'),
    meta: {
      name: 'jl', age: '18'
    },
    children: [
      {
        path: '',
        redirect: '/home/message'
      },
      {
        path: 'message',
        component: () => import('../Message.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../About.vue')
  },
  {
    path: '/user/:username/:id',
    name: 'User',
    component: () => import('../User.vue')
  },
  {
    //多个*pathMatch会被解析成数组
    path: '/:pathMatch(.*)*',
    component: () => import('../NotFund.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
