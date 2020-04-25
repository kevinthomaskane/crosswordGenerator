<template>
  <div class="game-container">
    <img class="background-image" alt="background" src="./../public/background.png"/>
    <welcome
      v-if="currentView === 'welcome'"
    />
    <difficulty-select
      v-if="currentView === 'difficultySelect'"
    />
    <game-active
      v-if="currentView === 'gameActive'"
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
import DifficultySelect from './views/DifficultySelect'
import GameActive from './views/GameActive'

export default {
  name: 'App',
  components: {
    'crossword': Crossword,
    'welcome': Welcome,
    'difficulty-select': DifficultySelect,
    'game-active': GameActive,
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
  /* inherent dimensions of background image are 2081 x 1611 */
  height: 90vh;
  width: calc(90vh * (2081 / 1611));
  margin: 0 auto;
  * {
    box-sizing: border-box;
  }
  .background-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
