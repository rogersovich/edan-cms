<template>
  <div>
    <v-row class="match-height">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <div>
              List Sub Category
            </div>
            <v-spacer></v-spacer>
            <div>
              <v-btn
                color="primary"
                class="text-none"
                :to="{ name: 'subCategoryAdd' }"
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
                    Title
                  </th>
                  <th class="text-center text-uppercase">
                    Calories
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
                    {{ item.calories }}
                  </td>
                  <td class="text-center">
                    <div>
                      <v-btn
                        icon
                        :to="{ name: 'subCategoryEdit', params: { id: i + 1 } }"
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
    handleDeleteItem() {
      console.log('deleted item')
    },
  },
}
</script>

<style></style>
