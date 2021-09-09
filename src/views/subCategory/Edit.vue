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
        <v-card-title class="tw-block">
          <v-row align="center">
            <v-col cols="3">
              <div>
                <v-btn
                  icon
                  @click="$router.go(-1)"
                >
                  <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="tw-text-center">
                Edit Sub Category
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="form.title"
              label="Title"
              outlined
              dense
              placeholder="Masukan Title disini"
            ></v-text-field>

            <div class="text-right">
              <v-btn color="primary">
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

export default {
  data() {
    return {
      icons: {
        mdiArrowLeft,
      },
      form: {
        title: 'Mawar',
      },
    }
  },
}
</script>

<style></style>
