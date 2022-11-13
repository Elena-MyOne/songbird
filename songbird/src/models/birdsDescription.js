import { level, birdsWarmUp, birdsPasserines, birdsForest, birdsSongbirds, birdsPredators, birdsSea } from './levels';
import { answersList, playerAnswers, answersText } from './answers';
import { isPlay, startAudio, setTimeDuration, pauseAudio, setVolumeUp, setVolumeDown } from './player';
import { randomNum, getTimeCodeFromNum } from './functions';

const birdImage = document.querySelector('._bird-image');
const birdTitle = document.querySelector('._bird-title');
const birdSubtitle = document.querySelector('._bird-subtitle');
const birdDescription = document.querySelector('._bird-description');
const birdPlay = document.querySelector('._bird-play');
const timeCurrentDuration = document.querySelector('._bird-time-duration');
const timeCurrentBird = document.querySelector('._bird-time-current');
const progressContainerCurrent = document.querySelector('._bird-progress-container');
const progressCurrent = document.querySelector('._bird-progress');
const birdVolumeDown = document.querySelector('._bird-down');
const birdVolumeUp = document.querySelector('._bird-up');
const birdVolumeContainer = document.querySelector('._bird-volume-container');
const birdVolumeProgress = document.querySelector('._bird-volume-progress');

const currentAudio = new Audio();

let currentTimePlay = 0;

let currentBird;
let birdCurrentTrack;
let birdDurationCurrent;

function showBirdInfo(e) {
  playerAnswers.removeAttribute('hidden');
  answersText.setAttribute('hidden', '');

  const target = e.target.closest('.answers__item');

  if (target) {
    let bird = target.textContent;
    bird = bird.trim();

    currentBird = bird;

    showBirdCard(bird);
  }
}

function getBirdObject(currentBird) {
  let bird;

  if (level === 1) {
    birdsWarmUp.forEach((item) => {
      if (currentBird === item.name) {
        return (bird = item);
      }
    });
  }

  if (level === 2) {
    birdsPasserines.forEach((item) => {
      if (currentBird === item.name) {
        return (bird = item);
      }
    });
  }

  if (level === 3) {
    birdsForest.forEach((item) => {
      if (currentBird === item.name) {
        return (bird = item);
      }
    });
  }

  if (level === 4) {
    birdsSongbirds.forEach((item) => {
      if (currentBird === item.name) {
        return (bird = item);
      }
    });
  }

  if (level === 5) {
    birdsPredators.forEach((item) => {
      if (currentBird === item.name) {
        return (bird = item);
      }
    });
  }

  if (level === 6) {
    birdsSea.forEach((item) => {
      if (currentBird === item.name) {
        return (bird = item);
      }
    });
  }

  return bird;
}

function showBirdCard() {
  pauseAudio(currentAudio);

  let item = getBirdObject(currentBird);
  birdCurrentTrack = createBirdTrack(item);
  birdDurationCurrent = createBirdDuration(item);

  createImage(item);
  createTitle(item);
  createSubtitle(item);
  createDescription(item);
  createBirdTrack(item);

  birdPlay.addEventListener('click', playCurrentAudio);
}

function playCurrentAudio() {
  if (isPlay === false) {
    startAudio(currentAudio, birdCurrentTrack);
    setTimeDuration(timeCurrentDuration, birdDurationCurrent);
  } else {
    pauseAudio(currentAudio);
    currentTimePlay = currentAudio.currentTime;
  }
}

function setAudioTimeCurrentBird(e) {
  if (isPlay === true) {
    const currentTime = currentAudio.currentTime;
    const timePast = getTimeCodeFromNum(currentTime);
    return (timeCurrentBird.textContent = `${timePast}`);
  }
}

setInterval(setAudioTimeCurrentBird, 1000);

function updateProgressBarCurrent(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressCurrent.style.width = `${progressPercent}%`;
}

function setProgressBarCurrent(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = currentAudio.duration;

  if (isPlay) {
    currentAudio.currentTime = (clickX / width) * duration;
  }
}

function endAudioCurrent() {
  isPlay = false;
  toggleBirdPlayBtn();
  progressCurrent.style.width = '0%';
  currentAudio.currentTime = 0;
  currentTimePlay = 0;
  timeCurrentBird.textContent = '00:00';
}

function createImage(item) {
  birdImage.removeAttribute('src');
  birdImage.setAttribute('src', item.image);
}

function createTitle(item) {
  birdTitle.textContent = '';
  return (birdTitle.textContent = item.name);
}

function createSubtitle(item) {
  birdSubtitle.textContent = '';
  return (birdSubtitle.textContent = item.species);
}

function createDescription(item) {
  birdDescription.textContent = '';
  return (birdDescription.textContent = item.description);
}

function createBirdTrack(item) {
  return item.audio;
}

function createBirdDuration(item) {
  return item.duration;
}

function toggleBirdPlayBtn() {
  birdPlay.classList.toggle('pause');
}

answersList.addEventListener('click', showBirdInfo);
birdPlay.addEventListener('click', toggleBirdPlayBtn);
currentAudio.addEventListener('timeupdate', updateProgressBarCurrent);
progressContainerCurrent.addEventListener('click', setProgressBarCurrent);
currentAudio.addEventListener('ended', endAudioCurrent);

birdVolumeDown.addEventListener('click', () => {
  setVolumeDown(birdVolumeContainer, birdVolumeProgress, currentAudio);
});

birdVolumeUp.addEventListener('click', () => {
  setVolumeUp(birdVolumeContainer, birdVolumeProgress, currentAudio);
});

export { answersList, playerAnswers };
