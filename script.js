
function enterTruck(event) {
  event.preventDefault();
  document.getElementById('ignitionSound').play();
  document.getElementById('landing').classList.add('hidden');
  document.getElementById('interior').classList.remove('hidden');

  const hash = window.location.hash.substring(1).split('&').reduce((acc, item) => {
    if (item) {
      const parts = item.split('=');
      acc[parts[0]] = decodeURIComponent(parts[1]);
    }
    return acc;
  }, {});

  let token = hash.access_token || localStorage.getItem('spotify_token');
  if (!token) {
    window.location.href = 'https://accounts.spotify.com/authorize' +
      '?response_type=token' +
      '&client_id=81947f71c4eb490da5e79ce4c1a1b290' +
      '&scope=streaming%20user-read-email%20user-read-private%20user-modify-playback-state%20user-read-playback-state' +
      '&redirect_uri=https://radiant-alfajores-b807b7.netlify.app';
    return;
  }

  localStorage.setItem('spotify_token', token);

  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new Spotify.Player({
      name: 'Jeffrey East Player',
      getOAuthToken: cb => cb(token),
      volume: 0.7
    });

    player.addListener('ready', ({ device_id }) => {
      fetch('https://api.spotify.com/v1/me/player/play?device_id=' + device_id, {
        method: 'PUT',
        body: JSON.stringify({ context_uri: 'spotify:playlist:6z7kKnDS5M36rDxMIR1aPJ' }),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        }
      });
    });

    player.addListener('player_state_changed', state => {
      if (!state) return;
      document.getElementById('songTitle').textContent = state.track_window.current_track.name;
      document.getElementById('playPause').textContent = !state.paused ? '⏸' : '▶️';
    });

    document.getElementById('playPause').addEventListener('click', () => player.togglePlay());
    document.getElementById('next').addEventListener('click', () => player.nextTrack());
    document.getElementById('prev').addEventListener('click', () => player.previousTrack());

    player.connect();
  };
}
