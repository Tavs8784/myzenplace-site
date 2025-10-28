document.addEventListener('DOMContentLoaded', () => {
// Elements
    const volumeSlider = document.getElementById('volume-slider');
    const buttons = document.querySelectorAll('.sound-btn');
    if (!volumeSlider || buttons.length === 0) return;


// Day/Night ambiance
    const hour = new Date().getHours();
    const ambianceFile = (hour >= 21 || hour < 6)
        ? 'assets/audio/Sound_Ambiance_Night.mp3'
        : 'assets/audio/Sound_Ambiance_Day.mp3';


// Audio map
    const sounds = {
        ambiance: new Audio(ambianceFile),
        rain: new Audio('assets/audio/Sound_Ambiance_rain.wav'),
        birds: new Audio('assets/audio/Sound_Birds.mp3'),
        wind: new Audio('assets/audio/Sound_Wind.mp3')
// relax: new Audio('assets/audio/Sound_RelaxMusic_4.wav') // reserved for Relax Mode
    };


// Defaults
    Object.values(sounds).forEach(a => { a.loop = true; a.volume = 0.7; });
    let sliderRaw = parseFloat(volumeSlider.value || '0.7'); // 0..1


// Per-sound cap: birds up to 1.0, others to 0.7
    const computeVolume = (key) => {
        const cap = (key === 'birds') ? 1.0 : 0.7;
        const v = sliderRaw * cap;
        return Math.max(0, Math.min(1, v));
    };


// Toggle buttons
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.sound;
            const sound = sounds[key];
            if (!sound) return;


            if (!btn.classList.contains('active')) {
                sound.volume = computeVolume(key);
                sound.play();
                btn.classList.add('active');
            } else {
                sound.pause();
                sound.currentTime = 0;
                btn.classList.remove('active');
            }
        });
    });


// Global volume slider (mutes→maxes all; max=0.7 except birds=1)
    volumeSlider.addEventListener('input', (e) => {
        sliderRaw = parseFloat(e.target.value) || 0; // 0..1
        Object.entries(sounds).forEach(([key, audio]) => {
            if (!audio.paused) audio.volume = computeVolume(key);
        });
    })}