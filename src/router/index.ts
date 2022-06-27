import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import BaseLayout from '../components/layouts/base-layout.vue'
import StartPage from "../views/start-page.vue"
import RegistrationPage from "../views/auth-pages/registration-page.vue"
import LoginPage from "../views/auth-pages/login-page.vue"
import HomePage from "../views/tabs-pages/home-page.vue"
import LeaderboardPage from "../views/tabs-pages/leaderboard-page.vue"
import AboutPage from "../views/tabs-pages/about-page.vue"
import GamePage from "../views/game-pages/game-page.vue"
import authService from '@/api/services/authService'

const routes: Array<RouteRecordRaw> = [
  {
    name: 'layout',
    path: '/',
    component: BaseLayout,
    children: [
      {
        name: 'start',
        path: '/',
        component: StartPage,
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
        name: 'home',
        path: '/home',
        component: HomePage,
      },
      {
        name: 'leaderboard',
        path: '/leaderboard',
        component: LeaderboardPage,
      },
      {
        name: 'about',
        path: '/about',
        component: AboutPage,
      },
      {
        name: 'game',
        // path: '/game/room?:id',
        path: '/game',
        component: GamePage,
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const isHomePath = location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/register'

router.afterEach((to, from, next) => {
  // console.log('before each', to)
  authService.getCurrentUser();
  if (!authService.currentUser) {
    if (isHomePath) location.href = '/'
    return;
  }
  else{
    if(location.pathname === '/') location.href = '/home'
  }
})

export default router
