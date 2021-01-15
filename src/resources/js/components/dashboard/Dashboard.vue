<template>
  <!-- Toolbar -->
  <header class="toolbar flex items-center shadow-lg bg-gray-100 px-4">
    <HamburgerButton
      class="lg:hidden"
      :open="navigationDrawer"
      @toggle="navigationDrawer = !navigationDrawer"
    ></HamburgerButton>
    <Logo :to="{ name: 'Dashboard' }" class="ml-4 lg:ml-0"></Logo>
    <div class="flex-grow"></div>
    <LoadingSpinner
      v-if="loading"
      class="animate-spin h-10 w-10 text-red-700"
    />
    <img
      v-else
      class="h-12 w-12 cursor-pointer -mr-1"
      src="../../../static/img/refresh-white.svg"
      alt="Refresh icon."
      @click="refresh"
    />
  </header>

  <!-- Navigation drawer -->
  <aside
    class="navigation-drawer py-4 w-72 shadow-lg bg-red-100 transition duration-200 ease-out transform -translate-x-full lg:translate-x-0"
    :class="{ open: navigationDrawer }"
  >
    <section class="px-6">
      <span
        class="block text-gray-800 text-2xl font-medium"
        v-text="user.name"
      ></span>
      <span
        class="block text-gray-700 text-lg font-light"
        v-text="user.email"
      ></span>

      <div
        class="inline-block text-lg uppercase no-select text-center tracking-wider cursor-pointer shadow-sm bg-white rounded-lg py-2 px-6 mt-3 font-medium text-gray-800 hover:shadow-md focus:shadow-md"
        @click="logout"
      >
        Logout
      </div>
    </section>

    <div class="mt-8 mb-4 border-t-2 border-gray-700 opacity-25 w-full"></div>

    <nav class="px-3">
      <DashboardNavItem :navigateTo="{ name: 'CategoryList' }"
        >Categories</DashboardNavItem
      >
      <DashboardNavItem :navigateTo="{ name: 'NoteList' }"
        >Notes</DashboardNavItem
      >
      <DashboardNavItem :navigateTo="{ name: 'ChecklistList' }"
        >Checklists</DashboardNavItem
      >
    </nav>
  </aside>

  <!-- Main content -->
  <main class="top-margin lg:ml-72 py-4 px-4 md:px-6 bg-gray-100 main-fill">
    <FormErrors
      v-if="dataFetchingFinished && !dataFetchingSuccess"
      :errors="[
        'Error while loading data, please check your internet connection and refresh again later!'
      ]"
    >
    </FormErrors>

    <router-view
      v-if="dataFetchingFinished && dataFetchingSuccess"
      @startLoading="loading = true"
      @stopLoading="loading = false"
    ></router-view>
  </main>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const Auth = createNamespacedHelpers('auth')
import HamburgerButton from '../../shared/components/HamburgerButton'
import DashboardNavItem from './DashboardNavItem'

export default {
  components: {
    HamburgerButton,
    DashboardNavItem
  },
  data() {
    return {
      navigationDrawer: false,
      loading: false,
      dataFetchingFinished: false,
      dataFetchingSuccess: false
    }
  },
  computed: {
    ...Auth.mapState(['user'])
  },
  async mounted() {
    await this.refresh()
  },
  methods: {
    async refresh() {
      this.dataFetchingFinished = false
      this.loading = true

      try {
        await Promise.all([
          this.$store.dispatch('note/index'),
          this.$store.dispatch('category/index'),
          this.$store.dispatch('checklist/index')
        ])

        this.dataFetchingSuccess = true
      } catch (err) {
        this.dataFetchingSuccess = false
      }

      this.dataFetchingFinished = true
      this.loading = false
    },
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.replace({ name: 'Login' })
    }
  },
  beforeRouteUpdate(to, from) {
    this.navigationDrawer = false
  }
}
</script>

<style lang="scss" scoped>
.top-margin {
  margin-top: 4.5rem;
}

.toolbar {
  position: fixed;
  z-index: 20;
  top: 0;
  right: 0;
  left: 0;
  height: 4.5rem;
  box-sizing: border-box;
}

.navigation-drawer {
  position: fixed;
  z-index: 10;
  top: 4.5rem;
  left: 0;
  bottom: 0;
  box-sizing: border-box;
  overflow-y: auto;
}

.navigation-drawer.open {
  transform: translateX(0);
}

.router-link-exact-active {
  background-color: #c81e1e;
  color: white;
}

.main-fill {
  min-height: calc(100vh - 4.5rem);
}
</style>
