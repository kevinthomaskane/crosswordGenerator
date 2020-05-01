<template>
  <div class="status-box-wrapper">
    <div :class="[
      'status-container',
      status ? status.isError ? 'error' : 'success' : '']"
    >
      {{ status ? status.content : '' }}
    </div>
  </div>
</template>
<script>

/**
 * Displays errors or successes based on user submission of letters/words
 */
export default {
  name: 'StatusBox',
  props: {
    status: {
      type: Object,
      required: false
    }
  }
}
</script>

<style lang="scss">
@import "./../variables";

.status-box-wrapper {
  margin: 0 auto;
  margin-bottom: .5rem;
  z-index: 1;
  text-align: center;
  font-family: $font-family-default;
  font-size: .75rem;
  text-align: center;
  height: 1.5rem;
  .status-container {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin: 0 auto;
    padding: .5rem 1rem;
    border-radius: 33px;
    opacity: 0;
    transition: opacity .2s ease-in-out;
    &.success {
      opacity: 1;
      background: $color-lightgreen;
      color: white;
    }
    &.error {
      opacity: 1;
      background: $color-transparent-red;
      color: white;
    }
  }
}

</style>
