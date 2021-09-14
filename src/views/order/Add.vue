<template>
  <div>
    <v-row
      class="match-height"
      justify="center"
    >
      <v-col
        cols="12"
        md="6"
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
                    @click="$router.go(-1)"
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
                  Tambah Order Villa
                </div>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col
                  cols="12"
                  md="6"
                >
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
                      hide-details=""
                      dense
                    ></v-select>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="tw-mb-1.5 subtitle-1">
                      Metode Pembayaran
                    </div>
                    <v-select
                      v-model="form.payment_method"
                      :items="list.payment_method"
                      item-value="key"
                      item-text="text"
                      placeholder="Pilih Metode Pembayaran"
                      outlined
                      dense
                      hide-details=""
                    ></v-select>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                >
                  <div>
                    <div class="tw-mb-1.5 subtitle-1">
                      Title Order
                    </div>
                    <v-text-field
                      v-model="form.title"
                      placeholder="cth. BOOKING VILLA CBM-DA001 4.000.000"
                      outlined
                      dense
                      hide-details=""
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="tw-mb-1.5 subtitle-1">
                      Nomer Invoice
                    </div>
                    <v-text-field
                      v-model="form.invoice_number"
                      placeholder="cth. VLR-96837"
                      outlined
                      dense
                      hide-details=""
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="tw-mb-1.5 subtitle-1">
                      Nomer Telepon
                    </div>
                    <v-text-field
                      v-model="form.phone_number"
                      placeholder="cth. 0896289282"
                      outlined
                      dense
                      hide-details=""
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="tw-mb-1.5 subtitle-1">
                      Kode Villa
                    </div>
                    <v-text-field
                      v-model="form.villa_code"
                      placeholder="cth. CBM-DA001"
                      outlined
                      dense
                      hide-details=""
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="tw-mb-1.5 subtitle-1">
                      Blok Villa
                    </div>
                    <v-text-field
                      v-model="form.villa_block"
                      placeholder="cth. Mawar 1"
                      outlined
                      dense
                      hide-details=""
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="tw-mb-1.5 subtitle-1">
                      ID Transaksi
                    </div>
                    <v-text-field
                      v-model="form.transaction_id"
                      placeholder="cth. TR-0024367112"
                      outlined
                      dense
                      hide-details=""
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="tw-mb-1.5 subtitle-1">
                      Total Bayar
                    </div>
                    <v-text-field
                      v-model="form.grand_total"
                      placeholder="cth. 400000000"
                      outlined
                      dense
                      hide-details=""
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="tw-mb-1.5 subtitle-1">
                      Tanggal
                    </div>
                    <v-menu
                      ref="datePicker"
                      v-model="form.menu.date"
                      :close-on-content-click="false"
                      :return-value.sync="form.date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.date"
                          readonly
                          outlined
                          dense
                          hide-details=""
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="form.date"
                        no-title
                        scrollable
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="form.menu.date = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.datePicker.save(form.date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>
                  </div>
                </v-col>
                <v-col
                  cols="12"
                  md="6"
                >
                  <div>
                    <div class="tw-mb-1.5 subtitle-1">
                      Waktu
                    </div>
                    <v-menu
                      ref="timePicker"
                      v-model="form.menu.time"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="form.time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="form.time"
                          dense
                          outlined
                          readonly
                          hide-details=""
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="form.menu.time"
                        v-model="form.time"
                        full-width
                        @click:minute="$refs.timePicker.save(form.time)"
                      ></v-time-picker>
                    </v-menu>
                  </div>
                </v-col>
              </v-row>

              <div class="text-right tw-mt-5">
                <v-btn
                  color="primary"
                  @click="handleSubmit"
                >
                  Submit
                </v-btn>
              </div>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        cols="12"
        md="6"
      >
        <v-card
          id="preview-image"
          tile
          class="tw-border-none"
          height="650"
        >
          <div class="tw-bg-blue-400 tw-h-48 tw-rounded-b-3xl tw-py-4">
            <v-card-text>
              <v-card
                rounded="sm"
                class="tw-pb-2"
              >
                <div class="tw-flex tw-items-center tw-justify-center">
                  <div>
                    <v-img
                      width="150"
                      height="100"
                      :src="require(`@/assets/images/misc/logo-villarian.png`)"
                    ></v-img>
                  </div>
                </div>
                <div
                  class="tw-flex tw-items-center tw-justify-center tw-border-b-2 tw-border-dashed tw-border-gray-300 tw-px-5 tw-pb-2 tw-text-xs"
                >
                  <div>
                    {{ `${convertDate(form.date)} . ${form.time}` }}
                  </div>
                  <v-spacer></v-spacer>
                  <div class="tw-uppercase">
                    {{ `${form.payment_method} 07939***22` }}
                  </div>
                </div>
                <v-card-text class="tw-py-3">
                  <div class="tw-flex tw-items-center">
                    <div class="tw-mr-2">
                      <v-img
                        contain
                        width="25"
                        :src="require(`@/assets/images/misc/checked.png`)"
                      ></v-img>
                    </div>
                    <div class="tw-tracking-wide tw-text-true-gray-500">
                      Transaksi Berhasil
                    </div>
                  </div>
                  <div class="tw-my-3 tw-text-true-gray-700 tw-tracking-wide tw-uppercase">
                    {{ form.title }}
                  </div>
                  <div class="tw-flex tw-items-center">
                    <v-btn
                      tile
                      depressed
                      small
                      color="#F5F5F5"
                    >
                      BOOKING VILLA
                    </v-btn>
                    <v-btn
                      tile
                      outlined
                      small
                      color="#63DC9D"
                      class="tw-ml-2 text-none tw-tracking-wide"
                    >
                      Order berhasil
                    </v-btn>
                  </div>
                  <div
                    class="tw-flex tw-items-center tw-my-3 tw-bg-blue-100 tw-py-2 tw-px-3 tw-font-medium tw-tracking-wide"
                  >
                    <div class="tw-text-true-gray-800">
                      Total Bayar
                    </div>
                    <v-spacer></v-spacer>
                    <div class="tw-text-true-gray-800">
                      {{ `Rp${uang(form.grand_total)}` }}
                    </div>
                  </div>
                  <div class="tw-flex tw-items-center tw-text-true-gray-500 tw-pb-3">
                    <div>
                      Metode Pembayaran
                    </div>
                    <v-spacer></v-spacer>
                    <div class="tw-uppercase">
                      BANK {{ form.payment_method }}
                    </div>
                  </div>
                  <v-divider></v-divider>
                  <div class="tw-pt-3">
                    <!-- detail pesanan -->
                    <div class="tw-text-true-gray-700 tw-font-medium tw-pb-2">
                      Detail Pesanan
                    </div>
                    <div class="tw-flex tw-items-center tw-text-true-gray-500">
                      <div>
                        Nomer Invoice
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        {{ form.invoice_number }}
                      </div>
                    </div>
                    <div class="tw-flex tw-items-center tw-text-true-gray-500 tw-pt-2">
                      <div>
                        Nomer HP
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        {{ form.phone_number }}
                      </div>
                    </div>
                    <div class="tw-flex tw-items-center tw-text-true-gray-500 tw-pt-2">
                      <div>
                        Kode Villa
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        {{ form.villa_code }}
                      </div>
                    </div>
                    <div class="tw-flex tw-items-center tw-text-true-gray-500 tw-pt-2">
                      <div>
                        Blok Villa
                      </div>
                      <v-spacer></v-spacer>
                      <div>Blok {{ form.villa_block }}</div>
                    </div>
                    <!-- end -->

                    <!-- detail transaksi -->
                    <div class="tw-text-true-gray-700 tw-font-medium tw-pb-2 tw-pt-4">
                      Detail Transaksi
                    </div>
                    <div class="tw-flex tw-items-center tw-text-true-gray-500">
                      <div>
                        ID Transaksi
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        {{ form.transaction_id }}
                      </div>
                    </div>
                    <!-- end -->

                    <div class="tw-flex tw-items-center tw-text-true-gray-500 tw-pt-6">
                      <div>
                        © 2021 Villarian.id
                      </div>
                      <v-spacer></v-spacer>
                      <div>
                        Salam Riaholyic
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-card-text>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mdiArrowLeft, mdiEye, mdiWindowClose } from '@mdi/js'
import { toJpeg } from 'html-to-image'

