
const sky = document.getElementById('sky');
const numberOfStars = 100;

for (let i = 0; i < numberOfStars; i++) {
  const star = document.createElement('div');
  star.className = 'star';
  star.style.top = Math.random() * 100 + 'vh';
  star.style.left = Math.random() * 100 + 'vw';
  star.style.animationDuration = (1.5 + Math.random()).toFixed(2) + 's';
  sky.appendChild(star);
}

const driveButton = document.getElementById('driveButton');
const landing = document.getElementById('landing');
const interior = document.getElementById('interior');
const audio = document.getElementById('audioPlayer');

const playPauseBtn = document.getElementById('playPause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const songs = [
  'assets/song1.mp3',
  'assets/song2.mp3',
  'assets/song3.mp3'
];

let currentSong = 0;
let isPlaying = false;

driveButton.addEventListener('click', () => {
  landing.classList.add('hidden');
  interior.classList.remove('hidden');
});

playPauseBtn.addEventListener('click', () => {
  if (isPlaying) {
    audio.pause();
    playPauseBtn.textContent = '▶️';
  } else {
    audio.play();
    playPauseBtn.textContent = '⏸';
  }
  isPlaying = !isPlaying;
});

nextBtn.addEventListener('click', () => {
  currentSong = (currentSong + 1) % songs.length;
  audio.src = songs[currentSong];
  if (isPlaying) audio.play();
});

prevBtn.addEventListener('click', () => {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  audio.src = songs[currentSong];
  if (isPlaying) audio.play();
});
