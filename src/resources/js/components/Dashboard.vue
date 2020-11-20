<template>
  <div>Dashboard</div>
  <div>Hello, {{ user.name }}!</div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const Auth = createNamespacedHelpers('auth')

export default {
  computed: {
    ...Auth.mapState(['user'])
  }
}
</script>

<style lang="scss" scoped></style>
