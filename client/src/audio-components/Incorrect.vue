<template>
  <audio ref="incorrect">
    <source src="./../../public/audio/incorrect.mp3" type="audio/mp3">
    Your browser does not support the
    <code>audio</code> element.
  </audio>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Incorrect',
  watch: {
    /**
     * Value in store toggles between true and false, doesn't matter which
     */
    incorrectTrigger () {
      const audio = this.$refs['incorrect']
      audio.play()
    }
  },
  computed: {
    ...mapGetters([
      'incorrectTrigger'
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
