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
                    :to="{ name: 'listBanner' }"
                  >
                    <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
                  </v-btn>
                </div>
              </v-col>
              <v-col
                cols="9"
                md="7"
              >
                <div class="tw-text-center tw-text-base md:tw-text-xl">
                  Tambah Banner
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
                    name="Tipe Media 1"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.type_one"
                        label="Tipe Media 1"
                        outlined
                        :error-messages="errors"
                        :items="list.types"
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
                    name="Tipe Media 2"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.type_two"
                        label="Tipe Media 2"
                        outlined
                        :error-messages="errors"
                        :items="list.types"
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
                  <div v-if="form.type_one === 'image'">
                    <div class="subtitle-1 tw-mb-1.5 tw-text-gray-600">
                      Media 1
                    </div>

                    <div>
                      <div
                        v-if="form.media_one.length === 0"
                        class="tw-w-full tw-bg-gray-100 tw-rounded-md tw-h-56 tw-flex tw-items-center tw-justify-center"
                      >
                        <v-btn
                          v-if="form.media_one.length === 0"
                          color="primary"
                          outlined
                          class="me-3"
                        >
                          <label
                            for="file-image-1"
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
                        @click="openDialogPreviewImage(form.media_one[0].url)"
                      >
                        <v-img :src="form.media_one[0].url"></v-img>
                      </v-avatar>
                    </div>
                    <div class="tw-grid tw-grid-cols-12 tw-gap-x-3 tw-items-center tw-mt-3">
                      <div class="tw-col-span-6">
                        <v-btn
                          v-if="form.media_one.length > 0"
                          color="warning"
                          block
                          class="me-3"
                        >
                          <label
                            for="file-image-1"
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
                          v-if="form.media_one.length > 0"
                          color="error"
                          block
                          outlined
                          @click="removeItem(form.media_one[0])"
                        >
                          Reset
                        </v-btn>
                      </div>
                      <div class="tw-col-span-12">
                        <p class="tw-text-xs mt-4 tw-mb-2">
                          Allowed JPG, GIF or PNG. Max size of 2MB
                        </p>
                        <div
                          v-if="error_form.media_one !== ''"
                          class="tw-text-red-500 tw-text-sm"
                        >
                          {{ error_form.media_one }}
                        </div>
                        <div
                          v-else-if="form.media_one.length > 0"
                          class="tw-text-red-500 tw-text-sm"
                        >
                          <span v-if="form.media_one[0].error !== ''">

                            {{ form.media_one[0].error }}
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
                          v-model="form.media_one"
                          :multiple="false"
                          :drop="false"
                          accept="image/png,image/gif,image/jpeg, image/jpg"
                          input-id="file-image-1"
                          @input-filter="inputFilter"
                        >
                          <i class="fa fa-plus"></i>
                          Select files
                        </file-upload>
                      </div>
                    </div>
                    <!-- end -->
                  </div>
                  <div
                    v-else
                    class="tw-mt-8"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      name="Url Ads 1"
                      rules="required"
                    >
                      <div>
                        <v-text-field
                          v-model="form.ads_one"
                          label="Url Ads 1"
                          outlined
                          :error-messages="errors"
                          placeholder="Masukan Url Ads 1"
                        ></v-text-field>
                      </div>
                    </validation-provider>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div v-if="form.type_two === 'image'">
                    <div class="subtitle-1 tw-mb-1.5 tw-text-gray-600">
                      Media 2
                    </div>

                    <div>
                      <div
                        v-if="form.media_two.length === 0"
                        class="tw-w-full tw-bg-gray-100 tw-rounded-md tw-h-56 tw-flex tw-items-center tw-justify-center"
                      >
                        <v-btn
                          v-if="form.media_two.length === 0"
                          color="primary"
                          outlined
                          class="me-3"
                        >
                          <label
                            for="file-image-2"
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
                        @click="openDialogPreviewImage(form.media_two[0].url)"
                      >
                        <v-img :src="form.media_two[0].url"></v-img>
                      </v-avatar>
                    </div>
                    <div class="tw-grid tw-grid-cols-12 tw-gap-x-3 tw-items-center tw-mt-3">
                      <div class="tw-col-span-6">
                        <v-btn
                          v-if="form.media_two.length > 0"
                          color="warning"
                          block
                          class="me-3"
                        >
                          <label
                            for="file-image-2"
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
                          v-if="form.media_two.length > 0"
                          color="error"
                          block
                          outlined
                          @click="removeItem(form.media_two[0])"
                        >
                          Reset
                        </v-btn>
                      </div>
                      <div class="tw-col-span-12">
                        <p class="tw-text-xs mt-4 tw-mb-2">
                          Allowed JPG, GIF or PNG. Max size of 2MB
                        </p>
                        <div
                          v-if="error_form.media_two !== ''"
                          class="tw-text-red-500 tw-text-sm"
                        >
                          {{ error_form.media_two }}
                        </div>
                        <div
                          v-else-if="form.media_two.length > 0"
                          class="tw-text-red-500 tw-text-sm"
                        >
                          <span v-if="form.media_two[0].error !== ''">

                            {{ form.media_two[0].error }}
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
                          v-model="form.media_two"
                          :multiple="false"
                          :drop="false"
                          accept="image/png,image/gif,image/jpeg, image/jpg"
                          input-id="file-image-2"
                          @input-filter="inputFilter"
                        >
                          <i class="fa fa-plus"></i>
                          Select files
                        </file-upload>
                      </div>
                    </div>
                    <!-- end -->
                  </div>
                  <div
                    v-else
                    class="tw-mt-8"
                  >
                    <validation-provider
                      v-slot="{ errors }"
                      name="Url Ads 2"
                      rules="required"
                    >
                      <div>
                        <v-text-field
                          v-model="form.ads_two"
                          label="Url Ads 2"
                          outlined
                          :error-messages="errors"
                          placeholder="Masukan Url Ads 2"
                        ></v-text-field>
                      </div>
                    </validation-provider>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <template v-if="form.type_one === 'script'">
                    <div>
                      <v-text-field
                        v-model="form.target_url_one"
                        label="Target Url 1"
                        outlined
                        persistent-hint
                        :disabled="form.type_one === 'script'"
                        hint="bila tipe medianya script form ini kosongkan saja"
                        placeholder="Masukan Target Url 1"
                      ></v-text-field>
                    </div>
                  </template>
                  <template v-else>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Target Url 1"
                      rules="required"
                    >
                      <div>
                        <v-text-field
                          v-model="form.target_url_one"
                          label="Target Url 1"
                          outlined
                          persistent-hint
                          hint="bila tipe medianya script form ini kosongkan saja"
                          :error-messages="errors"
                          placeholder="Masukan Target Url 1"
                        ></v-text-field>
                      </div>
                    </validation-provider>
                  </template>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <template v-if="form.type_two === 'script'">
                    <div>
                      <v-text-field
                        v-model="form.target_url_two"
                        label="Target Url 2"
                        outlined
                        persistent-hint
                        :disabled="form.type_two === 'script'"
                        hint="bila tipe medianya script form ini kosongkan saja"
                        placeholder="Masukan Target Url 2"
                      ></v-text-field>
                    </div>
                  </template>
                  <template v-else>
                    <validation-provider
                      v-slot="{ errors }"
                      name="Target Url 2"
                      rules="required"
                    >
                      <div>
                        <v-text-field
                          v-model="form.target_url_two"
                          label="Target Url 2"
                          outlined
                          persistent-hint
                          hint="bila tipe medianya script form ini kosongkan saja"
                          :error-messages="errors"
                          placeholder="Masukan Target Url 2"
                        ></v-text-field>
                      </div>
                    </validation-provider>
                  </template>
                </v-col>
                <v-col
                  cols="12"
                  md="12"
                >
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
import { mdiArrowLeft, mdiCloudUploadOutline, mdiWindowClose } from '@mdi/js'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { addBannerAds } from '@/api/bannerAds'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

