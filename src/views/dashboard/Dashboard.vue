<template>
  <v-row>
    <v-col
      cols="12"
      md="4"
    >
      <v-row class="match-height">
        <v-col cols="12">
          <card-total-user></card-total-user>
        </v-col>
        <v-col cols="12">
          <card-total-new-message></card-total-new-message>
        </v-col>
      </v-row>
    </v-col>
    <v-col
      cols="12"
      md="4"
      sm="6"
    >
      <card-top-10-province></card-top-10-province>
    </v-col>
    <v-col
      cols="12"
      md="4"
      sm="6"
    >
      <card-top-10-city></card-top-10-city>
    </v-col>
  </v-row>
</template>

<script>
import CardTop10Province from '@/components/dashboard/CardTop10Province.vue'
import CardTop10City from '@/components/dashboard/CardTop10City.vue'
import CardTotalUser from '@/components/dashboard/CardTotalUser.vue'
import CardTotalNewMessage from '@/components/dashboard/CardTotalNewMessage.vue'

// demos

export default {
  components: {
    CardTop10Province,
    CardTop10City,
    CardTotalUser,
    CardTotalNewMessage,
  },
}
</script>
