import Vue from 'vue'
import VueRouter from 'vue-router'

// import store from '../store'

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
    path: '/admin-edan',
    component: () => import('@/views/admin/Index.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'listAdminEdan' },
      },
      {
        path: 'list',
        name: 'listAdminEdan',
        component: () => import('@/views/admin/List.vue'),
        meta: {
          key: 'admin-edan',
        },
      },
      {
        path: 'add',
        name: 'addAdminEdan',
        component: () => import('@/views/admin/Add.vue'),
        meta: {
          key: 'admin-edan',
        },
      },
      {
        path: 'edit/:id',
        name: 'editAdminEdan',
        component: () => import('@/views/admin/Edit.vue'),
        meta: {
          key: 'admin-edan',
        },
      },
    ],
  },
  {
    path: '/user-edan',
    component: () => import('@/views/user/Index.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'listUserEdan' },
      },
      {
        path: 'list',
        name: 'listUserEdan',
        component: () => import('@/views/user/List.vue'),
        meta: {
          key: 'user-edan',
        },
      },
      {
        path: 'add',
        name: 'addUserEdan',
        component: () => import('@/views/user/Add.vue'),
        meta: {
          key: 'user-edan',
        },
      },
      {
        path: 'edit/:id',
        name: 'editUserEdan',
        component: () => import('@/views/user/Edit.vue'),
        meta: {
          key: 'user-edan',
        },
      },
      {
        path: 'change-password/:id',
        name: 'changePassUserEdan',
        component: () => import('@/views/user/ChangePassword.vue'),
        meta: {
          key: 'user-edan',
        },
      },
      {
        path: 'detail/:id',
        name: 'detailUserEdan',
        component: () => import('@/views/user/Show.vue'),
        meta: {
          key: 'user-edan',
        },
      },
    ],
  },
  {
    path: '/category-content',
    component: () => import('@/views/categoryContent/Index.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'listCategoryContentEdan' },
      },
      {
        path: 'list',
        name: 'listCategoryContentEdan',
        component: () => import('@/views/categoryContent/List.vue'),
        meta: {
          key: 'category-content-edan',
        },
      },
      {
        path: 'add',
        name: 'addCategoryContentEdan',
        component: () => import('@/views/categoryContent/Add.vue'),
        meta: {
          key: 'category-content-edan',
        },
      },
      {
        path: 'edit/:id',
        name: 'editCategoryContentEdan',
        component: () => import('@/views/categoryContent/Edit.vue'),
        meta: {
          key: 'category-content-edan',
        },
      },
    ],
  },
  {
    path: '/content',
    component: () => import('@/views/content/Index.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'listContentEdan' },
      },
      {
        path: 'list',
        name: 'listContentEdan',
        component: () => import('@/views/content/List.vue'),
        meta: {
          key: 'content',
        },
      },
      {
        path: 'add',
        name: 'addContentEdan',
        component: () => import('@/views/content/Add.vue'),
        meta: {
          key: 'content',
        },
      },
      {
        path: 'edit/:id',
        name: 'editContentEdan',
        component: () => import('@/views/content/Edit.vue'),
        meta: {
          key: 'content',
        },
      },
    ],
  },
  {
    path: '/banner',
    component: () => import('@/views/banner/Index.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'listBanner' },
      },
      {
        path: 'list',
        name: 'listBanner',
        component: () => import('@/views/banner/List.vue'),
        meta: {
          key: 'banner',
        },
      },
      {
        path: 'add',
        name: 'addBanner',
        component: () => import('@/views/banner/Add.vue'),
        meta: {
          key: 'banner',
        },
      },
      {
        path: 'edit/:id',
        name: 'editBanner',
        component: () => import('@/views/banner/Edit.vue'),
        meta: {
          key: 'banner',
        },
      },
    ],
  },

  // education category
  {
    path: '/education-category',
    component: () => import('@/views/education/educationCategory/Index.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'listEducationCategory' },
      },
      {
        path: 'list',
        name: 'listEducationCategory',
        component: () => import('@/views/education/educationCategory/List.vue'),
        meta: {
          key: 'education',
        },
      },
      {
        path: 'add',
        name: 'addEducationCategory',
        component: () => import('@/views/education/educationCategory/Add.vue'),
        meta: {
          key: 'education',
        },
      },
      {
        path: 'edit/:id',
        name: 'editEducationCategory',
        component: () => import('@/views/education/educationCategory/Edit.vue'),
        meta: {
          key: 'education',
        },
      },
    ],
  },

  // end
  {
    path: '/login',
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
  // const { token } = store.state.auth

  // if (to.name !== 'pages-login' && token === '') {
  //   next({ name: 'pages-login' })
  // } else if (to.name === 'pages-login' && token !== '') {
  //   next({ name: 'dashboard' })
  // } else {
  //   next()
  // }
  next()
})

export default router
