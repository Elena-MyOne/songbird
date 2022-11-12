export function randomNum(num) {
  return Math.ceil(Math.random() * num);
}

//turn 128 seconds into 2:08 - put to global
export function getTimeCodeFromNum(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  const hours = parseInt(minutes / 60);
  minutes -= hours * 60;

  if (hours === 0) return `${String(minutes).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${String(minutes).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;
}
