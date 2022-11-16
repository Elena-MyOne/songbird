import { randomNum, getTimeCodeFromNum } from './functions';
import { level, getGameLevel, resetGameLevel, createBirdsList } from './levels';
import { resetTopImage, resetTopPlayerBirdName, hideBirdInfo, resetTargetMark, updateQuestionItems, resetAnswersMark, resetQuestionItems } from './answers';
import { randomBird, resetRandomBird } from './player';

const nextLevelBtn = document.querySelector('.next__button');
const questionsItems = document.querySelectorAll('.questions__item');

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

//в этой функции должен быть вопрос и создание нового списка птиц для игры
function showResults() {
  if (getGameLevel() === 6) {
    setDisabledButton(nextLevelBtn);
    resetTopImage();
    resetTopPlayerBirdName();
    hideBirdInfo();
    resetTargetMark();
    resetAnswersMark();

    resetGameLevel();
    resetQuestionItems();

    console.log('Results:');
  }
}

function goNextLevel() {
  if (nextLevelBtn.classList.contains('button')) {
    if (getGameLevel() === 6) {
      showResults();
      // window.location.reload();// перезагрузит страницу
    } else {
      setNextLevel(getGameLevel());
    }
  }
  console.log(getGameLevel());
}

nextLevelBtn.addEventListener('click', goNextLevel);

export { level, nextLevelBtn, setActiveButton, setDisabledButton };
