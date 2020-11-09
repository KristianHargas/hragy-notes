<template>
  <div class="min-h-screen bg-gradient flex items-center justify-center">
    <div
      class="bg-gray-100 w-full m-4 px-6 py-8 rounded shadow-md sm:max-w-xl sm:px-10 sm:py-12"
    >
      <!-- Header with logo and title -->
      <header>
        <div>
          <router-link
            :to="{ name: 'Home' }"
            class="inline-flex no-select items-center px-4 py-2 bg-red-700 rounded-full"
          >
            <img
              class="h-8"
              src="../../static/img/note-icon.svg"
              alt="Note icon."
            />
            <span
              class="pl-2 mt-1 font-kalam text-xl text-white font-bold tracking-widest"
              >hragynotes</span
            >
          </router-link>
        </div>
        <h1 class="mt-5 mb-8 text-gray-800 font-medium text-2xl">Sign In</h1>
      </header>

      <form>
        <div>
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="email"
            >Email</label
          >
          <input
            class="block w-full text-gray-800 bg-white text-base p-3 focus:outline-none border-2 border-gray-400 rounded focus:border-gray-600"
            type="email"
            name="email"
            id="email"
          />
        </div>
        <div class="mt-3">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="password"
            >Password</label
          >
          <input
            class="block w-full text-gray-800 bg-white text-base p-3 focus:outline-none border-2 border-gray-400 rounded focus:border-gray-600"
            type="password"
            name="password"
            id="password"
          />
        </div>

        <div class="mt-4">
          <a
            class="no-select text-gray-700 font-semibold hover:text-red-700 hover:underline"
            href="#"
            >Forgot password?</a
          >
        </div>

        <button
          class="block no-select mt-8 w-full text-lg sm:max-w-xs sm:mx-auto bg-red-700 text-gray-100 py-3 rounded uppercase tracking-wider font-semibold hover:shadow-lg"
        >
          Sign in
        </button>
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
export default {};
</script>

<style lang="scss" scoped>
</style>