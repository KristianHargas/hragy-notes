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
    <div class="my-8 border-t-2 border-gray-300 w-full md:max-w-lg"></div>
    <CategoryCreateRow @categoryCreation="categoryCreated" />
  </div>
</template>

<script>
import * as CategoryService from '../../../services/CategoryService'
import CategoryShowRow from './CategoryShowRow'
import CategoryCreateRow from './CategoryCreateRow'

export default {
  components: {
    CategoryShowRow,
    CategoryCreateRow
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
    },
    categoryCreated(createdCategory) {
      this.categories.push(createdCategory)
    }
  }
}
</script>

<style lang="scss" scoped></style>
