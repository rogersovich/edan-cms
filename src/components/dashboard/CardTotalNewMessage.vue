<template>
  <v-card>
    <v-card-title class="align-start">
      <v-avatar
        color="#FBBF24"
        size="38"
        class="elevation-3"
      >
        <v-icon
          size="22"
          color="white"
          class="rounded-0"
        >
          {{ mdiMail }}
        </v-icon>
      </v-avatar>
      <v-spacer></v-spacer>

      <v-btn
        small
        icon
        class="me-n3 mt-n1"
      >
        <v-icon>
          {{ mdiDotsVertical }}
        </v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="text-no-wrap text--primary mt-3">
      <p class="font-weight-semibold text-base mb-1">
        Total Up Coming Message
      </p>

      <div class="tw-flex tw-items-center">
        <span class="font-weight-semibold text-3xl me-1 mb-2 tw-text-red-500">200</span>
        <span class="percentage">

          <v-icon
            small
            color="#EF4444"
          >
            {{ mdiArrowDown }}
          </v-icon>
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiMail, mdiArrowDown } from '@mdi/js'

export default {
  setup() {
    return {
      mdiDotsVertical,
      mdiMail,
      mdiArrowDown,

    }
  },
}
</script>

<style lang="scss" scoped>
.percentage {
  top: -8px;
  position: relative;
}
</style>
