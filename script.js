
const truckArea = document.getElementById('truckArea');
const landing = document.getElementById('landing');
const interior = document.getElementById('interior');
const ignitionSound = document.getElementById('ignitionSound');
const playPauseBtn = document.getElementById('playPause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const songTitle = document.getElementById('songTitle');

let player, token, isPlaying = false;

truckArea.addEventListener('click', async () => {
  ignitionSound.play();
  landing.classList.add('hidden');
  interior.classList.remove('hidden');

  const hash = window.location.hash.substring(1).split('&').reduce((acc, item) => {
    if (item) {
      const parts = item.split('=');
      acc[parts[0]] = decodeURIComponent(parts[1]);
    }
    return acc;
  }, {});

  token = hash.access_token || localStorage.getItem('spotify_token');
  if (!token) {
    window.location.href = 'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=YOUR_CLIENT_ID' +
      '&scope=streaming%20user-read-email%20user-read-private%20user-modify-playback-state%20user-read-playback-state' +
      '&redirect_uri=https://radiant-alfajores-b807b7.netlify.app';
    return;
  }

  localStorage.setItem('spotify_token', token);

  window.onSpotifyWebPlaybackSDKReady = () => {
    player = new Spotify.Player({
      name: 'Jeffrey East Player',
      getOAuthToken: cb => cb(token),
      volume: 0.7
    });

    player.addListener('ready', ({ device_id }) => {
      fetch('https://api.spotify.com/v1/me/player/play?device_id=' + device_id, {
        method: 'PUT',
        body: JSON.stringify({ context_uri: 'spotify:playlist:6z7kKnDS5M36rDxMIR1aPJ' }),
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }
      });
    });

    player.addListener('player_state_changed', state => {
      if (!state) return;
      songTitle.textContent = state.track_window.current_track.name;
      isPlaying = !state.paused;
      playPauseBtn.textContent = isPlaying ? '⏸' : '▶️';
    });

    player.connect();
  };
});

playPauseBtn.addEventListener('click', () => {
  if (player) {
    player.togglePlay();
  }
});

nextBtn.addEventListener('click', () => {
  if (player) {
    player.nextTrack();
  }
});

prevBtn.addEventListener('click', () => {
  if (player) {
    player.previousTrack();
  }
});
