<template>
  <div class="min-h-screen bg-gradient flex items-center justify-center">
    <div
      class="bg-gray-100 w-full m-4 px-6 py-8 rounded shadow-md sm:max-w-xl sm:px-10 sm:py-12"
    >
      <!-- Header with logo and title -->
      <header>
        <Logo :to="{ name: 'Home' }"></Logo>
        <h1
          class="text-gray-800 font-semibold text-2xl uppercase tracking-wide mb-8 mt-5"
        >
          Register
        </h1>
      </header>

      <!-- Main form -->
      <form>
        <div>
          <FormLabel for="name">Full name</FormLabel>
          <FormInput
            v-model="formData.name"
            type="text"
            id="name"
            name="name"
            :errors="errors.name"
          ></FormInput>
        </div>

        <div class="mt-4">
          <FormLabel for="email">Email</FormLabel>
          <FormInput
            v-model="formData.email"
            type="email"
            id="email"
            name="email"
            :errors="errors.email"
          ></FormInput>
        </div>

        <div class="mt-4">
          <FormLabel for="password">Password</FormLabel>
          <FormInput
            v-model="formData.password"
            type="password"
            id="password"
            name="password"
            :errors="errors.password"
            placeholder="ENTER DUMMY PASSWORD!"
          ></FormInput>
        </div>

        <div class="mt-4">
          <FormLabel for="password_confirmation">Confirm password</FormLabel>
          <FormInput
            v-model="formData.password_confirmation"
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            placeholder="ENTER DUMMY PASSWORD!"
          ></FormInput>
        </div>

        <FormErrors
          :errors="errors.others"
          class="mt-8 text-center"
        ></FormErrors>

        <FormButton
          class="w-full sm:max-w-xs sm:mx-auto mt-10"
          :loading="loading"
          @submit="register"
          >Register</FormButton
        >
      </form>

      <div
        class="mt-8 text-center text-base font-medium text-gray-700 uppercase tracking-wide"
      >
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
import {
  is422,
  getValidationErrArr,
  hasValidationErr
} from '../../shared/utils/response'

export default {
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
        others: []
      },
      loading: false
    }
  },
  methods: {
    async register() {
      this.loading = true
      this.resetErrors()

      try {
        await this.$store.dispatch('auth/register', this.formData)
        this.$router.replace({ name: 'Dashboard' })
      } catch (err) {
        if (is422(err)) {
          hasValidationErr(err, 'name') &&
            (this.errors.name = getValidationErrArr(err, 'name'))

          hasValidationErr(err, 'email') &&
            (this.errors.email = getValidationErrArr(err, 'email'))

          hasValidationErr(err, 'password') &&
            (this.errors.password = getValidationErrArr(err, 'password'))
        } else {
          this.errors.others.push('Network or server error, try again later.')
        }
      }

      this.loading = false
    },
    resetErrors() {
      this.errors.name = []
      this.errors.email = []
      this.errors.password = []
      this.errors.others = []
    }
  }
}
</script>

<style lang="scss" scoped></style>
