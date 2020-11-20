<template>
  <div v-if="errors.length" class="font-medium text-red-700">
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
