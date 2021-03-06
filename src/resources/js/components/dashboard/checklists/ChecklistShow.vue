<template>
  <div>
    <DashboardTitle :supportNavigateBack="true">Edit checklist</DashboardTitle>

    <form v-if="checklist" class="max-w-xl">
      <div>
        <FormLabel for="title">Title</FormLabel>
        <FormInput
          v-model="editedChecklist.title"
          type="text"
          id="title"
          name="title"
          :errors="errors.title"
          autocomplete="off"
        ></FormInput>
      </div>

      <div class="mt-4">
        <FormLabel for="items">Items</FormLabel>
        <div id="items">
          <ChecklistAddItem @newItemAddition="addItem($event)" />

          <div class="mt-4 mb-4 border-t-2 border-gray-300 w-full"></div>

          <!-- List of items. -->
          <transition-group
            enter-active-class="animate__animated animate__backInLeft"
            leave-active-class="animate__animated animate__backOutLeft"
            name="items-list"
            tag="ul"
            class="space-y-2"
          >
            <ChecklistShowItem
              v-for="item in editedChecklist.items"
              :key="item.id"
              :text="item.text"
              :checked="item.checked"
              @checkChange="item.checked = $event"
              @textChange="updateItem($event, item)"
              @itemRemoval="removeItem(item)"
            />
          </transition-group>
        </div>
      </div>

      <div class="mt-4">
        <FormLabel for="color">Color</FormLabel>
        <ColorPicker id="color" v-model="editedChecklist.color" />
      </div>

      <div v-if="categories.length" class="mt-4">
        <FormLabel for="categories">Categories</FormLabel>
        <div id="categories" class="flex flex-row flex-wrap">
          <CheckablePill
            v-for="category in categories"
            :key="category.id"
            :id="category.id"
            v-model="editedChecklist.categories"
          >
            {{ category.title }}
          </CheckablePill>
        </div>
      </div>

      <div class="mt-4 flex justify-between text-base font-light text-gray-700">
        <span class="uppercase">Created at:</span
        ><span>{{ formatDate(checklist.created_at) }}</span>
      </div>

      <div class="mt-2 flex justify-between text-base font-light text-gray-700">
        <span class="uppercase">Updated at:</span
        ><span>{{ formatDate(checklist.updated_at) }}</span>
      </div>

      <FormErrors class="mt-8 text-center" :errors="errors.others"></FormErrors>

      <div class="flex justify-between mt-8">
        <FormButton
          class="w-13"
          normalBgClass="bg-gray-600"
          :loading="loading"
          @submit="removeChecklist"
          ><img
            src="../../../../static/img/delete-white.svg"
            alt="Delete icon."
            class="h-8"
        /></FormButton>

        <FormButton :loading="loading" @submit="updateChecklist"
          >Save</FormButton
        >
      </div>
    </form>
  </div>
</template>

<script>
import DashboardTitle from '../DashboardTitle'
import ColorPicker from '../../../shared/components/ColorPicker'
import ChecklistAddItem from './ChecklistAddItem'
import ChecklistShowItem from './ChecklistShowItem'
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
    DashboardTitle,
    ColorPicker,
    ChecklistAddItem,
    ChecklistShowItem
  },
  data() {
    return {
      editedChecklist: {
        title: '',
        items: [],
        color: '',
        categories: []
      },
      errors: {
        title: [],
        others: []
      },
      loading: false
    }
  },
  computed: {
    checklist() {
      return this.$store.getters['checklist/getChecklistById'](
        this.$route.params.id
      )
    },
    categories() {
      return this.$store.state.category.categories
    }
  },
  mounted() {
    if (this.checklist) {
      const selectedCategories = this.checklist.categories.map(
        (category) => category.id
      )

      const itemsCopy = this.checklist.items.map((item) => ({
        id: item.id,
        checked: item.checked,
        text: item.text
      }))

      this.editedChecklist = {
        title: this.checklist.title,
        items: itemsCopy,
        color: this.checklist.color,
        categories: selectedCategories
      }
    } else {
      this.$router.replace({ name: 'ChecklistList' })
    }
  },
  methods: {
    addItem(newItem) {
      const now = new Date()
      this.editedChecklist.items.push({
        id: now.getTime(),
        checked: false,
        text: newItem
      })
    },
    updateItem(newText, item) {
      if (!newText) this.removeItem(item)
      else item.text = newText
    },
    removeItem(item) {
      this.editedChecklist.items.splice(
        this.editedChecklist.items.indexOf(item),
        1
      )
    },
    async updateChecklist() {
      this.loading = true
      this.$emit('startLoading')

      this.resetErrors()

      try {
        const parsedChecklist = {
          title: this.editedChecklist.title,
          items: JSON.stringify(this.editedChecklist.items),
          color: this.editedChecklist.color,
          categories: [...this.editedChecklist.categories]
        }

        await this.$store.dispatch('checklist/update', {
          id: this.checklist.id,
          checklist: parsedChecklist
        })

        this.$router.back()
      } catch (err) {
        if (is422(err) && hasValidationErr(err, 'title')) {
          this.errors.title = getValidationErrArr(err, 'title')
        } else {
          this.errors.others.push('Network or server error, try again later!')
        }
      }

      this.loading = false
      this.$emit('stopLoading')
    },
    async removeChecklist() {
      const confirmed = confirm(
        'Are you sure you want to remove this checklist?'
      )
      if (!confirmed) return

      this.loading = true
      this.$emit('startLoading')

      this.resetErrors()

      try {
        await this.$store.dispatch('checklist/destroy', {
          id: this.checklist.id
        })
        this.$router.replace({ name: 'ChecklistList' })
      } catch (err) {
        this.errors.others.push('Network or server error, try again later!')
      }

      this.loading = false
      this.$emit('stopLoading')
    },
    resetErrors() {
      this.errors.title = []
      this.errors.others = []
    },
    formatDate(dateString) {
      return formatDate(dateString)
    }
  }
}
</script>

<style lang="scss" scoped></style>
