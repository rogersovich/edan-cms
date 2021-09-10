<template>
  <div>
    <v-row class="match-height">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <div>
              List Villa
            </div>
            <v-spacer></v-spacer>
            <div>
              <v-btn
                color="primary"
                class="text-none"
                :to="{ name: 'villaAdd' }"
              >
                <v-icon left>
                  {{ icons.mdiPlus }}
                </v-icon>
                Tambah
              </v-btn>
            </div>
          </v-card-title>
          <v-simple-table
            :height="$vuetify.breakpoint.mdAndUp ? 400 : 'auto'"
            :fixed-header="$vuetify.breakpoint.mdAndUp"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-uppercase text-center ">
                    thumbnail
                  </th>
                  <th class="text-uppercase">
                    Sub Category
                  </th>
                  <th class="text-uppercase">
                    Kode
                  </th>
                  <th class="text-uppercase">
                    Daerah
                  </th>
                  <th class="text-uppercase">
                    Harga
                  </th>
                  <th class="text-uppercase">
                    Rekomendasi
                  </th>
                  <th class="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in list.villas"
                  :key="i"
                >
                  <td class="text-center tw-py-2">
                    <v-avatar
                      size="50"
                      tile
                    >
                      <v-img :src="item.thumbnail"></v-img>
                    </v-avatar>
                  </td>
                  <td>{{ item.sub_category }}</td>
                  <td>
                    {{ item.code }}
                  </td>
                  <td>
                    {{ item.sub_district }}
                  </td>
                  <td>
                    {{ uang(item.price) }}
                  </td>
                  <td>
                    <v-chip
                      v-if="item.is_recommendation"
                      color="primary"
                      class="ma-2 tw-font-semibold"
                    >
                      Ya
                    </v-chip>
                    <v-chip
                      v-else
                      color="#E11D48"
                      class="ma-2 tw-font-semibold"
                    >
                      Tidak
                    </v-chip>
                  </td>
                  <td class="text-center">
                    <div>
                      <v-btn
                        icon
                        :to="{ name: 'villaEdit', params: { id: i + 1 } }"
                        color="#FBBF24"
                      >
                        <v-icon>{{ icons.mdiPencilBoxMultiple }}</v-icon>
                      </v-btn>
                      <v-btn
                        class="tw-ml-2"
                        icon
                        color="#E11D48"
                        @click="openDialogDelete(item.dessert)"
                      >
                        <v-icon>
                          {{ icons.mdiTrashCan }}
                        </v-icon>
                      </v-btn>
                    </div>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog.delete"
      max-width="480"
    >
      <v-card>
        <v-card-title>
          <div class="tw-text-true-gray-800">
            Ingin Menghapus {{ form.want_to_delete }} ?
          </div>
        </v-card-title>
        <v-card-text>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's
          standard dummy text ever since the 1500s
        </v-card-text>
        <v-card-actions class="tw-justify-end">
          <div>
            <v-btn
              text
              class="text-none tw-mr-2"
              color="#E11D48"
              @click="dialog.delete = !dialog.delete"
            >
              Tidak Jadi
            </v-btn>
            <v-btn
              class="text-none"
              color="primary"
              @click="handleDeleteItem"
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
import { mdiTrashCan, mdiPencilBoxMultiple, mdiPlus } from '@mdi/js'

export default {
  data() {
    return {
      icons: {
        mdiTrashCan,
        mdiPencilBoxMultiple,
        mdiPlus,
      },
      form: {
        want_to_delete: '',
      },
      dialog: {
        delete: false,
      },
      list: {
        villas: [
          {
            title: 'Mawar 1',
            sub_category: 'Mawar',
            thumbnail: 'https://ik.imagekit.io/1akf8cdsyg/bootstrap-icon_W0x965yzg.svg?updatedAt=1624035124879',
            sub_district: 'Cibereum',
            price: 4000000,
            code: 'CBM-DA0001',
            is_recommendation: true,
          },
          {
            title: 'Melati 1',
            sub_category: 'Melati',
            thumbnail: 'https://ik.imagekit.io/1akf8cdsyg/bootstrap-icon_W0x965yzg.svg?updatedAt=1624035124879',
            sub_district: 'Cibogo',
            price: 4000000,
            code: 'CBO-DA0001',
            is_recommendation: false,
          },
        ],
      },
    }
  },
  methods: {
    openDialogDelete(params) {
      this.form.want_to_delete = params
      this.dialog.delete = !this.dialog.delete
    },
    handleDeleteItem() {
      console.log('deleted item')
    },
    uang(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
  },
}
</script>

<style></style>
