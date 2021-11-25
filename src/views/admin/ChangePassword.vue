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
        v-if="Object.keys(admin).length > 0 && !loading.get_data"
        cols="12"
        md="10"
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
                    exact
                    :to="{ name: 'listAdminEdan' }"
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
                  Ganti Password
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="tw-mt-5">
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <v-text-field
                      v-model="admin.name"
                      label="Nama Admin"
                      outlined
                      disabled
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <v-text-field
                      v-model="admin.email"
                      label="Email Admin"
                      outlined
                      disabled
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Current Password"
                    rules="required"
                  >
                    <div>
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
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Password"
                    rules="required"
                    vid="password"
                  >
                    <div>
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
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
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
                </v-col>
                <v-col cols="12">
                  <div class="text-right">
                    <v-btn
                      :width="$vuetify.breakpoint.mobile ? 'auto' : 180"
                      :block="$vuetify.breakpoint.mobile"
                      type="submit"
                      color="primary"
                    >
                      Ubah Password
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-else
        cols="12"
        md="10"
      >
        <v-skeleton-loader
          v-for="item in 6"
          :key="item"
          class="mx-auto"
          type="list-item-two-line"
        ></v-skeleton-loader>
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
import { changePassAdmin, detailAdmin } from '@/api/auth'

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
    ValidationProvider,
    ValidationObserver,
    LoadingOverlay,
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      loading: { create: false, get_data: false },
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
      admin: {},
    }
  },
  computed: {
    params_id() {
      return this.$route.params.id
    },
  },
  mounted() {
    this.getDetailAdmin()
  },
  methods: {
    async getDetailAdmin() {
      this.loading.get_data = false
      const res = await detailAdmin({ id: this.params_id })
      const { data } = res
      if (data.status) {
        this.loading.get_data = false
        this.admin = data.data
      } else {
        this.loading.get_data = false
      }
    },
    async handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        if (!success) {
          return
        }

        this.loading.create = true
        const res = await changePassAdmin({
          current_password: this.form.current_password,
          new_password: this.form.new_password,
          confirm_password: this.form.confirm_password,
          id: this.params_id,
        })
        const { data } = res
        if (data.status) {
          this.loading.create = false
          await this.$swal({
            title: 'Berhasil Mengubah Password',
            icon: 'success',
            timer: 1000,
          })
          this.$router.push({ name: 'listAdminEdan' })
        } else {
          this.loading.create = false
        }
      })
    },
  },
}
</script>

<style></style>
