<template>
  <label
    :for="'checkable-pill-' + id"
    class="flex items-center bg-transparent px-4 py-1 m-1 border-2 border-gray-600 rounded-full text-base font-semibold text-gray-600 no-select"
    ><input
      type="checkbox"
      :id="'checkable-pill-' + id"
      class="form-checkbox focus:shadow-outline-red mr-2"
      :value="id"
      :checked="isChecked"
      @change="checkChanged($event.target.checked)" />
    <slot></slot
  ></label>
</template>

<script>
export default {
  emits: ['update:modelValue'],
  props: {
    modelValue: {
      type: Array,
      required: true
    },
    id: {
      type: Number,
      required: true
    }
  },
  computed: {
    isChecked() {
      return this.modelValue.includes(this.id)
    }
  },
  methods: {
    checkChanged(checked) {
      const checkedItems = [...this.modelValue]

      if (checked) checkedItems.push(this.id)
      else checkedItems.splice(checkedItems.indexOf(this.id), 1)

      this.$emit('update:modelValue', checkedItems)
    }
  }
}
</script>

<style lang="scss" scoped>
input[type='checkbox']:checked {
  color: rgb(200, 30, 30);
}
</style>
