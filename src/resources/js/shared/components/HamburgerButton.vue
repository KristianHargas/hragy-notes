<template>
  <div>
    <div
      :class="{ open: open }"
      @click="$emit('toggle')"
      id="hamburger_btn"
      class="menu-btn-wrapper focus:outline-none no-select"
    >
      <div class="menu-btn"></div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['toggle'],
  props: {
    open: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
/* Hamburger button to close button transition */
/* https://github.com/codeSTACKr/hamburger-animation/blob/master/style.css */
.menu-btn-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
}

.menu-btn {
  width: 2.5rem;
  height: 0.3rem;
  border-radius: 0.5rem;
  background-color: #2d3748;
  transition: all 0.2s ease-in-out;
}

.menu-btn::before,
.menu-btn::after {
  content: '';
  position: absolute;
  width: 2.5rem;
  height: 0.3rem;
  background-color: #2d3748;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
}

.menu-btn::before {
  transform: translateY(-0.7rem);
}

.menu-btn::after {
  transform: translateY(0.7rem);
}

.menu-btn-wrapper.open .menu-btn {
  transform: translateX(-1.76rem);
  background-color: transparent;
}

.menu-btn-wrapper.open .menu-btn::before {
  transform: rotate(45deg) translate(1.25rem, -1.25rem);
}

.menu-btn-wrapper.open .menu-btn::after {
  transform: rotate(-45deg) translate(1.25rem, 1.25rem);
}
</style>
