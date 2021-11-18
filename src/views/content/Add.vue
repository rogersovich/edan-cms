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
                    :to="{name: 'listCategoryContentEdan'}"
                  >
                    <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col
                cols="9"
                md="7"
              >
                <div class="tw-text-center tw-text-base md:tw-text-xl">
                  Tambah Kategori Konten
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <validation-provider
                v-slot="{ errors }"
                name="Category Content"
                rules="required"
              >
                <div class="tw-mb-5">
                  <v-text-field
                    v-model="form.category_name"
                    label="Category Content"
                    outlined

                    :error-messages="errors"

                    placeholder="Your Category Content"
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
import { required } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate'
import { mdiArrowLeft, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
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

      form: {
        category_name: '',
        create_by: 'dimas roger',
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
        this.$router.push({ name: 'listCategoryContentEdan' })

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
