<template>
  <div>
    <DashboardTitle :supportNavigateBack="true">Edit note</DashboardTitle>

    <form v-if="note" class="max-w-xl">
      <div>
        <FormLabel for="title">Title</FormLabel>
        <FormInput
          v-model="editedNote.title"
          type="text"
          id="title"
          name="title"
          :errors="errors.title"
          autocomplete="off"
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
          autocomplete="off"
        ></FormArea>
      </div>

      <div class="mt-4">
        <FormLabel for="note-color">Note color</FormLabel>
        <ColorPicker
          id="note-color"
          class="-ml-2"
          v-model="editedNote.color"
          :selectDefaultColor="false"
        />
      </div>

      <div v-if="categories.length" class="mt-4">
        <FormLabel for="categories-selection">Select categories</FormLabel>
        <div id="categories-selection" class="flex flex-row flex-wrap -ml-1">
          <CheckablePill
            v-for="category in categories"
            :key="category.id"
            :id="category.id"
            v-model="editedNote.categories"
          >
            {{ category.title }}
          </CheckablePill>
        </div>
      </div>

      <div class="mt-4 flex justify-between text-base font-light text-gray-700">
        <span class="uppercase">Created at:</span
        ><span>{{ formatDate(note.created_at) }}</span>
      </div>

      <div class="mt-2 flex justify-between text-base font-light text-gray-700">
        <span class="uppercase">Updated at:</span
        ><span>{{ formatDate(note.updated_at) }}</span>
      </div>

      <FormErrors class="mt-8 text-center" :errors="errors.others"></FormErrors>

      <div class="flex justify-between mt-8">
        <FormButton
          class="w-13"
          normalBgClass="bg-gray-600"
          :loading="loading"
          @submit="removeNote"
          ><img
            src="../../../../static/img/delete-white.svg"
            alt="Delete icon."
            class="h-8"
        /></FormButton>

        <FormButton :loading="loading" @submit="updateNote">Save</FormButton>
      </div>
    </form>
  </div>
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
        color: '',
        categories: []
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
    },
    categories() {
      return this.$store.state.category.categories
    }
  },
  mounted() {
    if (this.note) {
      const selectedCategories = this.note.categories.map(
        (category) => category.id
      )

      this.editedNote = {
        title: this.note.title,
        text: this.note.text,
        color: this.note.color,
        categories: selectedCategories
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
        this.$router.back()
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
