<template>
  <div>
    <v-row class="match-height">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <template v-if="$vuetify.breakpoint.mdAndUp">
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
            </template>
            <template v-else>
              <v-row>
                <v-col cols="12">
                  <div class="tw-text-center md:tw-text-left">
                    List Villa
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    block
                    color="primary"
                    class="text-none"
                    :to="{ name: 'villaAdd' }"
                  >
                    <v-icon left>
                      {{ icons.mdiPlus }}
                    </v-icon>
                    Tambah
                  </v-btn>
                </v-col>
              </v-row>
            </template>
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
                    <div v-if="$vuetify.breakpoint.mdAndUp">
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
                        @click="openDialogDelete(item.title)"
                      >
                        <v-icon>
                          {{ icons.mdiTrashCan }}
                        </v-icon>
                      </v-btn>
                    </div>
                    <div v-else>
                      <v-menu
                        transition="slide-y-transition"
                        left
                        top
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-btn
                            class="purple"
                            color="primary"
                            dark
                            icon
                            v-bind="attrs"
                            v-on="on"
                          >
                            <v-icon>{{ icons.mdiDotsHorizontalCircle }}</v-icon>
                          </v-btn>
                        </template>
                        <v-list>
                          <v-list-item>
                            <v-list-item-action>
                              <v-btn
                                text
                                :to="{ name: 'villaEdit', params: { id: i + 1 } }"
                                color="#FBBF24"
                              >
                                <v-icon left>
                                  {{ icons.mdiPencilBoxMultiple }}
                                </v-icon>
                                Ubah
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-content>
                              <v-btn
                                text
                                color="#E11D48"
                                @click="openDialogDelete(item.title)"
                              >
                                <v-icon left>
                                  {{ icons.mdiTrashCan }}
                                </v-icon>
                                Hapus
                              </v-btn>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                      </v-menu>
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
          <div class="tw-text-true-gray-800 tw-text-base md:tw-text-lg">
            Ingin Menghapus {{ form.want_to_delete }} ?
          </div>
        </v-card-title>
        <v-card-text class="tw-mb-3 md:tw-text-base tw-text-sm">
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
import {
  mdiTrashCan, mdiPencilBoxMultiple, mdiPlus, mdiDotsHorizontalCircle,
} from '@mdi/js'

export default {
  data() {
    return {
      icons: {
        mdiTrashCan,
        mdiPencilBoxMultiple,
        mdiPlus,
        mdiDotsHorizontalCircle,
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
