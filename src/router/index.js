import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/front/Layout.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/index',
    component: index,
    children: [
      {
        path: 'index',
        name: 'Home',
        component: () => import('@/views/front/Index.vue'),
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('@/views/front/Products.vue'),
      },
      {
        path: 'singlepage/:id',
        name: 'SinglePage',
        component: () => import('@/views/front/SinglePage.vue'),
      },
      {
        path: 'animalsponsorship',
        name: 'AnimalSponsorship',
        component: () => import('@/views/front/AnimalSponsorship.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/front/About.vue'),
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/front/Cart.vue'),
      },
      {
        path: '/customerCheckout/:orderId',
        name: 'CustomerCheckout',
        component: () => import('@/views/front/CustomerCheckout.vue'),
      },
      {
        path: '/customerComplete/:orderId',
        name: 'CustomerComplete',
        component: () => import('@/views/front/CustomerComplete.vue'),
      },
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('@/views/admin/Login.vue'),
  },
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('@/views/admin/Dashboard.vue'),
    children: [
      {
        path: 'createProducts',
        name: 'CreateProducts',
        component: () => import('@/views/admin/CreateProducts.vue'),
      },
      {
        path: 'orderLists',
        name: 'OrderLists',
        component: () => import('@/views/admin/OrderLists.vue'),
      },
      {
        path: 'createCoupons',
        name: 'CreateCoupons',
        component: () => import('@/views/admin/CreateCoupons.vue'),
      },
      {
        path: 'storageList',
        name: 'StorageList',
        component: () => import('@/views/admin/StorageList.vue'),
      },
    ],
  },
  {
    path: '*',
    redirect: '/index',
  },
];

const router = new VueRouter({
  routes,
});

export default router;
