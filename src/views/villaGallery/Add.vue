<template>
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
            <v-col cols="3">
              <div>
                <v-btn
                  icon
                  @click="$router.go(-1)"
                >
                  <v-icon>{{ icons.mdiArrowLeft }}</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="6">
              <div class="tw-text-center">
                Tambah Villa Gallery
              </div>
            </v-col>
          </v-row>
        </v-card-title>
        <v-card-text>
          <v-form>
            <div>
              <div class="tw-mb-1.5 subtitle-1">
                Villa
              </div>
              <v-select
                v-model="form.villa_id"
                :items="list.villas"
                item-value="id"
                item-text="title"
                placeholder="Pilih Villa"
                outlined
                dense
              ></v-select>
            </div>
            <div>
              <div class="tw-mb-1.5 subtitle-1">
                Gambar Villa
              </div>

              <!-- upload gambar sampul -->
              <div>
                <div
                  v-if="form.thumbnail.length === 0"
                  class="tw-border-2 tw-border-dashed tw-border-gray-200 tw-py-6 tw-mt-4 tw-mb-5"
                >
                  <label for="file">
                    <div class="tw-flex">
                      <v-img
                        contain
                        :height="100"
                        :src="require('@/assets/images/misc/img-upload.svg')"
                      > </v-img>
                    </div>
                    <div class="tw-font-semibold tw-text-center tw-text-sm tw-text-gray-800 tw-mt-3">
                      Browse image
                      <span class="tw-text-blue-500">
                        here
                      </span>
                    </div>
                  </label>
                </div>
                <div
                  v-else
                  class="tw-mt-4 tw-mb-5"
                >
                  <v-row>
                    <v-col
                      v-for="(thumb, i) in form.thumbnail"
                      :key="i"
                      cols="3"
                    >
                      <div class="tw-text-center">
                        <v-avatar
                          rounded
                          size="120"
                        >
                          <v-img :src="thumb.url"></v-img>
                        </v-avatar>
                        <div class="tw-text-center tw-mt-2">
                          <v-btn
                            small
                            color="#E11D48"
                            class="text-none tw-text-white"
                            @click="removeItem(form.thumbnail[i])"
                          >
                            Hapus
                          </v-btn>
                        </div>
                      </div>
                    </v-col>
                    <v-col
                      cols="3"
                      class="tw-flex tw-items-center tw-justify-center"
                    >
                      <div class="tw-text-center">
                        <div>
                          <v-avatar
                            size="120"
                            tile
                          >
                            <v-img
                              contain
                              :src="require('@/assets/images/misc/img-upload.svg')"
                            >
                            </v-img>
                          </v-avatar>
                        </div>
                        <div class="tw-text-center tw-mt-2">
                          <v-btn
                            small
                            color="#22C55E"
                            class="text-none tw-text-white"
                          >
                            <label for="file">Tambah Gambar</label>
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
                      v-model="form.thumbnail"
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
              <!-- end -->
            </div>
            <div class="text-right tw-mt-5">
              <v-btn color="primary">
                Submit
              </v-btn>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import FileUpload from 'vue-upload-component'
import { mdiArrowLeft, mdiCloudUploadOutline, mdiPlus } from '@mdi/js'

export default {
  components: {
    FileUpload,
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiCloudUploadOutline,
        mdiPlus,
      },
      form: {
        villa_id: '',
        image: [],
        thumbnail: [],
      },
      list: {
        villas: [
          {
            id: 1,
            title: 'Mawar',
          },
          {
            id: 2,
            title: 'Melati',
          },
          {
            id: 3,
            title: 'Kamboja',
          },
        ],
      },
    }
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
  },
}
</script>

<style></style>
