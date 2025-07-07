const menuToggle = document.querySelector('#menu-toggle');
const navbarList = document.querySelector('#navbar-list');

menuToggle.addEventListener('click', () => {
    navbarList.classList.toggle('show');
});