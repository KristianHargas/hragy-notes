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
        rows="3"
        :errors="errors.text"
      ></FormArea>
    </div>

    <div class="mt-4">
      <FormLabel for="note-color">Note color</FormLabel>
      <ColorPicker
        id="note-color"
        v-model="note.color"
        :selectDefaultColor="false"
      />
    </div>

    <div class="mt-4 flex justify-between text-base font-medium text-gray-700">
      <span>Created at:</span><span>{{ formatDate(note.created_at) }}</span>
    </div>

    <div class="mt-2 flex justify-between text-base font-medium text-gray-700">
      <span>Updated at:</span><span>{{ formatDate(note.updated_at) }}</span>
    </div>

    <FormErrors class="mt-8 text-center" :errors="errors.others"></FormErrors>

    <div class="flex justify-between mt-8">
      <FormButton
        class="py-3 px-5"
        :loading="loading || !noteLoaded"
        @submit="deleteNote"
        >Delete</FormButton
      >
      <FormButton
        class="py-3 px-5"
        :loading="loading || !noteLoaded"
        @submit="saveNote"
        >Save</FormButton
      >
    </div>
  </form>
</template>

<script>
import * as NoteService from '../../../services/NoteService'
import {
  is404,
  is422,
  getValidationErrArr,
  hasValidationErr
} from '../../../shared/utils/response'
import { formatDate } from '../../../shared/utils/util'
import ColorPicker from '../../../shared/components/ColorPicker'

export default {
  components: {
    ColorPicker
  },
  data() {
    return {
      note: {
        title: '',
        text: '',
        color: ''
      },
      errors: {
        title: [],
        text: [],
        others: []
      },
      loading: false,
      noteLoaded: false
    }
  },
  async mounted() {
    this.loading = true
    this.resetErrors()
    try {
      const res = await NoteService.show(this.$route.params.id)
      this.note = res.data
      this.noteLoaded = true
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
    async saveNote() {
      if (!this.noteLoaded) return

      this.loading = true
      this.resetErrors()

      try {
        const res = await NoteService.update(this.note.id, {
          title: this.note.title,
          text: this.note.text,
          color: this.note.color
        })
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
    async deleteNote() {
      if (!this.noteLoaded) return

      this.loading = true
      this.resetErrors()

      try {
        const res = await NoteService.destroy(this.note.id)
        this.$router.replace({ name: 'NoteList' })
      } catch (err) {
        this.errors.others.push('Network or server error, try again later.')
      }

      this.loading = false
    },
    resetErrors() {
      this.errors.title = []
      this.errors.text = []
      this.errors.others = []
    },
    formatDate(dateString) {
      return formatDate(dateString)
    }
  }
}
</script>

<style lang="scss" scoped></style>
