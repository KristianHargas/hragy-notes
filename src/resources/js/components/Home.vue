<template>
  <div>
    <!-- Toolbar -->
    <header class="sticky border-b-2 border-red-700 bg-gray-100 sticky-top">
      <nav
        class="md:flex md:justify-between md:container md:mx-auto md:px-6 md:py-3"
      >
        <!-- Logo with hamburger button -->
        <div class="flex justify-between items-center py-3 px-4 md:p-0">
          <!-- Logo -->
          <Logo :to="{ name: 'Home' }"></Logo>

          <!-- Hamburger button -->
          <HamburgerButton
            class="md:hidden"
            :open="menuOpen"
            @toggle="menuOpen = !menuOpen"
          ></HamburgerButton>
        </div>

        <!-- Navigation links -->
        <ul
          id="nav_menu"
          :class="{ hidden: !menuOpen }"
          class="px-4 pt-2 pb-4 md:p-0 md:flex md:items-center"
        >
          <li>
            <router-link
              :to="{ name: 'Login' }"
              class="block uppercase tracking-wide no-select px-4 py-2 md:py-1 font-semibold text-lg text-gray-800 rounded md:hover:text-red-700 focus:bg-gray-300 md:focus:bg-transparent md:hover:underline"
              >Sign In</router-link
            >
          </li>
          <li>
            <router-link
              :to="{ name: 'Register' }"
              class="block uppercase tracking-wide no-select px-4 py-2 md:py-1 font-semibold text-lg text-gray-800 rounded md:hover:text-red-700 focus:bg-gray-300 md:focus:bg-transparent md:hover:underline"
              >Register</router-link
            >
          </li>
        </ul>
      </nav>
    </header>

    <!-- Main content -->
    <main class="mb-auto">
      <!-- Section with brief description (landing page) and Sign Up / Sign In links -->
      <div class="bg-red-100">
        <div class="md:container md:mx-auto px-4 md:px-6 py-8 md:py-12">
          <div class="grid grid-cols-12 gap-5">
            <!-- Section with description text and with links -->
            <section
              class="flex items-center col-span-12 md:col-span-7 lg:col-span-8"
            >
              <div>
                <h1
                  class="text-center md:text-left text-gray-800 mb-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide leading-tight"
                >
                  Forgetting everything?
                </h1>
                <p
                  class="mb-10 text-center md:text-left text-xl sm:text-2xl lg:text-3xl font-normal text-gray-700 leading-8 sm:leading-9 md:leading-10"
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Quidem, tempore quo. Natus id commodi illum ipsa esse
                  voluptatum, deleniti facere provident, tempora voluptatibus
                  impedit repellat fugiat harum ipsam deserunt libero?
                </p>
                <div class="text-center md:text-left">
                  <router-link
                    :to="{ name: 'Login' }"
                    class="inline-block w-56 text-center rounded no-select uppercase border-red-700 text-white border-4 bg-red-700 px-12 py-1 font-bold text-lg sm:text-xl tracking-widest hover:shadow-lg"
                    >Sign in</router-link
                  >
                </div>
                <div class="mt-5 text-center md:text-left">
                  <router-link
                    :to="{ name: 'Register' }"
                    class="inline-block w-56 text-center rounded no-select uppercase border-red-700 text-red-700 border-4 bg-gray-100 px-12 py-1 font-bold text-lg sm:text-xl tracking-widest hover:shadow-lg"
                  >
                    Register</router-link
                  >
                </div>
              </div>
            </section>
            <div
              class="flex mt-8 md:mt-0 col-start-4 col-span-6 md:col-span-5 lg:col-span-4"
            >
              <img
                src="../../static/img/notes-landing.svg"
                alt="Notepad with a pen."
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Section with features offered -->
      <div>
        <div class="md:container md:mx-auto px-4 py-12">
          <h2
            class="mb-10 text-center text-gray-800 font-bold text-2xl sm:text-3xl lg:text-4xl tracking-wide leading-tight"
          >
            No need to memorize anything anymore
          </h2>
          <div class="grid grid-cols-3 gap-5">
            <div class="justify-center p-4 col-span-3 md:col-span-1">
              <img
                class="block mx-auto mb-3 w-24"
                src="../../static/img/note.svg"
                alt="Note."
              />
              <h3
                class="mb-1 text-center text-gray-800 text-2xl tracking-wide font-semibold"
              >
                Take notes
              </h3>
              <p
                class="text-center font-normal text-lg sm:text-xl text-gray-800"
              >
                Molestias fuga minus nemo saepe illo voluptatum autem, officiis
                minima sequi impedit aliquam laudantium id sint voluptates odio.
              </p>
            </div>
            <div class="justify-center p-4 col-span-3 md:col-span-1">
              <img
                class="block mx-auto mb-4 w-24"
                src="../../static/img/checklist.svg"
                alt="Note."
              />
              <h3
                class="mb-1 text-center text-gray-800 text-2xl tracking-wide font-semibold"
              >
                Make To-Do lists
              </h3>
              <p
                class="text-center font-normal text-lg sm:text-xl text-gray-800"
              >
                Molestias fuga minus nemo saepe illo voluptatum autem, officiis
                minima sequi impedit aliquam laudantium id sint voluptates odio.
              </p>
            </div>
            <div class="justify-center p-4 col-span-3 md:col-span-1">
              <img
                class="block mx-auto mb-4 w-24"
                src="../../static/img/event.svg"
                alt="Note."
              />
              <h3
                class="mb-1 text-center text-gray-800 text-2xl tracking-wide font-semibold"
              >
                Schedule events
              </h3>
              <p
                class="text-center font-normal text-lg sm:text-xl text-gray-800"
              >
                Molestias fuga minus nemo saepe illo voluptatum autem, officiis
                minima sequi impedit aliquam laudantium id sint voluptates odio.
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Section with services provided -->
      <section>
        <div class="bg-red-100">
          <div
            class="md:flex md:items-center md:justify-between md:container md:mx-auto px-8 py-12"
          >
            <div class="md:w-1/2 md:pr-4">
              <h2
                class="text-gray-800 font-bold leading-tight tracking-wide text-2xl sm:text-3xl md:text-4xl"
              >
                Everything in sync
              </h2>
              <p class="text-gray-800 mt-4 text-lg sm:text-xl">
                Id sint reiciendis eligendi distinctio aliquid, cumque inventore
                provident quaerat nulla facere voluptas molestias tenetur veniam
                nisi perspiciatis. Veniam corrupti eligendi libero.
              </p>
            </div>
            <div
              class="mt-10 md:m-0 w-56 sm:w-64 md:max-w-xs mx-auto md:w-1/2 md:pl-4"
            >
              <img src="../../static/img/sync.svg" alt="Sync icon." />
            </div>
          </div>
        </div>

        <div>
          <div
            class="md:flex md:flex-row-reverse md:items-center md:justify-between md:container md:mx-auto px-8 py-12"
          >
            <div class="md:w-1/2 md:pl-4">
              <h2
                class="text-gray-800 font-bold leading-tight tracking-wide text-2xl sm:text-3xl md:text-4xl"
              >
                Collaborate and share
              </h2>
              <p class="text-gray-800 mt-4 text-lg sm:text-xl">
                Id sint reiciendis eligendi distinctio aliquid, cumque inventore
                provident quaerat nulla facere voluptas molestias tenetur veniam
                nisi perspiciatis. Veniam corrupti eligendi libero.
              </p>
            </div>
            <div
              class="mt-10 md:m-0 w-56 sm:w-64 md:max-w-xs mx-auto md:w-1/2 md:pr-4"
            >
              <img src="../../static/img/collaboration.svg" alt="Sync icon." />
            </div>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer
      class="border-t-2 border-gray-500 bg-gray-200 text-gray-700 font-semibold text-center text-sm md:text-base py-2"
    >
      Copyright &copy; 2021 Hragy
    </footer>
  </div>
</template>

<script>
import HamburgerButton from '../shared/components/HamburgerButton'

export default {
  components: {
    HamburgerButton
  },
  data() {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
    }
  }
}
</script>

<style lang="scss" scoped></style>
