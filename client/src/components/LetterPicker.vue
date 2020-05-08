<template>
  <div class="letter-picker-wrapper">
    <div class="letter-picker-container">
      <div
        class="letter"
        v-for="(letter, i) of letters.split('')"
        :key="i"
        @mousedown="handleMouseDown"
        @mouseup="handleMouseUp"
        @click="handleClick(letter)"
      >
        <span>{{ letter }}</span>
      </div>
    </div>
  </div>
</template>

<script>

/**
 * The letters for puzzle displayed for user-selection
 */
export default {
  name: 'LetterPicker',
  props: {
    /**
     * The current letters concatenated together as a string.
     */
    letters: {
      type: String,
      required: true
    }
  },
  methods: {
    /**
     * Add box-shadow to button on mousedown.
     */
    handleMouseDown (e) {
      e.target.classList.add('active')
    },

    /**
     * Remove box-shadow from button on mousedown.
     */
    handleMouseUp (e) {
      e.target.classList.remove('active')
    },

    /**
     * Emits the selected letter to GameActive
     * @param {string} letter - the user-selected letter
     */
    handleClick (letter) {
      this.$emit('update:selectedLetters', letter)
    }
  }
}
</script>

<style lang="scss">
@import "./../variables";
@import "./../mediaQueries";

.letter-picker-wrapper {
  z-index: 1;
  display: flex;
  justify-content: center;
  .letter-picker-container {
    padding: 1rem;
    align-items: center;
    position: relative;
    z-index: 1;
    background: $color-transparent-white;
    border-radius: 33px;
    margin: 0 auto;
    display: inline-flex;
    width: calc(100% - 2rem);
    max-width: 500px;
    justify-content: space-between;
  }
  .letter {
    display: flex;
    width: calc((100% - 7rem)/6);
    padding-bottom: calc((100% - 7rem)/6);
    border-radius: 50%;
    background: $color-darkblue;
    justify-content: center;
    align-items: center;
    font-family: $font-family-default;
    color: white;
    text-shadow: 0 1px 1px black;
    box-shadow: 0 2px 4px black;
    transition: all .2s ease-in-out;
    cursor: pointer;
    position: relative;
    @include breakpoint-mobile {
      width: calc((100% - 3.5rem)/6);
      padding-bottom: calc((100% - 3.5rem)/6);
    }
    &:hover {
      background: lighten($color-darkblue, 5%);
    }
    &.active {
      box-shadow: none;
    }
    span {
      font-size: 2rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      @include breakpoint-mobile {
        font-size: 1.5rem;
      }
    }
  }
}
</style>
