<template>
  <div class="flex flex-row items-start flex-wrap">
    <div class="w-full mb-2 sm:mb-0 sm:w-0 sm:flex-grow sm:max-w-lg">
      <FormInput
        v-model="title"
        type="text"
        :disabled="loading"
        :errors="errors"
        :successMessages="successMessages"
        autocomplete="off"
      />
    </div>
    <FormButton class="sm:ml-3 w-13" :loading="loading" @submit="updateCategory"
      ><img
        src="../../../../static/img/save-white.svg"
        alt="Save icon."
        class="h-8"
    /></FormButton>
    <FormButton
      class="ml-3 w-13"
      normalBgClass="bg-gray-600"
      :loading="loading"
      @submit="removeCategory"
      ><img
        src="../../../../static/img/delete-white.svg"
        alt="Delete icon."
        class="h-8"
    /></FormButton>
    <FormButton class="ml-3 w-13" :loading="loading" @click="showNotes"
      ><img
        src="../../../../static/img/note-icon.svg"
        alt="Notes icon."
        class="h-8"
    /></FormButton>
    <FormButton class="ml-3 w-13" :loading="loading" @click="showChecklists"
      ><img
        src="../../../../static/img/list_alt-white.svg"
        alt="Checklists icon."
        class="h-8"
    /></FormButton>
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
        this.errors.push('Network or server error!')
      }

      this.loading = false
      this.$emit('stopLoading')
    },
    showNotes() {
      this.$router.push({
        name: 'NoteList',
        query: {
          category: this.category.slug
        }
      })
    },
    showChecklists() {
      this.$router.push({
        name: 'ChecklistList',
        query: {
          category: this.category.slug
        }
      })
    },
    resetMessages() {
      this.successMessages = []
      this.errors = []
    }
  }
}
</script>

<style lang="scss" scoped></style>
