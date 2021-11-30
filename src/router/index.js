import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { name: 'Dashboard' },
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
  },
  {
    path: '/admin',
    component: () => import('@/views/admin/Index.vue'),
    beforeEnter: (to, from, next) => {
      if (store.state.auth.profile.role !== '' && store.state.auth.profile.role === 2) next({ name: 'Dashboard' })
      else if (store.state.auth.profile.role === '') next({ name: 'Login' })
      else next()
    },
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
      {
        path: 'change-password/:id',
        name: 'changePasswordAdmin',
        component: () => import('@/views/admin/ChangePassword.vue'),
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
          key: 'article',
        },
      },
      {
        path: 'add',
        name: 'addCategoryContentEdan',
        component: () => import('@/views/categoryContent/Add.vue'),
        meta: {
          key: 'article',
        },
      },
      {
        path: 'edit/:id',
        name: 'editCategoryContentEdan',
        component: () => import('@/views/categoryContent/Edit.vue'),
        meta: {
          key: 'article',
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
          key: 'article',
        },
      },
      {
        path: 'add',
        name: 'addContentEdan',
        component: () => import('@/views/content/Add.vue'),
        meta: {
          key: 'article',
        },
      },
      {
        path: 'edit/:id',
        name: 'editContentEdan',
        component: () => import('@/views/content/Edit.vue'),
        meta: {
          key: 'article',
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
  // education content
  {
    path: '/education-content',
    component: () => import('@/views/education/educationContent/Index.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'listEducationContent' },
      },
      {
        path: 'list',
        name: 'listEducationContent',
        component: () => import('@/views/education/educationContent/List.vue'),
        meta: {
          key: 'education',
        },
      },
      {
        path: 'add',
        name: 'addEducationContent',
        component: () => import('@/views/education/educationContent/Add.vue'),
        meta: {
          key: 'education',
        },
      },
      {
        path: 'edit/:id',
        name: 'editEducationContent',
        component: () => import('@/views/education/educationContent/Edit.vue'),
        meta: {
          key: 'education',
        },
      },
    ],
  },

  // end
  // education material
  {
    path: '/education-material',
    component: () => import('@/views/education/educationMaterial/Index.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'listEducationMaterial' },
      },
      {
        path: 'list',
        name: 'listEducationMaterial',
        component: () => import('@/views/education/educationMaterial/List.vue'),
        meta: {
          key: 'education',
        },
      },
      {
        path: 'add',
        name: 'addEducationMaterial',
        component: () => import('@/views/education/educationMaterial/Add.vue'),
        meta: {
          key: 'education',
        },
      },
      {
        path: 'edit/:id',
        name: 'editEducationMaterial',
        component: () => import('@/views/education/educationMaterial/Edit.vue'),
        meta: {
          key: 'education',
        },
      },
    ],
  },

  // end
  // banner ads
  {
    path: '/banner-ads',
    component: () => import('@/views/bannerAds/Index.vue'),
    children: [
      {
        path: '',
        redirect: { name: 'listBannerAds' },
      },
      {
        path: 'list',
        name: 'listBannerAds',
        component: () => import('@/views/bannerAds/List.vue'),
        meta: {
          key: 'banner-ads',
        },
      },
      {
        path: 'add',
        name: 'addBannerAds',
        component: () => import('@/views/bannerAds/Add.vue'),
        meta: {
          key: 'banner-ads',
        },
      },
      {
        path: 'edit/:id',
        name: 'editBannerAds',
        component: () => import('@/views/bannerAds/Edit.vue'),
        meta: {
          key: 'banner-ads',
        },
      },
    ],
  },

  // end
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',

      // typePage: 'pages',
    },
  },
  {
    path: '/form-contact/:id',
    name: 'FormContact',
    component: () => import('@/views/pages/FormContact.vue'),
    meta: {
      layout: 'blank',
      typePage: 'pages',
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
  // console.log(to.meta.typePage === 'pages')
  const { token } = store.state.auth

  if (to.meta.typePage !== 'pages') {
    if (to.name !== 'Login' && token === '') {
      next({ name: 'Login' })
    } else if (to.name === 'Login' && token !== '') {
      next({ name: 'Dashboard' })
    } else {
      next()
    }
  }

  next()
})

export default router
