<template>
  <v-row
    class="match-height"
    align="center"
    justify="center"
  >
    <v-col
      v-if="Object.keys(subCategory).length === 0"
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
                  icon
                  @click="$router.go(-1)"
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
                Edit Sub Category
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              v-model="form.title"
              label="Title"
              outlined
              dense
              placeholder="Masukan Title disini"
            ></v-text-field>

            <div class="text-right">
              <v-btn
                color="primary"
                type="submit"
              >
                Submit
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
import { detailData, updateData } from '@/api/subCategory'

export default {
  data() {
    return {
      icons: {
        mdiArrowLeft,
      },
      subCategory: {},
    }
  },
  computed: {
    form: {
      get() {
        return this.subCategory
      },
    },
  },
  mounted() {
    this.getDetailData()
  },
  methods: {
    async getDetailData() {
      const data = await detailData({ id: this.$route.params.id })

      if (Object.keys(data.data).length > 0) this.subCategory = data.data
      else this.$router.push({ name: 'subCategory' })
    },
    async handleSubmit() {
      const data = await updateData({
        title: this.form.title,
        id: this.form.id,
      })
      if (data.status === 200) this.$router.push({ name: 'subCategory' })
    },
  },
}
</script>

<style></style>
