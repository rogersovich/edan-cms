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
                List Admin
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
                <v-btn
                  color="primary"
                  class="text-none"
                  :to="{ name: 'addAdminEdan' }"
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
                    List Admin
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="form.query_search"
                    label="Search"
                    outlined
                    hide-details=""
                    dense
                    placeholder="Search By Name"
                    @keydown.enter="handleSearch"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    block
                    color="primary"
                    class="text-none"
                    :to="{ name: 'addAdminEdan' }"
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
            v-if="Object.keys(list.admins).length > 0"
            height="auto"
            :fixed-header="$vuetify.breakpoint.smAndUp"
          >
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-uppercase">
                    Nama Lengkap
                  </th>
                  <th class="text-uppercase">
                    Username
                  </th>
                  <th class="text-uppercase">
                    Email
                  </th>
                  <th class="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in list.admins"
                  :key="i"
                >
                  <td>{{ item.name }}</td>
                  <td>{{ item.username }}</td>
                  <td>{{ item.email }}</td>

                  <td class="text-center">
                    <div v-if="$vuetify.breakpoint.smAndUp">
                      <v-btn
                        icon
                        :to="{ name: 'editAdminEdan', params: { id: item.id } }"
                        color="#FBBF24"
                      >
                        <v-icon>{{ icons.mdiPencilBoxMultiple }}</v-icon>
                      </v-btn>
                      <v-btn
                        v-if="item.is_trash === 0 || item.is_trash === '0'"
                        class="tw-ml-2"
                        icon
                        color="#E11D48"
                        @click="openDialogDelete({id: item.id, name: item.name})"
                      >
                        <v-icon>
                          {{ icons.mdiTrashCan }}
                        </v-icon>
                      </v-btn>
                      <v-btn
                        v-if="item.is_trash === 0 || item.is_trash === '0'"
                        icon
                        :to="{ name: 'changePasswordAdmin', params: { id: item.id } }"
                        color="#6B7280"
                      >
                        <v-icon>{{ icons.mdiLock }}</v-icon>
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
                                :to="{ name: 'editAdminEdan', params: { id: item.id } }"
                                color="#FBBF24"
                              >
                                <v-icon left>
                                  {{ icons.mdiPencilBoxMultiple }}
                                </v-icon>
                                Ubah Data
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                          <v-list-item v-if="item.is_trash === 0 || item.is_trash === '0'">
                            <v-list-item-content>
                              <v-btn
                                text
                                color="#E11D48"
                                @click="openDialogDelete({id: item.id, name: item.name})"
                              >
                                <v-icon left>
                                  {{ icons.mdiTrashCan }}
                                </v-icon>
                                Hapus
                              </v-btn>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item v-if="item.is_trash === 0 || item.is_trash === '0'">
                            <v-list-item-action>
                              <v-btn
                                text
                                :to="{ name: 'changePasswordAdmin', params: { id: item.id } }"
                                color="#6B7280"
                              >
                                <v-icon left>
                                  {{ icons.mdiLock }}
                                </v-icon>
                                Ubah Sandi
                              </v-btn>
                            </v-list-item-action>
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
            v-if="Object.keys(list.admins).length === 0"
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
            'table-tbody': 'table-row-divider@4'
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
          Jika anda menghapus data ini, data ini akan terhapus permanen
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
  mdiTrashCan, mdiPencilBoxMultiple, mdiPlus, mdiDotsHorizontalCircle, mdiLock, mdiCloseCircle,
} from '@mdi/js'

import { listAdmin, deleteAdmin } from '@/api/auth'

export default {
  name: 'ListBanner',
  data() {
    return {
      icons: {
        mdiTrashCan,
        mdiPencilBoxMultiple,
        mdiPlus,
        mdiDotsHorizontalCircle,
        mdiLock,
        mdiCloseCircle,
      },
      loading: {
        get_data: false,
      },
      current_page: 1,
      total_page: 0,
      limit: 5,
      form: {
        want_to_delete: '',
        query_search: '',
      },
      dialog: {
        delete: false,
      },
      list: {
        admins: [],
      },
    }
  },
  mounted() {
    this.getListAdmin()
  },
  methods: {
    openDialogDelete(params) {
      this.form.want_to_delete = params
      this.dialog.delete = !this.dialog.delete
    },
    async handleSearch() {
      await this.getListAdmin()
    },
    async handleClearPage() {
      this.current_page = 1
      this.form.query_search = ''
      await this.getListAdmin()
    },
    async handleDeleteItem(id) {
      this.dialog.delete = !this.dialog.delete
      this.loading.get_data = true
      await deleteAdmin({ id })
      this.$swal({
        title: 'Berhasil Menghapus',
        icon: 'success',
        timer: 1000,
      })
      await this.getListAdmin()
      this.loading.get_data = false
    },
    async getListAdmin() {
      this.loading.get_data = true
      const res = await listAdmin({ page: this.current_page, limit: this.limit, query: this.form.query_search })
      const { data } = res
      if (data.status || data.success) {
        this.loading.get_data = false
        this.total_page = data.total_page
        // eslint-disable-next-line radix
        this.current_page = parseInt(data.curent_page)
        this.list.admins = data.data
      } else {
        this.loading.get_data = false
      }
    },
    async handlePagination() {
      await this.getListAdmin()
    },
  },
}
</script>

<style></style>
