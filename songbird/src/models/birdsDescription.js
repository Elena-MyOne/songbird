import { headerLinks } from './menu';
import {
  getGameLevel,
  birdsWarmUp,
  birdsPasserines,
  birdsForest,
  birdsSongbirds,
  birdsPredators,
  birdsSea,
} from './levels';
import { answersList, playerAnswers, answersText } from './answers';
import {
  isPlay,
  audio,
  startAudio,
  setTimeDuration,
  pauseAudio,
  setVolumeUp,
  setVolumeDown,
} from './player';
import { randomNum, getTimeCodeFromNum } from './functions';
import headerInput from './language';

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

  const target = e.target.closest('.answers__bird');

  if (target) {
    let bird = target.textContent;
    bird = bird.trim();

    currentBird = bird;

    showBirdCard(bird);
  }
}

function getBirdObject(currentBird) {
  const lang = localStorage.getItem('userLang');

  let bird;

  if (getGameLevel() === 1) {
    birdsWarmUp.forEach((item) => {
      if (lang === 'ru') {
        if (currentBird === item.nameRu) {
          return (bird = item);
        }
      } else {
        if (currentBird === item.name) {
          return (bird = item);
        }
      }
    });
  }

  if (getGameLevel() === 2) {
    birdsPasserines.forEach((item) => {
      if (lang === 'ru') {
        if (currentBird === item.nameRu) {
          return (bird = item);
        }
      } else {
        if (currentBird === item.name) {
          return (bird = item);
        }
      }
    });
  }

  if (getGameLevel() === 3) {
    birdsForest.forEach((item) => {
      if (lang === 'ru') {
        if (currentBird === item.nameRu) {
          return (bird = item);
        }
      } else {
        if (currentBird === item.name) {
          return (bird = item);
        }
      }
    });
  }

  if (getGameLevel() === 4) {
    birdsSongbirds.forEach((item) => {
      if (lang === 'ru') {
        if (currentBird === item.nameRu) {
          return (bird = item);
        }
      } else {
        if (currentBird === item.name) {
          return (bird = item);
        }
      }
    });
  }

  if (getGameLevel() === 5) {
    birdsPredators.forEach((item) => {
      if (lang === 'ru') {
        if (currentBird === item.nameRu) {
          return (bird = item);
        }
      } else {
        if (currentBird === item.name) {
          return (bird = item);
        }
      }
    });
  }

  if (getGameLevel() === 6) {
    birdsSea.forEach((item) => {
      if (lang === 'ru') {
        if (currentBird === item.nameRu) {
          return (bird = item);
        }
      } else {
        if (currentBird === item.name) {
          return (bird = item);
        }
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
  const lang = localStorage.getItem('userLang');

  birdTitle.textContent = '';

  if (lang === 'ru') {
    return (birdTitle.textContent = item.nameRu);
  } else {
    return (birdTitle.textContent = item.name);
  }
}

function createSubtitle(item) {
  birdSubtitle.textContent = '';
  return (birdSubtitle.textContent = item.species);
}

function createDescription(item) {
  const lang = localStorage.getItem('userLang');

  birdDescription.textContent = '';
  if (lang === 'ru') {
    return (birdDescription.textContent = item.descriptionRu);
  } else {
    return (birdDescription.textContent = item.description);
  }
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

if (headerLinks[1].classList.contains('_active-link')) {
  setInterval(setAudioTimeCurrentBird, 1000);

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
}

export {
  answersList,
  playerAnswers,
  currentAudio,
  toggleBirdPlayBtn,
  birdPlay,
  timeCurrentDuration,
  currentTimePlay,
  endAudioCurrent,
};
