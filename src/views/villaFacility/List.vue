<template>
  <div>
    <v-row class="match-height">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <template v-if="$vuetify.breakpoint.mdAndUp">
              <div>
                List Villa Facility
              </div>
              <v-spacer></v-spacer>
              <div>
                <v-btn
                  color="primary"
                  class="text-none"
                  :to="{ name: 'villaFacilityAdd' }"
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
                    List Villa Facility
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    block
                    color="primary"
                    class="text-none"
                    :to="{ name: 'villaFacilityAdd' }"
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
                  <th class="text-uppercase">
                    Villa(villa_id)
                  </th>
                  <th class="text-center text-uppercase">
                    icon
                  </th>
                  <th class="text-uppercase">
                    title
                  </th>
                  <th class="text-uppercase">
                    value
                  </th>
                  <th class="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in list.villa_facilities"
                  :key="i"
                >
                  <td>{{ item.villa_id }}</td>
                  <td class="text-center tw-py-2">
                    <v-avatar
                      size="50"
                      tile
                    >
                      <v-img :src="item.icon"></v-img>
                    </v-avatar>
                  </td>
                  <td>{{ item.title }}</td>
                  <td>
                    <div v-if="item.value === ''">
                      <v-chip
                        class="ma-2 tw-font-semibold"
                        color="#E11D48"
                      >
                        Kosong
                      </v-chip>
                    </div>
                    <div v-else>
                      <v-chip
                        class="ma-2 tw-font-semibold"
                        color="#22C55E"
                      >
                        {{ item.value }}
                      </v-chip>
                    </div>
                  </td>
                  <td class="text-center">
                    <div v-if="$vuetify.breakpoint.mdAndUp">
                      <v-btn
                        icon
                        :to="{ name: 'villaFacilityEdit', params: { id: i + 1 } }"
                        color="#FBBF24"
                      >
                        <v-icon>{{ icons.mdiPencilBoxMultiple }}</v-icon>
                      </v-btn>
                      <v-btn
                        class="tw-ml-2"
                        icon
                        color="#E11D48"
                        @click="openDialogDelete(item.villa_id)"
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
                                :to="{ name: 'villaFacilityEdit', params: { id: i + 1 } }"
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
                                @click="openDialogDelete(item.villa_id)"
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
        villa_facilities: [
          {
            villa_id: 'Villa Mawar',
            icon: 'https://ik.imagekit.io/1akf8cdsyg/bootstrap-icon_W0x965yzg.svg?updatedAt=1624035124879',
            title: 'Kolam Renang',
            value: '',
          },
          {
            villa_id: 'Villa Mawar',
            icon: 'https://ik.imagekit.io/1akf8cdsyg/bootstrap-icon_W0x965yzg.svg?updatedAt=1624035124879',
            title: 'Tempat Tidur',
            value: 2,
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
  },
}
</script>

<style></style>
