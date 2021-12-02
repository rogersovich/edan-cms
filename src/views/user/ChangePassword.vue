<template>
  <validation-observer ref="formSubmit">
    <loading-overlay
      v-if="loading.create"
      :loading="loading.create"
    ></loading-overlay>
    <v-row
      class="match-height"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="6"
      >
        <v-card>
          <v-card-title>
            <v-row align="center">
              <v-col
                cols="2"
                md="3"
              >
                <div>
                  <v-btn
                    icon
                    :to="{ name: 'detailUserEdan', params: {id: params_id} }"
                  >
                    <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col
                cols="9"
                md="6"
              >
                <div class="tw-text-center tw-text-base md:tw-text-xl">
                  Ganti Password User
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="tw-mt-5">
            <v-form @submit.prevent="handleSubmit">
              <validation-provider
                v-slot="{ errors }"
                name="Current Password"
                rules="required"
              >
                <div class="tw-mb-5">
                  <v-text-field
                    v-model="form.current_password"
                    label="Current Password"
                    outlined
                    :error-messages="errors"
                    placeholder="Your Current Password"
                    :type="visible_pass.current_password ? 'text' : 'password'"
                    :append-icon="visible_pass.current_password ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                    @click:append="visible_pass.current_password = !visible_pass.current_password"
                  ></v-text-field>
                </div>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="Password"
                rules="required"
                vid="password"
              >
                <div class="tw-mb-5">
                  <v-text-field
                    v-model="form.new_password"
                    label="Password"
                    outlined
                    :error-messages="errors"
                    placeholder="Your Password"
                    :type="visible_pass.new_password ? 'text' : 'password'"
                    :append-icon="visible_pass.new_password ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                    @click:append="visible_pass.new_password = !visible_pass.new_password"
                  ></v-text-field>
                </div>
              </validation-provider>

              <validation-provider
                v-slot="{ errors }"
                name="Confirm Password"
                rules="required|confirmed:password"
              >
                <div class="tw-mb-5">
                  <v-text-field
                    v-model="form.confirm_password"
                    label="Confirm Password"
                    outlined
                    :error-messages="errors"
                    placeholder="Your Confirm Password"
                    :type="visible_pass.confirm ? 'text' : 'password'"
                    :append-icon="visible_pass.confirm ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                    @click:append="visible_pass.confirm = !visible_pass.confirm"
                  ></v-text-field>
                </div>
              </validation-provider>

              <div class="text-right">
                <v-btn
                  type="submit"
                  color="primary"
                >
                  Submit
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </validation-observer>
</template>

<script>
import { required, confirmed } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate'
import { mdiArrowLeft, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { changePassUser } from '@/api/user'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('confirmed', {
  ...confirmed,
  message: '{_field_} harus sama',
})

export default {
  components: {
    LoadingOverlay,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      loading: { create: false },
      visible_pass: {
        current_password: false,
        new_password: false,
        confirm: false,
      },
      form: {
        current_password: '',
        new_password: '',
        confirm_password: '',
      },
    }
  },
  computed: {
    params_id() {
      return this.$route.params.id
    },
  },
  methods: {
    async handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        if (!success) {
          return
        }

        try {
          this.loading.create = true
          const res = await changePassUser({
            id: this.params_id,
            current_password: this.form.current_password,
            new_password: this.form.new_password,
            confirm_password: this.form.confirm_password,
          })

          const { data } = res
          if (data.status) {
            this.loading.create = false
            await this.$swal({
              title: 'Berhasil Merubah Password',
              icon: 'success',
              timer: 1000,
            })
            this.$router.push({ name: 'listUserEdan' })
          } else {
            this.loading.create = false
          }
        } catch (error) {
          console.log(error, 'ERR')
        }
      })
    },
  },
}
</script>

<style></style>
