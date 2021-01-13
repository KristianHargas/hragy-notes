<template>
  <div>
    <DashboardTitle>{{ title }}</DashboardTitle>

    <div v-if="categoryFilter" class="mb-4">
      <router-link
        :to="{ name: 'NoteList' }"
        class="inline-block text-gray-700 bg-white border-2 border-gray-700 px-4 py-1 rounded-lg font-semibold text-base uppercase tracking-wide hover:shadow-md no-select"
        >Back to all notes</router-link
      >
    </div>

    <!-- Notes grid. -->
    <div
      v-if="notesCount"
      class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
    >
      <div v-for="note in notes" :key="note.id">
        <NoteListItem :note="note" @noteClick="showNote" />
      </div>
    </div>

    <div
      v-else
      class="text-gray-700 font-semibold text-base uppercase tracking-wide text-center mx-2 mt-24"
    >
      There are no notes, start by creating some.
    </div>

    <FloatingActionButton :navigateTo="{ name: 'NoteCreate' }">
      <img
        class="h-8"
        src="../../../../static/img/note_add-white.svg"
        alt="Add note icon."
      />
    </FloatingActionButton>
  </div>
</template>

<script>
import * as NoteService from '../../../services/NoteService'
import DashboardTitle from '../DashboardTitle'
import NoteListItem from './NoteListItem'

export default {
  components: {
    DashboardTitle,
    NoteListItem
  },
  computed: {
    categoryFilter() {
      return this.$store.getters['category/getCategoryBySlug'](
        this.$route.query.category
      )
    },
    notes() {
      if (this.categoryFilter)
        return this.$store.getters['note/getNotesOfCategory'](
          this.categoryFilter.id
        )
      else return this.$store.state.note.notes
    },
    notesCount() {
      return this.notes.length
    },
    title() {
      return this.categoryFilter
        ? `Notes from ${this.categoryFilter.title}`
        : 'Your notes'
    }
  },
  methods: {
    showNote(note) {
      this.$router.push({
        name: 'NoteShow',
        params: {
          id: note.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
