<template>
  <div class="game-active-view-wrapper" v-if="currentCrosswordIndex > -1">
    <menu-bar />

    <progress-bar />

    <crossword
      :letterCombo="crosswords[currentCrosswordIndex]"
    />

    <crossword-complete v-if="isCrosswordComplete" />

    <level-complete v-if="isLevelComplete" />

    <div class="status-letters-picker-wrapper" v-if="!isCrosswordComplete && !isLevelComplete">
      <status-box
        :status="status"
      />

      <active-letters
        :letters="activeLetters"
        @update:deleteLetter="handleDeleteLetter"
        @submit:word="handleSubmitWord"
        :status="status"
      />

      <letter-picker
        :letters="crosswords[currentCrosswordIndex].letters"
        @update:selectedLetters="handleNewLetterSelection"
      />
    </div>
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
import MenuBar from './../components/MenuBar'
import CrosswordComplete from './../components/CrosswordComplete'
import LevelComplete from './../components/LevelComplete'
import ProgressBar from './../components/ProgressBar'

/**
 * View when crossword puzzle is active
 */
export default {
  name: 'GameActive',
  components: {
    'crossword': Crossword,
    'letter-picker': LetterPicker,
    'active-letters': ActiveLetters,
    'status-box': StatusBox,
    'menu-bar': MenuBar,
    'crossword-complete': CrosswordComplete,
    'progress-bar': ProgressBar,
    'level-complete': LevelComplete,
  },
  data: () => ({
    activeLetters: [],
    status: null,
    maxWordLength: -1,
    statusTimeoutMS: 1000
  }),

  /**
   * Retrieve the appropriate list of puzzles based on user-selected difficulty from store
   */
  mounted () {
    import(`./../letter-combos/combos-${this.difficulty === 'random' ? 'all' : this.difficulty}`)
      .then(({ combos }) => {
        this.$store.dispatch('setCrosswords', combos)
        this.$store.dispatch('setCurrentCrosswordIndex', 0)
        this.maxWordLength = this.crosswords[this.currentCrosswordIndex].placedWords[0].length
      })
  },
  methods: {
    /**
     * Receives emitted letter from LetterPicker and updates the activeLetters array for ActiveLetters. If max number of letters has already been guessed, sets status for StatusBox
     * @param {string} letter - the user-selected letter
     */
    handleNewLetterSelection (letter) {
      if (this.activeLetters.length < this.maxWordLength) {
        this.activeLetters = [...this.activeLetters, letter] 
        return
      }

      this.status = STATUSES['TOO_MANY_LETTERS']
      this.clearStatus()
    },

    /**
     * Receives update from ActiveLetters and removes last letter from activeLetters array.  Updates status accordingly
     */
    handleDeleteLetter () {
      this.activeLetters = this.activeLetters.slice(0, this.activeLetters.length - 1)

      if (this.activeLetters.length <= this.maxWordLength) {
        this.status = null
      }
    },

    /**
     * Checks if word exists in puzzle or has been placed already, then clears board
     */
    handleSubmitWord () {
      const submittedWord = this.activeLetters.join('')

      // check if word has already been placed
      if (this.placedWords.indexOf(submittedWord) > -1) {
        this.$store.dispatch('triggerPlayIncorrect')
        this.status = STATUSES['ALREADY_USED']
      }
      // check if word exists and add it to placedWords
      else if (this.crosswords[this.currentCrosswordIndex].placedWords.indexOf(submittedWord) > -1) {
        this.$store.dispatch('triggerPlayCorrect')
        this.$store.dispatch('setPlacedWords', [...this.placedWords, submittedWord])
        this.status = STATUSES['CORRECT_GUESS']
      }
      // must be incorrect
      else {
        this.$store.dispatch('triggerPlayIncorrect')
        this.status = STATUSES['INCORRECT_GUESS']
      }

      this.clearLetters()
      this.clearStatus()
    },

    /**
     * Status message should flash for 1s and then be removed
     */
    clearStatus () {
      setTimeout(() => this.status = null, this.statusTimeoutMS)
    },

    /**
     * Letters should clear at same time as status message
     */
    clearLetters () {
      setTimeout(() => this.activeLetters = [], this.statusTimeoutMS)
    },
  },
  watch: {
    /**
     * When next crossword is displayed, reset all values
     */
    currentCrosswordIndex () {
      this.activeLetters = []
      this.maxWordLength = this.crosswords[this.currentCrosswordIndex].placedWords[0].length
    },

    /**
     * When all words have been placed, determine whether this is last puzzle in difficulty.  If so, set the level to complete, otherwise show CrosswordComplete after each letter animation has completed
     * @param {words} array - array of placed words
     */
    placedWords (words) {
      if (words.length === this.crosswords[this.currentCrosswordIndex].placedWords.length) {
        const lengthOfLastWord = words[words.length - 1].length

        // Each letter has an animation length of 200ms, but add extra to be safe
        const delay = lengthOfLastWord * 250

        // Are we at the last crossword in the level?
        if (this.currentCrosswordIndex === this.crosswords.length - 1) {
          setTimeout(() => this.$store.dispatch('setLevelComplete'), delay)
          return
        } 

        setTimeout(() => this.$store.dispatch('setCrosswordComplete'), delay)

        // If there are more crosswords to go, set the current one to complete and go to next
        setTimeout(() => {
          // Set this back to false after 1.5s
          this.$store.dispatch('setCrosswordComplete')

          let i = this.currentCrosswordIndex
          this.$store.dispatch('setCurrentCrosswordIndex', ++i)
        }, delay + 1500)
      }
    }
  },
  computed: {
    ...mapGetters([
      'difficulty',
      'currentCrosswordIndex',
      'crosswords',
      'isLevelComplete',
      'placedWords',
      'isCrosswordComplete'
    ])
  }
}
</script>

<style lang="scss">
@import "./../variables";
@import "./../mediaQueries";

.game-active-view-wrapper {
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  padding: 2rem 0;
  @include breakpoint-mobile {
    padding-top: 4rem;
  }
  /* crossword is 60% height of container with a 2rem margin-bottom */
  .status-letters-picker-wrapper {
    height: calc(40% - 2rem);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}
</style>
