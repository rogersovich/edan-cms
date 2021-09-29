<template>
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
                Tambah Sub Category
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
              autofocus
              dense
              placeholder="Masukan Title disini"
            ></v-text-field>

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
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
import { storeData } from '@/api/subCategory'

export default {
  data() {
    return {
      icons: {
        mdiArrowLeft,
      },
      form: {
        title: '',
      },
    }
  },
  methods: {
    async handleSubmit() {
      const data = await storeData({
        title: this.form.title,
      })
      if (data.status === 200) this.$router.push({ name: 'subCategory' })
    },
  },
}
</script>

<style></style>
