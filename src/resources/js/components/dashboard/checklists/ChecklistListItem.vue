<template>
  <div
    class="p-4 no-select rounded-lg cursor-pointer hover:shadow-md focus:shadow-md"
    :class="[checklist.color]"
    @click="$emit('checklistClick', checklist)"
  >
    <h3 class="overflow-hidden text-2xl font-medium text-white">
      {{ checklist.title }}
    </h3>

    <ul class="mt-2 space-y-2">
      <li
        v-for="item in checklistItemsEllipsis(checklist.items)"
        :key="item.id"
        class="flex items-center"
      >
        <img
          v-if="item.checked"
          class="h-4 w-4"
          src="../../../../static/img/check_box-white.svg"
          alt="Checked checkbox icon."
        />
        <img
          v-else
          class="h-4 w-4"
          src="../../../../static/img/check_box_outline_blank-white.svg"
          alt="Unchecked checkbox icon."
        />
        <span class="overflow-hidden text-lg font-light text-white ml-2">
          {{ ellipsis(item.text) }}
        </span>
      </li>
    </ul>

    <div
      v-if="checklist.categories.length"
      class="flex flex-row flex-wrap mt-4 -mx-1"
    >
      <div
        v-for="category in checklist.categories"
        :key="category.id"
        class="px-4 py-1 m-1 bg-transparent rounded-full text-sm font-semibold text-white border-2 border-white no-select"
      >
        {{ $store.getters['category/getCategoryById'](category.id).title }}
      </div>
    </div>
    <div class="text-base font-light text-white mt-4">
      {{ formatDate(checklist.created_at) }}
    </div>
  </div>
</template>

<script>
import { formatDate, ellipsis } from '../../../shared/utils/util'

export default {
  emits: ['checklistClick'],
  props: {
    checklist: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDate(dateString) {
      return formatDate(dateString)
    },
    ellipsis(text) {
      return ellipsis(text, 30)
    },
    checklistItemsEllipsis(items) {
      const max = 5

      if (items.length <= max) return items

      const truncatedItems = []
      for (let i = 0; i < max; i++) {
        // Copy each item so we dont accidentally modify state.
        truncatedItems.push({ ...items[i] })
      }
      truncatedItems[max - 1].text = '...'

      return truncatedItems
    }
  }
}
</script>

<style lang="scss" scoped>
img {
  margin-bottom: -0.1rem;
}
</style>
