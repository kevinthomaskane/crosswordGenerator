<template>
  <audio ref="correct">
    <source src="./../../public/audio/correct.mp3" type="audio/mp3">
    Your browser does not support the
    <code>audio</code> element.
  </audio>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Correct',
  watch: {
    /**
     * Value in store toggles between true and false, doesn't matter which
     */
    correctTrigger () {
      const audio = this.$refs['correct']
      audio.play()
    }
  },
  computed: {
    ...mapGetters([
      'correctTrigger'
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
