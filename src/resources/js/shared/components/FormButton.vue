<template>
  <button
    class="block no-select text-lg text-gray-100 py-3 rounded uppercase tracking-wider font-semibold"
    :class="{
      'bg-gray-500': loading,
      'bg-red-700 hover:shadow-lg': !loading
    }"
    :disabled="loading"
    @click.prevent="$emit('submit')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  emits: ['submit'],
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
