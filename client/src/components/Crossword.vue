<template>
  <div class="crossword-wrapper" :ref="'crossword-wrapper'">
    <div
      class="crossword-container"
      :style="{
        transform: `translate(-50%, -50%) scale(${scale})`
      }"
    >
      <div
        class="row"
        v-for="(row, i) of letterCombo.grid"
        :key="i"
      >
        <div
          :class="['space', { isUsed: col }]"
          v-for="(col, j) of row"
          :key="j"
        >
          {{ col ? col.letter : '' }}
        </div>
      </div>
  </div>
  </div>
</template>

<script>

/* eslint-disable */
export default {
  name: 'Crossword',
  props: {
    letterCombo: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    scale: -1
  }),
  mounted() {
    this.returnCrosswordScale()
  },
  methods: {
    returnCrosswordScale () {
      const crosswordWrapperWidth = this.$refs['crossword-wrapper'].offsetWidth
      const crosswordWrapperHeight = this.$refs['crossword-wrapper'].offsetHeight

      // default size of crossword square is 2rem x 2rem
      const widthOfCrossword = this.letterCombo.grid[0].length * 32
      const heightOfCrossword = this.letterCombo.grid.length * 32

      if (widthOfCrossword > heightOfCrossword) {
        this.scale = crosswordWrapperWidth / widthOfCrossword
        return
      }

      this.scale = crosswordWrapperHeight / heightOfCrossword
    }
  }
}
</script>

<style lang="scss">
@import './../variables.scss';

.crossword-wrapper {
  width: 40%;
  padding-bottom: 40%;
  margin: 0 auto;
  margin-bottom: 5rem;
  position: relative;
  .crossword-container {
    position: absolute;
    top: 50%;
    left: 50%;
    .row {
      display: flex;
      justify-content: center;
      width: 100%;
      .space {
        display: flex;
        width: 2rem;
        height: 2rem;
        justify-content: center;
        align-items: center;
        font-family: $font-family-default;
        margin: 1px;
        line-height: 2rem;
        &.isUsed {
          color: black;
          font-weight: bold;
          background: $color-opaquewhite;
          border-radius: 4px;
        }
      }
    }
  }
}
</style>
