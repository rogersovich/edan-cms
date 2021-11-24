<template>
  <validation-observer
    ref="formSubmit"
  >
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
                    :to="{name: 'listAdminEdan'}"
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
                  Tambah Admin
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
                  <validation-provider
                    v-slot="{ errors }"
                    name="Nama"
                    rules="required"
                  >
                    <div class="tw-mb-5">
                      <v-text-field
                        v-model="form.name"
                        label="Nama"
                        outlined
                        :error-messages="errors"
                        placeholder="Your Nama"
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
                    name="Email"
                    rules="required|email"
                  >
                    <div class="tw-mb-5">
                      <v-text-field
                        v-model="form.email"
                        label="Email"
                        outlined
                        type="email"
                        :error-messages="errors"

                        placeholder="Your Email"
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
                    name="Username"
                    rules="required"
                  >
                    <div class="tw-mb-5">
                      <v-text-field
                        v-model="form.username"
                        label="Username"
                        outlined

                        :error-messages="errors"

                        placeholder="Your Username"
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
                    name="Role"
                    rules="required"
                  >
                    <div class="tw-mb-5">
                      <v-select
                        v-model="form.role"
                        label="Role"
                        outlined
                        :items="list.roles"
                        item-text="text"
                        item-value="value"
                        :error-messages="errors"
                        placeholder="Your Role"
                      ></v-select>
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
                    <div class="tw-mb-5">
                      <v-text-field
                        v-model="form.password"
                        label="Password"
                        outlined
                        :error-messages="errors"
                        placeholder="Your Password"
                        :type="visible_pass.password ? 'text' : 'password'"
                        :append-icon="visible_pass.password ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                        @click:append="visible_pass.password = !visible_pass.password"
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
                      Tambah Admin
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </validation-observer>
</template>

<script>
import { required, confirmed, email } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate'
import { mdiArrowLeft, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'

import { addAdmin } from '@/api/auth'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('confirmed', {
  ...confirmed,
  message: '{_field_} harus sama',
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
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
      visible_pass: {
        password: false,
        confirm: false,
      },
      loading: { create: false },
      form: {
        username: '',
        password: '',
        name: '',
        email: '',
        confirm_password: '',
        role: 2,
      },
      list: {
        roles: [
          {
            value: 1,
            text: 'Super Admin',
          },
          {
            value: 2,
            text: 'Admin',
          },
        ],
      },
    }
  },
  methods: {
    async handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        if (!success) {
          return
        }

        this.loading.create = true
        const res = await addAdmin({
          username: this.form.username,
          email: this.form.email,
          name: this.form.name,
          role: this.form.role,
          password: this.form.password,
        })
        const { data } = res
        if (data.status) {
          this.loading.create = false
          await this.$swal({
            title: 'Berhasil Menghapus',
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
