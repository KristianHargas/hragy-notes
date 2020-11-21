<template>
  <div>
    <h1
      class="mb-8 text-gray-800 font-semibold text-2xl uppercase tracking-wide"
    >
      Your notes
    </h1>

    <div
      v-for="note in notes"
      :key="note.id"
      class="p-3 bg-white shadow-sm rounded-lg mb-4"
    >
      <h3 class="text-2xl font-semibold mb-3 text-gray-800">
        {{ note.title }}
      </h3>
      <p class="text-lg font-medium text-gray-600">{{ note.text }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as NoteService from '../../services/NoteService'

export default {
  data() {
    return {
      notes: []
    }
  },
  async mounted() {
    const res = await NoteService.index()
    this.notes = res.data
  }
}
</script>

<style lang="scss" scoped></style>
