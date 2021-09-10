<template>
  <div>
    <v-row
      class="match-height"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="10"
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
                  Edit Villa
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col
                  cols="12"
                >
                  <div class="subtitle-1 tw-mb-1.5">
                    Thumbnail Villa
                  </div>
                  <div class="tw-flex">
                    <div>
                      <v-avatar
                        v-if="form.thumbnail.length === 0 && form.thumbnail_old === ''"
                        rounded
                        size="120"
                        class="me-6"
                      >
                        <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
                      </v-avatar>
                      <v-avatar
                        v-else
                        v-ripple
                        rounded
                        size="120"
                        class="me-6"
                        @click="openDialogPreviewThumbnail"
                      >
                        <v-img
                          v-if="form.thumbnail.length > 0"
                          :src="form.thumbnail[0].url"
                        ></v-img>
                        <v-img
                          v-else
                          :src="form.thumbnail_old"
                        ></v-img>
                      </v-avatar>
                    </div>
                    <div>
                      <v-btn
                        color="primary"
                        class="me-3"
                      >
                        <label for="file">
                          <v-icon class="d-sm-none">
                            {{ icons.mdiCloudUploadOutline }}
                          </v-icon>
                          <span class="d-none d-sm-block">Upload</span>
                        </label>
                      </v-btn>

                      <v-btn
                        v-if="form.thumbnail.length > 0"
                        color="error"
                        outlined
                        @click="removeItem(form.thumbnail[0])"
                      >
                        Reset
                      </v-btn>
                      <p class="tw-text-xs mt-4">
                        Allowed JPG, GIF or PNG. Max size of 800K
                      </p>
                    </div>
                  </div>
                  <!-- input upload -->
                  <div>
                    <div
                      depressed
                      class="tw-shadow-md tw-hidden"
                    >
                      <file-upload
                        ref="uploadThumbnail"
                        v-model="form.thumbnail"
                        :multiple="false"
                        :drop="false"
                        @input-filter="inputFilter"
                      >
                        <i class="fa fa-plus"></i>
                        Select files
                      </file-upload>
                    </div>
                  </div>
                  <!-- end -->
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="subtitle-1 tw-mb-1.5">
                      Blok Villa
                    </div>
                    <v-select
                      v-model="form.sub_category_id"
                      :items="list.sub_categories"
                      item-value="id"
                      item-text="title"
                      placeholder="Pilih Blok Villa"
                      outlined
                      dense
                    ></v-select>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="subtitle-1 tw-mb-1.5">
                      Nomer Whatsapp
                    </div>
                    <v-text-field
                      v-model="form.whatsapp_number"
                      outlined
                      dense
                      placeholder="Masukan Nomer Whatsapp"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="subtitle-1 tw-mb-1.5">
                      Harga
                    </div>
                    <v-text-field
                      v-model="form.price"
                      outlined
                      dense
                      placeholder="Masukan Harga"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="subtitle-1 tw-mb-1.5">
                      Daerah
                    </div>
                    <v-text-field
                      v-model="form.sub_district"
                      outlined
                      dense
                      placeholder="cth. Cibereum"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="subtitle-1">
                      Villa Rekomendasi
                    </div>
                    <v-switch
                      v-model="form.is_recommendation"
                    >
                      <template v-slot:label>
                        <span v-if="form.is_recommendation">
                          Ya, Rekomendasi
                        </span>
                        <span v-else>
                          Tidak, Rekomendasi
                        </span>
                      </template>
                    </v-switch>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                >
                  <div>
                    <div class="subtitle-1 tw-mb-1.5">
                      Deskripsi
                    </div>
                    <quill-editor
                      v-model="form.description"
                      :class="
                        errors.length > 0
                          ? 'tw-border-solid tw-border tw-border-red-500'
                          : 'border-default-editor'
                      "
                    ></quill-editor>
                  </div>
                </v-col>
              </v-row>
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
      v-if="form.thumbnail.length > 0"
      v-model="dialog.preview_thumbnail"
      max-width="480"
    >
      <v-card>
        <v-card-title>
          <div class="tw-text-true-gray-800">
            Preview thumbnail gambar
          </div>
          <v-spacer></v-spacer>
          <div>
            <v-btn
              icon
              @click="dialog.preview_thumbnail = !dialog.preview_thumbnail"
            >
              <v-icon>
                {{ icons.mdiWindowClose }}
              </v-icon>
            </v-btn>
          </div>
        </v-card-title>
        <v-card-text>
          <v-img
            contain
            :src="form.thumbnail[0].url"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
import {
  mdiArrowLeft, mdiEye, mdiWindowClose, mdiCloudUploadOutline,
} from '@mdi/js'
import QuillEditor from '@/components/QuillEditor.vue'

export default {
  components: {
    // eslint-disable-next-line vue/no-unused-components
    FileUpload,
    QuillEditor,
  },
  data() {
    return {
      errors: [],
      icons: {
        mdiArrowLeft,
        mdiEye,
        mdiWindowClose,
        mdiCloudUploadOutline,
      },
      dialog: {
        preview_thumbnail: false,
      },
      form: {
        price: 4000000,
        sub_category_id: 2,
        thumbnail: [],
        thumbnail_old: 'https://ik.imagekit.io/1akf8cdsyg/bootstrap-icon_W0x965yzg.svg?updatedAt=1624035124879',
        description: '<p>roger disini </p>',
        whatsapp_number: '089627210822',
        sub_district: 'Cibereum',
        is_recommendation: false,
      },
      list: {
        sub_categories: [
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
    openDialogPreviewThumbnail() {
      this.dialog.preview_thumbnail = !this.dialog.preview_thumbnail
    },
    removeItem(file) {
      this.$refs.uploadThumbnail.remove(file)
    },
    // eslint-disable-next-line consistent-return
    inputFilter(newFile, oldFile, prevent) {
      // Filter non-image file
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp|svg)$/i.test(newFile.name)) {
          this.alert('Your choice is not a picture')

          return prevent()
        }
      }

      // Create a blob field
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        // eslint-disable-next-line no-param-reassign
        newFile.url = ''
        const URL = window.URL || window.webkitURL
        if (URL && URL.createObjectURL) {
          // eslint-disable-next-line no-param-reassign
          newFile.url = URL.createObjectURL(newFile.file)
        }
      }
    },
  },
}
</script>

<style scoped>
* >>> .v-messages__message {
  line-height: 1.5;
  letter-spacing: 0.025em;
}

* >>> .v-text-field.v-text-field--enclosed .v-text-field__details {
  margin-bottom: 0px !important;
}

.border-default-editor {
  border: 1px #d1d5db solid;
}
</style>
