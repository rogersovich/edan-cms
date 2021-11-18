<template>
  <v-navigation-drawer
    :value="isDrawerOpen"
    app
    floating
    width="260"
    class="app-navigation-menu"
    :right="$vuetify.rtl"
    @input="val => $emit('update:is-drawer-open', val)"
  >
    <!-- Navigation Header -->
    <div class="vertical-nav-header d-flex items-center ps-6 pe-5 pt-5 pb-2">
      <router-link
        to="/"
        class="d-flex align-center text-decoration-none"
      >
        <v-img
          :src="require('@/assets/images/logos/logo.svg')"
          max-height="30px"
          max-width="30px"
          alt="logo"
          contain
          eager
          class="app-logo me-3"
        ></v-img>
        <v-slide-x-transition>
          <h2 class="app-title text--primary">
            Nama Aplikasi
          </h2>
        </v-slide-x-transition>
      </router-link>
    </div>

    <!-- Navigation Items -->
    <v-list
      expand
      shaped
      class="vertical-nav-menu-items pr-5"
    >
      <!-- dashboard  -->
      <nav-menu-link
        title="Dashboard"
        :to="{ name: 'dashboard' }"
        :icon="icons.mdiHomeOutline"
        :nested="false"
      ></nav-menu-link>
      <!-- end -->

      <!-- admin  -->
      <nav-menu-group
        title="Admin Edan"
        :icon="icons.mdiAccountCogOutline"
        :active="$route.meta.key === 'admin-edan' ? true : false"
      >
        <nav-menu-link
          title="List"
          :to="{ name: 'listAdminEdan' }"
          :icon="icons.mdiTable"
          :nested="true"
        ></nav-menu-link>
        <nav-menu-link
          title="Add"
          :to="{ name: 'addAdminEdan' }"
          :icon="icons.mdiPlus"
          :nested="true"
        ></nav-menu-link>
      </nav-menu-group>
      <!-- end -->

      <!-- user -->
      <nav-menu-group
        title="User Edan"
        :icon="icons.mdiAccountGroupOutline"
        :active="$route.meta.key === 'user-edan' ? true : false"
      >
        <nav-menu-link
          title="List"
          :to="{ name: 'listUserEdan' }"
          :icon="icons.mdiTable"
          :nested="true"
        ></nav-menu-link>
        <nav-menu-link
          title="Add"
          :to="{ name: 'addUserEdan' }"
          :icon="icons.mdiPlus"
          :nested="true"
        ></nav-menu-link>
      </nav-menu-group>
      <!-- end -->

      <!-- category content  -->
      <nav-menu-group
        title="Kategori Content"
        :icon="icons.mdiShapeOutline"
        :active="$route.meta.key === 'category-content-edan' ? true : false"
      >
        <nav-menu-link
          title="List"
          :to="{ name: 'listCategoryContentEdan' }"
          :icon="icons.mdiTable"
          :nested="true"
        ></nav-menu-link>
        <nav-menu-link
          title="Add"
          :to="{ name: 'addCategoryContentEdan' }"
          :icon="icons.mdiPlus"
          :nested="true"
        ></nav-menu-link>
      </nav-menu-group>
      <!-- end -->

      <!-- content  -->
      <nav-menu-group
        title="Content"
        :icon="icons.mdiShapeOutline"
        :active="$route.meta.key === 'content' ? true : false"
      >
        <nav-menu-link
          title="List"
          :to="{ name: 'listContentEdan' }"
          :icon="icons.mdiTable"
          :nested="true"
        ></nav-menu-link>
        <nav-menu-link
          title="Add"
          :to="{ name: 'addContentEdan' }"
          :icon="icons.mdiPlus"
          :nested="true"
        ></nav-menu-link>
      </nav-menu-group>
      <!-- end -->

      <!-- <nav-menu-group
        title="Sub Category"
        :icon="icons.mdiShape"
        :active="$route.meta.key === 'sub-category' ? true : false"
      >
        <nav-menu-link
          title="List"
          :to="{ name: 'subCategory' }"
          :icon="icons.mdiTable"
          :nested="true"
        ></nav-menu-link>
        <nav-menu-link
          title="Add"
          :to="{ name: 'subCategoryAdd' }"
          :icon="icons.mdiPlus"
          :nested="true"
        ></nav-menu-link>
      </nav-menu-group> -->
      <!-- <nav-menu-group
        title="Villa Gallery"
        :icon="icons.mdiImageMultiple"
        :active="$route.meta.key === 'villa-gallery' ? true : false"
      >
        <nav-menu-link
          title="List"
          :to="{ name: 'villaGallery' }"
          :icon="icons.mdiTable"
          :nested="true"
        ></nav-menu-link>
        <nav-menu-link
          title="Add"
          :to="{ name: 'villaGalleryAdd' }"
          :icon="icons.mdiPlus"
          :nested="true"
        ></nav-menu-link>
      </nav-menu-group>
      <nav-menu-group
        title="Villa Fasilitas"
        :icon="icons.mdiHomeCircle"
        :active="$route.meta.key === 'villa-facility' ? true : false"
      >
        <nav-menu-link
          title="List"
          :to="{ name: 'villaFacility' }"
          :icon="icons.mdiTable"
          :nested="true"
        ></nav-menu-link>
        <nav-menu-link
          title="Add"
          :to="{ name: 'villaFacilityAdd' }"
          :icon="icons.mdiPlus"
          :nested="true"
        ></nav-menu-link>
      </nav-menu-group>
      <nav-menu-group
        title="Villa"
        :icon="icons.mdiHomeGroup"
        :active="$route.meta.key === 'villa' ? true : false"
      >
        <nav-menu-link
          title="List"
          :to="{ name: 'villa' }"
          :icon="icons.mdiTable"
          :nested="true"
        ></nav-menu-link>
        <nav-menu-link
          title="Add"
          :to="{ name: 'villaAdd' }"
          :icon="icons.mdiPlus"
          :nested="true"
        ></nav-menu-link>
      </nav-menu-group>
      <nav-menu-group
        title="Order"
        :icon="icons.mdiReceipt"
        :active="$route.meta.key === 'order' ? true : false"
      >
        <nav-menu-link
          title="List"
          :to="{ name: 'order' }"
          :icon="icons.mdiTable"
          :nested="true"
        ></nav-menu-link>
        <nav-menu-link
          title="Add"
          :to="{ name: 'orderAdd' }"
          :icon="icons.mdiPlus"
          :nested="true"
        ></nav-menu-link>
      </nav-menu-group> -->
      <!-- <nav-menu-group
        title="Pages"
        :icon="icons.mdiFileOutline"
      >
        <nav-menu-link
          title="Typography"
          :to="{ name: 'typography' }"
          :icon="icons.mdiAlphaTBoxOutline"
        ></nav-menu-link>
        <nav-menu-link
          title="Login"
          :to="{ name: 'pages-login' }"
          target="_blank"
        ></nav-menu-link>
        <nav-menu-link
          title="Register"
          :to="{ name: 'pages-register' }"
          target="_blank"
        ></nav-menu-link>
        <nav-menu-link
          title="Error"
          :to="{ name: 'error-404' }"
          target="_blank"
        ></nav-menu-link>
      </nav-menu-group> -->
      <!-- <nav-menu-section-title title="USER INTERFACE"></nav-menu-section-title>
      <nav-menu-link
        title="Typography"
        :to="{ name: 'typography' }"
        :icon="icons.mdiAlphaTBoxOutline"
        :nested="false"
      ></nav-menu-link>
      <nav-menu-link
        title="Icons"
        :to="{ name: 'icons' }"
        :icon="icons.mdiEyeOutline"
        :nested="false"
      ></nav-menu-link>
      <nav-menu-link
        title="Cards"
        :to="{ name: 'cards' }"
        :icon="icons.mdiCreditCardOutline"
        :nested="false"
      ></nav-menu-link>
      <nav-menu-link
        title="Tables"
        :to="{ name: 'simple-table' }"
        :icon="icons.mdiTable"
        :nested="false"
      ></nav-menu-link>
      <nav-menu-link
        title="Form Layouts"
        :to="{ name: 'form-layouts' }"
        :icon="icons.mdiFormSelect"
        :nested="false"
      ></nav-menu-link> -->
    </v-list>
  </v-navigation-drawer>
