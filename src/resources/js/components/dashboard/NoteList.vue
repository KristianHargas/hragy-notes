<template>
  <div>
    <h1
      class="mb-8 text-gray-800 font-semibold text-2xl uppercase tracking-wide"
    >
      Your notes
    </h1>

    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="note in notes" :key="note.id">
        <div
          class="p-4 bg-white shadow-sm rounded-lg cursor-pointer hover:shadow-lg focus:shadow-lg"
          @click="showNote(note)"
        >
          <h3 class="overflow-hidden text-2xl font-semibold text-gray-800">
            {{ note.title }}
          </h3>
          <p class="overflow-hidden text-lg font-medium text-gray-600 mt-2">
            {{ ellipsis(note.text) }}
          </p>
          <div class="text-base font-medium text-gray-500 mt-6">
            {{ formatDate(note.created_at) }}
          </div>
        </div>
      </div>
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
  },
  methods: {
    showNote(note) {
      this.$router.push({
        name: 'NoteShow',
        params: {
          id: note.id
        }
      })
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('en-US')
    },
    ellipsis(text) {
      if (!!text && text.length > 100) {
        return `${text.slice(0, 100)}...`
      } else {
        return text
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
