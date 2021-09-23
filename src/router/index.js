import {
  createRouter,
  createWebHistory
} from '@ionic/vue-router';

const routes = [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      hideNavbar: true,
    },
    component: () => import('@/views/Pages/LoginPage'),
  },
  {
    path: '/home',
    name: 'Home',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Pages/HomePage'),
  },
  {
    path: '/dashboards/products',
    name: 'Products',
    component: () => import('@/views/Dashboards/Products/index'),
  },
  {
    path: `/dashboards/updateproduct`,
    name: 'IndexProduct',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Products/Update/UpdateProduct')
  },
  {
    path: `/dashboards/updateproduct/:id`,
    name: 'UpdateProduct',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Products/Update/UpdateProduct')
  },
  {
    path: '/dashboards/orders',
    name: 'Orders',
    component: () => import('@/views/Dashboards/Orders/index'),
  },
  {
    path: `/dashboards/detailsproduct/:id`,
    name: 'DetailsProduct',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Products/Details/DetailsProduct')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

import store from '../store/index.js'

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters['auth/isAuthenticated']) {
      next();
      return;
    }
    next('/login');
  } else {
    next();
  }
});

export default router