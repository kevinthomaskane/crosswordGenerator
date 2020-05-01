<template>
  <div class="crossword-wrapper" ref="crossword-wrapper">
    <div
      class="crossword-container"
      ref="crossword-container"
    >
      <div
        class="row"
        v-for="(row, i) of crosswords[currentCrosswordIndex].grid"
        :key="i"
      >
        <div
          :class="[
            'space',
            { isUsed: col },
            { guessed: col && isPartOfPlacedWords(col.partOfWords) && !isPartOfCurrentWord(col.partOfWords)}
          ]"
          :style="{
            animation: `${col && isPartOfCurrentWord(col.partOfWords) ? returnAnimation(col.letter, i, j) : ''}`,
            color: `${placedWords.length === 0 ? 'transparent' : ''}`
          }"
          :ref="`${i}-${j}`"
          v-for="(col, j) of row"
          :key="j"
        >
          {{ col && isPartOfPlacedWords(col.partOfWords) ? col.letter : '' }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

import { mapGetters } from 'vuex'
/**
 * Displays the puzzle for the current letter-combo
 */
export default {
  name: 'Crossword',
  data: () => ({
    squareWidth: 32,
    squareHeight: 32,
    animationDelayIncrement: .2
  }),
  
  /**
   * Used to keep track of letter index for determining animation delay.  Needed this to be static to avoid infinite re-rendering as it gets updated
   */
  indexOfLetter: 0,

  mounted () {
    this.$nextTick(this.returnCrosswordScale())
  },
  methods: {
    /**
     * Checks for size of rendered crossword. If larger than containing wrapper, determines if size is most excessive on width or height, then applies a scale() to the puzzle to make it fit more appropriately
     */
    returnCrosswordScale () {
      const crosswordWrapperWidth = this.$refs['crossword-wrapper'].offsetWidth
      const crosswordWrapperHeight = this.$refs['crossword-wrapper'].offsetHeight

      // default size of crossword square is 2rem x 2rem
      const widthOfCrossword = this.crosswords[this.currentCrosswordIndex].grid[0].length * this.squareWidth
      const heightOfCrossword = this.crosswords[this.currentCrosswordIndex].grid.length * this.squareHeight

      if (widthOfCrossword > heightOfCrossword) {
        this.$refs['crossword-container'].style.transform = `translate(-50%, -50%) scale(${(crosswordWrapperWidth / widthOfCrossword) - .05})`
        return
      }

      // ensure that puzzle fits within wrapper by scaling it an additional .05
      this.$refs['crossword-container'].style.transform = `translate(-50%, -50%) scale(${(crosswordWrapperHeight / heightOfCrossword) - .05})`
    },

    /**
     * Checks whether the letter is part of any of the placedWords
     * @param {array} inTheseWords - array of words that the current letter appears in
     */
    isPartOfPlacedWords (inTheseWords) {
      if (this.placedWords.length === 0) {
        return false
      }

      for (let i = 0; i < inTheseWords.length; i++) {
        // if the words exist in both arrays, we know that the letter is being used
        if (this.placedWords.indexOf(inTheseWords[i]) > -1) {
          return true
        }
      }
      return false
    },

    /**
     * Checks whether the letter is part of the most recently guessed word
     * @param {array} inTheseWords - array of words that the current letter appears in
     * @return {boolean} is the letter part of the current word?
     */
    isPartOfCurrentWord (inTheseWords) {
      const currentWord = this.placedWords[this.placedWords.length - 1]

      if (inTheseWords.indexOf(currentWord) > -1) {
        return true
      }

      return false
    },

    /**
     * Based on the letter's position in the most recently guessed word, we return an animation.  Keep track of current position within the word with indexOfLetter in order to calculate the animation delay.
     * @param {string} letter - letter that is being rendered
     * @param {number} row - row identifier for current space
     * @param {number} col - column identifier for current space
     * @return {string} the animation represented as a string
     */
    returnAnimation (letter, row, col) {
      console.log(this.$options.indexOfLetter, letter)
      const element = this.$refs[row + '-' + col][0]

      const i = this.$options.indexOfLetter 

      const currentWord = this.placedWords[this.placedWords.length - 1]

      // have we reached the end of the word?
      if (this.$options.indexOfLetter === currentWord.length - 1) {
        // if so, reset the counter to 0
        this.$options.indexOfLetter = 0
      } else {
        // otherwise increment by 1
        this.$options.indexOfLetter += 1
      }

      // if this letter has already been placed, it will have an animation or class of 'guessed'. We want to override the animation if it exists, or add an animation if it has already been guessed
      if (element.style.animation || element.classList.contains('guessed')) {
        element.style.color = 'black'
        return `.2s forwards ${i * this.animationDelayIncrement}s expandNoTransparency`
      }

      return `.2s forwards ${i * this.animationDelayIncrement}s expand`
    }
  },
  watch: {
    /**
     * If the crossword changes, we need to update the scale
     */
    currentCrosswordIndex () {
      this.$nextTick(this.returnCrosswordScale())
    },

    /**
     * If the crosswords change but the index was still at 0, we need to update the scale
     */
    crosswords () {
      this.$nextTick(this.returnCrosswordScale())
    }
  },
  computed: {
    ...mapGetters([
      'currentCrosswordIndex',
      'crosswords',
      'placedWords'
    ])
  }
}
</script>

<style lang="scss">
@import './../variables.scss';

@keyframes expand {
  0% {
    transform: scale(1);
    color: transparent;
  }
  50% {
    transform: scale(1.2);
    color: black;
  }
  100% {
    transform: scale(1);
    color: black;
  }
}

@keyframes expandNoTransparency {
  0% {
    transform: scale(1);
    color: black;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.crossword-wrapper {
  width: 50%;
  height: 60%;
  margin: 0 auto;
  margin-bottom: 2rem;
  position: relative;
  .crossword-container {
    position: absolute;
    top: 50%;
    left: 50%;
    .row {
      display: flex;
      justify-content: center;
      width: 100%;
      .space {
        display: flex;
        width: 2rem;
        height: 2rem;
        justify-content: center;
        align-items: center;
        font-family: $font-family-default;
        margin: 1px;
        line-height: 2rem;
        &.isUsed {
          color: transparent;
          font-weight: bold;
          background: $color-transparent-white;
          border-radius: 4px;
        }
        &.guessed {
          color: black;
        }
      }
    }
  }
}
</style>
