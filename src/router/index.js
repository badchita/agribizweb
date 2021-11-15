import {
  createRouter,
  createWebHistory
} from '@ionic/vue-router';

const routes = [{
    path: '/',
    redirect: '/vendor/'
  },
  {
    path: '/vendor/',
    name: 'Login',
    meta: {
      hideNavbar: true,
    },
    component: () => import('@/views/Pages/LoginPage'),
    children: [{
        path: '',
        redirect: '/vendor/login'
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/Pages/LoginPage'),
      },
      {
        path: 'sign-up',
        name: 'SignUp',
        component: () => import('@/views/Pages/LoginPage'),
      }
    ]
  },
  {
    path: '/vendor/home',
    name: 'Home',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Pages/HomePage'),
  },
  {
    path: '/vendor/dashboards/products',
    name: 'Products',
    component: () => import('@/views/Vendor/Dashboards/Products/index'),
  },
  {
    path: `/vendor/dashboards/updateproduct`,
    name: 'AddProduct',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Products/Update/UpdateProduct')
  },
  {
    path: `/vendor/dashboards/updateproduct/:id`,
    name: 'UpdateProduct',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Products/Update/UpdateProduct')
  },
  {
    path: `/vendor/dashboards/detailsproduct/:id`,
    name: 'DetailsProduct',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Products/Details/DetailsProduct')
  },
  {
    path: '/vendor/dashboards/addresses',
    name: 'Addresses',
    component: () => import('@/views/Vendor/Dashboards/Addresses/index'),
  },
  {
    path: `/vendor/dashboards/updateaddresses`,
    name: 'AddAddresses',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Addresses/Update/UpdateAddresses')
  }, {
    path: `/vendor/dashboards/updateaddresses/:id`,
    name: 'UpdateAddresses',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Addresses/Update/UpdateAddresses')
  },
  {
    path: `/vendor/dashboards/detailsaddresses/:id`,
    name: 'DetailsAddresses',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Addresses/Details/DetailsAddress')
  },
  {
    path: '/vendor/dashboards/orders',
    name: 'Orders',
    component: () => import('@/views/Vendor/Dashboards/Orders/index'),
  },
  {
    path: `/vendor/dashboards/updateorder`,
    name: 'AddOrder',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Orders/Update/UpdateOrder')
  },
  {
    path: `/vendor/dashboards/updateorder/:id`,
    name: 'UpdateOrder',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Orders/Update/UpdateOrder')
  },
  {
    path: `/vendor/dashboards/detailsorders/:id`,
    name: 'DetailsOrders',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Orders/Details/DetailsOrders')
  },
  {
    path: `/vendor/dashboards/notifications`,
    name: 'Notifications',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Notifications/index')
  },
  {
    path: `/vendor/dashboards/updatenotification`,
    name: 'AddNotification',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Notifications/Update/UpdateNotification')
  },
  {
    path: `/vendor/dashboards/updatenotification/:id`,
    name: 'UpdateNotification',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Notifications/Update/UpdateNotification')
  },
  {
    path: `/vendor/dashboards/detailsnotification/:id`,
    name: 'DetailsNotification',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Notifications/Details/DetailsNotification')
  },
  {
    path: `/vendor/dashboards/chats`,
    name: 'Chats',
    meta: {
      requiresAuth: true
    },
    component: () => import('@/views/Vendor/Dashboards/Chats/index'),
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