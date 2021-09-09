<template>
  <div>
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
                  Tambah Sub Category
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form>
              <div>
                <div class="tw-mb-1.5 subtitle-1">
                  Villa
                </div>
                <v-select
                  v-model="form.villa_id"
                  :items="list.villas"
                  item-value="id"
                  item-text="title"
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
                <div class="tw-flex tw-items-center">
                  <div class="tw-mb-1.5 subtitle-1">
                    Icon Fasilitas
                  </div>
                  <v-spacer></v-spacer>
                  <div v-if="form.icon !== ''">
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
              <div class="text-right tw-mt-5">
                <v-btn color="primary">
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
      form: {
        title: '',
        villa_id: '',
        icon: '',
        value: '',
      },
      list: {
        villas: [
          {
            id: 1,
            title: 'Mawar',
          },
          {
            id: 2,
            title: 'Melati',
          },
          {
            id: 3,
            title: 'Kamboja',
          },
        ],
      },
    }
  },
  methods: {
    openDialogPreviewIcon() {
      this.dialog.preview_icon = !this.dialog.preview_icon
    },
  },
}
</script>

<style scoped>
* >>> .v-messages__message {
  line-height: 1.5;
  letter-spacing: 0.025em;
}
</style>
