
document.getElementById('driveButton').addEventListener('click', () => {
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('interior').classList.remove('hidden');
  const ignition = document.getElementById('ignitionSound');
  ignition.play();
});
