<template>
  <div class="active-letters-wrapper">
    <div
      class="letter"
      v-for="(letter, i) of letters"
      :key="i"
    >
      {{ letter }}
    </div>
    <div class="delete-button">
      
    </div>
    <div class="submit-button">
      
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
    }
  }
}

</script>

<style lang="scss">
@import "./../variables";

.active-letters-wrapper {
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  align-items: center;
  height: 3rem;
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
}
</style>
