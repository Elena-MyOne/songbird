import { randomBird, audio, pauseAudio, endAudio } from './player';

const answersList = document.querySelector('.answers__list');
const playerAnswers = document.querySelector('.player-answers');
const answersText = document.querySelector('.answers__text');
const topPlayerImage = document.querySelector('.image__img');
const topPlayerBirdName = document.querySelector('.player__title');

let rightAnswer = randomBird[0].name;
let rightAnswerImage = randomBird[0].image;

const rightAnswerAudio = new Audio('../assets/audio/right.mp3');
const wrongAnswerAudio = new Audio('../assets/audio/wrong.mp3');

function setAnswersMark(e) {
  const targetItem = e.target.closest('.answers__item');
  const targetMark = targetItem.firstElementChild;

  if (targetItem) {
    let choseAnswer = targetItem.textContent;
    choseAnswer = choseAnswer.trim();

    if (choseAnswer !== rightAnswer) {
      targetMark.style.backgroundColor = '#d43434';
      wrongAnswerAudio.play();
    } else {
      targetMark.style.backgroundColor = '#00a980';

      pauseAudio(audio);
      endAudio();

      rightAnswerAudio.play();

      showTopImage();
      showTopPlayerBirdName();

      answersList.removeEventListener('click', setAnswersMark);
    }
  }
}

function showTopImage() {
  topPlayerImage.removeAttribute('src');
  topPlayerImage.setAttribute('src', rightAnswerImage);
}

function showTopPlayerBirdName() {
  topPlayerBirdName.textContent = '';
  topPlayerBirdName.textContent = rightAnswer.trim();
}

answersList.addEventListener('click', setAnswersMark);

export { answersList, playerAnswers, answersText };
