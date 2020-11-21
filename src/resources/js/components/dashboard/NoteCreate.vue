<template>
  <form class="max-w-xl mx-auto">
    <h1 class="text-gray-800 font-medium text-2xl mb-6">Create new note</h1>

    <div>
      <FormLabel for="title">Title</FormLabel>
      <FormInput
        v-model="formData.title"
        type="text"
        id="title"
        name="title"
      ></FormInput>
    </div>

    <div class="mt-4">
      <FormLabel for="text">Text</FormLabel>
      <FormArea name="text" id="text" rows="4"></FormArea>
    </div>

    <FormErrors class="mt-8 text-center"></FormErrors>

    <FormButton class="py-3 px-5 mt-8 ml-auto">Create</FormButton>
  </form>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        title: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
