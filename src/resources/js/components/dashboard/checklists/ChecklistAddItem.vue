<template>
  <div class="flex flex-row flex-wrap">
    <div class="w-0 flex-grow">
      <FormInput
        v-model="newItem"
        type="text"
        placeholder="New item"
        autocomplete="off"
      />
    </div>
    <FormButton class="ml-3" :loading="!newItem" @submit="addItem"
      >Add</FormButton
    >
  </div>
</template>

<script>
export default {
  emits: ['newItemAddition'],
  data() {
    return {
      newItem: ''
    }
  },
  methods: {
    addItem() {
      if (!this.newItem) return

      const item = this.newItem
      this.newItem = ''
      this.$emit('newItemAddition', item)
    }
  }
}
</script>

<style lang="scss" scoped></style>
