let startTime = 0;
let elapsedTime = 0;
let intervalId;
const display = document.getElementById('display');
const laps = document.getElementById('laps');

document.getElementById('startBtn').addEventListener('click', () => {
  if (!intervalId) {
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 1000);
  }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  elapsedTime = Date.now() - startTime;
});

document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(intervalId);
  intervalId = null;
  startTime = 0;
  elapsedTime = 0;
  display.textContent = '00:00:00';
  laps.innerHTML = '';
});

document.getElementById('lapBtn').addEventListener('click', () => {
  const lapTime = formatTime(elapsedTime);
  const li = document.createElement('li');
  li.textContent = `Lap: ${lapTime}`;
  laps.appendChild(li);
});

function updateTime() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function formatTime(time) {
  const seconds = Math.floor((time / 1000) % 60);
  const minutes = Math.floor((time / (1000 * 60)) % 60);
  const hours = Math.floor((time / (1000 * 60 * 60)) % 24);

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return number < 10 ? '0' + number : number;
}
