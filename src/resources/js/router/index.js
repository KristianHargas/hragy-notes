import { createWebHistory, createRouter } from 'vue-router'
import Home from '../components/Home'
import Login from '../components/Login'
import Register from '../components/Register'
import Dashboard from '../components/Dashboard'
import store from '../store/index'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      requiresAuth: false
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/:catchAll(.*)',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  // Always try to auto login after each page reload, because the previous state is lost.
  if (!store.state.auth.autoLoginDone) {
    try {
      await store.dispatch('auth/autoLogin')
    } catch (err) {
      // If autologin fails then isLoggedIn = false and user = {}.
    }
  }

  // Check if page requires authentication.
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.auth.isLoggedIn) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    // Route does not accept authenticated users.
    if (store.state.auth.isLoggedIn) {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  }
})

export default router
