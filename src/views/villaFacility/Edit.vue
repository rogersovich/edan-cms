<template>
  <div>
    <v-row
      class="match-height"
      align="center"
      justify="center"
    >
      <v-col
        v-if="Object.keys(list.villas).length === 0 && Object.keys(list.villaFacility).length === 0"
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
                    :to="{ name: 'villaFacility' }"
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
              <div>
                <div class="tw-mb-1.5 subtitle-1">
                  Villa
                </div>
                <v-select
                  v-model="form.villa_id"
                  :items="list.villas"
                  item-value="id"
                  item-text="code"
                  placeholder="Pilih Villa"
                  outlined
                  dense
                ></v-select>
              </div>
              <div>
                <div class="tw-mb-1.5 subtitle-1">
                  Nama Fasilitas
                </div>
                <v-text-field
                  v-model="form.title"
                  outlined
                  dense
                  placeholder="Masukan Nama Fasilitas"
                ></v-text-field>
              </div>
              <div>
                <div class="tw-mb-1.5 subtitle-1">
                  Value Fasilitas
                </div>
                <v-text-field
                  v-model="form.value"
                  outlined
                  dense
                  hint="cth. 7, jadi nanti 7 (nama fasilitas)"
                  persistent-hint
                  placeholder="Masukan Value Fasilitas"
                ></v-text-field>
              </div>
              <div>
                <div>
                  <div class="tw-flex tw-items-center">
                    <div class="tw-mb-1.5 subtitle-1">
                      Icon Fasilitas
                    </div>
                    <v-spacer></v-spacer>
                    <div>
                      <v-btn
                        icon
                        color="primary"
                        @click="openDialogPreviewIcon"
                      >
                        <v-icon>{{ icons.mdiEye }}</v-icon>
                      </v-btn>
                    </div>
                  </div>
                  <v-text-field
                    v-model="form.icon"
                    outlined
                    dense
                    placeholder="Masukan Icon Fasilitas"
                  ></v-text-field>
                </div>
              </div>
              <div class="text-right tw-mt-5">
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

    <v-dialog
      v-model="dialog.preview_icon"
      max-width="480"
    >
      <v-card>
        <v-card-title>
          <div class="tw-text-true-gray-800">
            Preview Icon
          </div>
          <v-spacer></v-spacer>
          <div>
            <v-btn
              icon
              @click="dialog.preview_icon = !dialog.preview_icon"
            >
              <v-icon>
                {{ icons.mdiWindowClose }}
              </v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-avatar
            tile
            size="50"
          >
            <v-img :src="form.icon"></v-img>
          </v-avatar>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mdiArrowLeft, mdiEye, mdiWindowClose } from '@mdi/js'
import { allDataWithoutPaginate } from '@/api/villa'
import { detailData, updateData } from '@/api/villaFacility'

export default {
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiEye,
        mdiWindowClose,
      },
      dialog: {
        preview_icon: false,
      },
      list: {
        villas: [],
        villaFacility: {},
      },
    }
  },
  computed: {
    form: {
      get() {
        return this.list.villaFacility
      },
    },
  },
  async mounted() {
    await this.getAllDataVilla()
    await this.getDetailData()
  },
  methods: {
    openDialogPreviewIcon() {
      this.dialog.preview_icon = !this.dialog.preview_icon
    },
    async getAllDataVilla() {
      const { data } = await allDataWithoutPaginate()
      this.list.villas = data
    },
    async getDetailData() {
      const data = await detailData({ id: this.$route.params.id })

      if (Object.keys(data.data).length > 0) this.list.villaFacility = data.data
      else this.$router.push({ name: 'villaFacility' })
    },
    async handleSubmit() {
      const data = await updateData({
        title: this.form.title,
        villa_id: this.form.villa_id,
        icon: this.form.icon,
        value: this.form.value,
        id: this.form.id,
      })
      if (data.status === 200) this.$router.push({ name: 'villaFacility' })
    },
  },
}
</script>

<style></style>
