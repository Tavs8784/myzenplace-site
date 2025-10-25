const hour = new Date().getHours();
const ambianceFile = (hour >= 21 || hour < 6)
    ? 'assets/audio/Sound_Ambiance_Night.mp3'
    : 'assets/audio/Sound_Ambiance_Day.mp3';

const sounds = {
    ambiance: new Audio(ambianceFile),
    rain: new Audio('assets/audio/Sound_Ambiance_rain.wav'),
    birds: new Audio('assets/audio/Sound_Birds.mp3'),
    wind: new Audio('assets/audio/Sound_Wind.mp3')
};

// Enable looping
Object.values(sounds).forEach(audio => {
    audio.loop = true;
    audio.volume = 0.7;
});

const buttons = document.querySelectorAll('.sound-btn');
const volumeSlider = document.getElementById('volume-slider');
let globalVolume = 0.7;

// Button toggle logic
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.sound;
        const sound = sounds[key];
        if (!sound) return;

        if (!btn.classList.contains('active')) {
            sound.volume = globalVolume;
            sound.play();
            btn.classList.add('active');
        } else {
            sound.pause();
            sound.currentTime = 0;
            btn.classList.remove('active');
        }
    });
});

// Mute toggle

// Volume control — affects current and future sounds
volumeSlider.addEventListener('input', e => {
    globalVolume = parseFloat(e.target.value);
    Object.values(sounds).forEach(a => {
        if (!a.paused) a.volume = globalVolume;
    });
});