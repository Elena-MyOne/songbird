const headerBurger = document.querySelector('.header__burger');
const headerMenu = document.querySelector('.header__menu');
const headerLogo = document.querySelector('.header__logo');
const headerLinks = document.querySelectorAll('.header__link');
const headerList = document.querySelector('.header__list');

headerBurger.addEventListener('click', toggleActive);
headerLogo.addEventListener('click', toggleActive);

function toggleActive() {
  headerBurger.classList.toggle('active');
  headerMenu.classList.toggle('active');
  document.body.classList.toggle('lock');
  headerLinks[0].classList.remove('_active-link');
}

headerList.addEventListener('click', function (event) {
  if (event.target.closest('.header__link')) {
    headerBurger.classList.remove('active');
    headerMenu.classList.remove('active');
    document.body.classList.remove('lock');
    headerLinks[0].classList.add('_active-link');
  }
});

export { headerBurger, headerLinks };
