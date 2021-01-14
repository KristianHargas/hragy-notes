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
        v-for="item in checklist.items"
        :key="item.id"
        class="flex items-center"
      >
        <img
          v-if="item.checked"
          class="h-4"
          src="../../../../static/img/check_box-white.svg"
          alt="Checked checkbox icon."
        />
        <img
          v-else
          class="h-4"
          src="../../../../static/img/check_box_outline_blank-white.svg"
          alt="Unchecked checkbox icon."
        />
        <span class="text-lg font-light text-white ml-2">{{ item.text }}</span>
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
import { formatDate } from '../../../shared/utils/util'

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
    }
  }
}
</script>

<style lang="scss" scoped></style>
