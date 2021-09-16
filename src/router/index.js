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
  },
  {
    path: '/dashboards/products',
    name: 'Products',
    component: () => import('@/views/Dashboards/Products/index'),
  },
  {
    // path: '/dashboards/updateproduct',
    // component: () => import('@/views/Dashboards/Products/Update/UpdateProduct.vue')
    path: `/dashboards/updateproduct`,
    component: () => import('@/views/Dashboards/Products/Update/UpdateProduct')
  },
  {
    path: `/dashboards/updateproduct/:id`,
    component: () => import('@/views/Dashboards/Products/Update/UpdateProduct')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router