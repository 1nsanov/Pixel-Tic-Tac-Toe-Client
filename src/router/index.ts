import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BaseLayout from '../components/layouts/base-layout.vue'
import HomePage from "../views/home-page.vue"

const routes: Array<RouteRecordRaw> = [
  {
    name: 'layout',
    path: '/',
    component: BaseLayout,
    children: [
      {
        name: 'home',
        path: '/',
        component: HomePage,
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
