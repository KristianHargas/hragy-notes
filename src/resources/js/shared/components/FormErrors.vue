<template>
  <div
    v-if="errors.length"
    class="text-red-700 border-t-2 pt-2 border-red-700 font-light text-base uppercase tracking-wide text-center mx-2 mt-4"
  >
    <div v-for="(err, index) in errors" :key="index" v-text="err"></div>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped></style>
