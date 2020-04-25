<template>
  <div class="difficulty-view-wrapper">
    <h1 class="difficulty-header">Select your difficulty</h1>
    <div class="options-wrapper">
      <div
        v-for="(difficulty, i) of DIFFICULTIES"
        :key="i"
        :class="['option primary', {active: activeOption === difficulty}]"
        @click="handleOptionClick(difficulty)"
        @mouseover="handleOptionHighlight(difficulty)"
        @mouseleave="handleOptionHighlight()"
      >
        {{ difficulty }}
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { DIFFICULTIES } from './../constants'

export default {
  name: 'Welcome',
  data: () => ({
    DIFFICULTIES,
    activeOption: 'random'
  }),
  methods: {
    handleOptionClick (difficulty) {
      this.$store.dispatch('setDifficulty', difficulty)
      this.$store.dispatch('setCurrentView', 'gameActive')
    },
    handleOptionHighlight (option='') {
      this.activeOption = option
    }
  }
}
</script>

<style lang="scss">
@import "./../variables";

.difficulty-view-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255,255,255,.8);
  border-radius: 10px;
  padding: 2rem;
  .difficulty-header {
    font-size: 2rem;
    font-family: $font-family-headings;
    margin: 0;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  .options-wrapper {
    .option {
      width: 100%;
      padding: 1rem 1.5rem;
      color: black;
      font-family: $font-family-default;
      border: solid 3px $color-darkblue;
      border-radius: 33px;
      background: white;
      transition: all .2s ease-in-out;
      cursor: pointer;
      box-shadow: 0 10px 11px 3px $color-lightblue;
      text-align: center;
      margin-bottom: 1rem;
      &.active {
        background: $color-darkblue;
        color: white;
      }
      &:hover {
        background: $color-darkblue;
        color: white;
        box-shadow: 0 10px 11px 3px rgba(84, 187, 215, 0.68);
        transform: translateY(-1px);
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
