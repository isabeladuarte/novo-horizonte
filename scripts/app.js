const menu = document.querySelector('.ti-menu-2');
const links = document.querySelector('.navbar-links');

menu.addEventListener('click', () => {
  links.classList.toggle('active');
});
