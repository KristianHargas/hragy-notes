<template>
  <div>
    <DashboardTitle :supportNavigateBack="true"
      >Create new checklist</DashboardTitle
    >

    <form class="max-w-xl">
      <div>
        <FormLabel for="title">Title</FormLabel>
        <FormInput
          v-model="newChecklist.title"
          type="text"
          id="title"
          name="title"
          :errors="errors.title"
        ></FormInput>
      </div>

      <div class="mt-4">
        <FormLabel for="items">Items</FormLabel>
        <div id="items">
          <ChecklistAddItem @newItemAddition="addItem($event)" />

          <div class="mt-4 mb-4 border-t-2 border-gray-300 w-full"></div>

          <!-- List of items. -->
          <ul class="space-y-2">
            <ChecklistShowItem
              v-for="(item, index) in items"
              :key="'item' + index"
              :text="item.text"
              :checked="item.checked"
              @checkChange="item.checked = $event"
              @textChange="updateItem($event, item)"
              @itemRemoval="removeItem(item)"
            />
          </ul>
        </div>
      </div>

      <div class="mt-4">
        <FormLabel for="color">Color</FormLabel>
        <ColorPicker id="color" v-model="newChecklist.color" />
      </div>

      <div v-if="categories.length" class="mt-4">
        <FormLabel for="categories">Categories</FormLabel>
        <div id="categories" class="flex flex-row flex-wrap">
          <CheckablePill
            v-for="category in categories"
            :key="category.id"
            :id="category.id"
            v-model="newChecklist.categories"
          >
            {{ category.title }}
          </CheckablePill>
        </div>
      </div>

      <FormErrors class="mt-8 text-center" :errors="errors.others"></FormErrors>

      <FormButton
        class="mt-8 ml-auto"
        :loading="loading"
        @submit="createChecklist"
        >Create</FormButton
      >
    </form>
  </div>
</template>

<script>
import DashboardTitle from '../DashboardTitle'
import ColorPicker from '../../../shared/components/ColorPicker'
import ChecklistAddItem from './ChecklistAddItem'
import ChecklistShowItem from './ChecklistShowItem'
import {
  is422,
  getValidationErrArr,
  hasValidationErr
} from '../../../shared/utils/response'

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
      newChecklist: {
        title: '',
        items: '',
        color: '',
        categories: []
      },
      items: [],
      errors: {
        title: [],
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
    addItem(newItem) {
      this.items.push({ checked: false, text: newItem })
    },
    updateItem(newText, item) {
      if (!newText) this.removeItem(item)
      else item.text = newText
    },
    removeItem(item) {
      this.items.splice(this.items.indexOf(item), 1)
    },
    async createChecklist() {
      this.loading = true
      this.$emit('startLoading')

      this.resetErrors()

      try {
        this.newChecklist.items = JSON.stringify(this.items)

        await this.$store.dispatch('checklist/store', {
          checklist: this.newChecklist
        })

        const latestChecklist = this.$store.getters['checklist/getLatest']
        this.$router.replace({
          name: 'ChecklistView',
          params: { id: latestChecklist.id }
        })
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
    resetErrors() {
      this.errors.title = []
      this.errors.others = []
    }
  }
}
</script>

<style lang="scss" scoped></style>
