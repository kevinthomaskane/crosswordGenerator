<template>
  <div class="status-box-wrapper">
    <div class="status-container">
      {{ status }}
    </div>
  </div>
</template>
<script>

/**
 * displays errors or successes based on user submission of letters/words
 */
export default {
  name: 'StatusBox',
  props: {
    status: {
      type: String,
      required: false
    }
  }
}
</script>
