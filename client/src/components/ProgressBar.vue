<template>
  <div class="progress-bar-wrapper">
    <div class="item difficulty-display">
      Difficulty: {{ difficulty }}
    </div>
    <div class="item level-progress">
      Completed: {{ currentCrosswordIndex }}/{{ numCrosswords }}
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ProgressBar',
  computed: {
    ...mapGetters([
      'difficulty',
      'currentCrosswordIndex',
      'numCrosswords'
    ])
  }
}
</script>
<style lang="scss">
@import "./../variables";

.progress-bar-wrapper {
  position: absolute;
  top: 1rem;
  right: 1rem;
  justify-content: center;
  align-items: center;
  .item {
    text-align: right;
    color: black;
    font-family: $font-family-headings;
    font-weight: bold;
    margin-bottom: .5rem;
    margin-bottom: .5rem;
  }
}
</style>
