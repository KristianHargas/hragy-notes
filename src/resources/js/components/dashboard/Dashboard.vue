<template>
  <!-- Toolbar -->
  <header class="toolbar flex items-center shadow-lg bg-gray-100 px-4">
    <HamburgerButton
      class="lg:hidden"
      :open="navigationDrawer"
      @toggle="navigationDrawer = !navigationDrawer"
    ></HamburgerButton>
    <Logo :to="{ name: 'Dashboard' }" class="ml-4"></Logo>
  </header>

  <!-- Navigation drawer -->
  <aside
    class="navigation-drawer p-4 w-72 shadow-lg bg-red-100 transition duration-200 ease-out transform -translate-x-full lg:translate-x-0"
    :class="{ open: navigationDrawer }"
  >
    <section>
      <span
        class="block text-gray-800 text-2xl font-semibold"
        v-text="user.name"
      ></span>
      <span
        class="block text-gray-600 text-lg font-medium"
        v-text="user.email"
      ></span>

      <div
        class="inline-block text-lg uppercase no-select text-center tracking-wider cursor-pointer shadow-sm bg-white rounded-r-full py-2 px-6 mt-3 font-semibold text-gray-700 hover:shadow-md focus:shadow-md"
        @click="logout"
      >
        Logout
      </div>
    </section>

    <nav class="mt-12">
      <DashboardNavItem :navigateTo="{ name: 'CategoryList' }"
        >Categories</DashboardNavItem
      >
      <DashboardNavItem :navigateTo="{ name: 'NoteList' }"
        >Notes</DashboardNavItem
      >
    </nav>
  </aside>

  <!-- Main content -->
  <main class="top-margin lg:ml-72 py-4 px-4 md:px-6 bg-gray-100 main-fill">
    <router-view></router-view>
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
      navigationDrawer: false
    }
  },
  computed: {
    ...Auth.mapState(['user'])
  },
  methods: {
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
