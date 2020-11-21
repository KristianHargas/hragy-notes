import { createWebHistory, createRouter } from 'vue-router'
import Home from '../components/Home'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import Dashboard from '../components/dashboard/Dashboard'
import NoteList from '../components/dashboard/NoteList'
import NoteCreate from '../components/dashboard/NoteCreate'
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
    redirect: { name: 'NoteList' },
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: 'notes',
        component: NoteList,
        name: 'NoteList'
      },
      {
        path: 'notes/create',
        component: NoteCreate,
        name: 'NoteCreate'
      }
    ]
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
  if (!store.state.auth.autoLoginDone) await store.dispatch('auth/autoLogin')

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
