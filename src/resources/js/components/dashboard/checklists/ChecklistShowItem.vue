<template>
  <li class="flex flex-row flex-wrap items-center">
    <input
      v-model="item.checked"
      type="checkbox"
      class="form-checkbox mr-3 h-8 w-8 focus:shadow-outline-red"
      @change="$emit('checkChange', $event.target.checked)"
    />
    <div class="w-0 flex-grow">
      <FormInput
        v-model="item.text"
        type="text"
        @input="$emit('textChange', $event.target.value)"
        autocomplete="off"
      />
    </div>
    <FormButton
      class="ml-3 w-13"
      normalBgClass="bg-gray-600"
      @submit="$emit('itemRemoval')"
      ><img
        src="../../../../static/img/clear-white.svg"
        alt="Clear icon."
        class="h-8"
    /></FormButton>
  </li>
</template>

<script>
export default {
  emits: ['checkChange', 'textChange', 'itemRemoval'],
  props: {
    text: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      item: {
        text: this.text,
        checked: this.checked
      }
    }
  },
  watch: {
    text(newText, oldText) {
      this.item.text = newText
    },
    checked(newChecked, oldChecked) {
      this.item.checked = newChecked
    }
  }
}
</script>

<style lang="scss" scoped>
input[type='checkbox']:checked {
  color: rgb(200, 30, 30);
}
</style>
