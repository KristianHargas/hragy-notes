<template>
  <div>
    <FormLabel for="new-category">Create new category</FormLabel>
    <div class="flex flex-row items-start flex-wrap">
      <div class="w-0 flex-grow">
        <FormInput
          id="new-category"
          v-model="title"
          type="text"
          :disabled="loading"
          :errors="errors"
          :successMessages="successMessages"
          @keyup.enter="createCategory"
          autocomplete="off"
        />
      </div>
      <FormButton class="ml-3" :loading="loading" @submit="createCategory"
        >Create</FormButton
      >
    </div>
  </div>
</template>

<script>
import {
  is422,
  is400,
  getValidationErrArr,
  hasValidationErr
} from '../../../shared/utils/response'

export default {
  emits: ['startLoading', 'stopLoading'],
  data() {
    return {
      title: '',
      loading: false,
      errors: [],
      successMessages: []
    }
  },
  methods: {
    async createCategory() {
      this.loading = true
      this.$emit('startLoading')

      this.errors = []
      this.successMessages = []

      try {
        await this.$store.dispatch('category/store', {
          category: { title: this.title }
        })

        this.title = ''
        this.successMessages.push('Category created successfully!')
      } catch (err) {
        if (is422(err)) {
          hasValidationErr(err, 'title') &&
            (this.errors = getValidationErrArr(err, 'title'))
        } else if (is400(err)) {
          this.errors.push('Category with given title already exists!')
        } else {
          // 500, network error
          this.errors.push('Network or server error!')
        }
      }

      this.loading = false
      this.$emit('stopLoading')
    }
  }
}
</script>

<style lang="scss" scoped></style>
