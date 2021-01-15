<template>
  <div>
    <DashboardTitle>Your categories</DashboardTitle>

    <div class="max-w-xl">
      <CategoryCreateRow
        @startLoading="$emit('startLoading')"
        @stopLoading="$emit('stopLoading')"
      />

      <div class="mt-6 mb-8 border-t-2 border-gray-300 w-full"></div>

      <ul class="space-y-6">
        <CategoryShowRow
          v-for="category in categories"
          :key="category.id"
          :category="category"
          @startLoading="$emit('startLoading')"
          @stopLoading="$emit('stopLoading')"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import CategoryShowRow from './CategoryShowRow'
import CategoryCreateRow from './CategoryCreateRow'
import DashboardTitle from '../DashboardTitle'

export default {
  emits: ['startLoading', 'stopLoading'],
  components: {
    CategoryShowRow,
    CategoryCreateRow,
    DashboardTitle
  },
  computed: {
    categories() {
      return this.$store.state.category.categories
    }
  }
  // methods: {
  //   categoryUpdated(updatedCategory) {
  //     this.categories = this.categories.map((category) =>
  //       category.id == updatedCategory.id ? updatedCategory : category
  //     )
  //   },
  //   categoryRemoved(removedCategory) {
  //     this.categories = this.categories.filter(
  //       (category) => category.id != removedCategory.id
  //     )
  //   },
  //   categoryCreated(createdCategory) {
  //     this.categories.push(createdCategory)
  //   }
  // }
}
</script>

<style lang="scss" scoped></style>
