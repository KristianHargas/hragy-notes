<template>
  <div>
    <DashboardTitle :supportNavigateBack="true">View checklist</DashboardTitle>

    <!-- Edit checklist button. -->
    <div class="mb-4">
      <router-link
        :to="{ name: 'ChecklistShow', params: { id: $route.params.id } }"
        class="inline-flex flex-row"
      >
        <img
          class="mr-1 cursor-pointer"
          src="../../../../static/img/create-white.svg"
          alt="Edit icon."
        />
        <span
          class="text-gray-700 font-semibold text-base uppercase tracking-wide no-select"
          >Edit checklist</span
        ></router-link
      >
    </div>

    <!-- Checklist. -->
    <div
      v-if="checklist"
      class="max-w-xl p-6 rounded-lg"
      :class="[checklist.color]"
    >
      <h3 class="text-white text-2xl font-semibold tracking-wide">
        {{ checklist.title }}
      </h3>

      <!-- Items. -->
      <ul class="mt-1 divide-y divide-white">
        <li
          v-for="item in checklist.items"
          :key="item.id"
          class="flex items-center py-3"
        >
          <div class="w-6 h-6">
            <img
              v-if="item.checked"
              class="h-6 w-6"
              src="../../../../static/img/check_box-white.svg"
              alt="Checked checkbox icon."
            />
            <img
              v-else
              class="h-6 w-6"
              src="../../../../static/img/check_box_outline_blank-white.svg"
              alt="Unchecked checkbox icon."
            />
          </div>
          <span
            class="w-0 flex-grow overflow-hidden text-xl font-light text-white ml-2"
          >
            {{ item.text }}
          </span>
        </li>
      </ul>

      <div
        v-if="checklist.categories.length"
        class="flex flex-row flex-wrap mt-1 -ml-1"
      >
        <div
          v-for="category in checklist.categories"
          :key="category.id"
          class="px-4 py-1 m-1 rounded-full text-sm font-medium text-white border-2 border-white no-select"
        >
          {{ $store.getters['category/getCategoryById'](category.id).title }}
        </div>
      </div>

      <div class="mt-4 flex justify-between text-base font-light text-white">
        <span class="uppercase">Created at:</span
        ><span>{{ formatDate(checklist.created_at) }}</span>
      </div>

      <div class="mt-2 flex justify-between text-base font-light text-white">
        <span class="uppercase">Updated at:</span
        ><span>{{ formatDate(checklist.updated_at) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import DashboardTitle from '../DashboardTitle'
import { formatDate } from '../../../shared/utils/util'

export default {
  components: {
    DashboardTitle
  },
  computed: {
    checklist() {
      return this.$store.getters['checklist/getChecklistById'](
        this.$route.params.id
      )
    }
  },
  mounted() {
    if (!this.checklist) {
      this.$router.replace({ name: 'ChecklistList' })
    }
  },
  methods: {
    formatDate(dateString) {
      return formatDate(dateString)
    }
  }
}
</script>

<style lang="scss" scoped></style>
