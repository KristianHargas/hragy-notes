<template>
  <div class="flex flex-row flex-wrap space-x-4">
    <div
      v-for="color in colors"
      :key="color"
      class="rounded-full w-10 h-10 cursor-pointer"
      :class="[color]"
      @click="$emit('update:modelValue', color)"
    >
      <img
        v-if="color == modelValue"
        class="block h-10 w-8 mx-auto"
        src="../../../static/img/done-white.svg"
        alt="Done icon."
      />
    </div>
  </div>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: String,
    selectDefaultColor: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      colors: [
        'bg-gray-600',
        'bg-red-500',
        'bg-yellow-300',
        'bg-green-500',
        'bg-blue-500',
        'bg-indigo-500',
        'bg-purple-500',
        'bg-pink-400'
      ]
    }
  },
  created() {
    if (this.selectDefaultColor) this.$emit('update:modelValue', this.colors[0])
  }
}
</script>

<style lang="scss" scoped></style>
