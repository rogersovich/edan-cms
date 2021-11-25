<template>
  <div>
    <v-snackbar
      id="snackbar-error"
      v-model="toggleSnackbarErr"
      :timeout="3000"
      absolute
      top
      dark
      text
      right
      class="tw-z-10"
    >
      <div class="tw-flex tw-items-center tw-text-white tw-font-medium">
        <div>
          {{ errorForm }}
        </div>
        <v-spacer></v-spacer>
        <div>
          <v-btn
            icon
            color="#fff"
            @click="toggleSnackbarErr = !toggleSnackbarErr"
          >
            <v-icon>
              {{ icons.mdiWindowClose }}
            </v-icon>
          </v-btn>
        </div>
      </div>
    </v-snackbar>

    <loading-overlay
      v-if="loading"
      :loading="loading"
    ></loading-overlay>
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
          <validation-observer ref="formSubmit">
            <v-card-text>
              <v-form @submit.prevent="handleLogin()">
                <validation-provider
                  v-slot="{ errors }"
                  name="Email"
                  rules="required|email"
                >
                  <v-text-field
                    v-model="emailForm"
                    outlined
                    type="email"
                    label="Email"
                    placeholder="Masukan Email Anda"
                    :error-messages="errors"
                  ></v-text-field>
                </validation-provider>

                <validation-provider
                  v-slot="{ errors }"
                  name="Password"
                  rules="required"
                >
                  <div class="tw-mt-3">
                    <v-text-field
                      v-model="password"
                      outlined
                      :type="isPasswordVisible ? 'text' : 'password'"
                      label="Password"
                      placeholder="*********"
                      :error-messages="errors"
                      :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                      @click:append="isPasswordVisible = !isPasswordVisible"
                    ></v-text-field>
                  </div>
                </validation-provider>

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
                  type="submit"
                >
                  Login
                </v-btn>
              </v-form>
            </v-card-text>
          </validation-observer>
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
  </div>
</template>

<script>
import { required, email } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate'
import { mdiEyeOutline, mdiEyeOffOutline, mdiWindowClose } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { login } from '@/api/auth'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('email', {
  ...email,
  message: '{_field_} must email format',
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
    LoadingOverlay,
  },
  setup() {
    const isPasswordVisible = ref(false)
    const emailForm = ref('')
    const password = ref('')
    const loading = ref(false)
    const errorForm = ref('')
    const toggleSnackbarErr = ref(false)

    function handleLogin() {
      this.$refs.formSubmit.validate().then(async success => {
        if (!success) {
          return
        }
        errorForm.value = ''
        const form = {
          email: emailForm.value,
          password: password.value,
        }

        loading.value = true
        const res = await login(form)
        const { data } = res

        if (data.status) {
          loading.value = false
          await this.$store.dispatch('auth/saveAuth', {
            token: data.data.accessToken,
          })

          await this.$store.dispatch('auth/saveProfile', {
            email: data.data.email,
            name: data.data.name,
            role: data.data.role,
          })

          this.$router.push({ name: 'Dashboard' })
        } else {
          loading.value = false
          toggleSnackbarErr.value = true
          errorForm.value = res.data.message
        }
      })
    }

    return {
      isPasswordVisible,
      emailForm,
      password,
      errorForm,
      loading,
      toggleSnackbarErr,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
        mdiWindowClose,
      },

      // method
      handleLogin,
    }
  },
}
</script>

<style lang="scss" scoped>
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>

<style scoped>
* >>> #snackbar-error .v-snack__wrapper {
  background: #e11d48 !important;
}

* >>> .v-snack__content {
  padding: 6px 16px !important;
}
</style>
