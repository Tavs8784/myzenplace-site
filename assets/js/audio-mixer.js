// assets/js/audio-mixer.js
document.addEventListener('DOMContentLoaded', () => {
    const volumeSlider = document.getElementById('volume-slider');
    const buttons = document.querySelectorAll('.sound-btn');

    // Day/Night ambiance
    const hour = new Date().getHours();
    const ambianceFile = (hour >= 21 || hour < 6)
        ? 'assets/audio/Sound_Ambiance_Night.mp3'
        : 'assets/audio/Sound_Ambiance_Day.mp3';

    const sounds = {
        ambiance: new Audio(ambianceFile),
        rain: new Audio('assets/audio/Sound_Ambiance_rain.wav'),
        birds: new Audio('assets/audio/Sound_Birds.mp3'),
        wind: new Audio('assets/audio/Sound_Wind.mp3'),
    };

    // Defaults
    Object.values(sounds).forEach(a => { a.loop = true; a.volume = 0.7; });

    // Ensure idle UI on load
    buttons.forEach(b => b.classList.remove('active'));

    // Slider baseline (0..1)
    let sliderRaw = parseFloat(volumeSlider?.value || '0.7');

    // Birds can reach 1.0, others cap at 0.7 (your earlier rule)
    const capFor = key => (key === 'birds' ? 1.0 : 0.7);
    const volumeFor = key => Math.min(1, Math.max(0, sliderRaw * capFor(key)));

    // Toggle buttons
    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const key = btn.dataset.sound;
            const audio = sounds[key];
            if (!audio) return;

            if (btn.classList.contains('active')) {
                audio.pause();
                audio.currentTime = 0;
                btn.classList.remove('active');
            } else {
                audio.volume = volumeFor(key);
                audio.play()
                    .then(() => btn.classList.add('active'))
                    .catch(() => { btn.classList.remove('active'); });
            }
        });
    });

    // Global volume control
    volumeSlider?.addEventListener('input', e => {
        sliderRaw = parseFloat(e.target.value) || 0;
        Object.entries(sounds).forEach(([key, audio]) => {
            if (!audio.paused) audio.volume = volumeFor(key);
        });
    });
});
