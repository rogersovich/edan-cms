<template>
  <div>
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
          <v-card-title class="tw-block">
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
                  Edit Villa Gallery
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
                <div class="tw-flex tw-items-center">
                  <div class="tw-mb-1.5 subtitle-1">
                    Gambar Villa
                  </div>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="!form.is_edit"
                    small
                    depressed
                    color="#22C55E"
                    class="text-none tw-text-white tw-font-bold"
                    @click="toggleIsEditImage"
                  >
                    Edit
                  </v-btn>
                </div>
                <div
                  v-if="list.villa_galleries.length > 0 && !form.is_edit"
                  class="tw-mt-4"
                >
                  <v-row>
                    <v-col
                      v-for="(item, i) in list.villa_galleries"
                      :key="i"
                      cols="3"
                    >
                      <div class="tw-text-center">
                        <v-avatar
                          rounded
                          size="120"
                        >
                          <v-img :src="item.image"></v-img>
                        </v-avatar>
                      </div>
                    </v-col>
                  </v-row>
                </div>
                <div v-else>
                  <div
                    v-if="form.thumbnail_old.length === 0"
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
                        v-for="(thumb, i) in form.thumbnail_old"
                        :key="i + 'old'"
                        cols="3"
                      >
                        <div class="tw-text-center tw-relative">
                          <v-avatar
                            rounded
                            size="120"
                          >
                            <v-img
                              :src="thumb.image"
                            >
                            </v-img>
                          </v-avatar>
                          <div class="tw-text-center tw-mt-2">
                            <v-btn
                              small
                              color="#E11D48"
                              class="text-none tw-text-white"
                              @click="openDialogDeleteOldImage(thumb.image)"
                            >
                              Hapus Permanen
                            </v-btn>
                          </div>
                        </div>
                      </v-col>
                      <v-col
                        v-for="(thumb, i) in form.thumbnail"
                        :key="i + 'new'"
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

    <v-dialog
      v-model="dialog.delete_old_image"
      max-width="480"
    >
      <v-card>
        <v-card-title>
          <div class="tw-text-true-gray-800">
            Ingin Menghapus Gambar ini ?
          </div>
        </v-card-title>
        <v-card-text>
          <div class="tw-mb-3">
            Jika anda menghapus gambar ini, gambar akan permanen terhapus dan tidak bisa di balikan kembali
          </div>
          <v-img
            contain
            height="300"
            :src="form.preview_thumbnail_old"
          ></v-img>
        </v-card-text>
        <v-card-actions class="tw-justify-end">
          <div>
            <v-btn
              text
              class="text-none tw-mr-2"
              color="#E11D48"
              @click="dialog.delete_old_image = !dialog.delete_old_image"
            >
              Tidak Jadi
            </v-btn>
            <v-btn
              class="text-none"
              color="primary"
              @click="handleDeleteOldImage"
            >
              Ya, Hapus
            </v-btn>
          </div>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FileUpload from 'vue-upload-component'
import { mdiArrowLeft, mdiStar } from '@mdi/js'

export default {
  components: {
    FileUpload,
  },
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiStar,
      },
      dialog: {
        delete_old_image: false,
      },
      form: {
        villa_id: 2,
        is_edit: false,
        preview_thumbnail_old: '',
        thumbnail_old: [],
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
        villa_galleries: [
          {
            image: 'https://ik.imagekit.io/1akf8cdsyg/villa-1_Fxh92jz0eB.jpg?updatedAt=1630601351002',
          },
          {
            image: 'https://ik.imagekit.io/1akf8cdsyg/gengar_IvdAdWOFr.jpg?updatedAt=1608111140164',
          },
        ],
      },
    }
  },
  methods: {
    toggleIsEditImage() {
      this.form.thumbnail_old = this.list.villa_galleries
      this.form.is_edit = !this.form.is_edit
    },
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
    openDialogDeleteOldImage(image) {
      this.form.preview_thumbnail_old = image
      this.dialog.delete_old_image = !this.dialog.delete_old_image
    },
    handleDeleteOldImage() {
      console.log('delete permanent')
    },
  },
}
</script>

<style></style>
