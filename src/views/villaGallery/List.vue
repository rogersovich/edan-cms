<template>
  <div>
    <v-row class="match-height">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <div>List Villa Gallery</div>
            <v-spacer></v-spacer>
            <div>
              <v-btn
                color="primary"
                class="text-none"
                :to="{name: 'villaGalleryAdd'}"
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
                  <th class="text-uppercase">
                    Villa (villa_id)
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
                  v-for="(item, i) in list.sub_categories"
                  :key="i"
                >
                  <td>{{ item.dessert }}</td>
                  <td class="text-center">
                    <v-avatar
                      size="100"
                      tile
                    >
                      <v-img
                        contain
                        src="https://ik.imagekit.io/1akf8cdsyg/villa-1_Fxh92jz0eB.jpg?updatedAt=1630601351002"
                      ></v-img>
                    </v-avatar>
                  </td>
                  <td class="text-center">
                    <div>
                      <v-btn
                        icon
                        color="primary"
                        @click="
                          openDialogViewImage(
                            'https://ik.imagekit.io/1akf8cdsyg/villa-1_Fxh92jz0eB.jpg?updatedAt=1630601351002',
                          )
                        "
                      >
                        <v-icon>{{ icons.mdiEye }}</v-icon>
                      </v-btn>
                      <v-btn
                        icon
                        class="tw-mx-2"
                        :to="{ name: 'villaGalleryEdit', params: { id: i + 1 } }"
                        color="#FBBF24"
                      >
                        <v-icon>{{ icons.mdiPencilBoxMultiple }}</v-icon>
                      </v-btn>
                      <v-btn
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
import {
  mdiTrashCan, mdiPencilBoxMultiple, mdiEye, mdiPlus,
} from '@mdi/js'

export default {
  data() {
    return {
      icons: {
        mdiTrashCan,
        mdiPencilBoxMultiple,
        mdiEye,
        mdiPlus,
      },
      form: {
        want_to_delete: '',
        preview_image: '',
      },
      dialog: {
        delete: false,
        preview_image: false,
      },
      list: {
        sub_categories: [
          {
            dessert: 'Frozen Yogurt',
            calories: 159,
            fat: 6,
            carbs: 24,
            protein: 4,
          },
          {
            dessert: 'Ice cream sandwich',
            calories: 237,
            fat: 6,
            carbs: 24,
            protein: 4,
          },
          {
            dessert: 'Eclair',
            calories: 262,
            fat: 6,
            carbs: 24,
            protein: 4,
          },
          {
            dessert: 'Cupcake',
            calories: 305,
            fat: 6,
            carbs: 24,
            protein: 4,
          },
          {
            dessert: 'Gingerbread',
            calories: 356,
            fat: 6,
            carbs: 24,
            protein: 4,
          },
          {
            dessert: 'Cupcake',
            calories: 305,
            fat: 6,
            carbs: 24,
            protein: 4,
          },
          {
            dessert: 'Gingerbread',
            calories: 356,
            fat: 6,
            carbs: 24,
            protein: 4,
          },
          {
            dessert: 'Cupcake',
            calories: 305,
            fat: 6,
            carbs: 24,
            protein: 4,
          },
          {
            dessert: 'Gingerbread',
            calories: 356,
            fat: 6,
            carbs: 24,
            protein: 4,
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
    openDialogViewImage(image) {
      this.form.preview_image = image
      this.dialog.preview_image = !this.dialog.preview_image
    },
    handleDeleteItem() {
      console.log('deleted item')
    },
  },
}
</script>

<style></style>
