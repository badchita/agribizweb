import {
  createRouter,
  createWebHistory
} from '@ionic/vue-router';

const routes = [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Pages/Home'),
    // children: [{
    //   path: '/dashboards/products',
    //   name: 'Products',
    //   component: () => import('@/views/Dashboards/Products')
    // }]
  },
  {
    path: '/dashboards/products',
    name: 'Products',
    component: () => import('@/views/Dashboards/Products/index'),
    // children: [{
    //   path: 'updateproduct',
    //   component: () => import('@/views/Dashboards/Products/Update/UpdateProduct.vue')
    // }]
  },
  {
    path: '/dashboards/updateproduct',
    component: () => import('@/views/Dashboards/Products/Update/UpdateProduct.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router