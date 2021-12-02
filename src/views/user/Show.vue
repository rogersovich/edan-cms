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
          <v-card-text class="tw-mb-4">
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col
                  v-if="$vuetify.breakpoint.smAndUp"
                  cols="12"
                >
                  <div class="tw-flex">
                    <div class="tw-mr-6">
                      <v-avatar
                        v-if="form.profile_img === '' || form.profile_img === null"
                        v-ripple
                        rounded
                        size="250"
                        class="tw-cursor-pointer"
                        @click="
                          openDialogPreviewThumbnail(
                            'https://ik.imagekit.io/1akf8cdsyg/gengar_IvdAdWOFr.jpg?updatedAt=1608111140164',
                          )
                        "
                      >
                        <v-img
                          lazy-src="https://ik.imagekit.io/1akf8cdsyg/gengar_IvdAdWOFr.jpg?updatedAt=1608111140164"
                          src="https://ik.imagekit.io/1akf8cdsyg/gengar_IvdAdWOFr.jpg?updatedAt=1608111140164"
                        ></v-img>
                      </v-avatar>
                      <v-avatar
                        v-else
                        v-ripple
                        rounded
                        size="250"
                        class="tw-cursor-pointer"
                        @click="openDialogPreviewThumbnail(base_url_image + form.profile_img)"
                      >
                        <v-img
                          :lazy-src="base_url_image + form.profile_img"
                          :src="base_url_image + form.profile_img"
                        ></v-img>
                      </v-avatar>
                      <div class="tw-mt-3">
                        <div>
                          <v-btn
                            outlined
                            block
                            :to="{ name: 'changePassUserEdan', params: { id: params_id } }"
                            color="#6B7280"
                            class="text-none tw-tracking-wide tw-border-gray-400"
                          >
                            Ubah Password
                            <v-icon right>
                              {{ icons.mdiLock }}
                            </v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </div>
                    <v-row>
                      <v-col
                        cols="12"
                        class="tw-pb-2"
                      >
                        <div class="tw-items-center tw-grid tw-grid-cols-12 tw-gap-x-4">
                          <div class="tw-capitalize tw-text-2xl tw-font-semibold tw-text-gray-800 tw-col-span-6">
                            {{ form.full_name }}
                          </div>
                          <div class="tw-col-span-3">
                            <v-chip
                              label
                              class="tw-font-medium tw-w-full tw-justify-center"
                              :color="(form.ver_wa === 0 || form.ver_wa === '') ? 'secondary' : 'primary'"
                            >
                              {{ `Number ${(form.ver_wa === 0 || form.ver_wa === '') ? 'Not Verified' : 'Verified'}` }}
                            </v-chip>
                          </div>
                          <div class="tw-col-span-3">
                            <v-chip
                              label
                              class="tw-font-medium tw-w-full tw-justify-center"
                              :color="(form.ver_email === 0 || form.ver_email === '') ? 'secondary' : 'primary'"
                            >
                              {{ `Email ${(form.ver_email === 0 || form.ver_email === '') ? 'Not Verified' : 'Verified'}` }}
                            </v-chip>
                          </div>
                        </div>
                      </v-col>
                      <v-col cols="12">
                        <div class="tw-grid tw-grid-cols-12 tw-gap-x-4 tw-items-center">
                          <div class="tw-flex tw-items-center tw-justify-left tw-col-span-3">
                            <v-avatar
                              tile
                              size="35"
                            >
                              <v-img
                                src="https://ik.imagekit.io/1akf8cdsyg/dollar_Ch4x29K-1.svg?updatedAt=1629888786486"
                              ></v-img>
                            </v-avatar>
                            <div class="tw-ml-4 tw-text-base tw-font-medium tw-text-gray-700">
                              Point : {{ form.my_point }}
                            </div>
                          </div>
                          <div class="tw-flex tw-items-center tw-justify-left tw-col-span-3">
                            <v-avatar
                              tile
                              size="35"
                            >
                              <v-img
                                src="https://ik.imagekit.io/1akf8cdsyg/dollar_Ch4x29K-1.svg?updatedAt=1629888786486"
                              ></v-img>
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
                            {{ form.province_id }}
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
                            {{ form.city_id }}
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
                            {{ form.district_id }}
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
                  </div>
                </v-col>
                <v-col
                  v-else
                  cols="12"
                >
                  <v-row>
                    <v-col cols="12">
                      <div class="tw-text-base tw-mb-2 tw-text-gray-600">
                        Profile User
                      </div>
                      <div>
                        <v-avatar
                          v-if="form.profile_img === '' || form.profile_img === null"
                          v-ripple
                          rounded
                          width="100%"
                          height="100%"
                          class="tw-cursor-pointer"
                          @click="
                            openDialogPreviewThumbnail(
                              'https://ik.imagekit.io/1akf8cdsyg/gengar_IvdAdWOFr.jpg?updatedAt=1608111140164',
                            )
                          "
                        >
                          <v-img
                            lazy-src="https://ik.imagekit.io/1akf8cdsyg/gengar_IvdAdWOFr.jpg?updatedAt=1608111140164"
                            src="https://ik.imagekit.io/1akf8cdsyg/gengar_IvdAdWOFr.jpg?updatedAt=1608111140164"
                          ></v-img>
                        </v-avatar>
                        <v-avatar
                          v-else
                          v-ripple
                          rounded
                          width="100%"
                          height="100%"
                          class="tw-cursor-pointer"
                          @click="openDialogPreviewThumbnail(base_url_image + form.profile_img)"
                        >
                          <v-img
                            :lazy-src="base_url_image + form.profile_img"
                            :src="base_url_image + form.profile_img"
                          ></v-img>
                        </v-avatar>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="tw-flex tw-items-center">
                        <div class="tw-capitalize tw-text-2xl tw-font-semibold tw-text-gray-800 ">
                          {{ form.full_name }}
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="tw-items-center tw-grid tw-grid-cols-12 tw-gap-x-4 tw-gap-y-4">
                        <div class="tw-col-span-6">
                          <v-chip
                            label
                            class="tw-font-medium tw-w-full tw-justify-center"
                            :color="(form.ver_wa === 0 || form.ver_wa === '') ? 'secondary' : 'primary'"
                          >
                            {{ `Number ${(form.ver_wa === 0 || form.ver_wa) === '' ? 'Not Verified' : 'Verified'}` }}
                          </v-chip>
                        </div>
                        <div class="tw-col-span-6">
                          <v-chip
                            label
                            class="tw-font-medium tw-w-full tw-justify-center"
                            :color="(form.ver_email === 0 || form.ver_email === '') ? 'secondary' : 'primary'"
                          >
                            {{ `Email ${(form.ver_email === 0 || form.ver_email === '') ? 'Not Verified' : 'Verified'}` }}
                          </v-chip>
                        </div>
                        <div class="tw-col-span-12">
                          <v-btn
                            outlined
                            block
                            :to="{ name: 'changePassUserEdan', params: { id: params_id } }"
                            color="#6B7280"
                            class="text-none tw-tracking-wide tw-border-gray-400"
                          >
                            Ubah Password
                            <v-icon right>
                              {{ icons.mdiLock }}
                            </v-icon>
                          </v-btn>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="tw-grid tw-grid-cols-12 tw-items-center">
                        <div class="tw-col-span-4">
                          <div class="tw-text-sm">
                            Username :
                          </div>
                        </div>
                        <div class="tw-col-span-8">
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium tw-text-base">
                            {{ form.username }}
                          </div>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="tw-grid tw-grid-cols-12 tw-items-center">
                        <div class="tw-col-span-4">
                          <div class="tw-text-sm">
                            Provinsi :
                          </div>
                        </div>
                        <div class="tw-col-span-8">
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium tw-text-base">
                            {{ form.province_id }}
                          </div>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="tw-grid tw-grid-cols-12 tw-items-center">
                        <div class="tw-col-span-4">
                          <div class="tw-text-sm">
                            Email :
                          </div>
                        </div>
                        <div class="tw-col-span-8">
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium tw-text-base">
                            {{ form.email }}
                          </div>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="tw-grid tw-grid-cols-12 tw-items-center">
                        <div class="tw-col-span-4">
                          <div class="tw-text-sm">
                            Kota/Kab :
                          </div>
                        </div>
                        <div class="tw-col-span-8">
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium tw-text-base">
                            {{ form.city_id }}
                          </div>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="tw-grid tw-grid-cols-12 tw-items-center">
                        <div class="tw-col-span-4">
                          <div class="tw-text-sm">
                            No Whatsapp :
                          </div>
                        </div>
                        <div class="tw-col-span-8">
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium tw-text-base">
                            {{ form.no_wa }}
                          </div>
                        </div>
                      </div>
                    </v-col>
                    <v-col cols="12">
                      <div class="tw-grid tw-grid-cols-12 tw-items-center">
                        <div class="tw-col-span-4">
                          <div class="tw-text-sm">
                            Kecamatan :
                          </div>
                        </div>
                        <div class="tw-col-span-8">
                          <div class="tw-ml-2 tw-text-gray-600 tw-font-medium tw-text-base">
                            {{ form.district_id }}
                          </div>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
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
            :src="preview_thumbnail"
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

import { detailUser } from '@/api/user'

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
      loading: {
        get_data: false,
      },
      user: {},
      preview_thumbnail: '',
    }
  },
  computed: {
    form: {
      get() {
        return this.user
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
    this.getDetailUser()
  },
  methods: {
    openDialogPreviewThumbnail(image) {
      this.preview_thumbnail = image
      this.dialog.preview_thumbnail = !this.dialog.preview_thumbnail
    },
    async getDetailUser() {
      this.loading.get_data = true
      const res = await detailUser({ id: this.params_id })
      const { data } = res
      if (data.status) {
        this.loading.get_data = false
        this.user = data.data
        console.log(this.user)
      } else {
        this.loading.get_data = false
      }
    },
  },
}
</script>

<style></style>
