<template>
  <div>
    <FormLabel for="new-category" class="flex-grow"
      >Create new category</FormLabel
    >
    <div class="flex flex-row items-start flex-wrap">
      <div class="w-0 flex-grow max-w-lg">
        <FormInput
          id="new-category"
          v-model="title"
          type="text"
          class="h-12"
          :disabled="loading"
          :errors="errors"
          :successMessages="successMessages"
        />
      </div>
      <FormButton class="ml-3 h-12" :loading="loading" @submit="createCategory"
        >Create</FormButton
      >
    </div>
  </div>
</template>

<script>
import * as CategoryService from '../../../services/CategoryService'
import {
  is422,
  is400,
  getValidationErrArr,
  hasValidationErr
} from '../../../shared/utils/response'

export default {
  emits: ['categoryCreation'],
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
      this.errors = []
      this.successMessages = []

      try {
        const res = await CategoryService.store({
          title: this.title
        })

        this.title = ''
        this.successMessages.push('Category created successfully!')

        this.$emit('categoryCreation', res.data)
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
    }
  }
}
</script>

<style lang="scss" scoped></style>
