<template>
  <div class="crossword-wrapper">
    <div
      v-if="crosswords"
      class="crossword-container"
      ref="crossword-container"
      :style="{
        transform: `${returnCrosswordScale()}`
      }"
    >
      <div
        class="row"
        v-for="(row, i) of crosswords[currentCrosswordIndex].grid"
        :key="i"
      >
        <div
          :ref="`${i}-${j}`"
          :class="[
            'space',
            { isUsed: col },
            { guessed: col && isPartOfPlacedWords(col.partOfWords) && !isPartOfCurrentWord(col.partOfWords)}
          ]"
          :style="{
            animation: `${col && isPartOfCurrentWord(col.partOfWords) ? returnAnimation(col.letter, i, j) : ''}`,
            color: `${placedWords.length === 0 ? 'transparent' : ''}`
          }"
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
import { WINDOW_WIDTH } from './../constants'
/**
 * Displays the puzzle for the current letter-combo
 */
export default {
  name: 'Crossword',
  data: () => ({
    squareWidth: 32,
    squareHeight: 32,
    animationDelayIncrement: .2,
    crosswordWidthOfContainer: WINDOW_WIDTH <= 640 ? .8 : .5,
    crosswordHeightOfContainer: .6
  }),
  
  /**
   * Used to keep track of letter index for determining animation delay.  Needed this to be static to avoid infinite re-rendering as it gets updated
   */
  indexOfLetter: 0,
  methods: {
    /**
     * Checks for size of to-be-rendered crossword. If larger than containing wrapper, determines if size is most excessive on width or height, then applies a scale() to the puzzle to make it fit more appropriately
     * @return {string} transform property string
     */
    returnCrosswordScale () {
      // Add 2px for margin top/bottom and left/right
      const widthOfCrossword = this.crosswords[this.currentCrosswordIndex].grid[0].length * (this.squareWidth + 2)
      const heightOfCrossword = this.crosswords[this.currentCrosswordIndex].grid.length * (this.squareHeight + 2)

      // Get the dimensions of the wrapper based on percentage of gameContainer
      const containerWidth = this.gameContainerWidth * this.crosswordWidthOfContainer
      const containerHeight = this.gameContainerHeight * this.crosswordHeightOfContainer

      // Which dimension is larger, i.e. the dimension that needs to get scaled
      const widthDifference = widthOfCrossword - containerWidth
      const heightDifference = heightOfCrossword - containerHeight

      let scale 
      if (widthDifference > heightDifference) {
        scale = containerWidth / widthOfCrossword
        return `translate(-50%, -50%) scale(${scale})`
      }

      scale = containerHeight / heightOfCrossword
      return `translate(-50%, -50%) scale(${scale})`
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
      if (Object.keys(this.$refs).length === 0) return

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

        // since the default color for a letter is transparent, and removing the animation will cause it to revert to its default, we need to set its color to black
        element.style.color = 'black'
        return `.2s forwards ${i * this.animationDelayIncrement}s expandNoTransparency`
      }

      return `.2s forwards ${i * this.animationDelayIncrement}s expand`
    }
  },
  computed: {
    ...mapGetters([
      'currentCrosswordIndex',
      'crosswords',
      'placedWords',
      'gameContainerHeight',
      'gameContainerWidth'
    ])
  }
}
</script>

<style lang="scss">
@import './../variables';
@import './../mediaQueries';

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
  @include breakpoint-mobile {
    width: 80%;
  }
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
