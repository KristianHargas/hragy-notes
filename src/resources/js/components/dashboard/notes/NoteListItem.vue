<template>
  <div
    class="p-4 no-select rounded-lg cursor-pointer hover:shadow-md focus:shadow-md"
    :class="[note.color]"
    @click="$emit('noteClick', note)"
  >
    <h3 class="overflow-hidden text-2xl font-medium text-white">
      {{ note.title }}
    </h3>
    <p class="overflow-hidden text-lg font-light text-white mt-2">
      {{ ellipsis(note.text) }}
    </p>
    <div
      v-if="note.categories.length"
      class="flex flex-row flex-wrap mt-4 -mx-1"
    >
      <div
        v-for="category in note.categories"
        :key="category.id"
        class="px-4 py-1 m-1 bg-transparent rounded-full text-sm font-semibold text-white border-2 border-white no-select"
      >
        {{ $store.getters['category/getCategoryById'](category.id).title }}
      </div>
    </div>
    <div class="text-base font-light text-white mt-4">
      {{ formatDate(note.created_at) }}
    </div>
  </div>
</template>

<script>
import { formatDate, ellipsis } from '../../../shared/utils/util'

export default {
  emits: ['noteClick'],
  props: {
    note: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      return formatDate(dateString)
    },
    ellipsis(text) {
      return ellipsis(text, 100)
    }
  }
}
</script>

<style lang="scss" scoped></style>
