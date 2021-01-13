<template>
  <div class="flex flex-row items-start flex-wrap">
    <div class="w-full mb-2 sm:mb-0 sm:w-0 sm:flex-grow sm:max-w-lg">
      <FormInput
        v-model="title"
        type="text"
        :disabled="loading"
        :errors="errors"
        :successMessages="successMessages"
      />
    </div>
    <FormButton class="sm:ml-3 h-13" :loading="loading" @submit="updateCategory"
      >Save</FormButton
    >
    <FormButton
      class="ml-3"
      normalBgClass="bg-gray-600"
      :loading="loading"
      @submit="removeCategory"
      >Remove</FormButton
    >
  </div>
</template>

<script>
import {
  is422,
  getValidationErrArr,
  hasValidationErr
} from '../../../shared/utils/response'

export default {
  emits: ['startLoading', 'stopLoading'],
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      title: this.category.title,
      loading: false,
      errors: [],
      successMessages: []
    }
  },
  methods: {
    async updateCategory() {
      this.loading = true
      this.$emit('startLoading')

      this.resetMessages()

      try {
        await this.$store.dispatch('category/update', {
          id: this.category.id,
          category: {
            title: this.title
          }
        })

        this.successMessages.push('Category updated successfully!')
      } catch (err) {
        if (is422(err)) {
          hasValidationErr(err, 'title') &&
            (this.errors = getValidationErrArr(err, 'title'))
        } else {
          // 404, 500, network error
          this.errors.push('Network or server error!')
        }
      }

      this.loading = false
      this.$emit('stopLoading')
    },
    async removeCategory() {
      // TODO: Implement CategoryController.destroy method and use API call.
      const confirmed = confirm(
        `Are you sure you want to remove category ${this.category.title}?`
      )

      if (!confirmed) return

      this.loading = true
      this.$emit('startLoading')

      this.resetMessages()

      try {
        await this.$store.dispatch('category/destroy', { id: this.category.id })
      } catch (err) {
        // TODO: Handle errors.
      }

      this.loading = false
      this.$emit('stopLoading')
    },
    resetMessages() {
      this.successMessages = []
      this.errors = []
    }
  }
}
</script>

<style lang="scss" scoped></style>