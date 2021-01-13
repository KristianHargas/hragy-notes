<template>
  <div>
    <DashboardTitle>Your notes</DashboardTitle>

    <!-- Notes grid. -->
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <div v-for="note in notes" :key="note.id">
        <NoteListItem :note="note" @noteClick="showNote" />
      </div>
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
      return this.$store.state.note.notes
    }
  },
  beforeRouteUpdate(to, from) {
    console.log('Category change: ', to.query.category)
  },
  mounted() {
    console.log('Category: ', this.$route.query.category)
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
