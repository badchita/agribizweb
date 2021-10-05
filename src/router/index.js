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
    name: 'AddProduct',
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
    path: `/dashboards/detailsproduct/:id`,
    name: 'DetailsProduct',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Products/Details/DetailsProduct')
  },
  {
    path: '/dashboards/addresses',
    name: 'Addresses',
    component: () => import('@/views/Dashboards/Addresses/index'),
  },
  {
    path: `/dashboards/updateaddresses`,
    name: 'AddAddresses',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Addresses/Update/UpdateAddresses')
  }, {
    path: `/dashboards/updateaddresses/:id`,
    name: 'UpdateAddresses',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Addresses/Update/UpdateAddresses')
  },
  {
    path: `/dashboards/detailsaddresses/:id`,
    name: 'DetailsAddresses',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Addresses/Details/DetailsAddress')
  },
  {
    path: '/dashboards/orders',
    name: 'Orders',
    component: () => import('@/views/Dashboards/Orders/index'),
  },
  {
    path: `/dashboards/updateorder`,
    name: 'AddOrder',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Orders/Update/UpdateOrder')
  },
  {
    path: `/dashboards/updateorder/:id`,
    name: 'UpdateOrder',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Orders/Update/UpdateOrder')
  },
  {
    path: `/dashboards/notifications`,
    name: 'Notifications',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Notifications/index')
  },
  {
    path: `/dashboards/updatenotification`,
    name: 'AddNotification',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Notifications/Update/UpdateNotification')
  },
  {
    path: `/dashboards/updatenotification/:id`,
    name: 'UpdateNotification',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Notifications/Update/UpdateNotification')
  },
  {
    path: `/dashboards/detailsnotification/:id`,
    name: 'DetailsNotification',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Notifications/Details/DetailsNotification')
  },
  {
    path: `/dashboards/chats`,
    name: 'Chats',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Dashboards/Chats/index'),
    children: [{
      path: '',
      redirect: '/dashboards/chats/1'
    }, {
      path: `/dashboards/chats/1`,
      name: 'Conversation',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/components/Chats/Conversation')
    }, ]
  },
  {
    path: `/profile`,
    name: 'Profile',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Pages/ProfilePage')
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