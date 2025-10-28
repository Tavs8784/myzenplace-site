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
const sliderRaw = parseFloat(volumeSlider.value);
const targetVol = (key === 'birds') ? sliderRaw : sliderRaw * 0.7;

// Default settings
Object.values(sounds).forEach(audio => {
    audio.loop = true;
    audio.volume = 0.7; // base level
});

const buttons = document.querySelectorAll('.sound-btn');
const volumeSlider = document.getElementById('volume-slider');

// Global mix reference
let globalVolume = 0.7;

// Button toggle logic
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const key = btn.dataset.sound;
        const sound = sounds[key];
        if (!sound) return;

        if (!btn.classList.contains('active')) {
            // Play sound
            const vol = (key === 'birds') ? 1.0 : globalVolume;
            sound.volume = targetVol;
            sound.play();
            btn.classList.add('active');
        } else {
            // Stop sound
            sound.pause();
            sound.currentTime = 0;
            btn.classList.remove('active');
        }
    });
});

// Volume control — affects current and future sounds
volumeSlider.addEventListener('input', e => {
    const sliderRaw = parseFloat(e.target.value); // 0..1
    Object.entries(sounds).forEach(([key, audio]) => {
        if (!audio.paused) {
            const cap = (key === 'birds') ? 1.0 : 0.7;
            audio.volume = sliderRaw * cap;
        }
    });
});


// AUTO-START birds sound on load
window.addEventListener('DOMContentLoaded', () => {
    const birdBtn = document.querySelector('.sound-btn[data-sound="birds"]');
    if (birdBtn) {
        birdBtn.classList.add('active');
    }
    const birds = sounds.birds;
    birds.volume = 1.0;
    birds.play().catch(() => {
        // some browsers block autoplay — ignore silently
    });
});
