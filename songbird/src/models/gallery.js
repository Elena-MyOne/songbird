import birdsData from './birdsDataEn';
import { headerLinks } from './menu';
import {
  isPlay,
  audio,
  startAudio,
  setTimeDuration,
  pauseAudio,
  setVolumeUp,
  setVolumeDown,
} from './player';
import { toggleBirdPlayBtn, birdPlay, timeCurrentDuration } from './birdsDescription';
import { getTimeCodeFromNum } from './functions';

const galleryPrevBtn = document.querySelector('.page-gallery__prev');
const galleryNextBtn = document.querySelector('.page-gallery__next');
const galleryImage = document.querySelector('._gallery-image');
const galleryTitle = document.querySelector('._gallery-title');
const gallerySubtitle = document.querySelector('._gallery-subtitle');
const galleryDescription = document.querySelector('._gallery-description');
const galleryTimeCurrent = document.querySelector('._gallery-time-current');
const progressGallery = document.querySelector('._gallery-progress');
const progressContainerGallery = document.querySelector('._gallery-progress-container');
const galleryVolumeDown = document.querySelector('._gallery-down');
const galleryVolumeUp = document.querySelector('._gallery-up');
const galleryVolumeContainer = document.querySelector('._gallery-volume-container');
const galleryVolumeProgress = document.querySelector('._gallery-volume-progress');

let currentTimePlay = 0;
const galleryAudio = new Audio();

const galleryImages = getGalleryImages();
const galleryTitles = getGalleryTitles();
const gallerySubtitles = getGallerySubtitles();
const galleryDescriptions = getGalleryDescriptions();
const galleryAudios = getGalleryAudios();
const galleryDurations = getGalleryDuration();

let counter = 0;

let galleryCurrentAudio;
let galleryDuration;

function getGalleryImages() {
  const result = [];
  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
      result.push(birdsData[i][j].image);
    }
  }
  return result;
}

function getGalleryTitles() {
  const lang = localStorage.getItem('userLang');

  const result = [];
  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
      if (lang === 'ru') {
        result.push(birdsData[i][j].nameRu);
      } else {
        result.push(birdsData[i][j].name);
      }
    }
  }
  return result;
}

function getGallerySubtitles() {
  const result = [];
  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
      result.push(birdsData[i][j].species);
    }
  }
  return result;
}

function getGalleryDescriptions() {
  const lang = localStorage.getItem('userLang');

  const result = [];
  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
      if (lang === 'ru') {
        result.push(birdsData[i][j].descriptionRu);
      } else {
        result.push(birdsData[i][j].description);
      }
    }
  }
  return result;
}

function getGalleryAudios() {
  const result = [];
  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
      result.push(birdsData[i][j].audio);
    }
  }
  return result;
}

function getGalleryDuration() {
  const result = [];
  for (let i = 0; i < birdsData.length; i++) {
    for (let j = 0; j < birdsData[i].length; j++) {
      result.push(birdsData[i][j].duration);
    }
  }
  return result;
}

function setGalleryAudio(counter) {
  pauseAudio(galleryAudio);

  galleryCurrentAudio = galleryAudios[counter + 1];
  galleryDuration = galleryDurations[counter + 1];

  birdPlay.addEventListener('click', playGalleryAudio);
}

function playGalleryAudio() {
  if (isPlay === false) {
    startAudio(galleryAudio, galleryCurrentAudio);
    setTimeDuration(timeCurrentDuration, galleryDuration);
  } else {
    pauseAudio(galleryAudio);
    currentTimePlay = galleryAudio.currentTime;
  }
}

function setAudioTimeCurrentGallery(e) {
  if (isPlay === true) {
    const currentTime = galleryAudio.currentTime;
    const timePast = getTimeCodeFromNum(currentTime);
    return (galleryTimeCurrent.textContent = `${timePast}`);
  }
}

function updateProgressBarGallery(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progressGallery.style.width = `${progressPercent}%`;
}

function setProgressBarGallery(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = galleryAudio.duration;

  if (isPlay) {
    galleryAudio.currentTime = (clickX / width) * duration;
  }
}

function endAudioGallery() {
  toggleBirdPlayBtn();
  progressGallery.style.width = '0%';
  galleryAudio.currentTime = 0;
  currentTimePlay = 0;
  galleryTimeCurrent.textContent = '00:00';
}

function switchItemNext() {
  if (counter === galleryImages.length - 1) {
    counter = -1;
  }

  galleryImage.removeAttribute('src');
  galleryImage.setAttribute('src', galleryImages[counter + 1]);

  galleryTitle.textContent = galleryTitles[counter + 1];
  gallerySubtitle.textContent = gallerySubtitles[counter + 1];
  galleryDescription.textContent = galleryDescriptions[counter + 1];

  setGalleryAudio(counter);

  ++counter;
}

function switchItemPrev() {
  if (counter === 0) counter = galleryImages.length;

  galleryImage.removeAttribute('src');
  galleryImage.setAttribute('src', galleryImages[counter - 1]);

  galleryTitle.textContent = galleryTitles[counter - 1];
  gallerySubtitle.textContent = gallerySubtitles[counter - 1];
  galleryDescription.textContent = galleryDescriptions[counter - 1];

  setGalleryAudio(counter);

  --counter;
}

if (headerLinks[3].classList.contains('_active-link')) {
  if (galleryTitle.textContent === 'Raven') {
    setGalleryAudio(-1);
  }

  setInterval(setAudioTimeCurrentGallery, 1000);

  galleryAudio.addEventListener('timeupdate', updateProgressBarGallery);
  galleryAudio.addEventListener('ended', endAudioGallery);
  progressContainerGallery.addEventListener('click', setProgressBarGallery);

  galleryNextBtn.addEventListener('click', switchItemNext);
  galleryPrevBtn.addEventListener('click', switchItemPrev);

  birdPlay.addEventListener('click', toggleBirdPlayBtn);

  galleryVolumeDown.addEventListener('click', () => {
    setVolumeDown(galleryVolumeContainer, galleryVolumeProgress, galleryAudio);
  });

  galleryVolumeUp.addEventListener('click', () => {
    setVolumeUp(galleryVolumeContainer, galleryVolumeProgress, galleryAudio);
  });
}

export { galleryPrevBtn, galleryNextBtn };
