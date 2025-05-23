
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
