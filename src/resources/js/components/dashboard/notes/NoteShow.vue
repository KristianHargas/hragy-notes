<template>
  <DashboardTitle>Edit note</DashboardTitle>

  <form v-if="note" class="max-w-xl">
    <div>
      <FormLabel for="title">Title</FormLabel>
      <FormInput
        v-model="editedNote.title"
        type="text"
        id="title"
        name="title"
        :errors="errors.title"
      ></FormInput>
    </div>

    <div class="mt-4">
      <FormLabel for="text">Text</FormLabel>
      <FormArea
        v-model="editedNote.text"
        name="text"
        id="text"
        rows="5"
        :errors="errors.text"
      ></FormArea>
    </div>

    <div class="mt-4">
      <FormLabel for="note-color">Note color</FormLabel>
      <ColorPicker
        id="note-color"
        v-model="editedNote.color"
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
        :loading="loading"
        @submit="removeNote"
        normalBgClass="bg-gray-600"
        >Remove</FormButton
      >
      <FormButton :loading="loading" @submit="updateNote">Save</FormButton>
    </div>
  </form>
</template>

<script>
import ColorPicker from '../../../shared/components/ColorPicker'
import DashboardTitle from '../DashboardTitle'
import {
  is404,
  is422,
  getValidationErrArr,
  hasValidationErr
} from '../../../shared/utils/response'
import { formatDate } from '../../../shared/utils/util'

export default {
  emits: ['startLoading', 'stopLoading'],
  components: {
    ColorPicker,
    DashboardTitle
  },
  data() {
    return {
      editedNote: {
        title: '',
        text: '',
        color: ''
      },
      errors: {
        title: [],
        text: [],
        others: []
      },
      loading: false
    }
  },
  computed: {
    note() {
      return this.$store.getters['note/getNoteById'](this.$route.params.id)
    }
  },
  mounted() {
    if (this.note) {
      this.editedNote = {
        title: this.note.title,
        text: this.note.text,
        color: this.note.color
      }
    } else {
      this.$router.replace({ name: 'NoteList' })
    }
  },
  methods: {
    async updateNote() {
      this.loading = true
      this.$emit('startLoading')

      this.resetErrors()

      try {
        await this.$store.dispatch('note/update', {
          id: this.note.id,
          note: this.editedNote
        })
        this.$router.push({ name: 'NoteList' })
      } catch (err) {
        if (is422(err)) {
          hasValidationErr(err, 'title') &&
            (this.errors.title = getValidationErrArr(err, 'title'))

          hasValidationErr(err, 'text') &&
            (this.errors.text = getValidationErrArr(err, 'text'))
        } else {
          this.errors.others.push('Network or server error, try again later!')
        }
      }

      this.loading = false
      this.$emit('stopLoading')
    },
    async removeNote() {
      const confirmed = confirm('Are you sure you want to remove this note?')
      if (!confirmed) return

      this.loading = true
      this.$emit('startLoading')

      this.resetErrors()

      try {
        await this.$store.dispatch('note/destroy', { id: this.note.id })
        this.$router.replace({ name: 'NoteList' })
      } catch (err) {
        this.errors.others.push('Network or server error, try again later!')
      }

      this.loading = false
      this.$emit('stopLoading')
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
