<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <h2 class="text-2xl font-weight-semibold">
              Admin Login
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold tw-text-center text--primary mb-2">
            Welcome to Nama Aplikasi!
          </p>
          <p class="mb-2">
            Please sign-in to your account and start the adventure
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="username"
              outlined
              label="Username"
              placeholder="yourusername"
              hide-details
              :class="errorForm.username ? 'tw-mb-0' : 'mb-3'"
            ></v-text-field>
            <div
              v-if="errorForm.username"
              class="tw-text-xs tw-text-red-500 tw-mt-1.5 tw-mb-3 tw-tracking-wide"
            >
              {{ errorForm.username[0] }}
            </div>

            <v-text-field
              v-model="password"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="*********"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>
            <div
              v-if="errorForm.password"
              class="tw-text-xs tw-text-red-500 tw-mt-1.5 tw-mb-3 tw-tracking-wide"
            >
              {{ errorForm.password[0] }}
            </div>

            <div class="d-flex align-center justify-space-between flex-wrap tw-mt-2">
              <div></div>
              <!-- forgot link -->
              <a
                href="javascript:void(0)"
                class="mt-1"
              > Forgot Password? </a>
            </div>

            <v-btn
              block
              color="primary"
              class="mt-6"
              @click="handleLogin()"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
    />

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
// eslint-disable-next-line object-curly-newline
import { ref } from '@vue/composition-api'

// import { login } from '@/api/auth'

export default {
  setup() {
    const isPasswordVisible = ref(false)
    const username = ref('')
    const password = ref('')
    const errorForm = ref({})

    async function handleLogin() {
      const form = {
        username: username.value,
        password: password.value,
      }

      console.log(form)
      this.$router.push({ name: 'dashboard' })

      // const data = await login(form)
      // if (data.status === 200) {
      //   errorForm.value = {}
      //   await this.$store.dispatch('auth/saveAuth', {
      //     token: data.data.access_token,
      //     profile: data.data.user,
      //   })

      //   this.$router.push({ name: 'dashboard' })
      // } else {
      //   errorForm.value = data.data.errors
      // }
    }

    return {
      isPasswordVisible,
      username,
      password,
      errorForm,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },

      // method
      handleLogin,

    }
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