export default {
  data() {
    return {
      icons: {
        mdiArrowLeft,
        mdiEye,
        mdiWindowClose,
      },
      dialog: {
        preview_icon: false,
      },
      form: {
        date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().substr(0, 10),
        time: '00:00',
        menu: {
          date: false,
          time: false,
        },
        villa_id: '',
        title: 'BOOKING VILLA CBM-DA001 4.000.000',
        grand_total: 0,
        payment_method: 'bca',
        invoice_number: 'VLR-96837',
        phone_number: '0896272103828',
        villa_code: 'CBM-DA001',
        villa_block: 'Mawar 1',
        transaction_id: 'TR-0024***112',
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
        payment_method: [
          {
            key: 'bca',
            text: 'Bank BCA',
          },
          {
            key: 'bni',
            text: 'Bank BNI',
          },
          {
            key: 'bri',
            text: 'Bank BRI',
          },
          {
            key: 'mandiri',
            text: 'Bank Mandiri',
          },
        ],
      },
    }
  },
  methods: {
    uang(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    convertToMonth(month) {
      // eslint-disable-next-line radix
      const data = parseInt(month)
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ]

      return monthNames[data]
    },
    convertDate(date) {
      const data = date.split('-')
      const month = this.convertToMonth(data[1])
      const full = `${data[2]} ${month} ${data[0]}`

      return full
    },
    openDialogPreviewIcon() {
      this.dialog.preview_icon = !this.dialog.preview_icon
    },
    handleSubmit() {
      toJpeg(document.getElementById('preview-image'), { cacheBust: true, pixelRatio: 7 }).then(dataUrl => {
        const link = document.createElement('a')
        link.download = 'kwintasi.jpeg'
        link.href = dataUrl
        link.click()
      })
    },
  },
}
</script>

<style scoped>
* >>> .v-messages__message {
  line-height: 1.5;
  letter-spacing: 0.025em;
}
</style>
