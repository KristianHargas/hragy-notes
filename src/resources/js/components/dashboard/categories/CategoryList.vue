<template>
  <div>
    <DashboardTitle>Your categories</DashboardTitle>

    <div class="max-w-xl">
      <CategoryCreateRow
        @startLoading="$emit('startLoading')"
        @stopLoading="$emit('stopLoading')"
      />

      <div class="mt-6 mb-8 border-t-2 border-gray-300 w-full"></div>

      <transition-group
        enter-active-class="animate__animated animate__backInLeft"
        leave-active-class="animate__animated animate__backOutLeft"
        name="category-list"
        tag="ul"
        class="space-y-4"
      >
        <CategoryShowRow
          class="category-item"
          v-for="category in categories"
          :key="category.id"
          :category="category"
          @startLoading="$emit('startLoading')"
          @stopLoading="$emit('stopLoading')"
        />
      </transition-group>
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
}
</script>

<style lang="scss" scoped>
.category-item {
  transition: all 0.4s ease;
}
</style>
