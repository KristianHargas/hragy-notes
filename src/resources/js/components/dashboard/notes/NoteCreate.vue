<template>
  <DashboardTitle :supportNavigateBack="true">Create new note</DashboardTitle>

  <form class="max-w-xl">
    <div>
      <FormLabel for="title">Title</FormLabel>
      <FormInput
        v-model="newNote.title"
        type="text"
        id="title"
        name="title"
        :errors="errors.title"
      ></FormInput>
    </div>

    <div class="mt-4">
      <FormLabel for="text">Text</FormLabel>
      <FormArea
        v-model="newNote.text"
        name="text"
        id="text"
        rows="5"
        :errors="errors.text"
      ></FormArea>
    </div>

    <div class="mt-4">
      <FormLabel for="note-color">Note color</FormLabel>
      <ColorPicker class="-ml-2" id="note-color" v-model="newNote.color" />
    </div>

    <div v-if="categories.length" class="mt-4">
      <FormLabel for="categories-selection">Select categories</FormLabel>
      <div id="categories-selection" class="flex flex-row flex-wrap -ml-1">
        <CheckablePill
          v-for="category in categories"
          :key="category.id"
          :id="category.id"
          v-model="newNote.categories"
        >
          {{ category.title }}
        </CheckablePill>
      </div>
    </div>

    <FormErrors class="mt-8 text-center" :errors="errors.others"></FormErrors>

    <FormButton class="mt-8 ml-auto" :loading="loading" @submit="createNote"
      >Create</FormButton
    >
  </form>
</template>

<script>
import ColorPicker from '../../../shared/components/ColorPicker'
import DashboardTitle from '../DashboardTitle'
import {
  is422,
  getValidationErrArr,
  hasValidationErr
} from '../../../shared/utils/response'

export default {
  emits: ['startLoading', 'stopLoading'],
  components: {
    ColorPicker,
    DashboardTitle
  },
  data() {
    return {
      newNote: {
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
    categories() {
      return this.$store.state.category.categories
    }
  },
  methods: {
    async createNote() {
      this.loading = true
      this.$emit('startLoading')

      this.resetErrors()

      try {
        await this.$store.dispatch('note/store', {
          note: this.newNote
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
    resetErrors() {
      this.errors.title = []
      this.errors.text = []
      this.errors.others = []
    }
  }
}
</script>

<style lang="scss" scoped></style>
