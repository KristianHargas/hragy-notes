<template>
  <input
    v-bind="$attrs"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="{
      'bg-red-100 border-red-700': errors.length,
      'bg-white border-gray-400': !errors.length
    }"
    class="block w-full text-gray-800 text-lg leading-5 border-2 px-3 h-13 rounded focus:outline-none focus:border-gray-700 focus:bg-white"
  />
  <div
    v-if="errors.length"
    class="mt-1 font-medium text-red-700 uppercase tracking-wide"
  >
    <div
      v-for="(err, index) in errors"
      :key="'error' + index"
      v-text="err"
    ></div>
  </div>
  <div
    v-if="successMessages.length"
    class="mt-1 font-medium text-green-500 uppercase tracking-wide"
  >
    <div
      v-for="(message, index) in successMessages"
      :key="'success' + index"
      v-text="message"
    ></div>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: String,
    successMessages: {
      type: Array,
      default: []
    },
    errors: {
      type: Array,
      default: []
    }
  }
}
</script>

<style lang="scss" scoped></style>
