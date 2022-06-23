import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BaseLayout from '../components/layouts/base-layout.vue'
import HomePage from "../views/home-page.vue"
import RegistrationPage from "../views/auth-pages/registration-page.vue"
import LoginPage from "../views/auth-pages/login-page.vue"
import LobbiPage from "../views/lobbi-page.vue"
import authService from '@/api/services/authService'

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
      },
      {
        name: 'lobbi',
        path: '/lobbi',
        component: LobbiPage,
      }
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const isHomePath = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register'

router.afterEach((to, from, next) => {
  console.log('before each', to)
  authService.getCurrentUser();
  if (!authService.currentUser) {
    if (isHomePath) location.href = '/'
    return;
  }
})

export default router
