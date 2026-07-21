const menu = document.querySelector('.ti-menu-2');
const links = document.querySelector('.navbar-links');

menu.addEventListener('click', () => {
  links.classList.toggle('active');
});


// // Adicionando ação ao botão para formulário
document.getElementById('app-btn-primary').addEventListener('click', function(event) {
  event.preventDefault();
  window.location.href = './pages/form.html';
});