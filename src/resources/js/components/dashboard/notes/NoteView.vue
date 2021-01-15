<template>
  <div>
    <DashboardTitle :supportNavigateBack="true">View note</DashboardTitle>

    <!-- Edit note button. -->
    <div class="mb-4">
      <router-link :to="{ name: 'NoteShow' }" class="inline-flex flex-row">
        <img
          class="mr-1 cursor-pointer"
          src="../../../../static/img/create-white.svg"
          alt="Edit icon."
        />
        <span
          class="text-gray-700 font-semibold text-base uppercase tracking-wide no-select"
          >Edit note</span
        ></router-link
      >
    </div>

    <!-- Note. -->
    <div v-if="note" class="max-w-xl p-6 rounded-lg" :class="[note.color]">
      <h3 class="text-white text-2xl font-semibold tracking-wide">
        {{ note.title }}
      </h3>

      <p class="mt-4 text-white text-lg font-normal">{{ note.text }}</p>

      <div
        v-if="note.categories.length"
        class="flex flex-row flex-wrap mt-4 -mx-1"
      >
        <div
          v-for="category in note.categories"
          :key="category.id"
          class="px-4 py-1 m-1 rounded-full text-sm font-medium text-white border-2 border-white no-select"
        >
          {{ $store.getters['category/getCategoryById'](category.id).title }}
        </div>
      </div>

      <div class="mt-4 flex justify-between text-base font-light text-white">
        <span class="uppercase">Created at:</span
        ><span>{{ formatDate(note.created_at) }}</span>
      </div>

      <div class="mt-2 flex justify-between text-base font-light text-white">
        <span class="uppercase">Updated at:</span
        ><span>{{ formatDate(note.updated_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardTitle from '../DashboardTitle'
import { formatDate } from '../../../shared/utils/util'

export default {
  components: {
    DashboardTitle
  },
  computed: {
    note() {
      return this.$store.getters['note/getNoteById'](this.$route.params.id)
    }
  },
  mounted() {
    if (!this.note) {
      this.$router.replace({ name: 'NoteList' })
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
