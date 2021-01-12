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
    <div class="text-base font-light text-white mt-6">
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
