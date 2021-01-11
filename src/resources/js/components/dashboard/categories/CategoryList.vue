<template>
  <div>
    <h1
      class="mb-8 text-gray-800 font-semibold text-2xl uppercase tracking-wide"
    >
      Your categories
    </h1>
    <ul class="space-y-5">
      <CategoryShowRow
        v-for="category in categories"
        :key="category.id"
        :category="category"
        @categoryUpdate="categoryUpdated"
        @categoryRemoval="categoryRemoved"
      />
    </ul>
  </div>
</template>

<script>
import * as CategoryService from '../../../services/CategoryService'
import CategoryShowRow from './CategoryShowRow'

export default {
  components: {
    CategoryShowRow
  },
  data() {
    return {
      categories: []
    }
  },
  async mounted() {
    const res = await CategoryService.index()
    this.categories = res.data
  },
  methods: {
    categoryUpdated(updatedCategory) {
      this.categories = this.categories.map((category) =>
        category.id == updatedCategory.id ? updatedCategory : category
      )
    },
    categoryRemoved(removedCategory) {
      this.categories = this.categories.filter(
        (category) => category.id != removedCategory.id
      )
    }
  }
}
</script>

<style lang="scss" scoped></style>
