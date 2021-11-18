<template>
  <validation-observer ref="formSubmit">
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
                  Tambah User
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
                  <div class="subtitle-1 tw-mb-1.5">
                    Profile User
                  </div>
                  <div class="tw-flex">
                    <div>
                      <v-avatar
                        v-if="form.profile_img.length === 0"
                        rounded
                        size="120"
                        class="me-6"
                      >
                        <v-img :src="require('@/assets/images/avatars/1.png')"></v-img>
                      </v-avatar>
                      <v-avatar
                        v-else
                        v-ripple
                        rounded
                        size="120"
                        class="me-6 tw-cursor-pointer"
                        @click="openDialogPreviewThumbnail"
                      >
                        <v-img :src="form.profile_img[0].url"></v-img>
                      </v-avatar>
                    </div>
                    <div>
                      <v-btn
                        v-if="form.profile_img.length === 0"
                        color="primary"
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

                      <v-btn
                        v-else
                        color="warning"
                        class="me-3"
                      >
                        <label for="file">
                          <v-icon class="d-sm-none">
                            {{ icons.mdiCloudUploadOutline }}
                          </v-icon>
                          <span class="d-none d-sm-block">Ubah</span>
                        </label>
                      </v-btn>

                      <v-btn
                        v-if="form.profile_img.length > 0"
                        color="error"
                        outlined
                        @click="removeItem(form.profile_img[0])"
                      >
                        Reset
                      </v-btn>
                      <p class="tw-text-xs mt-4 tw-mb-2">
                        Allowed JPG, GIF or PNG. Max size of 800K
                      </p>
                      <div
                        v-if="error_form.profile_img.legth === 0"
                        class="tw-text-red-500 tw-text-sm"
                      >
                        {{ error_form.profile_img }}
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
                        v-model="form.profile_img"
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
                </v-col>
                <v-col cols="12">
                  <validation-provider
                    v-slot="{ errors }"
                    name="Fullname"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.fullname"
                        label="Fullname"
                        outlined
                        :error-messages="errors"
                        placeholder="Your fullname"
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
                    name="Password"
                    rules="required"
                  >
                    <div>
                      <v-text-field
                        v-model="form.password"
                        label="Password"
                        outlined
                        :error-messages="errors"
                        placeholder="Your Password"
                        :type="visible_pass.password ? 'text' : 'password'"
                        :append-icon="visible_pass.password ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
                        @click:append="visible_pass.password = !visible_pass.password"
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
                        item-text="text"
                        item-value="value"
                        label="Provinsi"
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
                    name="Kota/Kab"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.city_id"
                        :items="list.cities"
                        item-text="text"
                        item-value="value"
                        label="Kota/Kab"
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
                    name="Kecamatan"
                    rules="required"
                  >
                    <div>
                      <v-select
                        v-model="form.district_id"
                        :items="list.districts"
                        item-text="text"
                        item-value="value"
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
      v-if="form.profile_img.length > 0"
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
            :src="form.profile_img[0].url"
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
  mdiArrowLeft, mdiEyeOutline, mdiEyeOffOutline, mdiCloudUploadOutline, mdiWindowClose,
} from '@mdi/js'

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
        mdiEyeOutline,
        mdiEyeOffOutline,
        mdiCloudUploadOutline,
        mdiWindowClose,
      },
      error_form: {
        profile_img: '',
      },
      visible_pass: {
        password: false,
      },
      dialog: {
        preview_thumbnail: false,
      },
      form: {
        fullname: '',
        username: '',
        email: '',
        password: '',
        no_wa: '',
        tempat_lahir: '',
        tgl_lahir: '',
        profile_img: [],
        province_id: 1,
        city_id: 1,
        district_id: 1,
        my_koin: 0,
        my_point: 0,
        ver_email: 0,
        ver_wa: 0,
        oauth_type: 'redirect',
      },
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
        provinces: [
          {
            text: 'Jawa Barat',
            value: 1,
          },
          {
            text: 'Jawa Timur',
            value: 2,
          },
        ],
        cities: [
          {
            text: 'Kota Bogor',
            value: 1,
          },
          {
            text: 'Kab Bogor',
            value: 2,
          },
        ],
        districts: [
          {
            text: 'Caringin',
            value: 1,
          },
          {
            text: 'Ciawi',
            value: 2,
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
    async handleSubmit() {
      this.$refs.formSubmit.validate().then(async success => {
        this.error_form.profile_img = ''
        if (this.form.profile_img.length === 0) {
          this.error_form.profile_img = 'Gambar Harus di isi Dulu!'

          return
        }
        if (!success) {
          return
        }

        console.log(this.form)

        this.$router.push({ name: 'listUserEdan' })

        // const data = await storeData({
        //   username: this.form.username,
        // })
        // if (data.status === 200) this.$router.push({ name: 'subCategory' })
      })
    },
  },
}
</script>

<style></style>
