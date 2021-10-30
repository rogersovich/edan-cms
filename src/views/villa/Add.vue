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
          <v-card-title>
            <v-row align="center">
              <v-col
                cols="2"
                md="3"
              >
                <div>
                  <v-btn
                    icon
                    :to="{ name: 'villa' }"
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
                  Tambah Villa
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="12">
                  <div class="subtitle-1 tw-mb-1.5">
                    Thumbnail Villa
                  </div>
                  <div class="tw-flex">
                    <div>
                      <v-avatar
                        v-if="form.thumbnail.length === 0"
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
                        <v-img :src="form.thumbnail[0].url"></v-img>
                      </v-avatar>
                    </div>
                    <div>
                      <v-btn
                        v-if="form.thumbnail.length === 0"
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
                        v-else
                        color="warning"
                        class="me-3"
                      >
                        <label for="file">
                          <v-icon class="d-sm-none">
                            {{ icons.mdiCloudUploadOutline }}
                          </v-icon>
                          <span class="d-none d-sm-block">Ubah</span>
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
                  cols="6"
                  md="3"
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
                  cols="6"
                  md="3"
                >
                  <div>
                    <div class="subtitle-1 tw-mb-1.5">
                      Blok Villa Value
                    </div>
                    <v-text-field
                      v-model="form.sub_category_value"
                      outlined
                      dense
                      placeholder="Masukin Blok Villa *eg: 1"
                    ></v-text-field>
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
                    <div class="subtitle-1 tw-mb-1.5">
                      Code
                    </div>
                    <v-text-field
                      v-model="form.code"
                      outlined
                      dense
                      placeholder="cth. CMB-DA001"
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
                    <v-switch v-model="form.is_recommendation">
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
                      :title.sync="form.description"
                      :class="
                        errors.length > 0 ? 'tw-border-solid tw-border tw-border-red-500' : 'border-default-editor'
                      "
                    ></quill-editor>
                  </div>
                </v-col>
              </v-row>

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

import { storeData } from '@/api/villa'
import { listAll } from '@/api/subCategory'
import QuillEditor from '@/components/QuillEditor.vue'

export default {
  components: {
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
        price: '',
        sub_category_id: '',
        sub_category_value: '',
        thumbnail: [],
        description: '',
        whatsapp_number: '',
        sub_district: '',
        code: '',
        is_recommendation: false,
      },
      list: {
        sub_categories: [],
      },
      form_error: '',
    }
  },
  mounted() {
    this.getListSubCategory()
  },
  methods: {
    async getListSubCategory() {
      const { data } = await listAll()
      this.list.sub_categories = data
    },
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
    async handleSubmit() {
      try {
        await storeData({
          sub_category_id: this.form.sub_category_id,
          thumbnail: this.form.thumbnail[0].file,
          description: this.form.description,
          whatsapp_number: this.form.whatsapp_number,
          sub_district: this.form.sub_district,
          sub_category_value: this.form.sub_category_value,
          price: this.form.price,
          code: this.form.code,
          is_recommendation: this.form.is_recommendation === true ? 1 : 0,
        })

        this.form_error = ''
        this.$router.push({ name: 'villa' })
      } catch (error) {
        console.log(error)
        if (error.response.status === 403) {
          console.log(error.response.status)
        } else if (error.response.status === 422) {
          this.form_error = error.response.data.error
        } else if (error.response.status === 401) {
          await this.$store.dispatch('auth/removeCurrentUser')
          this.$router.push({ name: 'pages-login' })
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
