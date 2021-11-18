<template>
  <div>
    <v-row class="match-height">
      <v-col
        v-if=" Object.keys(list.villa_galleries).length > 0"
        cols="12"
      >
        <v-card>
          <v-card-title>
            <template v-if="$vuetify.breakpoint.smAndUp">
              <div>List Villa Gallery</div>
              <v-spacer></v-spacer>
              <div>
                <v-btn
                  color="primary"
                  class="text-none"
                  :to="{ name: 'villaGalleryAdd' }"
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
                    List Villa Gallery
                  </div>
                </v-col>
                <v-col cols="12">
                  <v-btn
                    block
                    color="primary"
                    class="text-none"
                    :to="{ name: 'villaGalleryAdd' }"
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
                    Villa
                  </th>
                  <th class="text-center text-uppercase">
                    Image
                  </th>
                  <th class="text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(item, i) in list.villa_galleries"
                  :key="i"
                >
                  <td>{{ `${item.villa.sub_category.title} ${item.villa.sub_category_value}` }}</td>
                  <td class="text-center">
                    <v-avatar
                      size="100"
                      tile
                    >
                      <v-img
                        contain
                        :src="`http://127.0.0.1:8000/storage/${item.image}`"
                      ></v-img>
                    </v-avatar>
                  </td>
                  <td class="text-center">
                    <div v-if="$vuetify.breakpoint.smAndUp">
                      <v-btn
                        icon
                        color="primary"
                        @click="openDialogViewImage(`http://127.0.0.1:8000/storage/${item.image}`)"
                      >
                        <v-icon>{{ icons.mdiEye }}</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        class="tw-mx-2"
                        :to="{ name: 'villaGalleryEdit', params: { id: item.id } }"
                        color="#FBBF24"
                      >
                        <v-icon>{{ icons.mdiPencilBoxMultiple }}</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        color="#E11D48"
                        @click="openDialogDelete({id: item.id, name: item.villa.code})"
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
                                :to="{ name: 'villaGalleryEdit', params: { id: item.id } }"
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
                                @click="openDialogDelete({id: item.id, name: item.villa.code})"
                              >
                                <v-icon left>
                                  {{ icons.mdiTrashCan }}
                                </v-icon>
                                Hapus
                              </v-btn>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-action>
                              <v-btn
                                text
                                color="primary"
                                @click="
                                  openDialogViewImage(
                                    `http://127.0.0.1:8000/storage/${item.image}`,
                                  )
                                "
                              >
                                <v-icon left>
                                  {{ icons.mdiEye }}
                                </v-icon>
                                Preview
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
          <v-card-text class="tw-mt-4">
            <div>
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
      v-model="dialog.preview_image"
      max-width="480"
    >
      <v-card>
        <v-img :src="form.preview_image"></v-img>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="dialog.delete"
      max-width="480"
    >
      <v-card>
        <v-card-title>
          <div class="tw-text-true-gray-800 tw-text-base md:tw-text-lg">
            Ingin Menghapus Gambar dari Villa {{ form.want_to_delete.name }} ?
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
  mdiTrashCan, mdiPencilBoxMultiple, mdiEye, mdiPlus, mdiDotsHorizontalCircle,
} from '@mdi/js'
import { allData, deleteData } from '@/api/villaGallery'

export default {
  data() {
    return {
      icons: {
        mdiTrashCan,
        mdiPencilBoxMultiple,
        mdiEye,
        mdiPlus,
        mdiDotsHorizontalCircle,
      },
      current_page: 1,
      total_page: 0,
      form: {
        want_to_delete: '',
        preview_image: '',
      },
      dialog: {
        delete: false,
        preview_image: false,
      },
      list: {
        villa_galleries: [],
      },
    }
  },
  mounted() {
    this.getAllData()
  },
  methods: {
    openDialogDelete(params) {
      this.form.want_to_delete = params
      this.dialog.delete = !this.dialog.delete
    },
    openDialogViewImage(image) {
      this.form.preview_image = image
      this.dialog.preview_image = !this.dialog.preview_image
    },
    async handleDeleteItem(id) {
      await deleteData({ id })
      await this.getAllData()
      this.dialog.delete = !this.dialog.delete
    },
    async getAllData() {
      const data = await allData({ page: this.current_page })
      if (data.status === 401) {
        await this.$store.dispatch('auth/removeCurrentUser')
        this.$router.push({ name: 'pages-login' })
      } else {
        this.current_page = data.data.current_page
        this.total_page = data.data.last_page
        this.list.villa_galleries = data.data.data
      }
    },
    async handlePagination() {
      await this.getAllData()
    },
  },
}
</script>

<style></style>
