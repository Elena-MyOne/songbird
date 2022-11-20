import { headerLinks } from './menu';

const headerInput = document.querySelector('.header__input');
const footerDev = document.querySelector('.footer__dev');
const mainColumn = document.querySelector('.main__column');

function setLangStorage(e) {
  if (e.target.checked) {
    localStorage.setItem('userLang', 'ru');
  } else {
    localStorage.setItem('userLang', 'en');
  }
}

function setLangCheckbox() {
  const lang = localStorage.getItem('userLang');
  if (lang === 'ru') {
    headerInput.checked = true;
  } else {
    headerInput.checked = false;
  }
}

const langMenu = [
  {
    home: 'Home',
    game: 'Play now',
    results: 'Results',
    gallery: 'Gallery',
  },
  {
    home: 'Главная',
    game: 'Играть',
    results: 'Результаты',
    gallery: 'Галерея',
  },
];

const langFooter = [{ dev: 'Developed by elena-myone' }, { dev: 'Созданно elena-myone' }];

const pageMain = [
  {
    title: 'Game Songbird',
    rules: `
    <p>Welcome to the game Songbird where you should guess a bird by its sound.</p>
    <p>Rules are pretty easy:</p>
    <p>Each time you guess right from the first try you get 5 points. If the first guess is wrong every next try will cost you 1 point. So if the right try is only 6th you get 0 points.  </p>
    <p>All points will be added up.</p>
    <p>Good luck!</p>
    `,
    start: 'Start',
  },
  {
    title: 'Игра Songbird',
    rules: `
    <p>Добро пожаловать в игру Songbird, вам предстоит угадать птицу ее по звучанию.</p>
    <p>Правила довольно просты:</p>
    <p>Каждый раз, когда вы угадываете с первой попытки, вы получаете 5 очков. Если первое предположение неверно, каждая следующая попытка будет стоить вам 1 очко. Таким образом, если правильная попытка только 6-я, вы получаете 0 баллов.</p>
    <p>Все баллы будут суммироваться.</p>
    <p>Удачи!</p>
    `,
    start: 'Начать',
  },
];

function translateMenu(index) {
  headerLinks[0].textContent = langMenu[index].home;
  headerLinks[1].textContent = langMenu[index].game;
  headerLinks[2].textContent = langMenu[index].results;
  headerLinks[3].textContent = langMenu[index].gallery;
}

function translateIndexMain(index) {
  const children = mainColumn.children;
  children[0].textContent = pageMain[index].title;
  children[1].innerHTML = pageMain[index].rules;
  children[2].textContent = pageMain[index].start;
}

function translateFooter(index) {
  footerDev.textContent = langFooter[index].dev;
}

function translateIndexPage() {
  const lang = localStorage.getItem('userLang');
  if (lang === 'ru') {
    translateMenu(1);
    translateFooter(1);
    translateIndexMain(1);
  } else {
    translateMenu(0);
    translateFooter(0);
    translateIndexMain(0);
  }
}

function translateGamePage() {
  const lang = localStorage.getItem('userLang');

  if (lang === 'ru') {
    translateMenu(1);
  } else {
    translateMenu(0);
  }
}

headerInput.addEventListener('change', setLangStorage);
window.addEventListener('load', setLangCheckbox);

if (headerLinks[0].classList.contains('_active-link')) {
  headerInput.addEventListener('change', translateIndexPage);
  window.addEventListener('load', translateIndexPage);
}

if (headerLinks[1].classList.contains('_active-link')) {
  headerInput.addEventListener('change', translateGamePage);
  window.addEventListener('load', translateGamePage);
}

export default headerInput;
