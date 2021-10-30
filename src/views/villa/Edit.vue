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
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col cols="12">
                  <div class="subtitle-1 tw-mb-1.5">
                    Thumbnail Villa
                  </div>
                  <div class="tw-flex">
                    <div>
                      <v-avatar
                        v-if="form.image_new.length === 0 && form.thumbnail === ''"
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
                          v-if="form.image_new.length > 0"
                          :src="form.image_new[0].url"
                        ></v-img>
                        <v-img
                          v-else
                          :src="`http://127.0.0.1:8000/storage/${form.thumbnail}`"
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
                          <span class="d-none d-sm-block">Ubah</span>
                        </label>
                      </v-btn>

                      <v-btn
                        v-if="form.image_new.length > 0"
                        color="error"
                        outlined
                        @click="removeItem(form.image_new[0])"
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
                        v-model="form.image_new"
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
                    <div class="subtitle-1 tw-mb-1.5">
                      Blok Value
                    </div>
                    <v-text-field
                      v-model="form.sub_category_value"
                      outlined
                      dense
                      placeholder="cth. 1"
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
                      :class="
                        errors.length > 0 ? 'tw-border-solid tw-border tw-border-red-500' : 'border-default-editor'
                      "
                      :title.sync="form.description"
                    ></quill-editor>
                  </div>
                </v-col>
              </v-row>
              <div class="text-right tw-mt-5">
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

    <v-dialog
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
            v-if="form.image_new.length > 0"
            contain
            :src="form.image_new[0].url"
          ></v-img>
          <v-img
            v-else
            contain
            :src="`http://127.0.0.1:8000/storage/${form.thumbnail}`"
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
import { detailData, updateData } from '@/api/villa'
import { listAll } from '@/api/subCategory'

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
        price: '',
        sub_category_id: 1,
        image_new: [],
        thumbnail: '',
        thumbnail_old: 'https://ik.imagekit.io/1akf8cdsyg/bootstrap-icon_W0x965yzg.svg?updatedAt=1624035124879',
        description: '',
        whatsapp_number: '',
        sub_district: '',
        is_recommendation: false,
        sub_category_value: '',
      },
      list: {
        sub_categories: [],
      },
      form_error: '',
    }
  },
  async mounted() {
    await this.getListAllCategory()
    await this.getDetailData()
  },
  methods: {
    openDialogPreviewThumbnail() {
      if (this.form.image_new > 0 || this.form.thumbnail !== '') {
        this.dialog.preview_thumbnail = !this.dialog.preview_thumbnail
      }
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
    async getListAllCategory() {
      const { data } = await listAll()
      this.list.sub_categories = data
    },
    async getDetailData() {
      const { id } = this.$route.params
      const { data } = await detailData({ id })

      // fill data
      this.form.price = data.price
      this.form.sub_category_id = data.sub_category_id
      this.form.thumbnail = data.thumbnail
      this.form.description = data.description
      this.form.whatsapp_number = data.whatsapp_number
      this.form.sub_district = data.sub_district
      this.form.is_recommendation = data.is_recommendation
      this.form.sub_category_value = data.sub_category_value
    },
    changeValueDesc(value) {
      this.form.description = value
    },
    async handleSubmit() {
      const { id } = this.$route.params
      // eslint-disable-next-line radix
      const subCategory = parseInt(this.form.sub_category_id)
      try {
        await updateData({
          sub_category_id: subCategory,
          thumbnail: this.form.thumbnail,
          image_new: this.form.image_new.length > 0 ? this.form.image_new[0].file : [],
          description: this.form.description,
          whatsapp_number: this.form.whatsapp_number,
          sub_district: this.form.sub_district,
          sub_category_value: this.form.sub_category_value,
          price: this.form.price,
          is_recommendation: this.form.is_recommendation,
          id,
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
