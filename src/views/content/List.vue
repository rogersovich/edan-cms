<template>
  <div>
    <v-row class="match-height">
      <v-col
        v-if=" Object.keys(list.contents).length === 0"
        cols="12"
      >
        <v-card>
          <v-card-title>
            <template v-if="$vuetify.breakpoint.smAndUp">
              <div>
                List Content
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
                    @keydown.enter="handleSearch"
                  ></v-text-field>
                </div>
                <div>
                  <v-btn
                    color="primary"
                    outlined
                    class="text-none tw-tracking-wide tw-text-white tw-font-medium"
                    @click="showMenuFilter"
                  >
                    Filter By
                  </v-btn>
                  <v-menu
                    v-model="menu.filter"
                    offset-y
                    absolute
                    :position-x="x"
                    :position-y="y"
                    :close-on-content-click="false"
                  >
                    <v-list>
                      <v-list-item-group>
                        <template v-for="item in list.filters">
                          <v-list-item
                            v-if="item.key !== 'categori'"
                            :key="item.key"
                            @change="handleFilter(item.key)"
                          >
                            <v-list-item-title>{{ item.text }}</v-list-item-title>
                          </v-list-item>

                          <v-list-group
                            v-else
                            :key="item.key"
                            sub-group
                            class="tw-block"
                          >
                            <template #activator>
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ item.text }}
                                </v-list-item-title>
                              </v-list-item-content>
                            </template>
                            <template v-for="category in list.categories">
                              <v-list-item
                                :key="category.key"
                                @change="handleFilter(category.key)"
                              >
                                <v-list-item-title>{{ category.text }}</v-list-item-title>
                              </v-list-item>
                            </template>
                          </v-list-group>
                        </template>
                        <v-list-item class="tw-mt-2">
                          <v-btn
                            block
                            small
                            color="primary"
                            @click="handleSubmitFilter"
                          >
                            Simpan
                          </v-btn>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list>
                  </v-menu>
                </div>
                <v-btn
                  color="primary"
                  class="text-none tw-ml-3"
                  :to="{ name: 'addContentEdan' }"
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
                    List Content
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
                    :to="{ name: 'addContentEdan' }"
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
                    Thumbnail
                  </th>
                  <th class="text-uppercase">
                    Judul
                  </th>
                  <th class="text-uppercase">
                    Category
                  </th>
                  <th class="text-uppercase">
                    Create By
                  </th>
                  <th class="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in list.contents"
                  :key="i"
                >
                  <td>{{ item.title }}</td>
                  <td class="text-center">
                    <div v-if="$vuetify.breakpoint.smAndUp">
                      <v-btn
                        icon
                        :to="{ name: 'editContentEdan', params: { id: item.id } }"
                        color="#FBBF24"
                      >
                        <v-icon>{{ icons.mdiPencilBoxMultiple }}</v-icon>
                      </v-btn>
                      <v-btn
                        class="tw-ml-2"
                        icon
                        color="#E11D48"
                        @click="openDialogDelete({id: item.id, name: item.title})"
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
                                :to="{ name: 'editContentEdan', params: { id: item.id } }"
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
                                @click="openDialogDelete({id: item.id, name: item.title})"
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
      menu: {
        filter: false,
      },
      form: {
        want_to_delete: '',
        query_search: '',
        filter_by: '',
      },
      dialog: {
        delete: false,
      },
      x: 0,
      y: 0,
      list: {
        contents: [],
        filters: [
          {
            text: 'Filter: By Publish Date',
            key: 'publish-date',
          },
          {
            text: 'Filter: By Newest/Older',
            key: 'newest-or-older',
          },
          {
            text: 'Filter: By Category',
            key: 'categori',
          },

        ],
        categories: [
          {
            text: 'Info',
            key: 'info',
          },
          {
            text: 'Edukasi',
            key: 'edukasi',
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
      this.form.filter_by = params

      // this.form.want_to_delete = params
      // this.dialog.delete = !this.dialog.delete
    },
    showMenuFilter(e) {
      e.preventDefault()
      this.menu.filter = false
      this.x = e.clientX - 30
      this.y = e.clientY + 20
      this.$nextTick(() => {
        this.menu.filter = true
      })
    },
    handleFilter(filterType) {
      this.form.filter_by = filterType
    },
    handleSearch(event) {
      event.preventDefault()
      console.log(this.form.query_search)
    },
    handleSubmitFilter() {
      console.log(this.form.filter_by)
      this.menu.filter = !this.menu.filter
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
    //     this.list.contents = data.data.data
    //   }
    // },
    async handlePagination() {
      // await this.getAllData()
    },
  },
}
</script>

<style scoped>
* >>> .v-list-group--sub-group .v-list-group__header {
  padding-left: 10px !important;
}
</style>
