<template>
  <validation-observer ref="formSubmit">
    <loading-overlay
      v-if="loading.update"
      :loading="loading.update"
    ></loading-overlay>
    <v-row
      class="match-height"
      align="center"
      justify="center"
    >
      <v-col
        v-if="Object.keys(admin).length > 0 && !loading.get_data"
        cols="12"
      >
        <v-card>
          <v-card-title class="tw-block">
            <v-row align="center">
              <v-col
                cols="2"
                md="3"
              >
                <div>
                  <v-btn
                    icon
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
                  Edit Admin
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="tw-mt-3">
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
                <v-col cols="12">
                  <div class="text-right">
                    <v-btn
                      :width="$vuetify.breakpoint.mobile ? 'auto' : 180"
                      :block="$vuetify.breakpoint.mobile"
                      type="submit"
                      color="primary"
                    >
                      Update Admin
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
        md="8"
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
import { mdiArrowLeft, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { required, email } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { detailAdmin, updateAdmin } from '@/api/auth'

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
      loading: {
        get_data: false,
        update: false,
      },
      admin: {},
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
  computed: {
    form: {
      get() {
        return this.admin
      },
    },
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

        this.loading.update = true
        const res = await updateAdmin({
          username: this.form.username,
          email: this.form.email,
          name: this.form.name,
          role: this.form.role,
          status: 1,
          id: this.params_id,
        })
        const { data } = res
        if (data.status) {
          this.loading.update = false
          await this.$swal({
            title: 'Berhasil Mengubah Admin',
            icon: 'success',
            timer: 1000,
          })
          this.$router.push({ name: 'listAdminEdan' })
        } else {
          this.loading.update = false
        }
      })
    },
  },
}
</script>

<style></style>
