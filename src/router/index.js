import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/sub-category',
    component: () => import('@/views/subCategory/Index.vue'),
    children: [
      {
        path: 'list',
        name: 'subCategory',
        component: () => import('@/views/subCategory/List.vue'),
        meta: {
          key: 'sub-category',
        },
      },
      {
        path: 'add',
        name: 'subCategoryAdd',
        component: () => import('@/views/subCategory/Add.vue'),
        meta: {
          key: 'sub-category',
        },
      },
      {
        path: 'list/edit/:id',
        props: true,
        name: 'subCategoryEdit',
        component: () => import('@/views/subCategory/Edit.vue'),
        meta: {
          key: 'sub-category',
        },
      },
    ],
  },
  {
    path: '/villa-gallery',
    component: () => import('@/views/villaGallery/Index.vue'),
    children: [
      {
        path: 'list',
        name: 'villaGallery',
        component: () => import('@/views/villaGallery/List.vue'),
        meta: {
          key: 'villa-gallery',
        },
      },
      {
        path: 'add',
        name: 'villaGalleryAdd',
        component: () => import('@/views/villaGallery/Add.vue'),
        meta: {
          key: 'villa-gallery',
        },
      },
      {
        path: 'list/edit/:id',
        props: true,
        name: 'villaGalleryEdit',
        component: () => import('@/views/villaGallery/Edit.vue'),
        meta: {
          key: 'villa-gallery',
        },
      },
    ],
  },
  {
    path: '/villa-fasilitas',
    component: () => import('@/views/villaFacility/Index.vue'),
    children: [
      {
        path: 'list',
        name: 'villaFacility',
        component: () => import('@/views/villaFacility/List.vue'),
        meta: {
          key: 'villa-facility',
        },
      },
      {
        path: 'add',
        name: 'villaFacilityAdd',
        component: () => import('@/views/villaFacility/Add.vue'),
        meta: {
          key: 'villa-facility',
        },
      },
      {
        path: 'list/edit/:id',
        props: true,
        name: 'villaFacilityEdit',
        component: () => import('@/views/villaFacility/Edit.vue'),
        meta: {
          key: 'villa-facility',
        },
      },
    ],
  },
  {
    path: '/villa',
    component: () => import('@/views/villa/Index.vue'),
    children: [
      {
        path: 'list',
        name: 'villa',
        component: () => import('@/views/villa/List.vue'),
        meta: {
          key: 'villa',
        },
      },
      {
        path: 'add',
        name: 'villaAdd',
        component: () => import('@/views/villa/Add.vue'),
        meta: {
          key: 'villa',
        },
      },
      {
        path: 'list/edit/:id',
        props: true,
        name: 'villaEdit',
        component: () => import('@/views/villa/Edit.vue'),
        meta: {
          key: 'villa',
        },
      },
    ],
  },
  {
    path: '/order',
    component: () => import('@/views/order/Index.vue'),
    children: [
      {
        path: 'list',
        name: 'order',
        component: () => import('@/views/order/List.vue'),
        meta: {
          key: 'order',
        },
      },
      {
        path: 'add',
        name: 'orderAdd',
        component: () => import('@/views/order/Add.vue'),
        meta: {
          key: 'order',
        },
      },
    ],
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
      checkLogin: true,
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }

    return { x: 0, y: 0 }
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  // const { checkLogin } = to.meta
  const { token } = store.state.auth

  if (to.name !== 'pages-login' && token === '') {
    next({ name: 'pages-login' })
  } else if (to.name === 'pages-login' && token !== '') {
    next({ name: 'dashboard' })
  } else {
    next()
  }
})

export default router
