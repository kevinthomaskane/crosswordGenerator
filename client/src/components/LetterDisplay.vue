<template>
  <div class="letter-display-wrapper">
    <div class="letter-display-container">
      <div
        class="letter"
        v-for="(letter, i) of letters.split('')"
        :key="i"
      >
        {{ letter }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LetterDisplay',
  props: {
    letters: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss">
@import "./../variables";

.letter-display-wrapper {
  display: flex;
  justify-content: center;
  .letter-display-container {
    padding: 1rem;
    align-items: center;
    position: relative;
    z-index: 1;
    background: $color-opaquewhite;
    border-radius: 33px;
    margin: 0 auto;
    display: inline-flex;
  }
  .letter {
    display: flex;
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    background: $color-darkblue;
    line-height: 4rem;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    font-size: 2rem;
    font-family: $font-family-default;
    color: white;
    text-shadow: 0 1px 1px black;
    box-shadow: 0 2px 4px black;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
