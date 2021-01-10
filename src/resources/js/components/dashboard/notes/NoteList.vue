<template>
  <div>
    <h1
      class="mb-8 text-gray-800 font-semibold text-2xl uppercase tracking-wide"
    >
      Your notes
    </h1>

    <!-- Notes grid. -->
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="note in notes" :key="note.id">
        <div
          class="p-4 rounded-lg cursor-pointer hover:shadow-md focus:shadow-md"
          :class="[note.color]"
          @click="showNote(note)"
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
      </div>
    </div>

    <router-link
      :to="{ name: 'NoteCreate' }"
      class="fixed shadow-lg hover:shadow-2xl bottom-0 right-0 mr-6 mb-6 p-3 bg-red-700 text-white rounded-full"
    >
      <img
        class="h-8"
        src="../../../../static/img/note_add-white.svg"
        alt="Add note icon."
      />
    </router-link>
  </div>
</template>

<script>
import * as NoteService from '../../../services/NoteService'
import { formatDate, ellipsis } from '../../../shared/utils/util'

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
      return formatDate(dateString)
    },
    ellipsis(text) {
      return ellipsis(text, 100)
    }
  }
}
</script>

<style lang="scss" scoped></style>
