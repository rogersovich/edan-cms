<template>
  <validation-observer
    ref="formSubmit"
  >
    <div class="tw-min-h-screen tw-bg-purple-50 tw-flex tw-justify-center">
      <v-row
        justify="center"
        align="center"
      >
        <v-col
          cols="12"
          md="6"
        >
          <v-card>
            <v-card-title>
              <div></div>
              <v-spacer></v-spacer>
              <div>
                Form Message
              </div>
              <v-spacer></v-spacer>
              <div>
                <v-btn
                  icon
                  @click="handleCloseForm"
                >
                  <v-icon>
                    {{ icons.mdiWindowClose }}
                  </v-icon>
                </v-btn>
              </div>
            </v-card-title>
            <v-card-text class="tw-mt-4">
              <v-form @submit.prevent="handleSubmit">
                <v-row dense>
                  <v-col cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Nama"
                      rules="required"
                    >
                      <div>
                        <v-text-field
                          v-model="form.nama"
                          label="Nama"
                          outlined
                          :error-messages="errors"
                          placeholder="Masukan Nama Anda"
                        ></v-text-field>
                      </div>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Email"
                      rules="required"
                    >
                      <div>
                        <v-text-field
                          v-model="form.email"
                          label="Email"
                          type="email"
                          outlined
                          :error-messages="errors"
                          placeholder="Masukan Email Anda"
                        ></v-text-field>
                      </div>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Pesan"
                      rules="required"
                    >
                      <div>
                        <v-textarea
                          v-model="form.message"
                          label="Pesan"
                          outlined
                          :error-messages="errors"
                          placeholder="Masukan Pesan mu"
                        ></v-textarea>
                      </div>
                    </validation-provider>
                  </v-col>
                  <v-col cols="12">
                    <div>
                      <v-btn
                        block
                        type="submit"
                        color="primary"
                      >
                        Submit
                      </v-btn>
                    </div>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </validation-observer>
</template>

<script>
import { required } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate'
import {
  mdiWindowClose,
} from '@mdi/js'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

export default {
  name: 'FormContact',
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      icons: {
        mdiWindowClose,
      },
      form: {
        email: '',
        nama: '',
        user_id: '',
        message: '',
      },
    }
  },
  computed: {
    paramsId() {
      return this.$route.params.id
    },
  },
  methods: {
    handleCloseForm() {
      console.log('redirect to mobile app or close tab')
    },
    handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        if (!success) {
          return
        }
        console.log(this.form)
      })
    },
  },
}
</script>

<style>

</style>
