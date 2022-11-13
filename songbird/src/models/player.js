import birdsData from './birdsDataEn';
import { level, birdsWarmUp, birdsPasserines, birdsForest, birdsSongbirds, birdsPredators, birdsSea } from './levels';
import { randomNum, getTimeCodeFromNum } from './functions';

const playButton = document.querySelector('.audio-player__play');
const timeDuration = document.querySelector('.audio-player__time-duration');
const timeCurrent = document.querySelector('.audio-player__time-current');
const progressContainer = document.querySelector('.audio-player__progress-container');
const progress = document.querySelector('.audio-player__progress');
const volumeContainer = document.querySelector('.volume__cotainer');
const volumeProgress = document.querySelector('.volume__progress');
const volumeDown = document.querySelector('.volume__down');
const volumeUp = document.querySelector('.volume__up');

let isPlay = false;
let currentTimePlay = 0;

const audio = new Audio();

let randomBird = chooseBird();

let birdTrack = randomBird[0].audio;
let birdDuration = randomBird[0].duration;
console.log(randomBird);

function chooseBird() {
  let random = randomNum(6);
  let gameLevel;

  if (level === 1) gameLevel = birdsWarmUp;
  if (level === 2) gameLevel = birdsPasserines;
  if (level === 3) gameLevel = birdsForest;
  if (level === 4) gameLevel = birdsSongbirds;
  if (level === 5) gameLevel = birdsPredators;
  if (level === 6) gameLevel = birdsSea;

  return gameLevel.filter((item) => {
    if (item.id === random) {
      return item;
    }
  });
}

function startAudio(audio, birdTrack) {
  audio.src = birdTrack;
  audio.currentTime = currentTimePlay;
  audio.play();
  isPlay = true;
}

function pauseAudio(audio) {
  audio.pause();
  isPlay = false;
}

function playAudio() {
  if (isPlay === false) {
    startAudio(audio, birdTrack);
    setTimeDuration(timeDuration, birdDuration);
  } else {
    pauseAudio(audio);
    currentTimePlay = audio.currentTime;
  }
}

function endAudio() {
  isPlay = false;
  togglePlayBtn();
  progress.style.width = '0%';
  audio.currentTime = 0;
  currentTimePlay = 0;
  timeCurrent.textContent = '00:00';
}

function togglePlayBtn() {
  playButton.classList.toggle('pause');
}

function setTimeDuration(item, birdDuration) {
  item.textContent = birdDuration;
}

function setAudioTimeCurrent(e) {
  if (isPlay === true) {
    const currentTime = audio.currentTime;
    const timePast = getTimeCodeFromNum(currentTime);
    return (timeCurrent.textContent = `${timePast}`);
  }
}

setInterval(setAudioTimeCurrent, 1000);

function updateProgressBar(e) {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgressBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  if (isPlay) {
    audio.currentTime = (clickX / width) * duration;
  }
}

function setVolumeBar(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const progressPercent = (clickX / width) * 100;
  audio.volume = clickX / width;
  volumeProgress.style.width = `${progressPercent}%`;
}

function setVolumeDown(volumeContainer, volumeProgress, audio) {
  const volumeBar = volumeContainer.getBoundingClientRect().width;
  const volumeCurrent = volumeProgress.getBoundingClientRect().width;
  let progressPercent = (volumeCurrent / volumeBar) * 100;
  if (isPlay && progressPercent < 10) {
    audio.volume = 0;
    volumeProgress.style.width = `0%`;
  } else {
    progressPercent -= 10;
    audio.volume = volumeCurrent / volumeBar;
    volumeProgress.style.width = `${progressPercent}%`;
  }
}

function setVolumeUp(volumeContainer, volumeProgress, audio) {
  const volumeBar = volumeContainer.getBoundingClientRect().width;
  const volumeCurrent = volumeProgress.getBoundingClientRect().width;
  let progressPercent = (volumeCurrent / volumeBar) * 100;
  if (isPlay && progressPercent >= 90) {
    audio.volume = 1;
    volumeProgress.style.width = `100%`;
  } else {
    progressPercent += 10;
    audio.volume = volumeCurrent / volumeBar;
    volumeProgress.style.width = `${progressPercent}%`;
  }
}

playButton.addEventListener('click', playAudio);
playButton.addEventListener('click', togglePlayBtn);

audio.addEventListener('timeupdate', updateProgressBar);

audio.addEventListener('ended', endAudio);

progressContainer.addEventListener('click', setProgressBar);

volumeContainer.addEventListener('click', setVolumeBar);

volumeDown.addEventListener('click', () => {
  setVolumeDown(volumeContainer, volumeProgress, audio);
});

volumeUp.addEventListener('click', () => {
  setVolumeUp(volumeContainer, volumeProgress, audio);
});

export { birdsWarmUp, chooseBird, isPlay, startAudio, setTimeDuration, pauseAudio, setVolumeUp, setVolumeDown };
