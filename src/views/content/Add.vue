<template>
  <validation-observer
    ref="formSubmit"
  >
    <v-row
      class="match-height"
      align="center"
      justify="center"
    >
      <v-col
        cols="12"
        md="12"
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
                    :to="{name: 'listContentEdan'}"
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
                  Tambah Konten
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="subtitle-1 tw-mb-1.5 tw-text-gray-600">
                      Thumbnail Konten
                    </div>

                    <div>
                      <div
                        v-if="form.thumbnail.length === 0"
                        class="tw-w-full tw-bg-gray-100 tw-rounded-md tw-h-56 tw-flex tw-items-center tw-justify-center"
                      >
                        <v-btn
                          v-if="form.thumbnail.length === 0"
                          color="primary"
                          outlined
                          class="me-3"
                        >
                          <label
                            for="file"
                            class="tw-cursor-pointer"
                          >
                            <v-icon class="d-sm-none">
                              {{ icons.mdiCloudUploadOutline }}
                            </v-icon>
                            <span class="d-none d-sm-block">Upload</span>
                          </label>
                        </v-btn>
                      </div>
                      <v-avatar
                        v-else
                        v-ripple
                        rounded
                        width="100%"
                        height="auto"
                        class="me-6 tw-cursor-pointer"
                        @click="openDialogPreviewThumbnail"
                      >
                        <v-img :src="form.thumbnail[0].url"></v-img>
                      </v-avatar>
                    </div>
                    <div class="tw-grid tw-grid-cols-12 tw-gap-x-3 tw-items-center tw-mt-3">
                      <div class="tw-col-span-6">
                        <v-btn
                          v-if="form.thumbnail.length > 0"
                          color="warning"
                          block
                          class="me-3"
                        >
                          <label for="file">
                            <v-icon class="d-sm-none">
                              {{ icons.mdiCloudUploadOutline }}
                            </v-icon>
                            <span class="d-none d-sm-block">Ubah</span>
                          </label>
                        </v-btn>
                      </div>
                      <div class="tw-col-span-6">
                        <v-btn
                          v-if="form.thumbnail.length > 0"
                          color="error"
                          block
                          outlined
                          @click="removeItem(form.thumbnail[0])"
                        >
                          Reset
                        </v-btn>
                      </div>
                      <div class="tw-col-span-12">
                        <p class="tw-text-xs mt-4 tw-mb-2">
                          Allowed JPG, GIF or PNG. Max size of 800K
                        </p>
                        <div
                          v-if="error_form.thumbnail !== ''"
                          class="tw-text-red-500 tw-text-sm"
                        >
                          {{ error_form.thumbnail }}
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
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="subtitle-1 tw-mb-1.5 tw-text-gray-600">
                      Feature
                    </div>

                    <v-radio-group
                      v-model="form.is_feature"
                      row
                    >
                      <v-radio
                        label="Feature"
                        value="feature"
                      ></v-radio>
                      <v-radio
                        label="Not Feature"
                        value="not-feature"
                      ></v-radio>
                    </v-radio-group>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Title"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.title"
                        label="Title"
                        outlined
                        :error-messages="errors"
                        placeholder="Your Title"
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
                    name="Category"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.category"
                        :items="list.categories"
                        item-text="text"
                        item-value="key"
                        label="Category"
                        outlined
                        :error-messages="errors"
                      ></v-select>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col
                  cols="12"
                >
                  <div>
                    <div class="subtitle-1 tw-mb-1.5">
                      Deskripsi
                    </div>

                    <quill-editor
                      :title.sync="form.description"
                      :class="
                        error_form.thumbnail !== '' ? 'tw-border-solid tw-border tw-border-red-500' : 'border-default-editor'
                      "
                    ></quill-editor>
                  </div>
                </v-col>
                <v-col
                  offset-md="6"
                  md="3"
                  cols="6"
                >
                  <div>
                    <v-btn
                      block
                      outlined
                      color="primary"
                      @click="handleSaveToDraft"
                    >
                      Save As Draft
                    </v-btn>
                  </div>
                </v-col>
                <v-col
                  cols="6"
                  md="3"
                >
                  <div class="text-right">
                    <v-btn
                      block
                      type="submit"
                      color="primary"
                    >
                      Publish
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
  </validation-observer>
</template>

<script>
import FileUpload from 'vue-upload-component'
import { required } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate'
import { mdiArrowLeft, mdiCloudUploadOutline } from '@mdi/js'
import QuillEditor from '@/components/QuillEditor.vue'

setInteractionMode('eager')

extend('required', {
  ...required,
  message: '{_field_} can not be empty',
})

// import { storeData } from '@/api/subCategory'

export default {
  components: {
    FileUpload,
    QuillEditor,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiCloudUploadOutline,

      },
      error_form: {
        thumbnail: '',
        description: '',
      },
      dialog: {
        preview_thumbnail: false,
      },
      form: {
        title: '',
        thumbnail: [],
        category: '',
        description: '',
        create_by: 'dimas roger',
        is_feature: 'feature',
      },
      list: {
        categories: [
          {
            key: 1,
            text: 'Edukasi',
          },
          {
            key: 2,
            text: 'Info',
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
    handleSaveToDraft() {
      this.$refs.formSubmit.validate().then(async success => {
        this.error_form.thumbnail = ''
        this.error_form.description = ''
        if (this.form.thumbnail.length === 0) {
          this.error_form.thumbnail = 'Gambar Harus di isi Dulu!'

          return
        }

        if (this.form.description === '') {
          this.error_form.thumbnail = 'Isi Konten Harus di isi Dulu!'

          return
        }
        if (!success) {
          return
        }

        console.log(this.form)
        this.$router.push({ name: 'listContentEdan' })

        // const data = await storeData({
        //   username: this.form.username,
        // })
        // if (data.status === 200) this.$router.push({ name: 'subCategory' })
      })
    },
    handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        this.error_form.thumbnail = ''
        this.error_form.description = ''
        if (this.form.thumbnail.length === 0) {
          this.error_form.thumbnail = 'Gambar Harus di isi Dulu!'

          return
        }

        if (this.form.description === '') {
          this.error_form.thumbnail = 'Isi Konten Harus di isi Dulu!'

          return
        }
        if (!success) {
          return
        }

        console.log(this.form)
        this.$router.push({ name: 'listContentEdan' })

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
