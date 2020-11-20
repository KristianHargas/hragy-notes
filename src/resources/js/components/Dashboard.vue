<template>
  <div class="container">
    <div>Dashboard</div>
    <div>Hello, {{ user.name }}!</div>
    <div>Email: {{ email }}</div>
    <div>
      <button @click="fetchUser">Fetch user</button>
    </div>
    <div>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const Auth = createNamespacedHelpers('auth')
import * as AuthService from '../services/AuthService'

export default {
  data() {
    return {
      email: ''
    }
  },
  computed: {
    ...Auth.mapState(['user'])
  },
  methods: {
    async logout() {
      await this.$store.dispatch('auth/logout')
      this.$router.replace({ name: 'Login' })
    },
    async fetchUser() {
      try {
        const res = await AuthService.user()
        this.email = res.data.email
      } catch (err) {
        console.log('Error')
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
