<template>
  <div class="welcome-view-wrapper">
    <h1 class="welcome-header">Welcome to Word Wiz!</h1>
    <div class="options-wrapper">
      <div class="option" @click="handleOptionClick('demo')">How to play</div>
      <div class="option" @click="handleOptionClick('difficulty')">Let's get started</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: 'Welcome',
  data: () => ({}),
  methods: {
    handleOptionClick (view) {
      if (view === 'demo') {
        this.$store.dispatch('setCurrentView', 'demo')
        return
      }

      this.$store.dispatch('setCurrentView', 'difficulty')
    }
  }
}
</script>

<style lang="scss">
@import "./../variables";

.welcome-view-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255,255,255,.8);
  border-radius: 10px;
  padding: 2rem;
  .welcome-header {
    font-size: 2rem;
    font-family: $font-family-headings;
    margin: 0;
    margin-bottom: 1rem;
    text-align: center;
  }
  .options-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    .option {
      padding: 1rem 1.5rem;
      color: black;
      font-family: $font-family-default;
      border: solid 3px $color-darkblue;
      border-radius: 33px;
      background: $color-lightblue;
      transition: all .2s ease-in-out;
      cursor: pointer;
      box-shadow: 0 10px 11px 3px $color-lightblue;
      &:hover {
        background: $color-darkblue;
        color: white;
        box-shadow: 0 10px 11px 3px rgba(84, 187, 215, 0.68);
        transform: translateY(-1px);
      }
      &:first-child {
        margin-right: 1rem;
      }
    }
  }
}
</style>
