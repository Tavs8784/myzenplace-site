    // assets/js/audio-mixer.js
    const sounds = {
    ambiance: new Audio('audio/Sound_Ambiance_Day.mp3'),
    rain: new Audio('audio/Sound_Ambiance_rain.wav'),
    birds: new Audio('audio/Sound_Birds.mp3'),
    wind: new Audio('audio/Sound_Wind.mp3')
};

    // Enable looping
    Object.values(sounds).forEach(audio => {
    audio.loop = true;
    audio.volume = 0.7;
});

    const buttons = document.querySelectorAll('.sound-btn');
    const muteToggle = document.getElementById('mute-toggle');
    const volumeSlider = document.getElementById('volume-slider');
    let isMuted = false;

    // Button toggle logic
    buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.sound;
        const sound = sounds[key];
        if (!sound) return;

        if (!btn.classList.contains('active')) {
            sound.play();
            btn.classList.add('active');
            btn.textContent = btn.textContent.replace('⏹', '').trim() + ' ⏹'; // show stop icon
        } else {
            sound.pause();
            sound.currentTime = 0;
            btn.classList.remove('active');
            btn.textContent = btn.textContent.replace('⏹', '').trim(); // remove icon
        }
    });
});

    // Mute toggle
    muteToggle.addEventListener('click', () => {
    isMuted = !isMuted;
    Object.values(sounds).forEach(a => a.muted = isMuted);
    muteToggle.textContent = isMuted ? '🔊 Unmute' : '🔇 Mute';
});
    // Volume control
    volumeSlider.addEventListener('input', e => {
        const vol = parseFloat(e.target.value);
        Object.values(sounds).forEach(a => a.volume = vol);
    });
