<template>
  <label
    :for="'checkable-pill-' + id"
    class="flex items-center px-4 py-2 m-1 bg-red-100 rounded-full text-base font-semibold text-gray-700 no-select"
    ><input
      type="checkbox"
      :id="'checkable-pill-' + id"
      class="form-checkbox focus:shadow-outline-red mr-1"
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
