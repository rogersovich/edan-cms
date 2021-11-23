<template>
  <v-overlay
    :value="loading"
    class="tw-z-10"
  >
    <lottie
      :width="200"
      :height="200"
      :options="lottieOptions"
      @animCreated="handleAnimation"
    ></lottie>
  </v-overlay>
</template>

<script>
import lottie from 'vue-lottie/src/lottie.vue'
import animationData from '@/assets/triangle_loading.json'

export default {
  components: {
    lottie,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      anim: null,
      lottieOptions: { animationData },
      animationSpeed: 2.5,
    }
  },
  methods: {
    handleAnimation(anim) {
      this.anim = anim
      this.anim.setSpeed(this.animationSpeed)
    },
  },
}
</script>

<style scoped>
/* * >>> .v-overlay__content {
  position: absolute;
  top: 15%;
} */
</style>
