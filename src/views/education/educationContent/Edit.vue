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
        v-if="Object.keys(educationContent).length > 0 && Object.keys(list.categories).length > 0 && !loading.get_data"
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
                    :to="{ name: 'listEducationContent' }"
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
                  Tambah Edukasi Konten
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
                    name="Nama Konten"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.title"
                        label="Nama Konten"
                        outlined
                        :error-messages="errors"
                        placeholder="Masukan Nama Konten"
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
                    name="Edukasi Kategori"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.category_edu"
                        label="Edukasi Kategori"
                        outlined
                        :error-messages="errors"
                        :items="list.categories"
                        item-value="id"
                        item-text="category_name"
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
                    name="Edukasi Tipe"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.edu_type"
                        label="Edukasi Tipe"
                        outlined
                        :error-messages="errors"
                        :items="list.edu_types"
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
                    name="Durasi"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.durasi"
                        label="Durasi"
                        outlined
                        :error-messages="errors"
                        placeholder="Masukan Durasi"
                      ></v-text-field>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Status"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.status"
                        label="Status"
                        outlined
                        :error-messages="errors"
                        :items="list.status"
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
                  <div>
                    <v-text-field
                      v-model="form.amount"
                      label="Harga"
                      outlined
                      hint="Bila harga gratis tidak usah di isi, jika berbayar maka isi form ini"
                      persistent-hint
                      placeholder="Masukan Harga"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div v-if="form.sertifikat === '' || form.sertifikat === '-'">
                    <v-file-input
                      v-model="form_new.sertifikat"
                      placeholder="Upload Sertifikat"
                      label="Upload Sertifikat"
                      outlined
                      hint="Upload Sertifikat Doc Atau Kosongkan bila tak ada"
                      persistent-hint
                      :append-icon="icons.mdiPaperclip"
                      prepend-icon=""
                      show-size
                      @change="validationSertifikat"
                    >
                      <template v-slot:selection="{ text }">
                        <v-chip
                          small
                          label
                          color="primary"
                        >
                          {{ text }}
                        </v-chip>
                      </template>
                    </v-file-input>
                    <div
                      v-if="error_form.sertifikat !== ''"
                      class="tw-text-xs tw-text-red-500"
                    >
                      {{ error_form.sertifikat }}
                    </div>
                  </div>
                  <div v-else>
                    <div class="tw-flex tw-items-center tw-mb-2">
                      <div class="tw-text-base">
                        Sertifikat
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        <v-btn
                          outlined
                          color="primary"
                          small
                          @click="edit_sertifikat = !edit_sertifikat"
                        >
                          <span v-if="!edit_sertifikat">

                            Edit
                          </span>
                          <span v-else>

                            Kembali
                          </span>
                        </v-btn>
                      </div>
                    </div>
                    <div v-if="!edit_sertifikat">
                      <v-chip
                        color="primary"
                        class="tw-font-medium"
                      >
                        {{ form.sertifikat }}
                      </v-chip>
                    </div>
                    <div v-else>
                      <v-file-input
                        v-model="form_new.sertifikat"
                        placeholder="Upload Sertifikat"
                        label="Upload Sertifikat"
                        outlined
                        hint="Upload Sertifikat Doc Atau Kosongkan bila tak ada"
                        persistent-hint
                        :append-icon="icons.mdiPaperclip"
                        prepend-icon=""
                        show-size
                        @change="validationSertifikat"
                      >
                        <template v-slot:selection="{ text }">
                          <v-chip
                            small
                            label
                            color="primary"
                          >
                            {{ text }}
                          </v-chip>
                        </template>
                      </v-file-input>
                      <div
                        v-if="error_form.sertifikat !== ''"
                        class="tw-text-xs tw-text-red-500"
                      >
                        {{ error_form.sertifikat }}
                      </div>
                    </div>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Deskripsi"
                    rules="required"
                  >
                    <div>
                      <v-textarea
                        v-model="form.description"
                        rows="9"
                        label="Deskripsi"
                        outlined
                        auto-grow
                        :error-messages="errors"
                        placeholder="Masukan Deskripsi"
                      ></v-textarea>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div>
                      <div
                        v-if="form_new.image.length === 0"
                      >
                        <v-avatar
                          v-ripple
                          rounded
                          width="100%"
                          height="230"
                          class="me-6 tw-cursor-pointer"
                          @click="openDialogPreviewImage(base_url_image + form.image)"
                        >
                          <v-img :src="base_url_image + form.image"></v-img>
                        </v-avatar>
                      </div>
                      <v-avatar
                        v-else
                        v-ripple
                        rounded
                        width="100%"
                        height="230"
                        class="me-6 tw-cursor-pointer"
                        @click="openDialogPreviewImage(form_new.image[0].url)"
                      >
                        <v-img :src="form_new.image[0].url"></v-img>
                      </v-avatar>
                    </div>
                    <div class="tw-grid tw-grid-cols-12 tw-gap-x-3 tw-items-center tw-mt-3">
                      <div :class="form_new.image.length > 0 ? 'tw-col-span-6' : 'tw-col-span-12'">
                        <v-btn
                          v-if="form.image.length !== ''"
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
                        <div class="subtitle-1 tw-text-gray-600">
                          Gambar Edukasi Konten
                        </div>
                        <p class="tw-text-xs tw-mb-2">
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
import {
  mdiArrowLeft, mdiWindowClose, mdiPaperclip, mdiCloudUploadOutline,
} from '@mdi/js'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { listEducationCategory } from '@/api/educationCategory'
import { detailEducationContent, updateEducationContent } from '@/api/educationContent'

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
        mdiPaperclip,
        mdiCloudUploadOutline,
      },
      loading: {
        get_data: false,
        update: false,
      },
      error_form: {
        sertifikat: '',
      },
      edit_sertifikat: false,
      preview_image: '',
      dialog: {
        preview_image: false,
      },
      form_new: {
        image: [],
        sertifikat: [],
      },
      educationContent: {},
      list: {
        categories: [],
        edu_types: ['Materi Pembelajaran', 'Tipe Lain 1', 'Tipe Lain 2'],
        status: [
          {
            value: 1,
            text: 'Aktif',
          },
          {
            value: 0,
            text: 'Tidak Aktif',
          },
        ],
      },
    }
  },
  computed: {
    form: {
      get() {
        return this.educationContent
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
    await this.getListEducationCategories()
    await this.getDetailEducationContent()
  },
  methods: {
    validationSertifikat(e) {
      if (e !== null) {
        this.error_form.sertifikat = ''
        if (e.size > 2000000) {
          this.error_form.sertifikat = 'File size tidak boleh lebih dari 2MB'
        }
      } else {
        this.error_form.sertifikat = ''
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
    async getListEducationCategories() {
      this.loading.get_data = true
      const res = await listEducationCategory({
        page: 1,
        limit: 100,
        query: '',
      })
      const { data } = res

      if (data.status) {
        this.loading.get_data = false
        this.list.categories = data.data
      } else {
        this.loading.get_data = false
      }
    },
    async getDetailEducationContent() {
      this.loading.get_data = false
      const res = await detailEducationContent({ id: this.params_id })
      const { data } = res
      if (data.status) {
        this.loading.get_data = false
        this.educationContent = data.data
        // eslint-disable-next-line radix
        this.educationContent.status = parseInt(data.data.status)
      } else {
        this.loading.get_data = false
      }
    },
    async handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        if (this.form_new.image.length > 0) {
          if (this.form_new.image[0].error !== '' && this.form_new.image.length > 0) {
            return
          }
        }

        if (this.error_form.sertifikat !== '') {
          return
        }

        if (!success) {
          return
        }

        let sertifikat
        if (this.form_new.sertifikat.length === 0) sertifikat = '-'
        else sertifikat = this.form_new.sertifikat[0].file

        let image
        if (this.form_new.image.length > 0) image = this.form_new.image[0].file
        else image = []

        this.loading.update = true
        try {
          const res = await updateEducationContent({
            image,
            id: this.params_id,
            title: this.form.title,
            category_edu: this.form.category_edu,
            description: this.form.description,
            durasi: this.form.durasi,
            edu_type: this.form.edu_type,
            point: this.form.point,
            sertifikat,
            amount: this.form.amount,
            status: this.form.status,
          })

          const { data } = res
          if (data.status) {
            this.loading.update = false
            await this.$swal({
              title: 'Berhasil Merubah Data',
              icon: 'success',
              timer: 1000,
            })
            this.$router.push({ name: 'listEducationContent' })
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

<style></style>
