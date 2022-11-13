import birdsData from './birdsDataEn';
import birdsDataRu from './birdsDataRu';
import { randomNum } from './functions';

const questionsItem = document.querySelectorAll('.questions__item');

const birdsWarmUp = birdsData[0];
const birdsPasserines = birdsData[1];
const birdsForest = birdsData[2];
const birdsSongbirds = birdsData[3];
const birdsPredators = birdsData[4];
const birdsSea = birdsData[5];

let level = 1;
getGameLevel();

function getGameLevel() {
  if (questionsItem[0].classList.contains('_active')) level = 1;
  if (questionsItem[1].classList.contains('_active')) level = 2;
  if (questionsItem[2].classList.contains('_active')) level = 3;
  if (questionsItem[3].classList.contains('_active')) level = 4;
  if (questionsItem[4].classList.contains('_active')) level = 5;
  if (questionsItem[5].classList.contains('_active')) level = 6;

  return level;
}

console.log(birdsWarmUp);
// console.log(birdsPasserines);
// console.log(birdsForest);
// console.log(birdsSongbirds);
// console.log(birdsPredators);
// console.log(birdsSea);

export { level, birdsWarmUp, birdsPasserines, birdsForest, birdsSongbirds, birdsPredators, birdsSea };
