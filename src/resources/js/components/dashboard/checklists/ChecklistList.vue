<template>
  <div>
    <DashboardTitle>Your checklists</DashboardTitle>

    <FloatingActionButton :navigateTo="{ name: 'ChecklistCreate' }">
      <img
        class="h-8"
        src="../../../../static/img/add-white.svg"
        alt="Add checklist icon."
      />
    </FloatingActionButton>
  </div>
</template>

<script>
import DashboardTitle from '../DashboardTitle'

export default {
  components: {
    DashboardTitle
  }
}
</script>

<style lang="scss" scoped></style>
