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
                  Edit
                  <span v-if="form.is_published === 1">
                    Published Konten
                  </span>
                  <span v-else>

                    Draft Konten
                  </span>
                </div>
              </v-col>
              <v-col
                cols="1"
                md="2"
              >
                <div class="tw-flex tw-justify-end">
                  <v-icon v-if="form.is_published === 1">
                    {{ icons.mdiSquareEditOutline }}
                  </v-icon>
                  <v-icon v-else>
                    {{ icons.mdiArchiveEditOutline }}
                  </v-icon>
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
                        v-if="form.thumbnail !== '' && form_new.thumbnail.length === 0"
                      >
                        <v-avatar
                          v-ripple
                          rounded
                          width="100%"
                          height="300"
                          class="me-6 tw-cursor-pointer"
                          @click="openDialogPreviewThumbnail(form.thumbnail)"
                        >
                          <v-img :src="form.thumbnail"></v-img>
                        </v-avatar>
                      </div>
                      <v-avatar
                        v-else
                        v-ripple
                        rounded
                        width="100%"
                        height="300"
                        class="me-6 tw-cursor-pointer"
                        @click="openDialogPreviewThumbnail(form_new.thumbnail[0].url)"
                      >
                        <v-img :src="form_new.thumbnail[0].url"></v-img>
                      </v-avatar>
                    </div>
                    <div class="tw-grid tw-grid-cols-12 tw-gap-x-3 tw-items-center tw-mt-3">
                      <div :class=" form_new.thumbnail.length > 0 ? 'tw-col-span-6' : 'tw-col-span-12'">
                        <v-btn
                          v-if="form.thumbnail !== ''"
                          color="warning"
                          block
                          class="me-3"
                        >
                          <label
                            for="file-thumbnail"
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
                        v-if="form_new.thumbnail.length > 0"
                        class="tw-col-span-6"
                      >
                        <v-btn

                          color="error"
                          block
                          outlined
                          @click="removeItem(form_new.thumbnail[0])"
                        >
                          Reset
                        </v-btn>
                      </div>
                      <div class="tw-col-span-12">
                        <p class="tw-text-xs mt-4 tw-mb-2">
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
                          v-model="form_new.thumbnail"
                          :multiple="false"
                          :drop="false"
                          input-id="file-thumbnail"
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
                    <div class="tw-flex tw-items-center tw-mb-1.5">
                      <div class="subtitle-1 tw-text-gray-600">
                        Thumbnail Konten Detail
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        <v-btn
                          small
                          color="primary"
                          class="text-none tw-tracking-wide tw-font-medium"
                          @click="changeTypeThumbnailDetail"
                        >
                          Ubah Jadi
                          <span
                            v-if="form.type_thumbnail_detail === 'Photo'"
                            class="tw-ml-0.5"
                          >
                            Video </span>
                          <span
                            v-else
                            class="tw-ml-0.5"
                          >
                            Photo
                          </span>
                        </v-btn>
                      </div>
                    </div>

                    <template v-if="form.type_thumbnail_detail === 'Photo'">
                      <div>
                        <div
                          v-if="form.thumbnail_detail !== '' && form_new.thumbnail_detail.length === 0"
                        >
                          <v-avatar
                            v-ripple
                            rounded
                            width="100%"
                            height="300"
                            class="me-6 tw-cursor-pointer"
                            @click="openDialogPreviewThumbnailDetail(form.thumbnail_detail)"
                          >
                            <v-img :src="form.thumbnail_detail"></v-img>
                          </v-avatar>
                        </div>
                        <v-avatar
                          v-else
                          v-ripple
                          rounded
                          width="100%"
                          height="300"
                          class="me-6 tw-cursor-pointer"
                          @click="openDialogPreviewThumbnailDetail(form_new.thumbnail_detail[0].url)"
                        >
                          <v-img :src="form_new.thumbnail_detail[0].url"></v-img>
                        </v-avatar>
                      </div>
                      <div class="tw-grid tw-grid-cols-12 tw-gap-x-3 tw-items-center tw-mt-3">
                        <div :class=" form_new.thumbnail.length > 0 ? 'tw-col-span-6' : 'tw-col-span-12'">
                          <v-btn
                            v-if="form.thumbnail_detail !== ''"
                            color="warning"
                            block
                            class="me-3"
                          >
                            <label
                              for="file-thumbnail-detail"
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
                          v-if="form_new.thumbnail.length > 0"
                          class="tw-col-span-6"
                        >
                          <v-btn
                            color="error"
                            block
                            outlined
                            @click="removeItemDetail(form_new.thumbnail_detail[0])"
                          >
                            Reset
                          </v-btn>
                        </div>
                        <div class="tw-col-span-12">
                          <p class="tw-text-xs mt-4 tw-mb-2">
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
                            ref="uploadThumbnailDetail"
                            v-model="form_new.thumbnail_detail"
                            input-id="file-thumbnail-detail"
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
                    </template>
                    <template v-else>
                      <div class="tw-mt-6">
                        <validation-provider
                          v-slot="{ errors }"
                          name="Video Url"
                          rules="required"
                        >
                          <div>
                            <v-text-field
                              v-model="form.video_detail"
                              label="Video Url"
                              outlined
                              :error-messages="errors"
                              placeholder="Your Video Url"
                            ></v-text-field>
                          </div>
                        </validation-provider>
                      </div>
                    </template>
                  </div>
                </v-col>
                <v-col
                  cols="12"
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
                        error_form.description !== '' ? 'tw-border-solid tw-border tw-border-red-500' : 'border-default-editor'
                      "
                    ></quill-editor>
                  </div>
                </v-col>
                <v-col
                  :offset-md="form.is_published === 1 ? 6 : 9"
                  md="3"
                  cols="6"
                >
                  <div>
                    <v-btn
                      block
                      outlined
                      :disabled="!checkIfFormFilledAtLeastOne()"
                      color="primary"
                      @click="handleSubmit"
                    >
                      Publish Draft
                    </v-btn>
                  </div>
                </v-col>
                <v-col
                  v-if="form.is_published === 1"
                  cols="6"
                  md="3"
                >
                  <div class="text-right">
                    <v-btn
                      block
                      type="submit"
                      color="primary"
                    >
                      Update Konten
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
            :src="preview.thumbnail"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog.preview_thumbnail_detail"
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
              @click="dialog.preview_thumbnail_detail = !dialog.preview_thumbnail_detail"
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
            :src="preview.thumbnail_detail"
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
  mdiArrowLeft, mdiCloudUploadOutline, mdiSquareEditOutline, mdiArchiveEditOutline,
} from '@mdi/js'
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
        mdiSquareEditOutline,
        mdiArchiveEditOutline,
      },
      error_form: {
        description: '',
      },
      preview: {
        thumbnail: '',
        thumbnail_detail: '',
      },
      dialog: {
        preview_thumbnail: false,
        preview_thumbnail_detail: false,
      },
      form_new: {
        thumbnail_detail: [],
        thumbnail: [],
      },
      content: {
        title: 'Alasan kenapa MU selalu kalah',
        thumbnail: 'https://ik.imagekit.io/1akf8cdsyg/hero-image_l2Vmkzr8X.png?updatedAt=1630582438014',
        thumbnail_detail: 'https://ik.imagekit.io/1akf8cdsyg/villa-1_Fxh92jz0eB.jpg?updatedAt=1630601351002',
        video_detail: '',
        category: 1,
        description: '<p>dsfdsfds</p>',
        create_by: 'dimas roger',
        is_feature: 'feature',
        type_thumbnail_detail: 'Photo',
        is_published: 0,
      },
      api: {
        video_detail: '',
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
  computed: {
    form: {
      get() {
        return this.content
      },
    },
  },
  destroyed() {
    console.log('test')

    this.handleSaveToDraft()
  },
  methods: {
    openDialogPreviewThumbnail(image) {
      this.preview.thumbnail = image
      this.dialog.preview_thumbnail = !this.dialog.preview_thumbnail
    },
    openDialogPreviewThumbnailDetail(image) {
      this.preview.thumbnail_detail = image
      this.dialog.preview_thumbnail_detail = !this.dialog.preview_thumbnail_detail
    },
    removeItem(file) {
      this.$refs.uploadThumbnail.remove(file)
    },
    removeItemDetail(file) {
      this.$refs.uploadThumbnailDetail.remove(file)
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
    changeTypeThumbnailDetail() {
      if (this.form.type_thumbnail_detail === 'Photo') {
        this.form_new.thumbnail_detail = []
        this.form.type_thumbnail_detail = 'Video'
      } else {
        this.form.video_detail = this.api.video_detail
        this.form.type_thumbnail_detail = 'Photo'
      }
    },
    checkIfFormFilledAtLeastOne() {
      let check = false
      if (this.form.title !== '') {
        check = true
      } else if (this.form.thumbnail.length > 0) {
        check = true
      } else if (this.form.thumbnail_detail.length > 0 || this.form.video_detail !== '') {
        check = true
      } else if (this.form.category !== '') {
        check = true
      } else if (this.form.description !== '') {
        check = true
      } else {
        check = false
      }

      return check
    },
    handleSaveToDraft(button) {
      const check = this.checkIfFormFilledAtLeastOne()
      if (check) {
        if (typeof button === 'undefined') {
          this.form.is_published = 0

          console.log(this.form)
        } else {
          this.$router.push({ name: 'listContentEdan' })
          this.form.is_published = 0

          console.log(this.form)
        }
      }
    },
    handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        this.error_form.description = ''

        if (this.form.description === '') {
          this.error_form.thumbnail = 'Isi Konten Harus di isi Dulu!'

          return
        }
        if (!success) {
          return
        }

        this.form.is_published = 1
        let photoThumbnailDetail = ''
        let videoThumbnailDetail = ''
        if (this.form_new.thumbnail_detail.length === 0 && this.form.video_detail !== '') {
          photoThumbnailDetail = ''
          videoThumbnailDetail = this.form.video_detail
        } else if (this.form_new.thumbnail_detail.length > 0 && this.form.video_detail === '') {
          photoThumbnailDetail = this.form_new.thumbnail_detail
          videoThumbnailDetail = ''
        } else {
          photoThumbnailDetail = this.form.thumbnail_detail
          videoThumbnailDetail = ''
        }

        console.log(photoThumbnailDetail)
        console.log(videoThumbnailDetail)
        console.log(this.form)

        // this.$router.push({ name: 'listContentEdan' })

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
