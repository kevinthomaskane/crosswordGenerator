<template>
  <audio ref="theme">
    <source src="./../../public/theme.mp3" type="audio/mp3">
    Your browser does not support the
    <code>audio</code> element.
  </audio>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Theme',
  data: () => ({
    audio: null
  }),
  /**
   * Initialize theme music
   */
  mounted () {
    this.audio = this.$refs['theme']

    this.addCustomLooping()
  },
  methods: {
    /**
     * Create custom looping function to reduce pause in native html looping
     */
    addCustomLooping () {
      const that = this

      this.audio.addEventListener('timeupdate', function () {
        const buffer = .5

        if (this.currentTime > this.duration - buffer){
          that.audio.currentTime = 0
          that.audio.play()
        }
      })
    }
  },
  watch: {
    /**
     * Value in store toggles between true and false
     */
    themeTrigger (val) {
      if (val) {
        this.audio.play()
        return
      }

      this.audio.pause()
    }
  },
  computed: {
    ...mapGetters([
      'themeTrigger'
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
