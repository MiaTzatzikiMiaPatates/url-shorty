const menuToggle = document.querySelector('#menu-toggle') as HTMLElement;
const navbarList = document.querySelector('#navbar-list') as HTMLElement;

menuToggle.addEventListener('click', () => {
    navbarList.classList.toggle('show');
});