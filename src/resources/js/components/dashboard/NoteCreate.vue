<template>
  <form class="max-w-xl mx-auto">
    <h1
      class="mb-8 text-gray-800 font-semibold text-2xl uppercase tracking-wide"
    >
      Create new note
    </h1>

    <div>
      <FormLabel for="title">Title</FormLabel>
      <FormInput
        v-model="formData.title"
        type="text"
        id="title"
        name="title"
        :errors="errors.title"
      ></FormInput>
    </div>

    <div class="mt-4">
      <FormLabel for="text">Text</FormLabel>
      <FormArea
        v-model="formData.text"
        name="text"
        id="text"
        rows="4"
        :errors="errors.text"
      ></FormArea>
    </div>

    <FormErrors class="mt-8 text-center" :errors="errors.others"></FormErrors>

    <FormButton
      class="py-3 px-5 mt-8 ml-auto"
      :loading="loading"
      @submit="createNote"
      >Create</FormButton
    >
  </form>
</template>

<script>
import * as NoteService from '../../services/NoteService'
import {
  is422,
  getValidationErrArr,
  hasValidationErr
} from '../../shared/utils/response'

export default {
  data() {
    return {
      formData: {
        title: '',
        text: ''
      },
      errors: {
        title: [],
        text: [],
        others: []
      },
      loading: false
    }
  },
  methods: {
    async createNote() {
      this.loading = true
      this.resetErrors()

      try {
        const res = await NoteService.store(this.formData)
        this.$router.push({ name: 'NoteList' })
      } catch (err) {
        if (is422(err)) {
          hasValidationErr(err, 'title') &&
            (this.errors.title = getValidationErrArr(err, 'title'))

          hasValidationErr(err, 'text') &&
            (this.errors.text = getValidationErrArr(err, 'text'))
        } else {
          this.errors.others.push('Network or server error, try again later.')
        }
      }

      this.loading = false
    },
    resetErrors() {
      this.errors.title = []
      this.errors.text = []
      this.errors.others = []
    }
  }
}
</script>

<style lang="scss" scoped></style>
