<template>
  <div :class="[
    'active-letters-wrapper',
    { 'errorAnimation': status && status.isError }]"
  >
    
    <div
      class="letter"
      v-for="(letter, i) of letters"
      :key="i"
    >
      {{ letter }}
    </div>
    <div
      class="delete-button"
      v-if="letters.length > 0"
      @click="handleDeleteLetter"
    >
      <backspace-icon class="backspace" />
    </div>
    <div
      class="submit-button"
      v-if="letters.length > 0"
      @click="handleSubmitWord"
    >
      submit
    </div>
  </div>
</template>
<script>

import Backspace from './../icon-components/Backspace'
/**
 * Letters selected by user for a match attempt
 */
export default {
  name: 'ActiveLetters',
  components: {
    'backspace-icon': Backspace
  },
  props: {
    letters: {
      type: Array,
      required: true
    },
    status: {
      type: Object,
      required: false
    }
  },
  methods: {
    /**
     * Emits to GameActive to remove a letter from letters array
     */
    handleDeleteLetter () {
      this.$emit('update:deleteLetter')
    },

    /**
     * Emits word to GameActive
     */
    handleSubmitWord () {
      this.$emit('submit:word') 
    }
  }
}

</script>

<style lang="scss">
@import "./../variables";
@import "./../mediaQueries";

@keyframes shake {
  0% {
    transform: translateX(0)
  }
  25% {
    transform: translateX(-.5rem)
  }
  50% {
    transform: translate(.5rem)
  }
  75% {
    transform: translate(-.25rem)
  }
  100% {
    transform: translate(0)
  }
}

.active-letters-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: .5rem;
  &.errorAnimation {
    animation: shake .15s linear;
  }
  .letter {
    display: flex;
    width: 3rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    font-family: $font-family-default;
    margin: 1px;
    line-height: 2rem;
    color: black;
    background: $color-transparent-white;
    border-radius: 4px;
    font-size: 2rem;
    @include breakpoint-mobile {
      width: 2rem;
      height: 2rem;
      font-size: 1.5rem;
    }
  }
  .delete-button {
    display: flex;
    width: 4rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    margin: 1px;
    background: $color-transparent-white;
    border-radius: 4px;
    transition: background .2s ease-in-out;
    cursor: pointer;
    @include breakpoint-mobile {
      width: 2.5rem;
      height: 2rem;
    }
    .backspace {
      height: 2rem;
      @include breakpoint-mobile {
        height: 1.25rem;
      }
    }
  }
  .submit-button {
    display: flex;
    height: 3rem;
    justify-content: center;
    align-items: center;
    margin: 1px;
    background: $color-transparent-white;
    border-radius: 4px;
    font-family: $font-family-headings;
    padding: 0 .5rem;
    font-size: 2rem;
    cursor: pointer;
    transition: all .2s ease-in-out;
    &:hover {
      background: $color-lightgreen;
      color: white;
    }
    @include breakpoint-mobile {
      height: 2rem;
      font-size: 1.25rem;
    }
  }
}

</style>
