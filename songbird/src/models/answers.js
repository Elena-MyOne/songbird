import birdsData from './birdsDataEn';
import { headerLinks } from './menu';
import { getGameLevel } from './levels';
import { randomBird, audio, pauseAudio, endAudio, setPlayBtn } from './player';
import { level, nextLevelBtn, setActiveButton, setDisabledButton, updateNextButton, setWrongAnswers, countWrongAnswers } from './nextLevel';

const answersList = document.querySelector('.answers__list');
const playerAnswers = document.querySelector('.player-answers');
const answersText = document.querySelector('.answers__text');
const topPlayerImage = document.querySelector('.image__img');
const topPlayerBirdName = document.querySelector('.player__title');

function hideBirdInfo() {
  answersText.removeAttribute('hidden');
  playerAnswers.setAttribute('hidden', '');
}

function getRightAnswer() {
  return randomBird[getGameLevel() - 1].name;
}

function getRightAnswerImage() {
  return randomBird[getGameLevel() - 1].image;
}

const rightAnswerAudio = new Audio('../assets/audio/right.mp3');
const wrongAnswerAudio = new Audio('../assets/audio/wrong.mp3');

function setAnswersMark(e) {
  const targetItem = e.target.closest('.answers__item');
  const targetMark = targetItem.firstElementChild;

  if (targetItem) {
    let choseAnswer = targetItem.textContent;
    choseAnswer = choseAnswer.trim();

    if (choseAnswer !== getRightAnswer()) {
      targetMark.style.backgroundColor = '#d43434';
      wrongAnswerAudio.play();
      setWrongAnswers(targetMark);
    } else {
      updateNextButton();

      targetMark.style.backgroundColor = '#00a980';

      pauseAudio(audio);
      endAudio();
      setPlayBtn();

      rightAnswerAudio.play();

      showTopImage();
      showTopPlayerBirdName();

      setActiveButton(nextLevelBtn);
      countWrongAnswers();

      answersList.removeEventListener('click', setAnswersMark);
    }
  }
}

function resetAnswersMark() {
  answersList.addEventListener('click', setAnswersMark);
}

function showTopImage() {
  topPlayerImage.removeAttribute('src');
  topPlayerImage.setAttribute('src', getRightAnswerImage());
}

function showTopPlayerBirdName() {
  let rightAnswer = getRightAnswer();
  topPlayerBirdName.textContent = '';
  topPlayerBirdName.textContent = rightAnswer.trim();
}

function resetTopImage() {
  topPlayerImage.removeAttribute('src');
  topPlayerImage.setAttribute('src', './assets/images/shadow_bird.png');
}

function resetTopPlayerBirdName() {
  topPlayerBirdName.textContent = '';
  topPlayerBirdName.textContent = '******';
}

function resetTargetMark() {
  const marks = document.querySelectorAll('.answers__mark');
  marks.forEach((item) => {
    item.style.backgroundColor = 'rgba(63, 63, 63, 0.75)';
    item.classList.remove('_wrong-answer');
  });
}

function updateQuestionItems() {
  const targetItems = Array.from(document.querySelectorAll('.answers__bird'));

  for (let i = 0; i < targetItems.length; i++) {
    targetItems[i].textContent = birdsData[getGameLevel() - 1][i].name;
  }
}

function resetQuestionItems() {
  const targetItems = Array.from(document.querySelectorAll('.answers__bird'));

  for (let i = 0; i < targetItems.length; i++) {
    targetItems[i].textContent = birdsData[0][i].name;
  }
}

if (headerLinks[1].classList.contains('_active-link')) {
  answersList.addEventListener('click', setAnswersMark);
}

export { answersList, playerAnswers, answersText, resetTopImage, resetTopPlayerBirdName, hideBirdInfo, resetTargetMark, updateQuestionItems, resetAnswersMark, resetQuestionItems };
