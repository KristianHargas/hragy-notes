<template>
  <textarea
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="{
      'bg-red-100 border-red-700': errors.length,
      'bg-white border-gray-400': !errors.length
    }"
    class="block w-full text-gray-800 text-lg p-3 border-2 rounded focus:outline-none focus:border-gray-700 focus:bg-white"
  ></textarea>
  <div v-if="errors.length" class="mt-1 font-medium text-red-700">
    <div v-for="(err, index) in errors" :key="index" v-text="err"></div>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: String,
    errors: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped></style>
