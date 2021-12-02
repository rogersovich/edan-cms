<template>
  <validation-observer ref="formSubmit">
    <loading-overlay
      v-if="loading.create"
      :loading="loading.create"
    ></loading-overlay>
    <v-row
      class="match-height"
      align="center"
      justify="center"
    >
      <v-col
        v-if="Object.keys(list.educations).length > 0 && !loading.get_data"
        cols="12"
        md="12"
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
                    :to="{ name: 'listTestQuestion' }"
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
                  Tambah Test Soal
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="tw-mt-5">
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Judul Soal"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.judul_soal"
                        label="Judul Soal"
                        outlined
                        :error-messages="errors"
                        placeholder="Masukan Judul Soal"
                      ></v-text-field>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
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
                  <validation-provider
                    v-slot="{ errors }"
                    name="Pertanyaan"
                    rules="required"
                  >
                    <div>
                      <v-textarea
                        v-model="form.pertanyaan"
                        label="Pertanyaan"
                        outlined
                        :error-messages="errors"
                        placeholder="Masukan Pertanyaan"
                      ></v-textarea>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Jawaban A"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.answer_a"
                        label="Jawaban A"
                        outlined
                        :error-messages="errors"
                        placeholder="Masukan Jawaban A"
                      ></v-text-field>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Jawaban B"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.answer_b"
                        label="Jawaban B"
                        outlined
                        :error-messages="errors"
                        placeholder="Masukan Jawaban B"
                      ></v-text-field>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Jawaban C"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.answer_c"
                        label="Jawaban C"
                        outlined
                        :error-messages="errors"
                        placeholder="Masukan Jawaban C"
                      ></v-text-field>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Jawaban D"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.answer_d"
                        label="Jawaban D"
                        outlined
                        :error-messages="errors"
                        placeholder="Masukan Jawaban D"
                      ></v-text-field>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Kunci Jawaban"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.kunci"
                        label="Kunci Jawaban"
                        placeholder="Pilih Kunci Jawaban"
                        outlined
                        :error-messages="errors"
                        :items="list.answers"
                        item-value="value"
                        item-text="text"
                      ></v-select>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="No Soal"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.no_soal"
                        label="No Soal"
                        outlined
                        :error-messages="errors"
                        placeholder="Masukan No Soal"
                      ></v-text-field>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Link Youtube"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.youtube"
                        label="Link Youtube"
                        outlined
                        :error-messages="errors"
                        placeholder="Masukan Link Youtube"
                      ></v-text-field>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col cols="12">
                  <div>
                    <div class="subtitle-1 tw-mb-1.5 tw-text-gray-600">
                      Gambar Thumbnail
                    </div>
                    <div>
                      <div
                        v-if="form.image.length === 0"
                        class="tw-w-full tw-bg-gray-100 tw-rounded-md tw-h-56 tw-flex tw-items-center tw-justify-center"
                      >
                        <v-btn
                          v-if="form.image.length === 0"
                          color="primary"
                          outlined
                          class="me-3"
                        >
                          <label
                            for="file-image"
                            class="tw-cursor-pointer"
                          >
                            <v-icon class="d-sm-none">
                              {{ icons.mdiCloudUploadOutline }}
                            </v-icon>
                            <span class="d-none d-sm-block">Pilih Gambar/GIF</span>
                          </label>
                        </v-btn>
                      </div>
                      <v-avatar
                        v-else
                        v-ripple
                        rounded
                        width="100%"
                        height="300"
                        class="me-6 tw-cursor-pointer"
                        @click="openDialogPreviewImage(form.image[0].url)"
                      >
                        <v-img :src="form.image[0].url"></v-img>
                      </v-avatar>
                    </div>
                    <div class="tw-grid tw-grid-cols-12 tw-gap-x-3 tw-items-center tw-mt-3">
                      <div class="tw-col-span-6">
                        <v-btn
                          v-if="form.image.length > 0"
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
                      <div class="tw-col-span-6">
                        <v-btn
                          v-if="form.image.length > 0"
                          color="error"
                          block
                          outlined
                          @click="removeItem(form.image[0])"
                        >
                          Reset
                        </v-btn>
                      </div>
                      <div class="tw-col-span-12">
                        <p class="tw-text-xs mt-4 tw-mb-2">
                          Allowed JPG, GIF or PNG. Max size of 2MB
                        </p>
                        <div
                          v-if="error_form.image !== ''"
                          class="tw-text-red-500 tw-text-sm"
                        >
                          {{ error_form.image }}
                        </div>
                        <div
                          v-else-if="form.image.length > 0"
                          class="tw-text-red-500 tw-text-sm"
                        >
                          <span v-if="form.image[0].error !== ''">
                            {{ form.image[0].error }}
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
                          v-model="form.image"
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
                      Submit
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
import { mdiArrowLeft, mdiWindowClose, mdiCloudUploadOutline } from '@mdi/js'
import LoadingOverlay from '@/components/LoadingOverlay.vue'

import { addTestQuestion } from '@/api/testQuestion'
import { listEducationContent } from '@/api/educationContent'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

export default {
  components: {
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
      error_form: {
        image: '',
      },
      loading: { get_data: false, create: false },
      preview_image: '',
      dialog: {
        preview_image: false,
      },
      form: {
        judul_soal: '',
        pertanyaan: '',
        kunci: '',
        edukasi_id: '',
        no_soal: '',
        answer_a: '',
        answer_b: '',
        answer_c: '',
        answer_d: '',
        youtube: '',
        image: [],
      },
      list: {
        educations: [],
        answers: [
          {
            value: 'answer_a',
            text: 'Pilihan A',
          },
          {
            value: 'answer_b',
            text: 'Pilihan B',
          },
          {
            value: 'answer_c',
            text: 'Pilihan C',
          },
          {
            value: 'answer_d',
            text: 'Pilihan D',
          },
        ],
      },
    }
  },
  mounted() {
    this.getListEducationContent()
  },
  methods: {
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
    async handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        this.error_form.image = ''

        if (this.form.image.length === 0) {
          this.error_form.image = 'Gambar Harus di isi Dulu!'

          return
        }

        if (this.form.image.length > 0) {
          if (this.form.image[0].error !== '' && this.form.image.length > 0) {
            return
          }
        }

        if (!success) {
          return
        }

        try {
          this.loading.create = true
          const res = await addTestQuestion({
            judul_soal: this.form.judul_soal,
            id_edukasi: this.form.edukasi_id,
            pertanyaan: this.form.pertanyaan,
            answer_a: this.form.answer_a,
            answer_b: this.form.answer_b,
            answer_c: this.form.answer_c,
            answer_d: this.form.answer_d,
            kunci: this.form.kunci,
            no_soal: this.form.no_soal,
            youtube: this.form.youtube,
            image: this.form.image[0].file,
          })

          const { data } = res
          if (data.status) {
            this.loading.create = false
            await this.$swal({
              title: 'Berhasil Menambah Data',
              icon: 'success',
              timer: 1000,
            })
            this.$router.push({ name: 'listTestQuestion' })
          } else {
            this.loading.create = false
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
