import birdsData from './birdsDataEn';
import birdsDataRu from './birdsDataRu';
import { randomNum } from './functions';

const questionsItem = Array.from(document.querySelectorAll('.questions__item'));

let level = 1;

const birdsWarmUp = birdsData[0];
const birdsPasserines = birdsData[1];
const birdsForest = birdsData[2];
const birdsSongbirds = birdsData[3];
const birdsPredators = birdsData[4];
const birdsSea = birdsData[5];

function getGameLevel() {
  let level;

  if (questionsItem[0].classList.contains('_active')) level = 1;
  if (questionsItem[1].classList.contains('_active')) level = 2;
  if (questionsItem[2].classList.contains('_active')) level = 3;
  if (questionsItem[3].classList.contains('_active')) level = 4;
  if (questionsItem[4].classList.contains('_active')) level = 5;
  if (questionsItem[5].classList.contains('_active')) level = 6;

  return level;
}

function resetGameLevel() {
  questionsItem[5].classList.remove('_active');
  questionsItem[0].classList.add('_active');

  let level = 1;
  return level;
}

function createBirdsList() {
  let birds = birdsData.map((item) => {
    let random = randomNum(6);
    return item.filter((elem) => {
      if (elem.id === random) {
        return elem;
      }
    });
  });

  return birds.flat();
}

export { level, getGameLevel, resetGameLevel, createBirdsList, birdsWarmUp, birdsPasserines, birdsForest, birdsSongbirds, birdsPredators, birdsSea };
