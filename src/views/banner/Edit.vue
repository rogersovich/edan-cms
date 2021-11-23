<template>
  <validation-observer ref="formSubmit">
    <v-row
      class="match-height"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="8"
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
                  Edit Banner
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col
                  cols="12"
                >
                  <div>
                    <div class="subtitle-1 tw-mb-1.5 tw-text-gray-600">
                      Gambar Banner
                    </div>

                    <div>
                      <div v-if="form_new.image.length === 0">
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
                            <span class="d-none d-sm-block">Ubah Gambar/GIF</span>
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
                <v-col
                  cols="12"
                  md="12"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Url Target"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.url_target"
                        label="Url Target"
                        outlined
                        :error-messages="errors"
                        placeholder="Your Url Target"
                      ></v-text-field>
                    </div>
                  </validation-provider>
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

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

// import { storeData } from '@/api/subCategory'

export default {
  components: {
    FileUpload,
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
      preview_image: '',
      dialog: {
        preview_image: false,
      },
      form_new: {
        image: [],
      },
      banner: {
        url_target: 'https://www.youtube.com/watch?v=sz2SAH8lRDg&list=RDMM&index=11',
        image: 'https://ik.imagekit.io/1akf8cdsyg/default-image.jpg?updatedAt=1603090451561',
        create_by: 'Ikan Barang',
      },
      list: {},
    }
  },
  computed: {
    form: {
      get() {
        return this.banner
      },
    },
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
        if (this.form_new.image.length > 0) {
          if (this.form_new.image[0].error !== '' && this.form_new.image.length > 0) {
            return
          }
        }

        if (!success) {
          return
        }

        // this.form.create_by = this.$store.state.dummy.user
        console.log(this.form)

        this.$router.push({ name: 'listBanner' })

        // const data = await storeData({
        //   username: this.form.username,
        // })
        // if (data.status === 200) this.$router.push({ name: 'subCategory' })
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
