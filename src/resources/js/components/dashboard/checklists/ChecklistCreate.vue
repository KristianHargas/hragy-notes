<template>
  <div>
    <DashboardTitle>Create new checklist</DashboardTitle>

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
          <!-- Add new item section. -->
          <div class="flex flex-row flex-wrap">
            <div class="w-0 flex-grow">
              <FormInput v-model="newItem" type="text" placeholder="New item" />
            </div>
            <FormButton class="ml-3" :loading="!newItem" @submit="addItem"
              >Add</FormButton
            >
          </div>

          <div class="mt-4 mb-4 border-t-2 border-gray-300 w-full"></div>

          <!-- List of items. -->
          <ul class="space-y-2">
            <li
              class="flex flex-row flex-wrap items-center"
              v-for="(item, index) in items"
              :key="'item' + index"
            >
              <input
                type="checkbox"
                class="form-checkbox mr-3 h-8 w-8 focus:shadow-outline-red"
                v-model="item.checked"
              />
              <div class="w-0 flex-grow">
                <FormInput
                  v-model="item.text"
                  type="text"
                  @change="itemUpdated(item)"
                />
              </div>
              <FormButton
                class="ml-3 w-13"
                normalBgClass="bg-gray-600"
                @submit="removeItem(item)"
                ><img
                  src="../../../../static/img/clear-white.svg"
                  alt="Clear icon."
                  class="h-8"
              /></FormButton>
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-4">
        <FormLabel for="color">Color</FormLabel>
        <ColorPicker id="color" v-model="newChecklist.color" />
      </div>

      <div class="mt-4">
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
import {
  is422,
  getValidationErrArr,
  hasValidationErr
} from '../../../shared/utils/response'

export default {
  emits: ['startLoading', 'stopLoading'],
  components: {
    DashboardTitle,
    ColorPicker
  },
  data() {
    return {
      newChecklist: {
        title: '',
        items: '',
        color: '',
        categories: []
      },
      newItem: '',
      items: [],
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
    addItem() {
      if (!this.newItem) return

      this.items.push({ checked: false, text: this.newItem })
      this.newItem = ''
    },
    itemUpdated(item) {
      if (!item.text) this.removeItem(item)
    },
    removeItem(item) {
      this.items.splice(this.items.indexOf(item), 1)
    },
    async createChecklist() {
      this.loading = true
      this.$emit('startLoading')

      this.resetErrors()

      try {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 2000)
        })

        this.newChecklist.items = JSON.stringify(this.items)
        console.log('Creating checklist: ', this.newChecklist)
      } catch (err) {}

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

<style lang="scss" scoped>
input[type='checkbox']:checked {
  color: rgb(200, 30, 30);
}
</style>
