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
        v-if="Object.keys(user).length > 0 && !loading.get_data"
        cols="12"
        md="12"
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
                  Edit User
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text class="tw-mt-3">
            <v-form @submit.prevent="handleSubmit">
              <v-row>
                <v-col
                  cols="12"
                >
                  <v-row>
                    <v-col cols="12">
                      <div class="subtitle-1">
                        Profile User
                      </div>
                    </v-col>
                    <v-col
                      cols="12"
                      md="6"
                    >
                      <div>
                        <div>
                          <div v-if="form_new.profile_img.length === 0">
                            <template v-if="form.profile_img === '' || form.profile_img === null">
                              <v-avatar
                                v-ripple
                                rounded
                                width="100%"
                                height="200"
                                class="me-6"
                              >
                                <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
                              </v-avatar>
                            </template>
                            <template v-else>
                              <v-avatar
                                v-ripple
                                rounded
                                width="100%"
                                height="300"
                                class="me-6 tw-cursor-pointer"
                                @click="openDialogPreviewThumbnail(base_url_image + form.profile_img)"
                              >
                                <v-img :src="base_url_image + form.profile_img"></v-img>
                              </v-avatar>
                            </template>
                          </div>
                          <v-avatar
                            v-else
                            v-ripple
                            rounded
                            width="100%"
                            height="300"
                            class="me-6 tw-cursor-pointer"
                            @click="openDialogPreviewThumbnail(form_new.profile_img[0].url)"
                          >
                            <v-img :src="form_new.profile_img[0].url"></v-img>
                          </v-avatar>
                        </div>
                        <div class="tw-grid tw-grid-cols-12 tw-gap-x-3 tw-items-center tw-mt-3">
                          <div :class="form_new.profile_img.length > 0 ? 'tw-col-span-6' : 'tw-col-span-12'">
                            <v-btn
                              v-if="form.profile_img !== ''"
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
                            v-if="form_new.profile_img.length > 0"
                            class="tw-col-span-6"
                          >
                            <v-btn
                              color="error"
                              block
                              outlined
                              @click="removeItem(form_new.profile_img[0])"
                            >
                              Reset
                            </v-btn>
                          </div>
                          <div class="tw-col-span-12">
                            <p class="tw-text-xs mt-4 tw-mb-2">
                              Allowed JPG, GIF or PNG. Max size of 2MB
                            </p>
                            <div
                              v-if="form_new.profile_img.length > 0"
                              class="tw-text-red-500 tw-text-sm"
                            >
                              <span v-if="form_new.profile_img[0].error !== ''">
                                {{ form_new.profile_img[0].error }}
                              </span>
                            </div>
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
                            v-model="form_new.profile_img"
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
                    </v-col>
                  </v-row>
                </v-col>

                <v-col
                  cols="12"
                  md="6"
                >
                  <validation-provider
                    v-slot="{ errors }"
                    name="Fullname"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.full_name"
                        label="Fullname"
                        outlined
                        :error-messages="errors"
                        placeholder="Your Fullname"
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
                    name="Username"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.username"
                        label="Username"
                        outlined
                        :error-messages="errors"
                        placeholder="Your Username"
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
                    name="Email"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.email"
                        label="Email"
                        outlined
                        type="email"
                        :error-messages="errors"
                        placeholder="Your Email"
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
                    name="Tanggal Lahir"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.tgl_lahir"
                        label="Tanggal Lahir"
                        outlined
                        type="date"
                        :error-messages="errors"
                        placeholder="Your Tanggal Lahir"
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
                    name="Nomer Wa"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.no_wa"
                        label="Nomer Wa"
                        outlined
                        :error-messages="errors"
                        placeholder="Your Nomer Wa"
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
                    name="Tempat Lahir"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.tempat_lahir"
                        label="Tempat Lahir"
                        outlined
                        :error-messages="errors"
                        placeholder="Your Tempat Lahir"
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
                    name="Tipe Akun"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.oauth_type"
                        :items="list.oauth_type"
                        item-text="text"
                        item-value="value"
                        label="Tipe Akun"
                        outlined
                        :error-messages="errors"
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
                    name="Provinsi"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.province_id"
                        :items="list.provinces"
                        item-text="prov_name"
                        item-value="prov_id"
                        label="Provinsi"
                        outlined
                        :error-messages="errors"
                        @change="getListCityByProvince(form.province_id, 'not-mounted')"
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
                    name="Kota/Kab"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.city_id"
                        :disabled="form.province_id === ''"
                        :items="list.cities"
                        item-text="city_name"
                        item-value="city_id"
                        label="Kota/Kab"
                        outlined
                        :error-messages="errors"
                        @change="getListDistrictByCity(form.city_id, 'not-mounted')"
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
                    name="Kecamatan"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.district_id"
                        :disabled="form.city_id === ''"
                        :items="list.districts"
                        item-text="dis_name"
                        item-value="dis_id"
                        label="Kecamatan"
                        outlined
                        :error-messages="errors"
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
                    name="Koin Saya"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.my_koin"
                        label="Koin Saya"
                        outlined
                        :error-messages="errors"
                        placeholder="Your Koin Saya"
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
                    name="Point Saya"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.my_point"
                        label="Point Saya"
                        outlined
                        :error-messages="errors"
                        placeholder="Your Point Saya"
                      ></v-text-field>
                    </div>
                  </validation-provider>
                </v-col>
                <v-col cols="12">
                  <div class="text-right">
                    <v-btn
                      color="primary"
                      type="submit"
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
            :src="preview_image"
          ></v-img>
        </v-card-text>
      </v-card>
    </v-dialog>
  </validation-observer>
