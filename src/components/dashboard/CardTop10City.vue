<template>
  <v-card>
    <v-card-title class="align-start">
      <div class="tw-font-bold tw-text-gray-800 tw-leading-normal">
        <div>Top 10 User By</div>
        <div>
          Kota/Kabupaten
        </div>
      </div>
      <v-spacer></v-spacer>

      <v-btn
        icon
        small
        class="me-n3 mt-n2"
      >
        <v-icon>
          {{ icons.mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="tw-pb-10 tw-pt-4">
      <div
        class="d-flex align-center"
      >
        <div class="tw-text-2xl tw-font-bold tw-text-gray-700 tw-pr-4">
          {{ topOneCity.urutan }}.
        </div>
        <v-avatar
          rounded
          size="55"
          color="#5e56690a"
          class="me-4"
        >
          <v-img
            contain
            :src="topOneCity.avatar"
            height="38"
          ></v-img>
        </v-avatar>

        <div class="d-flex flex-grow-1 flex-wrap">
          <div>
            <h4 class="font-weight-medium tw-text-base">
              {{ topOneCity.fullname }}
            </h4>
            <span class="text-sm text-no-wrap">
              {{ topOneCity.username }}
            </span>
          </div>

          <v-spacer></v-spacer>

          <div class="ms-1 tw-text-center">
            <v-avatar
              size="25"
            >
              <v-img :src="require('@/assets/images/misc/point.png')"></v-img>
            </v-avatar>
            <p class="text--primary font-weight-medium mb-1 mt-1 tw-text-base">
              {{ topOneCity.point }}
            </p>
          </div>
        </div>
      </div>
    </v-card-text>

    <v-card-text>
      <div
        v-for="(user,index) in topNineCity"
        :key="index"
        :class="`d-flex align-center ${index >0 ? 'mt-8':''}`"
      >
        <div class="tw-text-lg tw-font-bold tw-text-gray-700 tw-pr-4">
          {{ user.urutan }}.
        </div>
        <v-avatar
          rounded
          size="38"
          color="#5e56690a"
          class="me-4"
        >
          <v-img
            contain
            :src="user.avatar"
            height="20"
          ></v-img>
        </v-avatar>

        <div class="d-flex align-center flex-grow-1 flex-wrap">
          <div>
            <h4 class="font-weight-medium">
              {{ user.fullname }}
            </h4>
            <span class="text-xs text-no-wrap">{{ user.username }}</span>
          </div>

          <v-spacer></v-spacer>

          <div class="ms-1 tw-text-center">
            <v-avatar
              size="25"
            >
              <v-img :src="require('@/assets/images/misc/point.png')"></v-img>
            </v-avatar>
            <p class="text--primary font-weight-medium mb-1 mt-1 tw-text-base">
              {{ user.point }}
            </p>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiMenuUp } from '@mdi/js'

export default {
  setup() {
    const topOneCity = {
      avatar: require('@/assets/images/logos/aviato.png'),
      fullname: 'Dimas Roger',
      username: 'rogersovich',
      urutan: 1,
      point: 110,
    }

    const topNineCity = [
      {

        avatar: require('@/assets/images/logos/zipcar.png'),
        fullname: 'Zipcar',
        username: 'ethereals',
        urutan: 2,
        point: 80,
      },
      {
        avatar: require('@/assets/images/logos/bitbank.png'),
        fullname: 'boomWhite',
        username: 'Sketch, Figma & XD',
        urutan: 3,
        point: 75,

      },
      {
        avatar: require('@/assets/images/logos/aviato.png'),
        fullname: 'Aviato',
        username: 'WhoNows',
        urutan: 4,
        point: 72,

      },
      {

        avatar: require('@/assets/images/logos/zipcar.png'),
        fullname: 'Zipcar',
        username: 'ethereals',
        urutan: 5,
        point: 71,
      },
      {
        avatar: require('@/assets/images/logos/bitbank.png'),
        fullname: 'boomWhite',
        username: 'Sketch, Figma & XD',
        urutan: 6,
        point: 69,

      },
      {
        avatar: require('@/assets/images/logos/aviato.png'),
        fullname: 'Aviato',
        username: 'WhoNows',
        urutan: 7,
        point: 67,

      },
      {

        avatar: require('@/assets/images/logos/zipcar.png'),
        fullname: 'Zipcar',
        username: 'ethereals',
        urutan: 8,
        point: 65,
      },
      {
        avatar: require('@/assets/images/logos/bitbank.png'),
        fullname: 'boomWhite',
        username: 'Sketch, Figma & XD',
        urutan: 9,
        point: 54,

      },
      {
        avatar: require('@/assets/images/logos/aviato.png'),
        fullname: 'Aviato',
        username: 'WhoNows',
        urutan: 10,
        point: 50,

      },
    ]

    return {
      topOneCity,
      topNineCity,
      icons: { mdiDotsVertical, mdiMenuUp },
    }
  },
}
</script>
