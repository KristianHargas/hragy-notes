let isMobileMenuOpen = false

const mobileMenu = document.getElementById('mobile_menu')
const hamburgerBtn = document.getElementById('hamburger_btn')
const hamburgerIcon = document.getElementById('hamburger_icon')
const closeMenuIcon = document.getElementById('close_menu_icon')

hamburgerBtn.addEventListener('click', function () {
  isMobileMenuOpen = !isMobileMenuOpen
  mobileMenu.classList.toggle('hidden')
  hamburgerBtn.classList.toggle('open')

  hamburgerIcon.classList.toggle('hidden')
  closeMenuIcon.classList.toggle('hidden')
})

