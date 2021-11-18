<template>
  <div>
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
                    :to="{ name: 'listUserEdan' }"
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
                  Detail User
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
                  <div class="tw-text-base tw-mb-2 tw-text-gray-600">
                    Profile User
                  </div>
                  <div class="tw-flex">
                    <div>
                      <v-avatar

                        v-ripple
                        rounded
                        size="250"
                        class="me-6 tw-cursor-pointer"
                        @click="openDialogPreviewThumbnail"
                      >
                        <v-img src="https://ik.imagekit.io/1akf8cdsyg/gengar_IvdAdWOFr.jpg?updatedAt=1608111140164"></v-img>
                      </v-avatar>
                    </div>
                    <v-row>
                      <v-col
                        cols="12"
                        class="tw-pb-2 tw-pt-0"
                      >
                        <div class="tw-flex tw-items-center">
                          <div class="tw-capitalize tw-text-2xl tw-font-semibold tw-text-gray-800 ">
                            {{ form.fullname }}
                          </div>
                          <div class="tw-ml-5">
                            <v-chip
                              label
                              class="ma-2 tw-font-medium"
                              color="primary"
                            >
                              Number Verified
                            </v-chip>
                          </div>
                          <div>
                            <v-chip
                              label
                              class="ma-2 tw-font-medium"
                              color="secondary"
                            >
                              Email Not Verified
                            </v-chip>
                          </div>
                          <div>
                            <v-btn
                              text
                              :to="{name: 'changePassUserEdan', params: {id: '1'}}"
                              color="#6B7280"
                              class="text-none tw-tracking-wide"
                            >
                              Change Password
                              <v-icon right>
                                {{ icons.mdiLock }}
                              </v-icon>
                            </v-btn>
                          </div>
                        </div>
                      </v-col>
                      <v-col
                        cols="12"
                        class="tw-pt-0"
                      >
                        <div class="tw-flex tw-items-center">
                          <div class="tw-flex tw-items-center tw-justify-left">
                            <v-avatar
                              tile
                              size="35"
                            >
                              <v-img src="https://ik.imagekit.io/1akf8cdsyg/dollar_Ch4x29K-1.svg?updatedAt=1629888786486"></v-img>
                            </v-avatar>
                            <div class="tw-ml-4 tw-text-base tw-font-medium tw-text-gray-700">
                              Point : {{ form.my_point }}
                            </div>
                          </div>
                          <div class="tw-flex tw-items-center tw-justify-left tw-ml-6">
                            <v-avatar
                              tile
                              size="35"
                            >
                              <v-img src="https://ik.imagekit.io/1akf8cdsyg/dollar_Ch4x29K-1.svg?updatedAt=1629888786486"></v-img>
                            </v-avatar>
                            <div class="tw-ml-4 tw-text-base tw-font-medium tw-text-gray-700">
                              Koin : {{ form.my_koin }}
                            </div>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="tw-flex tw-items-center">
                          <div>Username :</div>
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium">
                            {{ form.username }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="tw-flex tw-items-center ">
                          <div>Provinsi :</div>
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium">
                            Jawa Barat
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="tw-flex tw-items-center ">
                          <div>Email :</div>
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium">
                            {{ form.email }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="tw-flex tw-items-center ">
                          <div>Kota/Kabupaten :</div>
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium">
                            Kota Bogor
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="tw-flex tw-items-center ">
                          <div>Nomer WhatsApp :</div>
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium">
                            {{ form.no_wa }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="tw-flex tw-items-center ">
                          <div>Kecamatan :</div>
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium">
                            Ciawi
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="tw-flex tw-items-center ">
                          <div>Tanggal Lahir :</div>
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium">
                            {{ form.tgl_lahir }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="tw-flex tw-items-center ">
                          <div>Tempat Lahir :</div>
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium">
                            {{ form.tempat_lahir }}
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="6">
                        <div class="tw-flex tw-items-center ">
                          <div>Tipe Akun :</div>
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium">
                            {{ form.oauth_type }}
                          </div>
                        </div>
                      </v-col>
                    </v-row>
                    <div>
                    </div>
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
            :src="form.profile_img"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  mdiArrowLeft, mdiEyeOutline, mdiEyeOffOutline, mdiCloudUploadOutline, mdiWindowClose, mdiLock,
} from '@mdi/js'

// import { storeData } from '@/api/subCategory'

export default {
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiEyeOutline,
        mdiEyeOffOutline,
        mdiCloudUploadOutline,
        mdiWindowClose,
        mdiLock,
      },
      dialog: {
        preview_thumbnail: false,
      },
      form: {
        fullname: 'dimas roger',
        username: 'rogersovich',
        email: 'dimasroger89@gmail.com',
        no_wa: '089627212312',
        tempat_lahir: 'Bogor',
        tgl_lahir: '2002-08-02',
        profile_img: 'https://ik.imagekit.io/1akf8cdsyg/gengar_IvdAdWOFr.jpg?updatedAt=1608111140164',
        province_id: 1,
        city_id: 1,
        district_id: 1,
        my_koin: 0,
        my_point: 0,
        ver_email: 0,
        ver_wa: 0,
        oauth_type: 'redirect',
      },
    }
  },
  methods: {
    openDialogPreviewThumbnail() {
      this.dialog.preview_thumbnail = !this.dialog.preview_thumbnail
    },
  },
}
</script>

<style></style>
