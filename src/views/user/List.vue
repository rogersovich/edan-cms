<template>
  <div>
    <v-row class="match-height">
      <v-col
        v-if="!loading.get_data"
        cols="12"
      >
        <v-card>
          <v-card-title>
            <template v-if="$vuetify.breakpoint.smAndUp">
              <div>
                List User
              </div>
              <v-spacer></v-spacer>
              <div class="tw-flex tw-items-center">
                <div class="tw-mr-4">
                  <v-text-field
                    v-model="form.query_search"
                    label="Search"
                    outlined
                    hide-details=""
                    dense
                    placeholder="Search By Name"
                    clearable
                    :clear-icon="icons.mdiCloseCircle"
                    @keydown.enter="handleSearch"
                    @click:clear="handleClearPage"
                  ></v-text-field>
                </div>
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
                  <div>
                    <v-text-field
                      v-model="form.query_search"
                      label="Search"
                      outlined
                      hide-details=""
                      dense
                      placeholder="Search By Name"
                      @keydown.enter="handleSearch"
                    ></v-text-field>
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        color="primary"
                        outlined
                        block
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
            v-if="Object.keys(list.users).length > 0"
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
                    Nama & Username
                  </th>
                  <th class="text-uppercase">
                    Email
                  </th>
                  <th class="text-uppercase">
                    Tipe
                  </th>
                  <th class="text-uppercase">
                    Register Date
                  </th>
                  <th class="text-uppercase">
                    Point
                  </th>
                  <th class="text-uppercase">
                    Koin
                  </th>
                  <th class="text-uppercase">
                    Di hapus
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
                  <td class="tw-py-4">
                    <template v-if="item.profile_img === '' || item.profile_img === null">
                      <v-avatar
                        tile
                        size="40"
                      >
                        <v-img :src="require(`@/assets/images/avatars/spiderman.png`)"></v-img>
                      </v-avatar>
                    </template>
                    <template v-else>
                      <v-img
                        :aspect-ratio="1 / 1"
                        :src="base_url_image + item.profile_img"
                      ></v-img>
                    </template>
                  </td>
                  <td>
                    <div class="tw-font-bold tw-mb-0.5 tw-capitalize">
                      {{ item.full_name }}
                    </div>
                    <div>
                      {{ item.username }}
                    </div>
                  </td>
                  <td>{{ item.email }}</td>
                  <td>Null</td>
                  <td>{{ formatDate(item.createdAt) }}</td>
                  <td class="tw-text-center">
                    <span v-if="item.my_point === null || item.my_point === ''">
                      0
                    </span>
                    <span v-else>
                      {{ item.my_point }}
                    </span>
                  </td>
                  <td class="tw-text-center">
                    <span v-if="item.my_koin === null || item.my_koin === ''">
                      0
                    </span>
                    <span v-else>
                      {{ item.my_koin }}
                    </span>
                  </td>
                  <td>
                    <v-chip
                      v-if="item.is_trash === 0 || item.is_trash === '0'"
                      class="tw-mx-2 tw-font-medium"
                      color="#22C55E"
                      text-color="white"
                    >
                      Tidak
                    </v-chip>
                    <v-chip
                      v-else
                      class="tw-mx-2 tw-font-medium"
                      color="#E11D48"
                      text-color="white"
                    >
                      Yaa
                    </v-chip>
                  </td>
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
                        v-if="item.is_trash === 0 || item.is_trash === '0'"
                        class="tw-ml-2"
                        icon
                        color="#E11D48"
                        @click="openDialogDelete({ id: item.id, name: item.email })"
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
                          <v-list-item v-if="item.is_trash === 0 || item.is_trash === '0'">
                            <v-list-item-content>
                              <v-btn
                                text
                                color="#E11D48"
                                @click="openDialogDelete({ id: item.id, name: item.email })"
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
          <v-card-text
            v-if="Object.keys(list.users).length === 0"
            class="tw-mt-6"
          >
            <div class="tw-text-center tw-text-lg">
              Data Not Found
            </div>
          </v-card-text>
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
import moment from 'moment'
import {
  mdiTrashCan, mdiPencilBoxMultiple, mdiPlus, mdiDotsHorizontalCircle, mdiCloseCircle,
} from '@mdi/js'
import { listUser, deleteUser } from '@/api/user'

export default {
  data() {
    return {
      icons: {
        mdiTrashCan,
        mdiPencilBoxMultiple,
        mdiPlus,
        mdiDotsHorizontalCircle,
        mdiCloseCircle,
      },
      current_page: 1,
      total_page: 0,
      limit: 5,
      loading: {
        get_data: false,
      },
      form: {
        want_to_delete: '',
        query_search: '',
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
  computed: {
    base_url_image() {
      return process.env.VUE_APP_API
    },
  },
  mounted() {
    this.getListUser()
  },
  methods: {
    formatDate(params) {
      // const date = moment(params).utc().format('YYYY-MMM-DD hh:mm:ss')
      const date = moment(params)
        .utc()
        .format('YYYY-MMM-DD')

      return date
    },
    openDialogDelete(params) {
      this.form.want_to_delete = params
      this.dialog.delete = !this.dialog.delete
    },
    handleFilter(filterType) {
      console.log(filterType)
    },
    async handleSearch() {
      await this.getListUser()
    },
    async handleClearPage() {
      this.current_page = 1
      this.form.query_search = ''
      await this.getListUser()
    },
    async handleDeleteItem(id) {
      this.dialog.delete = !this.dialog.delete
      this.loading.get_data = true
      await deleteUser({ id })
      await this.$swal({
        title: 'Berhasil Menghapus',
        icon: 'success',
        timer: 1000,
      })
      await this.getListUser()
      this.loading.get_data = false
    },
    async getListUser() {
      this.loading.get_data = true
      const res = await listUser({ page: this.current_page, limit: this.limit, query: this.form.query_search })
      const { data } = res
      if (data.status || data.success) {
        this.loading.get_data = false
        this.total_page = data.total_page
        // eslint-disable-next-line radix
        this.current_page = parseInt(data.curent_page)
        this.list.users = data.data
      } else {
        this.loading.get_data = false
      }
    },
    async handlePagination() {
      await this.getListUser()
    },
  },
}
</script>

<style></style>
