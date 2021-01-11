<template>
  <div class="flex flex-row items-start flex-wrap space-x-2">
    <div class="w-1/2">
      <FormInput
        v-model="title"
        type="text"
        :disabled="loading"
        :errors="errors"
        :successMessages="successMessages"
      />
    </div>
    <FormButton class="py-2 px-2" :loading="loading">Save</FormButton>
    <FormButton class="py-2 px-2" normalBgClass="bg-gray-700" :loading="loading"
      >Delete</FormButton
    >
  </div>
</template>

<script>
export default {
  emits: ['categoryUpdate', 'categoryRemoval'],
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
  }
}
</script>

<style lang="scss" scoped></style>
