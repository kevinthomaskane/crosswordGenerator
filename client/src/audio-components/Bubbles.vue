<template>
  <audio ref="bubbles">
    <source src="./../../public/bubbles-trimmed.mp3" type="audio/mp3">
    Your browser does not support the
    <code>audio</code> element.
  </audio>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Bubbles',
  watch: {
    /**
     * Value in store toggles between true and false, doesn't matter which
     */
    bubbleTrigger () {
      const audio = this.$refs['bubbles']
      audio.play()
    }
  },
  computed: {
    ...mapGetters([
      'bubbleTrigger'
    ])
  }
}
</script>
<style lang="scss">
audio {
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>
