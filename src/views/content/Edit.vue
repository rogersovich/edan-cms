<template>
  <validation-observer ref="formSubmit">
    <v-row
      class="match-height"
      align="center"
      justify="center"
    >
      <v-col
        v-if="Object.keys(categoryContents).length === 0"
        cols="12"
      >
        <v-skeleton-loader
          class="mx-auto"
          type="card"
        ></v-skeleton-loader>
      </v-col>
      <v-col
        v-else
        cols="12"
        md="6"
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
                    exact
                    icon
                    :to="{ name: 'listCategoryContentEdan' }"
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
                  Edit Category Content
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="tw-mt-3">
            <v-form @submit.prevent="handleSubmit">
              <validation-provider
                v-slot="{ errors }"
                name="Category name"
                rules="required"
              >
                <div class="tw-mb-5">
                  <v-text-field
                    v-model="form.category_name"
                    label="Category name"
                    outlined
                    :error-messages="errors"
                    placeholder="Your Category name"
                  ></v-text-field>
                </div>
              </validation-provider>

              <div class="text-right">
                <v-btn
                  color="primary"
                  type="submit"
                >
                  Update
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
import { mdiArrowLeft } from '@mdi/js'
import { required } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

// import { detailData, updateData } from '@/api/subCategory'

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
      },
      form_new: {
        create_by: 'dimas roger',
      },
      categoryContents: {
        category_name: 'edukasi',
      },
    }
  },
  computed: {
    form: {
      get() {
        return this.categoryContents
      },
    },
  },
  mounted() {
    // this.getDetailData()
  },
  methods: {
    // async getDetailData() {
    //   const data = await detailData({ id: this.$route.params.id })

    //   if (Object.keys(data.data).length > 0) this.subCategory = data.data
    //   else this.$router.push({ name: 'subCategory' })
    // },
    async handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        if (!success) {
          return
        }

        console.log(this.form)
        console.log(this.form_new)
        this.$router.push({ name: 'listCategoryContentEdan' })

      // const data = await updateData({
      //   title: this.form.title,
      //   id: this.form.id,
      // })
      // if (data.status === 200) this.$router.push({ name: 'subCategory' })
      })
    },
  },
}
</script>

<style></style>
