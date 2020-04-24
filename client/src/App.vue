<template>
  <div class="game-container">
    <img class="background-image" alt="background" src="./../public/background.jpg"/>
    <welcome
      v-if="currentView === 'welcome'"
    />
    <!-- <div class="crossword-wrapper" v-for="(letterCombo, i) of LETTERCOMBOS" :key="i"> -->
    <!-- <crossword -->
    <!-- :letterCombo="letterCombo" -->
    <!-- /> -->
    <!-- </div> -->
  </div>
</template>

<script>
/* eslint-disable */
/* import { letterCombos as LETTERCOMBOS } from './letterCombos' */
import { mapGetters } from 'vuex'
import Crossword from './components/Crossword'
import Welcome from './views/Welcome'

export default {
  name: 'App',
  components: {
    'crossword': Crossword,
    'welcome': Welcome
  },
  data: () => ({}),
  computed: {
    ...mapGetters([
      'currentView'
    ])
  }
}
</script>

<style lang="scss">
.game-container {
  position: relative;
  box-sizing: border-box;
  * {
    box-sizing: border-box;
  }
  .background-image {
    height: 90vh;
    margin: 0 auto;
    display: block;
  }
}
</style>
