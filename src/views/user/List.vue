<template>
  <div>
    <v-row class="match-height">
      <v-col
        v-if="Object.keys(list.users).length === 0"
        cols="12"
      >
        <v-card>
          <v-card-title>
            <template v-if="$vuetify.breakpoint.smAndUp">
              <div>
                List User
              </div>
              <v-spacer></v-spacer>
              <div>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      color="primary"
                      outlined
                      class="text-none tw-tracking-wide tw-text-white tw-font-medium"
                      v-bind="attrs"
                      v-on="on"
                    >
                      Filter By
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item-group>
                      <v-list-item
                        v-for="(item, index) in list.filters"
                        :key="index"
                        @change="handleFilter(item.key)"
                      >
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-menu>
                <v-btn
                  color="primary"
                  class="text-none tw-ml-3"
                  :to="{ name: 'addUserEdan' }"
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
                    List User
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    block
                    color="primary"
                    class="text-none"
                    :to="{ name: 'addUserEdan' }"
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
            height="auto"
            :fixed-header="$vuetify.breakpoint.smAndUp"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-uppercase">
                    Photo
                  </th>
                  <th class="text-uppercase">
                    Nama Lengkap & Username
                  </th>
                  <th class="text-uppercase">
                    Email
                  </th>
                  <th class="text-uppercase">
                    Register Date & Account Type
                  </th>
                  <th class="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in list.users"
                  :key="i"
                >
                  <td>{{ item.title }}</td>
                  <td class="text-center">
                    <div v-if="$vuetify.breakpoint.smAndUp">
                      <v-btn
                        icon
                        :to="{ name: 'editUserEdan', params: { id: item.id } }"
                        color="#FBBF24"
                      >
                        <v-icon>{{ icons.mdiPencilBoxMultiple }}</v-icon>
                      </v-btn>
                      <v-btn
                        class="tw-ml-2"
                        icon
                        color="#E11D48"
                        @click="openDialogDelete({ id: item.id, name: item.title })"
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
                                :to="{ name: 'editUserEdan', params: { id: item.id } }"
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
                                @click="openDialogDelete({ id: item.id, name: item.title })"
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
          <v-card-text class="tw-mt-4">
            <div class="text-center">
              <v-pagination
                v-model="current_page"
                :length="total_page"
                @input="handlePagination"
              ></v-pagination>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col
        v-else
        cols="12"
      >
        <v-skeleton-loader
          class="mx-auto"
          type="table"
          :types="{
            'table-row': 'table-cell@4',
            'table-tbody': 'table-row-divider@4',
          }"
        ></v-skeleton-loader>
      </v-col>
    </v-row>

    <v-dialog
      v-model="dialog.delete"
      max-width="480"
    >
      <v-card>
        <v-card-title>
          <div class="tw-text-true-gray-800 tw-text-base md:tw-text-lg">
            Yakin Ingin Menghapus {{ form.want_to_delete.name }} ?
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
              @click="handleDeleteItem(form.want_to_delete.id)"
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

// import { allData, deleteData } from '@/api/subCategory'

export default {
  data() {
    return {
      icons: {
        mdiTrashCan,
        mdiPencilBoxMultiple,
        mdiPlus,
        mdiDotsHorizontalCircle,
      },
      current_page: 1,
      total_page: 0,
      form: {
        want_to_delete: '',
      },
      dialog: {
        delete: false,
      },
      list: {
        users: [],
        filters: [
          {
            text: 'Filter: By User Type',
            key: 'user-type',
          },
          {
            text: 'Filter: By Register Date',
            key: 'register-date',
          },
          {
            text: 'Filter: By A-Z',
            key: 'a-z',
          },

          {
            text: 'Filter: By Domisi Province',
            key: 'domisi-provice',
          },
          {
            text: 'Filter: By Domisi Kota/Kab',
            key: 'domisi-city',
          },

        ],
      },
    }
  },
  mounted() {
    // this.getAllData()
  },
  methods: {
    openDialogDelete(params) {
      console.log(params)

      // this.form.want_to_delete = params
      // this.dialog.delete = !this.dialog.delete
    },
    handleFilter(filterType) {
      console.log(filterType)
    },

    // async handleDeleteItem(id) {
    //   await deleteData({ id })
    //   await this.getAllData()
    //   this.dialog.delete = !this.dialog.delete
    // },
    // async getAllData() {
    //   const data = await allData({ page: this.current_page })
    //   if (data.status === 401) {
    //     await this.$store.dispatch('auth/removeCurrentUser')
    //     this.$router.push({ name: 'pages-login' })
    //   } else {
    //     this.current_page = data.data.current_page
    //     this.total_page = data.data.last_page
    //     this.list.users = data.data.data
    //   }
    // },
    async handlePagination() {
      // await this.getAllData()
    },
  },
}
</script>

<style></style>