</template>

<script>
// eslint-disable-next-line object-curly-newline
import {
  mdiHomeOutline,
  mdiAlphaTBoxOutline,
  mdiEyeOutline,
  mdiCreditCardOutline,
  mdiTable,
  mdiFileOutline,
  mdiFormSelect,
  mdiAccountCogOutline,
  mdiShape,
  mdiPlus,
  mdiImageMultiple,
  mdiHomeCircle,
  mdiHomeGroup,
  mdiReceipt,
  mdiAccountGroupOutline,
  mdiShapeOutline,
} from '@mdi/js'
import NavMenuSectionTitle from './components/NavMenuSectionTitle.vue'
import NavMenuGroup from './components/NavMenuGroup.vue'
import NavMenuLink from './components/NavMenuLink.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    NavMenuSectionTitle,
    NavMenuGroup,
    NavMenuLink,
  },
  props: {
    isDrawerOpen: {
      type: Boolean,
      default: null,
    },
  },
  setup() {
    return {
      icons: {
        mdiHomeOutline,
        mdiAlphaTBoxOutline,
        mdiEyeOutline,
        mdiCreditCardOutline,
        mdiTable,
        mdiFileOutline,
        mdiFormSelect,
        mdiAccountCogOutline,
        mdiShape,
        mdiPlus,
        mdiImageMultiple,
        mdiHomeCircle,
        mdiHomeGroup,
        mdiReceipt,
        mdiAccountGroupOutline,
        mdiShapeOutline,
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.app-title {
  font-size: 1.25rem;
  font-weight: 700;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 0.3px;
}

// ? Adjust this `translateX` value to keep logo in center when vertical nav menu is collapsed (Value depends on your logo)
.app-logo {
  transition: all 0.18s ease-in-out;
  .v-navigation-drawer--mini-variant & {
    transform: translateX(-4px);
  }
}

@include theme(app-navigation-menu) using ($material) {
  background-color: map-deep-get($material, 'background');
}

.app-navigation-menu {
  .v-list-item {
    &.vertical-nav-menu-link {
      ::v-deep .v-list-item__icon {
        .v-icon {
          transition: none !important;
        }
      }
    }
  }
}

// You can remove below style
// Upgrade Banner
.app-navigation-menu {
  .upgrade-banner {
    position: absolute;
    bottom: 13px;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
