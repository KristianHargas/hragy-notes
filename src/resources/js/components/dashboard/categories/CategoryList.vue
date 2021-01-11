<template>
  <div>
    <h1
      class="mb-8 text-gray-800 font-semibold text-2xl uppercase tracking-wide"
    >
      Your categories
    </h1>
    <ul class="space-y-4">
      <CategoryShowRow
        v-for="category in categories"
        :key="category.id"
        :category="category"
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
  }
}
</script>

<style lang="scss" scoped></style>
