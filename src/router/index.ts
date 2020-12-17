import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'
import Market from '@/views/Market.vue'
import Admin from '@/views/Admin.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import store from '@/store/index'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/market',
    name: 'Market',
    component: Market
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUp
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  // console.log(store.getters['auth/getUser'])
  if (store.getters['auth/getUser']) {
    if (to.name === 'Login') {
      next('/')
    } else {
      if (to.name === 'Admin') {
        const user = store.getters['auth/getUser']
        user.signInUserSession.accessToken.payload['cognito:groups'].find(
          (grupo: string) => grupo === 'admin'
        )
          ? next()
          : next('/')
      } else {
        next()
      }
    }
  } else {
    if (to.name !== 'Login' && to.name !== 'Signup') {
      next('/login')
    } else {
      next()
    }
  }
})

export default router
