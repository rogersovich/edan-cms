<template>
  <validation-observer ref="formSubmit">
    <loading-overlay
      v-if="loading.update"
      :loading="loading.update"
    ></loading-overlay>
    <v-row
      class="match-height"
      align="center"
      justify="center"
    >
      <v-col
        v-if="Object.keys(educationMateri).length > 0 && Object.keys(list.educations).length > 0 && !loading.get_data"
        cols="12"
        md="8"
      >
        <v-card>
          <v-card-title>
            <v-row align="center">
              <v-col
                cols="2"
                md="2"
              >
                <div>
                  <v-btn
                    icon
                    :to="{ name: 'listEducationMateri' }"
                  >
                    <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col
                cols="9"
                md="8"
              >
                <div class="tw-text-center tw-text-base md:tw-text-xl">
                  Tambah Edukasi Materi
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-row dense>
                <v-col cols="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Judul Materi"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.title"
                        label="Judul Materi"
                        outlined
                        :error-messages="errors"
                        placeholder="Masukan Judul Materi"
                      ></v-text-field>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col cols="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Edukasi Konten"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.edukasi_id"
                        label="Edukasi Konten"
                        placeholder="Pilih Edukasi Konten"
                        outlined
                        :error-messages="errors"
                        :items="list.educations"
                        item-value="id"
                        item-text="title"
                      ></v-select>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col cols="12">
                  <div>
                    <div class="subtitle-1 tw-mb-1.5">
                      Deskripsi
                    </div>

                    <quill-editor
                      :title.sync="form.description"
                      :class="
                        error_form.description !== '' ? 'tw-border-solid tw-border tw-border-red-500' : 'border-default-editor'
                      "
                    ></quill-editor>
                    <div
                      v-if="error_form.description !== ''"
                      class="tw-text-red-500 tw-text-sm tw-mt-2"
                    >
                      {{ error_form.description }}
                    </div>
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="tw-mt-5">
                    <validation-provider
                      v-slot="{ errors }"
                      name="Ringksan"
                      rules="required"
                    >
                      <div>
                        <v-textarea
                          v-model="form.summary"
                          label="Ringkasan"
                          outlined
                          :error-messages="errors"
                          placeholder="Masukan Ringkasan"
                        ></v-textarea>
                      </div>
                    </validation-provider>
                  </div>
                </v-col>
                <v-col
                  v-if="is_picture"
                  cols="12"
                >
                  <div>
                    <div class="subtitle-1 tw-mb-1.5 tw-text-gray-600">
                      Gambar Edukasi Materi
                    </div>
                    <div>
                      <div
                        v-if="form_new.image.length === 0"
                      >
                        <v-avatar
                          v-ripple
                          rounded
                          width="100%"
                          height="300"
                          class="me-6 tw-cursor-pointer"
                          @click="openDialogPreviewImage(form.image)"
                        >
                          <v-img :src="form.image"></v-img>
                        </v-avatar>
                      </div>
                      <v-avatar
                        v-else
                        v-ripple
                        rounded
                        width="100%"
                        height="300"
                        class="me-6 tw-cursor-pointer"
                        @click="openDialogPreviewImage(form_new.image[0].url)"
                      >
                        <v-img :src="form_new.image[0].url"></v-img>
                      </v-avatar>
                    </div>
                    <div class="tw-grid tw-grid-cols-12 tw-gap-x-3 tw-items-center tw-mt-3">
                      <div :class="form_new.image.length > 0 ? 'tw-col-span-6' : 'tw-col-span-12'">
                        <v-btn
                          v-if="form.image !== ''"
                          color="warning"
                          block
                          class="me-3"
                        >
                          <label
                            for="file-image"
                            class="tw-cursor-pointer tw-w-full"
                          >
                            <v-icon class="d-sm-none">
                              {{ icons.mdiCloudUploadOutline }}
                            </v-icon>
                            <span class="d-none d-sm-block">Ubah</span>
                          </label>
                        </v-btn>
                      </div>
                      <div
                        v-if="form_new.image.length > 0"
                        class="tw-col-span-6"
                      >
                        <v-btn

                          color="error"
                          block
                          outlined
                          @click="removeItem(form_new.image[0])"
                        >
                          Reset
                        </v-btn>
                      </div>
                      <div class="tw-col-span-12">
                        <p class="tw-text-xs mt-4 tw-mb-2">
                          Allowed JPG, GIF or PNG. Max size of 2MB
                        </p>

                        <div
                          v-if="form_new.image.length > 0"
                          class="tw-text-red-500 tw-text-sm"
                        >
                          <span v-if="form_new.image[0].error !== ''">
                            {{ form_new.image[0].error }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <!-- input upload -->

                    <div>
                      <div
                        depressed
                        class="tw-shadow-md tw-hidden"
                      >
                        <file-upload
                          ref="uploadImage"
                          v-model="form_new.image"
                          :multiple="false"
                          :drop="false"
                          accept="image/png,image/gif,image/jpeg,image/webp"
                          input-id="file-image"
                          @input-filter="inputFilter"
                        >
                          <i class="fa fa-plus"></i>
                          Select files
                        </file-upload>
                      </div>
                    </div>
                    <!-- end -->
                  </div>
                </v-col>
                <v-col cols="12">
                  <div class="text-right">
                    <v-btn
                      :width="$vuetify.breakpoint.mobile ? 'auto' : 180"
                      :block="$vuetify.breakpoint.mobile"
                      type="submit"
                      color="primary"
                    >
                      Update
                    </v-btn>
                  </div>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-else
        cols="12"
        md="8"
      >
        <v-skeleton-loader
          v-for="item in 6"
          :key="item"
          class="mx-auto"
          type="list-item-two-line"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog.preview_image"
      max-width="480"
    >
      <v-card>
        <v-card-title>
          <div class="tw-text-true-gray-800">
            Preview image gambar
          </div>
          <v-spacer></v-spacer>
          <div>
            <v-btn
              icon
              @click="dialog.preview_image = !dialog.preview_image"
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
            :src="preview_image"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </validation-observer>
</template>

<script>
import FileUpload from 'vue-upload-component'
import { required } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate'
import {
  mdiArrowLeft, mdiWindowClose, mdiCloudUploadOutline,
} from '@mdi/js'
import QuillEditor from '@/components/QuillEditor.vue'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { detailEducationMateri, updateEducationMateri } from '@/api/educationMateri'
import { listEducationContent } from '@/api/educationContent'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

export default {
  components: {
    QuillEditor,
    FileUpload,
    ValidationProvider,
    ValidationObserver,
    LoadingOverlay,
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiWindowClose,
        mdiCloudUploadOutline,
      },
      is_picture: false,
      error_form: {
        image: '',
        description: '',
      },
      loading: {
        get_data: false,
        update: false,
      },
      preview_image: '',
      dialog: {
        preview_image: false,
      },
      form_new: {
        image: [],
      },
      educationMateri: {},
      list: {
        educations: [],
      },
    }
  },
  computed: {
    form: {
      get() {
        return this.educationMateri
      },
    },
    params_id() {
      return this.$route.params.id
    },
    base_url_image() {
      return process.env.VUE_APP_API
    },
  },
  async mounted() {
    await this.getDetailEducationMateri()
    await this.getListEducationContent()
  },
  methods: {
    async getDetailEducationMateri() {
      this.loading.get_data = false
      const res = await detailEducationMateri({ id: this.params_id })
      const { data } = res
      if (data.status) {
        this.loading.get_data = false
        this.educationMateri = data.data
      } else {
        this.loading.get_data = false
      }
    },
    async getListEducationContent() {
      this.loading.get_data = true
      const res = await listEducationContent({
        page: 1,
        limit: 100,
        query: '',
      })
      const { data } = res
      if (data.status || data.success) {
        this.loading.get_data = false
        this.list.educations = data.data
      } else {
        this.loading.get_data = false
      }
    },
    openDialogPreviewImage(image) {
      this.preview_image = image
      this.dialog.preview_image = !this.dialog.preview_image
    },
    removeItem(file) {
      this.$refs.uploadImage.remove(file)
    },
    // eslint-disable-next-line consistent-return
    inputFilter(newFile, oldFile, prevent) {
      // Filter non-image file
      if (newFile && !oldFile) {
        // eslint-disable-next-line no-param-reassign
        newFile.error = ''
        if (!/\.(gif|jpg|jpeg|png|webp|svg)$/i.test(newFile.name)) {
          this.alert('Your choice is not a picture')

          return prevent()
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

        // max size
        if (newFile.size > 2000000) {
          // eslint-disable-next-line no-param-reassign
          newFile.error = 'Error size gambar terlalu besar, Max 2MB'
        }
      }
    },
    async handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        this.error_form.description = ''

        if (this.form.description === '') {
          this.error_form.description = 'Isi Konten Harus di isi Dulu!'

          return
        }

        if (this.form_new.image.length > 0) {
          if (this.form_new.image[0].error !== '' && this.form_new.image.length > 0) {
            return
          }
        }

        if (!success) {
          return
        }

        try {
          this.loading.update = true
          const res = await updateEducationMateri({
            id: this.params_id,
            title: this.form.title,
            edukasi_id: this.form.edukasi_id,
            description: this.form.description,
            summary: this.form.summary,
          })

          const { data } = res
          if (data.status) {
            this.loading.update = false
            await this.$swal({
              title: 'Berhasil Merubah Data',
              icon: 'success',
              timer: 1000,
            })
            this.$router.push({ name: 'listEducationMateri' })
          } else {
            this.loading.update = false
          }
        } catch (error) {
          console.log(error, 'ERR')
        }
      })
    },
  },
}
</script>

<style scoped>

.border-default-editor {
  border: 1px #d1d5db solid;
}
</style>
