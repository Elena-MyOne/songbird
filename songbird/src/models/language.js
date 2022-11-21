import birdsData from './birdsDataEn';
import { headerLinks } from './menu';
import { questionsItem } from './levels';
import { nextLevelBtn } from './nextLevel';

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

const pageGame = [
  {
    scoreText: 'Score:',
    warmingUp: 'Warming up',
    passerines: 'Passerines',
    forest: 'Forest birds',
    songbirds: 'Songbirds',
    predator: 'Predator birds',
    sea: 'Sea birds',
    answersText: `
    <p>Listen to the melody</p>
    <p>and choose a bird from the list</p>
    `,
    nextLevelBtn: 'Next Level',
    raven: 'Raven',
    crane: 'Crane',
    swallows: 'Swallows',
    nightjar: 'Nightjar',
    cuckoo: 'Cuckoo',
    titmouse: 'Titmouse',
  },
  {
    scoreText: 'Счет:',
    warmingUp: 'Разминка',
    passerines: 'Воробьиные',
    forest: 'Лесные птицы',
    songbirds: 'Певчие птицы',
    predator: 'Хищные птицы',
    sea: 'Морские птицы',
    answersText: `
    <p>Послушайте плеер.</p>
    <p>Выберите птицу из списка</p>
    `,
    nextLevelBtn: 'Далее',
    raven: 'Ворон',
    crane: 'Журавль',
    swallows: 'Ласточка',
    nightjar: 'Козодой',
    cuckoo: 'Кукушка',
    titmouse: 'Синица',
  },
];

const results = [
  {
    resultsScore: 'Nothing here yet',
    resultsButton: 'Play',
  },
  {
    resultsScore: 'Здесь пока ничего нет',
    resultsButton: 'Играть',
  },
];

const gallery = [
  {
    description:
      'Raven is a large bird. The body length reaches 70 centimeters, the wingspan is up to one and a half meters. Ravens inhabit the vicinity of the Tower. There is a belief in England that the day the black crows fly away from the Tower, the monarchy will collapse.',
  },
  {
    description:
      'Ворон – крупная птица. Длина тела достигает 70 сантиметров, размах крыльев – до полутора метров. Вороны населяют окрестности Тауэра. В Англии бытует поверье, что в день, когда черные вороны улетят от Тауэра, монархия рухнет.',
  },
];

function translateMenu(index) {
  headerLinks[0].textContent = langMenu[index].home;
  headerLinks[1].textContent = langMenu[index].game;
  headerLinks[2].textContent = langMenu[index].results;
  headerLinks[3].textContent = langMenu[index].gallery;
}

function translateFooter(index) {
  footerDev.textContent = langFooter[index].dev;
}

function translateIndexMain(index) {
  const children = mainColumn.children;
  children[0].textContent = pageMain[index].title;
  children[1].innerHTML = pageMain[index].rules;
  children[2].textContent = pageMain[index].start;
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

function translateScore(index) {
  const scoreText = document.querySelector('.score__text');
  scoreText.textContent = pageGame[index].scoreText;
}

function translateQuestionsItems(index) {
  questionsItem[0].textContent = pageGame[index].warmingUp;
  questionsItem[1].textContent = pageGame[index].passerines;
  questionsItem[2].textContent = pageGame[index].forest;
  questionsItem[3].textContent = pageGame[index].songbirds;
  questionsItem[4].textContent = pageGame[index].predator;
  questionsItem[5].textContent = pageGame[index].sea;
}

function translateAnswersText(index) {
  document.querySelector('.answers__text').innerHTML = pageGame[index].answersText;
}

function translateNextBtn(index) {
  nextLevelBtn.textContent = pageGame[index].nextLevelBtn;
}

function translateAnswersBird(index) {
  let answersBird = document.querySelectorAll('.answers__bird');
  answersBird[0].textContent = pageGame[index].raven;
  answersBird[1].textContent = pageGame[index].crane;
  answersBird[2].textContent = pageGame[index].swallows;
  answersBird[3].textContent = pageGame[index].nightjar;
  answersBird[4].textContent = pageGame[index].cuckoo;
  answersBird[5].textContent = pageGame[index].titmouse;
}

function translateResults(index) {
  document.querySelector('._title-results').textContent = pageGame[index].scoreText;
  document.querySelector('.results__score').textContent = results[index].resultsScore;
  document.querySelector('.results__button').textContent = results[index].resultsButton;
}

function translateGamePage() {
  const lang = localStorage.getItem('userLang');

  if (lang === 'ru') {
    translateMenu(1);
    translateFooter(1);
    translateScore(1);
    translateQuestionsItems(1);
    translateAnswersText(1);
    translateNextBtn(1);
    translateAnswersBird(1);
  } else {
    translateMenu(0);
    translateFooter(0);
    translateScore(0);
    translateQuestionsItems(0);
    translateAnswersText(0);
    translateNextBtn(0);
    translateAnswersBird(0);
  }
}

function translateResultsPage() {
  const lang = localStorage.getItem('userLang');

  if (lang === 'ru') {
    translateMenu(1);
    translateFooter(1);
    translateResults(1);
  } else {
    translateMenu(0);
    translateFooter(0);
    translateResults(0);
  }
}

function translateGallery(index) {
  document.querySelector('.player__title').textContent = pageGame[index].raven;
  document.querySelector('._gallery-description').textContent = gallery[index].description;
}

function translateGalleryPage() {
  const lang = localStorage.getItem('userLang');

  if (lang === 'ru') {
    translateMenu(1);
    translateFooter(1);
    translateGallery(1);
  } else {
    translateMenu(0);
    translateFooter(0);
    translateGallery(0);
  }
}

function resetGame() {
  window.location.reload(); // перезагрузит страницу
}

headerInput.addEventListener('change', setLangStorage);
window.addEventListener('load', setLangCheckbox);

if (headerLinks[0].classList.contains('_active-link')) {
  headerInput.addEventListener('change', translateIndexPage);
  window.addEventListener('load', translateIndexPage);
}

if (headerLinks[1].classList.contains('_active-link')) {
  headerInput.addEventListener('change', translateGamePage);
  headerInput.addEventListener('change', resetGame);
  window.addEventListener('load', translateGamePage);
}

if (headerLinks[2].classList.contains('_active-link')) {
  headerInput.addEventListener('change', translateResultsPage);
  window.addEventListener('load', translateResultsPage);
}

if (headerLinks[3].classList.contains('_active-link')) {
  headerInput.addEventListener('change', translateGalleryPage);
  headerInput.addEventListener('change', resetGame);
  window.addEventListener('load', translateGalleryPage);
}

export default headerInput;
