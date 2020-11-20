<template>
  <div class="min-h-screen bg-gradient flex items-center justify-center">
    <div
      class="bg-gray-100 w-full m-4 px-6 py-8 rounded shadow-md sm:max-w-xl sm:px-10 sm:py-12"
    >
      <!-- Header with logo and title -->
      <header>
        <Logo :to="{ name: 'Home' }"></Logo>
        <h1 class="mt-5 mb-8 text-gray-800 font-medium text-2xl">Sign In</h1>
      </header>

      <!-- Main form -->
      <form>
        <div>
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
          <a
            class="no-select text-gray-700 font-semibold hover:text-red-700 hover:underline"
            href="#"
            >Forgot password?</a
          >
        </div>

        <FormErrors
          :errors="errors.others"
          class="mt-8 text-center"
        ></FormErrors>

        <FormButton
          class="w-full sm:max-w-xs sm:mx-auto mt-8"
          :loading="loading"
          @submit="login"
          >Sign In</FormButton
        >
      </form>

      <div class="mt-8 text-center text-base font-medium text-gray-700">
        <span
          >No account yet?
          <router-link
            class="no-select font-bold hover:text-red-700 hover:underline"
            :to="{ name: 'Register' }"
            >Register</router-link
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
import FormErrors from '../shared/components/FormErrors'

export default {
  components: {
    FormInput,
    FormButton,
    FormErrors
  },
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      errors: {
        email: [],
        password: [],
        others: []
      },
      loading: false
    }
  },
  methods: {
    async login() {
      this.loading = true
      this.resetErrors()

      try {
        await axios.get('/sanctum/csrf-cookie')
        const res = await axios.post('/login', this.formData)

        // redirect
      } catch (err) {
        if (is422(err)) {
          hasValidationErr(err, 'email') &&
            (this.errors.email = getValidationErrArr(err, 'email'))

          hasValidationErr(err, 'password') &&
            (this.errors.password = getValidationErrArr(err, 'password'))

          hasValidationErr(err, 'auth') &&
            (this.errors.others = getValidationErrArr(err, 'auth'))
        } else {
          this.errors.others.push('Network or server error, try again later.')
        }
      }

      this.loading = false
    },
    resetErrors() {
      this.errors.email = []
      this.errors.password = []
      this.errors.others = []
    }
  }
}
</script>

<style lang="scss" scoped></style>
