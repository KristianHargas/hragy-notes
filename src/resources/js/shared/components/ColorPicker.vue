<template>
  <div class="flex flex-row flex-wrap space-x-4">
    <div
      v-for="color in colors"
      :key="color"
      class="rounded-full w-10 h-10 cursor-pointer"
      :class="[color]"
      @click="changeColor(color)"
    >
      <img
        v-if="color == currentColor"
        class="block h-10 w-8 mx-auto"
        src="../../../static/img/done-white.svg"
        alt="Done icon."
      />
    </div>
  </div>
</template>

<script>
export default {
  emits: ['colorChange'],
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
      ],
      currentColor: ''
    }
  },
  created() {
    this.changeColor(this.colors[0])
  },
  methods: {
    changeColor(color) {
      this.currentColor = color
      this.$emit('colorChange', color)
    }
  }
}
</script>

<style lang="scss" scoped></style>
