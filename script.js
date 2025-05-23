
function enterTruck(event) {
  event.preventDefault();
  document.getElementById('ignitionSound').play();
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('interior').classList.remove('hidden');
}

// Spotify and control logic remains same as previous — can be inserted here
