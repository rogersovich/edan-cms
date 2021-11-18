<template>
  <validation-observer
    ref="formSubmit"
  >
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
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
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

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

extend('confirmed', {
  ...confirmed,
  message: '{_field_} harus sama',
})

// import { storeData } from '@/api/subCategory'

export default {
  components: {
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
      error_form: {
        current_password: '',
      },
      visible_pass: {
        password: false,
        confirm: false,
      },
      form: {
        username: '',
        password: '',
        confirm_password: '',
        role: 'admin',
      },
    }
  },
  methods: {
    async handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        if (!success) {
          return
        }

        console.log(this.form)
        this.$router.push({ name: 'listAdminEdan' })

        // const data = await storeData({
        //   username: this.form.username,
        // })
        // if (data.status === 200) this.$router.push({ name: 'subCategory' })
      })
    },
  },
}
</script>

<style></style>
