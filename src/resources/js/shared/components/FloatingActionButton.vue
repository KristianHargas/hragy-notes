<template>
  <router-link
    :to="navigateTo"
    class="flex items-center justify-center fixed shadow-lg no-select hover:shadow-2xl bottom-0 right-0 mr-6 mb-6 md:mr-8 md:mb-8 h-14 w-14 bg-red-700 text-white rounded-full"
  >
    <slot></slot>
  </router-link>
</template>

<script>
export default {
  props: {
    navigateTo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
