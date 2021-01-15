<template>
  <div>
    <DashboardTitle>{{ title }}</DashboardTitle>

    <div v-if="categoryFilter" class="mb-4">
      <router-link :to="{ name: 'ChecklistList' }" class="inline-flex flex-row">
        <img
          class="mr-1 cursor-pointer object-cover"
          src="../../../../static/img/navigate_before-white.svg"
          alt="Navigate back icon."
        />
        <span
          class="text-gray-700 font-semibold text-base uppercase tracking-wide no-select"
          >Back to all checklists</span
        ></router-link
      >
    </div>

    <!-- Checklists grid. -->
    <div
      v-if="checklistsCount"
      class="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
    >
      <div v-for="checklist in checklists" :key="checklist.id">
        <ChecklistListItem
          :checklist="checklist"
          @checklistClick="showChecklist(checklist)"
        ></ChecklistListItem>
      </div>
    </div>

    <div
      v-else
      class="text-gray-700 border-t-2 border-gray-700 font-semibold text-base uppercase tracking-wide text-center pt-2 mx-2"
    >
      There are no checklists, start by creating some.
    </div>

    <FloatingActionButton :navigateTo="{ name: 'ChecklistCreate' }">
      <img
        class="h-8"
        src="../../../../static/img/add-white.svg"
        alt="Add checklist icon."
      />
    </FloatingActionButton>
  </div>
</template>

<script>
import DashboardTitle from '../DashboardTitle'
import ChecklistListItem from './ChecklistListItem'

export default {
  components: {
    DashboardTitle,
    ChecklistListItem
  },
  computed: {
    categoryFilter() {
      return this.$store.getters['category/getCategoryBySlug'](
        this.$route.query.category
      )
    },
    checklists() {
      if (this.categoryFilter)
        return this.$store.getters['checklist/getChecklistsOfCategory'](
          this.categoryFilter.id
        )
      else return this.$store.state.checklist.checklists
    },
    checklistsCount() {
      return this.checklists.length
    },
    title() {
      return this.categoryFilter
        ? `Checklists of ${this.categoryFilter.title}`
        : 'Your checklists'
    }
  },
  methods: {
    showChecklist(checklist) {
      this.$router.push({
        name: 'ChecklistShow',
        params: {
          id: checklist.id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