export default {
  components: {
    FileUpload,
    LoadingOverlay,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiCloudUploadOutline,
        mdiWindowClose,
      },
      loading: { create: false },
      error_form: {
        media_one: '',
        media_two: '',
      },
      preview_image: '',
      dialog: {
        preview_image: false,
      },
      form: {
        media_one: [],
        media_two: [],
        ads_one: '',
        ads_two: '',
        target_url_one: '',
        target_url_two: '',
        type_one: 'image',
        type_two: 'image',
        created_by: '',
      },
      list: {
        types: [
          {
            value: 'image',
            text: 'Image',
          },
          {
            value: 'script',
            text: 'Script Ads',
          },
        ],
      },
    }
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
    handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        this.error_form.media_one = ''
        this.error_form.media_two = ''

        if (this.form.type_one === 'image') {
          if (this.form.media_one.length === 0) {
            this.error_form.media_one = 'Gambar Harus di isi Dulu!'

            return
          }

          if (this.form.media_one.length > 0) {
            if (this.form.media_one[0].error !== '' && this.form.media_one.length > 0) {
              return
            }
          }
        }

        if (this.form.type_two === 'image') {
          if (this.form.media_two.length === 0) {
            this.error_form.media_two = 'Gambar Harus di isi Dulu!'

            return
          }

          if (this.form.media_two.length > 0) {
            if (this.form.media_two[0].error !== '' && this.form.media_two.length > 0) {
              return
            }
          }
        }

        if (!success) {
          return
        }

        this.form.created_by = this.$store.state.auth.profile.user_id

        let mediaOne
        if (this.form.type_one === 'script') {
          mediaOne = this.form.ads_one
        } else {
          mediaOne = this.form.media_one[0].file
        }

        let mediaTwo
        if (this.form.type_two === 'script') {
          mediaTwo = this.form.ads_two
        } else {
          mediaTwo = this.form.media_two[0].file
        }

        try {
          this.loading.create = true
          const res = await addBannerAds({
            media_one: mediaOne,
            media_two: mediaTwo,
            target_url_one: this.form.target_url_one,
            target_url_two: this.form.target_url_two,
            type_one: this.form.type_one,
            type_two: this.form.type_two,
            user_id: this.form.created_by,
          })

          const { data } = res
          if (data.status) {
            this.loading.create = false
            await this.$swal({
              title: 'Berhasil Menambah Data',
              icon: 'success',
              timer: 1000,
            })
            this.$router.push({ name: 'listBannerAds' })
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
