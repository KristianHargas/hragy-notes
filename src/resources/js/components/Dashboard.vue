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
    class="navigation-drawer w-72 shadow-lg bg-gray-100 transition duration-200 ease-out transform -translate-x-full lg:translate-x-0"
    :class="{ open: navigationDrawer }"
  ></aside>

  <!-- Main content -->
  <main class="top-margin lg:ml-72"></main>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const Auth = createNamespacedHelpers('auth')
import HamburgerButton from '../shared/components/HamburgerButton'

export default {
  components: {
    HamburgerButton
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
</style>
