<template>
  <v-card>
    <v-card-title class="align-start">
      <v-avatar
        color="#3B82F6"
        size="38"
        class="elevation-3"
      >
        <v-icon
          size="22"
          color="white"
          class="rounded-0"
        >
          {{ mdiAccount }}
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
        Total User
      </p>

      <div class="tw-flex tw-items-center">
        <span class="font-weight-semibold text-3xl me-1 mb-2 tw-text-green-500">1.000</span>
        <span class="percentage">

          <v-icon
            small
            color="#22C55E"
          >
            {{ mdiArrowUp }}
          </v-icon>
        </span>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { mdiDotsVertical, mdiAccount, mdiArrowUp } from '@mdi/js'

export default {
  setup() {
    return {
      mdiDotsVertical,
      mdiAccount,
      mdiArrowUp,

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
