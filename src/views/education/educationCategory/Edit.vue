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
        v-if="Object.keys(educationCategory).length > 0 && !loading.get_data"
        cols="12"
        md="8"
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
                    exact
                    icon
                    :to="{ name: 'listEducationCategory' }"
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
                  Edit Edukasi Kategori
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="tw-mt-5">
            <v-form @submit.prevent="handleSubmit">
              <v-row dense>
                <v-col cols="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Category name"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.category_name"
                        label="Category name"
                        outlined
                        :error-messages="errors"
                        placeholder="Your Category name"
                      ></v-text-field>
                    </div>
                  </validation-provider>
                </v-col>
                <!-- <v-col cols="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Urutan"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.order"
                        label="Urutan"
                        outlined
                        :error-messages="errors"
                        :items="list.orders"
                        item-value="order"
                        :item-text="item => item.category_name + '-' + item.order"
                      ></v-select>
                    </div>
                  </validation-provider>
                </v-col> -->
                <v-col cols="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Deskripsi"
                    rules="required"
                  >
                    <div>
                      <v-textarea
                        v-model="form.description"
                        label="Deskripsi"
                        outlined
                        :error-messages="errors"
                        placeholder="Masukan Deskripsi"
                      ></v-textarea>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col cols="12">
                  <div>
                    <div class="subtitle-1 tw-mb-1.5 tw-text-gray-600">
                      Gambar
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
                      color="primary"
                      type="submit"
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
import { mdiArrowLeft, mdiWindowClose, mdiCloudUploadOutline } from '@mdi/js'
import { required } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { detailEducationCategory, updateEducationCategory } from '@/api/educationCategory'

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
      educationCategory: {},
    }
  },
  computed: {
    form: {
      get() {
        return this.educationCategory
      },
    },
    params_id() {
      return this.$route.params.id
    },
    base_url_image() {
      return process.env.VUE_APP_API
    },
  },
  mounted() {
    this.getDetailEducationCategory()
  },
  methods: {
    async getDetailEducationCategory() {
      this.loading.get_data = false
      const res = await detailEducationCategory({ id: this.params_id })
      const { data } = res
      if (data.status) {
        this.loading.get_data = false
        this.educationCategory = data.data
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
        if (this.form_new.image.length > 0) {
          if (this.form_new.image[0].error !== '' && this.form_new.image.length > 0) {
            return
          }
        }

        if (!success) {
          return
        }

        this.loading.update = true

        try {
          let image
          if (this.form_new.image.length > 0) image = this.form_new.image[0].file
          else image = []
          const res = await updateEducationCategory({
            image,
            id: this.params_id,
            category_name: this.form.category_name,
            description: this.form.description,
          })

          const { data } = res
          if (data.status) {
            this.loading.update = false
            await this.$swal({
              title: 'Berhasil Merubah Data',
              icon: 'success',
              timer: 1000,
            })
            this.$router.push({ name: 'listEducationCategory' })
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
