import { randomNum, getTimeCodeFromNum } from './functions';
import { headerLinks } from './menu';
import { level, getGameLevel, resetGameLevel, createBirdsList } from './levels';
import {
  resetTopImage,
  resetTopPlayerBirdName,
  hideBirdInfo,
  resetTargetMark,
  updateQuestionItems,
  resetAnswersMark,
  resetQuestionItems,
} from './answers';
import { randomBird, resetRandomBird, endAudio, pauseAudio, audio } from './player';
import { currentAudio } from './birdsDescription';

const nextLevelBtn = document.querySelector('.next__button');
const questionsItems = document.querySelectorAll('.questions__item');

let score = 0;

function setActiveButton(btn) {
  btn.classList.remove('button-disabled');
  btn.classList.add('button');
}

function setDisabledButton(btn) {
  btn.classList.add('button-disabled');
  btn.classList.remove('button');
}

function setNextLevel() {
  let lev = getGameLevel();

  questionsItems[lev - 1].classList.remove('_active');
  questionsItems[lev].classList.add('_active');

  setDisabledButton(nextLevelBtn);
  resetTopImage();
  resetTopPlayerBirdName();
  hideBirdInfo();
  resetTargetMark();
  updateQuestionItems();

  resetAnswersMark();
}

function resetGame() {
  if (getGameLevel() === 6) {
    window.location.reload(); // перезагрузит страницу
  }
}

function goNextLevel() {
  if (nextLevelBtn.classList.contains('button')) {
    scoreItem.textContent = `${score}`;
    pauseAudio(audio);
    pauseAudio(currentAudio);

    if (getGameLevel() === 6) {
      updateNextButton();
    } else {
      setNextLevel(getGameLevel());
    }
  }

  setScoreStorage();
}

function updateNextButton() {
  const lang = localStorage.getItem('userLang');

  if (getGameLevel() === 6) {
    const resultsBtn = document.createElement('a');
    resultsBtn.setAttribute('href', './results.html');
    if (lang === 'ru') {
      resultsBtn.textContent = 'Результат';
    } else {
      resultsBtn.textContent = 'Results';
    }
    nextLevelBtn.textContent = '';
    nextLevelBtn.append(resultsBtn);
  }
}

const answersMarks = Array.from(document.querySelectorAll('.answers__mark'));
const scoreItem = document.querySelector('.score__score');
const titleScore = document.querySelector('._title-score');

function countWrongAnswers() {
  let count = 5;
  answersMarks.forEach((item) => {
    if (item.classList.contains('_wrong-answer')) {
      if (count > 0) {
        count--;
      }
    }
  });
  score += count;

  console.log('score: ' + score);
}

function setWrongAnswers(item) {
  item.classList.add('_wrong-answer');
}

function setScoreStorage() {
  localStorage.setItem('userScore', score);
}

function showScore() {
  let userResult = localStorage.getItem('userScore');
  const lang = localStorage.getItem('userLang');

  userResult ? (titleScore.textContent = userResult) : '0';

  const resultsScore = document.querySelector('.results__score');
  if (userResult === '30') {
    if (lang === 'ru') {
      resultsScore.textContent = 'Поздравляю, вы выиграли!';
    } else {
      resultsScore.textContent = 'Congrats, you won!';
    }
    setPlayBtn();
  } else if (+userResult > 0) {
    if (lang === 'ru') {
      resultsScore.textContent =
        'Максимальное количество очков — 30. Хотели бы вы сыграть еще раз?';
    } else {
      resultsScore.textContent = 'The maximum score is 30, would you like to play again?';
    }
    resetPlayBtn();
  } else {
    if (lang === 'ru') {
      resultsScore.textContent = 'Здесь пока ничего нет';
    } else {
      resultsScore.textContent = 'Nothing here yet';
    }
    resetPlayBtn();
  }
}

function resetPlayBtn() {
  const lang = localStorage.getItem('userLang');
  const resultsButtonLink = document.querySelector('.results__button-link');
  resultsButtonLink.removeAttribute('href');
  resultsButtonLink.setAttribute('href', './game.html');
  if (lang === 'ru') {
    resultsButtonLink.textContent = 'Играть';
  } else {
    resultsButtonLink.textContent = 'Play';
  }
}

function setPlayBtn() {
  const lang = localStorage.getItem('userLang');
  const resultsButtonLink = document.querySelector('.results__button-link');
  resultsButtonLink.removeAttribute('href');
  resultsButtonLink.setAttribute('href', './index.html');
  if (lang === 'ru') {
    resultsButtonLink.textContent = 'Главная';
  } else {
    resultsButtonLink.textContent = 'Home page';
  }
}

if (headerLinks[1].classList.contains('_active-link')) {
  nextLevelBtn.addEventListener('click', goNextLevel);
}

if (headerLinks[2].classList.contains('_active-link')) {
  window.addEventListener('load', showScore);
}

export {
  level,
  nextLevelBtn,
  setActiveButton,
  setDisabledButton,
  updateNextButton,
  setWrongAnswers,
  showScore,
  countWrongAnswers,
};
