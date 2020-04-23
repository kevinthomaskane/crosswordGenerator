<template>
  <div class="crossword-container">
    <h1>{{ letterCombo.letters }}</h1>
    <div class="row" v-for="(row, i) of letterCombo.grid" :key="i">
      <div class="space" v-for="(col, j) of row" :key="j">{{ col ? col.letter : '' }}</div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Crossword',
  props: {
    letterCombo: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    
  })
}
</script>

<style lang="scss">
.crossword-container {
  .row {
    display: flex;
    justify-content: center;
    .space {
      display: flex;
      width: 2rem;
      height: 2rem;
      justify-content: center;
      align-items: center;
      border: solid 1px black;
      color: white;
      font-weight: bold;
      background: blue;
    }
  }
}
</style>
