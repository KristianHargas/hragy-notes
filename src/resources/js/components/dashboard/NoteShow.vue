<template>
  <form class="max-w-xl mx-auto">
    <h1
      class="mb-8 text-gray-800 font-semibold text-2xl uppercase tracking-wide"
    >
      Edit note
    </h1>

    <div>
      <FormLabel for="title">Title</FormLabel>
      <FormInput
        v-model="note.title"
        type="text"
        id="title"
        name="title"
        :errors="errors.title"
      ></FormInput>
    </div>

    <div class="mt-4">
      <FormLabel for="text">Text</FormLabel>
      <FormArea
        v-model="note.text"
        name="text"
        id="text"
        rows="6"
        :errors="errors.text"
      ></FormArea>
    </div>

    <div class="mt-4 flex justify-between text-lg font-medium text-gray-700">
      <span>Created at:</span><span>{{ formatDate(note.created_at) }}</span>
    </div>

    <div class="mt-2 flex justify-between text-lg font-medium text-gray-700">
      <span>Updated at:</span><span>{{ formatDate(note.updated_at) }}</span>
    </div>

    <FormErrors class="mt-8 text-center" :errors="errors.others"></FormErrors>

    <div class="flex justify-between mt-8">
      <FormButton class="py-3 px-5" :loading="loading">Delete</FormButton>
      <FormButton class="py-3 px-5" :loading="loading">Save</FormButton>
    </div>
  </form>
</template>

<script>
import axios from 'axios'
import * as NoteService from '../../services/NoteService'
import {
  is404,
  is422,
  getValidationErrArr,
  hasValidationErr
} from '../../shared/utils/response'

export default {
  data() {
    return {
      note: {},
      errors: {
        title: [],
        text: [],
        others: []
      },
      loading: false
    }
  },
  async mounted() {
    this.loading = true
    this.resetErrors()

    try {
      const res = await NoteService.show(this.$route.params.id)
      this.note = res.data
    } catch (err) {
      if (is404(err)) {
        this.errors.others.push('Note not found.')
      } else {
        this.errors.others.push('Network or server error, try again later.')
      }
    }

    this.loading = false
  },
  methods: {
    resetErrors() {
      this.errors.title = []
      this.errors.text = []
      this.errors.others = []
    },
    formatDate(dateString) {
      const date = new Date(dateString)
      return date.toLocaleString('en-US')
    }
  }
}
</script>

<style lang="scss" scoped></style>
