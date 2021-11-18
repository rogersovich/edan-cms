<template>
  <div>
    <v-row
      v-if="Object.keys(form_edit).length > 0"
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
                    :to="{name: 'villaGallery'}"
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
                  Edit Villa Gallery
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit">
              <div>
                <div class="tw-mb-1.5 subtitle-1">
                  Villa
                </div>
                <v-select
                  v-model="form_edit.villa_id"
                  :items="list.villas"
                  item-value="id"
                  :item-text="item => `${item.sub_category.title} ${item.sub_category_value}`"
                  placeholder="Pilih Villa"
                  outlined
                  dense
                ></v-select>
              </div>
              <div>
                <div class="tw-mb-1.5 subtitle-1">
                  Gambar Villa
                </div>
                <div>
                  <div class="tw-mt-4 tw-mb-5">
                    <v-row>
                      <v-col
                        v-if="form.new_image.length === 0"
                        cols="12"
                      >
                        <div class="tw-text-center tw-relative">
                          <v-avatar
                            rounded
                            size="150"
                          >
                            <v-img :src="`http://127.0.0.1:8000/storage/${form_edit.image}`"></v-img>
                          </v-avatar>
                          <div class="tw-text-center tw-mt-2">
                            <v-btn
                              small
                              color="#22C55E"
                              class="text-none tw-text-white tw-font-bold"
                            >
                              <label for="file">
                                Edit
                                <v-icon right>
                                  {{ icons.mdiPencilOutline }}
                                </v-icon>
                              </label>
                            </v-btn>

                            <v-btn
                              small
                              color="primary"
                              class="text-none tw-text-white tw-ml-2 tw-font-bold"
                              @click="handlePreviewImage(`http://127.0.0.1:8000/storage/${form_edit.image}`)"
                            >
                              Lihat
                              <v-icon right>
                                {{ icons.mdiEyeOutline }}
                              </v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </v-col>
                      <v-col
                        v-else
                        cols="12"
                      >
                        <div class="tw-text-center">
                          <v-avatar
                            rounded
                            size="150"
                          >
                            <v-img :src="form.new_image[0].url"></v-img>
                          </v-avatar>
                          <div class="tw-text-center tw-mt-2">
                            <v-btn
                              small
                              color="#E11D48"
                              class="text-none tw-text-white tw-font-bold"
                              @click="removeItem(form.new_image[0])"
                            >
                              Hapus
                              <v-icon right>
                                {{ icons.mdiTrashCanOutline }}
                              </v-icon>
                            </v-btn>

                            <v-btn
                              small
                              color="primary"
                              class="text-none tw-text-white tw-ml-2 tw-font-bold"
                              @click="handlePreviewImage(form.new_image[0].url)"
                            >
                              Lihat
                              <v-icon right>
                                {{ icons.mdiEyeOutline }}
                              </v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                  </div>
                  <div>
                    <div
                      depressed
                      class="tw-shadow-md tw-hidden"
                    >
                      <file-upload
                        ref="uploadVillaImages"
                        v-model="form.new_image"
                        :multiple="true"
                        :drop="false"
                        @input-filter="inputFilter"
                      >
                        <i class="fa fa-plus"></i>
                        Select files
                      </file-upload>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-right tw-mt-5">
                <v-btn
                  type="submit"
                  width="150"
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
      v-model="dialog.preview_image"
      max-width="480"
    >
      <v-card>
        <v-img :src="form.preview_image"></v-img>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
import {
  mdiArrowLeft, mdiStar, mdiEyeOutline, mdiTrashCanOutline, mdiPencilOutline,
} from '@mdi/js'
import { detailData, updateData } from '@/api/villaGallery'
import { allDataWithoutPaginate } from '@/api/villa'

export default {
  components: {
    FileUpload,
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiStar,
        mdiEyeOutline,
        mdiTrashCanOutline,
        mdiPencilOutline,
      },
      dialog: {
        preview_image: '',
      },
      form: {
        new_image: [],
        preview_image: '',
      },
      list: {
        villas: [],
        villa_image: {},
      },
    }
  },
  computed: {
    form_edit: {
      get() {
        return this.list.villa_image
      },
    },
  },
  async mounted() {
    await this.getAllDataVilla()
    await this.getDetailData()
  },
  methods: {
    removeItem(file) {
      this.$refs.uploadVillaImages.remove(file)
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
    async getAllDataVilla() {
      const { data } = await allDataWithoutPaginate()
      this.list.villas = data
    },
    async getDetailData() {
      const data = await detailData({ id: this.$route.params.id })

      if (Object.keys(data.data).length > 0) this.list.villa_image = data.data
      else this.$router.push({ name: 'villa' })
    },
    handlePreviewImage(image) {
      this.form.preview_image = image
      this.dialog.preview_image = !this.dialog.preview_image
    },
    async handleSubmit() {
      const { id } = this.$route.params
      try {
        await updateData({
          thumbnail: this.form_edit.image,
          new_image: this.form.new_image.length > 0 ? this.form.new_image[0].file : [],
          // eslint-disable-next-line radix
          villa_id: parseInt(this.form_edit.villa_id),
          id,
        })

        this.form_error = ''

        this.$router.push({ name: 'villaGallery' })
      } catch (error) {
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

<style></style>
