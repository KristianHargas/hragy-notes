<template>
  <div class="flex flex-row items-stretch mb-6">
    <img
      v-if="supportNavigateBack"
      class="mr-2 cursor-pointer object-cover no-select"
      src="../../../static/img/navigate_before-white.svg"
      alt="Navigate back icon."
      @click="$router.back()"
    />
    <h1 class="text-gray-800 font-semibold text-2xl uppercase tracking-wide">
      <slot></slot>
    </h1>
  </div>
</template>

<script>
export default {
  props: {
    supportNavigateBack: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  margin-bottom: -0.125rem;
}
</style>
