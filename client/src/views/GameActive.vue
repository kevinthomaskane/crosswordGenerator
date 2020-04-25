<template>
  <div class="game-active-view-wrapper" v-if="currentIndex > -1">
    <crossword
      :letterCombo="combos[currentIndex]"
    />
    <letter-display
      :letters="combos[currentIndex].letters"
    />
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import Crossword from './../components/Crossword'
import LetterDisplay from './../components/LetterDisplay'

export default {
  name: 'GameActive',
  components: {
    'crossword': Crossword,
    'letter-display': LetterDisplay
  },
  data: () => ({
    combos: [],
    currentIndex: -1
  }),
  mounted () {
    import(`./../letter-combos/combos-${this.difficulty === 'random' ? 'all' : this.difficulty}`)
      .then(({ combos }) => {
        this.combos = combos
        this.currentIndex = 0
      })
  },
  methods: {},
  computed: {
    ...mapGetters([
      'difficulty'
    ])
  }
}
</script>

<style lang="scss">
@import "./../variables";

.game-active-view-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  padding-top: 3rem;
}
</style>
