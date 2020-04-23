<template>
  <div id="app">
    <div class="crossword-wrapper" v-for="(letterCombo, i) of LETTERCOMBOS" :key="i">
      <crossword
        :letterCombo="letterCombo"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { letterCombos as LETTERCOMBOS } from './letterCombos'
import Crossword from './components/Crossword'

export default {
  name: 'App',
  components: {
    'crossword': Crossword
  },
  data: () => ({
    LETTERCOMBOS
  })
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