</template>

<script>
import FileUpload from 'vue-upload-component'
import {
  mdiArrowLeft, mdiEyeOutline, mdiEyeOffOutline, mdiCloudUploadOutline, mdiWindowClose,
} from '@mdi/js'
import { required } from 'vee-validate/dist/rules'
import {
  extend, ValidationObserver, ValidationProvider, setInteractionMode,
} from 'vee-validate'
import LoadingOverlay from '@/components/LoadingOverlay.vue'
import { listProvince, listCityByProvince, listDistrictByCity } from '@/api/regional'

import { detailUser, updateUser } from '@/api/user'

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
        mdiEyeOutline,
        mdiEyeOffOutline,
        mdiCloudUploadOutline,
        mdiWindowClose,
      },
      dialog: {
        preview_thumbnail: false,
      },
      loading: {
        get_data: false,
        update: false,
      },
      preview_image: '',
      form_new: {
        profile_img: [],
      },
      user: {},
      list: {
        oauth_type: [
          {
            text: 'Redirect',
            value: 'redirect',
          },
          {
            text: 'SSO',
            value: 'sso',
          },
        ],
        provinces: [],
        cities: [],
        districts: [],
      },
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
  async mounted() {
    await this.getDetailUser()
    await this.getListProvince()
    await this.getListCityByProvince(this.user.province_id, 'mounted')
    await this.getListDistrictByCity(this.user.city_id, 'mounted')
  },
  methods: {
    openDialogPreviewThumbnail(image) {
      this.preview_image = image
      this.dialog.preview_thumbnail = !this.dialog.preview_thumbnail
    },
    removeItem(file) {
      this.$refs.uploadThumbnail.remove(file)
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
    async getListProvince() {
      const { data } = await listProvince()
      if (data.status) {
        this.list.provinces = data.data
      }
    },
    async getListCityByProvince(provinceId, type) {
      if (type === 'not-mounted') {
        this.list.cities = []
        this.form.city_id = ''
        this.list.districts = []
        this.form.district_id = ''
      }
      const { data } = await listCityByProvince({ province_id: provinceId })
      if (data.status) {
        this.list.cities = data.data
      }
    },
    async getListDistrictByCity(cityId, type) {
      if (type === 'not-mounted') {
        this.list.districts = []
        this.form.district_id = ''
      }
      const { data } = await listDistrictByCity({ city_id: cityId })
      if (data.status) {
        this.list.districts = data.data
      }
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
    async handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        if (this.form_new.profile_img.length > 0) {
          if (this.form_new.profile_img[0].error !== '' && this.form_new.profile_img.length > 0) {
            return
          }
        }

        if (!success) {
          return
        }

        try {
          let image
          if (this.form_new.profile_img.length > 0) image = this.form_new.profile_img[0].file
          else image = []

          const res = await updateUser({
            image,
            id: this.params_id,
            full_name: this.form.full_name,
            email: this.form.email,
            no_wa: this.form.no_wa,
            password: this.form.password,
            username: this.form.username,
            tempat_lahir: this.form.tempat_lahir,
            tgl_lahir: this.form.tgl_lahir,
            province_id: this.form.province_id,
            city_id: this.form.city_id,
            district_id: this.form.district_id,
          })

          const { data } = res
          if (data.status) {
            this.loading.update = false
            await this.$swal({
              title: 'Berhasil Merubah Data',
              icon: 'success',
              timer: 1000,
            })
            this.$router.push({ name: 'listUserEdan' })
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
