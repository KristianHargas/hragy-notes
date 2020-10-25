let isMobileMenuOpen = false

const mobileMenu = document.getElementById('nav_menu')
const hamburgerBtn = document.getElementById('hamburger_btn')

hamburgerBtn.addEventListener('click', function () {
  isMobileMenuOpen = !isMobileMenuOpen
  mobileMenu.classList.toggle('hidden')
  hamburgerBtn.classList.toggle('open')
})

