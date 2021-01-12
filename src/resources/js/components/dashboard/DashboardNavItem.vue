<template>
  <router-link
    :to="navigateTo"
    class="block uppercase tracking-wide text-xl mb-4 no-select text-center cursor-pointer shadow-sm bg-white rounded py-2 font-semibold text-gray-700 hover:shadow-md focus:shadow-md"
    ><slot></slot
  ></router-link>
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
