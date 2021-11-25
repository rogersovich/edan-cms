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
        :to="{ name: 'Dashboard' }"
        :icon="icons.mdiHomeOutline"
        :nested="false"
      ></nav-menu-link>
      <!-- end -->

      <!-- admin  -->
      <nav-menu-link
        v-if="$store.state.auth.profile.role === 1 || $store.state.auth.profile.role === '1' "
        title="Admin"
        :to="{ name: 'listAdminEdan' }"
        :icon="icons.mdiAccountCogOutline"
        :nested="false"
      ></nav-menu-link>
      <!-- end -->

      <!-- user -->
      <nav-menu-link
        title="User"
        :to="{ name: 'listUserEdan' }"
        :icon="icons.mdiAccountGroupOutline"
        :nested="false"
      ></nav-menu-link>
      <!-- end -->

      <!-- banner  -->
      <nav-menu-link
        title="Banner"
        :to="{ name: 'listBanner' }"
        :icon="icons.mdiImageArea"
        :nested="false"
      ></nav-menu-link>
      <!-- end -->

      <!-- content  -->
      <nav-menu-group
        title="Artikel"
        :icon="icons.mdiNewspaper"
        :active="$route.meta.key === 'article' ? true : false"
      >
        <nav-menu-link
          title="Kategori"
          :to="{ name: 'listCategoryContentEdan' }"
          :icon="icons.mdiShapeOutline"
          :nested="true"
        ></nav-menu-link>
        <nav-menu-link
          title="Konten"
          :to="{ name: 'listContentEdan' }"
          :icon="icons.mdiTableOfContents"
          :nested="true"
        ></nav-menu-link>
      </nav-menu-group>
      <!-- end -->

      <!-- education  -->
      <nav-menu-group
        title="Edukasi"
        :icon="icons.mdiBookEducationOutline"
        :active="$route.meta.key === 'education' ? true : false"
      >
        <nav-menu-link
          title="Kategori"
          :to="{ name: 'listEducationCategory' }"
          :icon="icons.mdiShapeOutline"
          :nested="true"
        ></nav-menu-link>
        <nav-menu-link
          title="Konten"
          :to="{ name: 'listEducationContent' }"
          :icon="icons.mdiTableOfContents"
          :nested="true"
        ></nav-menu-link>
        <nav-menu-link
          title="Materi"
          :to="{ name: 'listEducationMaterial' }"
          :icon="icons.mdiNoteTextOutline"
          :nested="true"
        ></nav-menu-link>
      </nav-menu-group>
      <!-- end -->
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
  mdiTableOfContents,
  mdiImageArea,
  mdiBookEducationOutline,
  mdiNoteTextOutline,
  mdiNewspaper,
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
        mdiTableOfContents,
        mdiImageArea,
        mdiBookEducationOutline,
        mdiNoteTextOutline,
        mdiNewspaper,
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
