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
      <img alt="backspace" src="./../../public/backspace.svg"/>
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

/**
 * Letters selected by user for a match attempt
 */
export default {
  name: 'ActiveLetters',
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
    background: $color-opaquewhite;
    border-radius: 4px;
    font-size: 2rem;
  }
  .delete-button {
    display: flex;
    width: 4rem;
    height: 3rem;
    justify-content: center;
    align-items: center;
    margin: 1px;
    background: $color-opaquewhite;
    border-radius: 4px;
    transition: background .2s ease-in-out;
    cursor: pointer;
    img {
      height: 2rem;
    }
  }
  .submit-button {
    display: flex;
    height: 3rem;
    justify-content: center;
    align-items: center;
    margin: 1px;
    background: $color-opaquewhite;
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
  }
}

</style>
