import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BaseLayout from '../components/layouts/base-layout.vue'
import HomePage from "../views/home-page.vue"
import RegistrationPage from "../views/auth-pages/registration-page.vue"
import LoginPage from "../views/auth-pages/login-page.vue"

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
      {
        name: 'register',
        path: '/register',
        component: RegistrationPage,
      },
      {
        name: 'login',
        path: '/login',
        component: LoginPage,
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
