<template>
  <div class="game-active-view-wrapper" v-if="currentIndex > -1">
    <crossword
      :letterCombo="combos[currentIndex]"
    />

    <status-box
      :status="status"
    />
    <active-letters
      :letters="activeLetters"
    />
    <letter-picker
      :letters="combos[currentIndex].letters"
      @update:selectedLetters="handleNewLetterSelection"
    />
  </div>
</template>

<script>
/* eslint-disable */
import { mapGetters } from 'vuex'
import { STATUSES } from './../constants'
import Crossword from './../components/Crossword'
import LetterPicker from './../components/LetterPicker'
import ActiveLetters from './../components/ActiveLetters'
import StatusBox from './../components/StatusBox'

/**
 * View when crossword puzzle is active
 */
export default {
  name: 'GameActive',
  components: {
    'crossword': Crossword,
    'letter-picker': LetterPicker,
    'active-letters': ActiveLetters,
    'status-box': StatusBox
  },
  data: () => ({
    combos: [],
    currentIndex: -1,
    activeLetters: [],
    status: ''
  }),

  /**
   * Retrieve the appropriate list of puzzles based on user-selected difficulty from store
   */
  mounted () {
    import(`./../letter-combos/combos-${this.difficulty === 'random' ? 'all' : this.difficulty}`)
      .then(({ combos }) => {
        this.combos = combos
        this.currentIndex = 0
      })
  },
  methods: {
    /**
     * Receives emitted letter from LetterPicker and updates the activeLetters array for ActiveLetters. If max number of letters has already been guessed, sets status for StatusBox
     * @param {string} letter - the user-selected letter
     */
    handleNewLetterSelection (letter) {
      const maxWordLength = this.combos[this.currentIndex].words[0].length

      if (this.activeLetters.length < maxWordLength) {
        this.activeLetters = [...this.activeLetters, letter] 
        return
      }

      this.status = STATUSES['TOO_MANY_LETTERS']

    }
  },
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
