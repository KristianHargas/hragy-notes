<template>
  <div class="min-h-screen bg-gradient flex items-center justify-center">
    <div
      class="bg-gray-100 w-full m-4 px-6 py-8 rounded shadow-md sm:max-w-xl sm:px-10 sm:py-12"
    >
      <!-- Header with logo and title -->
      <header>
        <Logo :to="{ name: 'Home' }"></Logo>
        <h1 class="mt-5 mb-8 text-gray-800 font-medium text-2xl">Register</h1>
      </header>

      <!-- Main form -->
      <form>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1" for="name"
            >Full name</label
          >
          <FormInput
            v-model="formData.name"
            type="text"
            id="name"
            name="name"
            :errors="errors.name"
          ></FormInput>
        </div>

        <div class="mt-4">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="email"
            >Email</label
          >
          <FormInput
            v-model="formData.email"
            type="email"
            id="email"
            name="email"
            :errors="errors.email"
          ></FormInput>
        </div>

        <div class="mt-4">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="password"
            >Password</label
          >
          <FormInput
            v-model="formData.password"
            type="password"
            id="password"
            name="password"
            :errors="errors.password"
          ></FormInput>
        </div>

        <div class="mt-4">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="password_confirmation"
            >Confirm password</label
          >
          <FormInput
            v-model="formData.password_confirmation"
            type="password"
            id="password_confirmation"
            name="password_confirmation"
          ></FormInput>
        </div>

        <FormButton
          class="w-full sm:max-w-xs sm:mx-auto mt-8"
          :loading="loading"
          @submit="register"
          >Register</FormButton
        >
      </form>

      <div class="mt-8 text-center text-base font-medium text-gray-700">
        <span
          >Already registered?
          <router-link
            class="no-select font-bold hover:text-red-700 hover:underline"
            :to="{ name: 'Login' }"
            >Sign in</router-link
          ></span
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {
  is422,
  getValidationErrArr,
  hasValidationErr
} from '../shared/utils/response'
import FormInput from '../shared/components/FormInput'
import FormButton from '../shared/components/FormButton'

export default {
  components: {
    FormInput,
    FormButton
  },
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: {
        name: [],
        email: [],
        password: [],
        network: []
      },
      loading: false
    }
  },
  methods: {
    async register() {
      this.loading = true
      this.resetErrors()

      try {
        await axios.get('/sanctum/csrf-cookie')
        const res = await axios.post('/register', this.formData)

        // redirect
      } catch (err) {
        if (is422(err)) {
          hasValidationErr(err, 'name') &&
            (this.errors.name = getValidationErrArr(err, 'name'))

          hasValidationErr(err, 'email') &&
            (this.errors.email = getValidationErrArr(err, 'email'))

          hasValidationErr(err, 'password') &&
            (this.errors.password = getValidationErrArr(err, 'password'))
        } else {
          this.errors.network.push('Server or network error')
        }
      }

      this.loading = false
    },
    resetErrors() {
      this.errors.name = []
      this.errors.email = []
      this.errors.password = []
      this.errors.network = []
    }
  }
}
</script>

<style lang="scss" scoped></style>
