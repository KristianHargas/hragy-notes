<template>
  <button
    class="block no-select text-lg text-gray-100 px-3 h-13 rounded uppercase tracking-wider font-semibold"
    :class="[loading ? loadingBgClass : `${normalBgClass} hover:shadow-lg`]"
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
    normalBgClass: {
      type: String,
      default: 'bg-red-700'
    },
    loadingBgClass: {
      type: String,
      default: 'bg-gray-400'
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped></style>
