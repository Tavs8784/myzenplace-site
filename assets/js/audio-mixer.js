document.addEventListener('DOMContentLoaded', () => {
    const volumeSlider = document.getElementById('volume-slider');
    const asmrToggle = document.getElementById('asmr-toggle');
    const relaxToggle = document.getElementById('relax-toggle');
    const asmrButtons = document.getElementById('asmr-buttons');
    const relaxButtons = document.getElementById('relax-buttons');
    const relaxBtn = document.getElementById('relax-btn');
    const buttons = document.querySelectorAll('.sound-btn');

    // Detect day/night for ambiance
    const hour = new Date().getHours();
    const ambianceFile = (hour >= 21 || hour < 6)
        ? 'assets/audio/Sound_Ambiance_Night.mp3'
        : 'assets/audio/Sound_Ambiance_Day.mp3';

    const sounds = {
        ambiance: new Audio(ambianceFile),
        rain: new Audio('assets/audio/Sound_Ambiance_rain.wav'),
        birds: new Audio('assets/audio/Sound_Birds.mp3'),
        wind: new Audio('assets/audio/Sound_Wind.mp3'),
        relax: new Audio('assets/audio/Sound_RelaxMusic_4.wav'),
    };

    Object.values(sounds).forEach(a => { a.loop = true; a.volume = 0.7; });

    let sliderRaw = parseFloat(volumeSlider?.value || '0.7');
    const capFor = key => (key === 'birds' ? 1.0 : 0.7);
    const volumeFor = key => Math.min(1, Math.max(0, sliderRaw * capFor(key)));

    const stopAll = () => {
        Object.values(sounds).forEach(a => { a.pause(); a.currentTime = 0; });
        buttons.forEach(b => b.classList.remove('active'));
    };

    // Volume control
    volumeSlider?.addEventListener('input', e => {
        sliderRaw = parseFloat(e.target.value) || 0;
        Object.entries(sounds).forEach(([key, audio]) => {
            if (!audio.paused) audio.volume = volumeFor(key);
        });
    });

    // ASMR buttons
    asmrButtons.querySelectorAll('.sound-btn').forEach(btn => {
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
                    .catch(() => btn.classList.remove('active'));
            }
        });
    });

    // Relax button
    relaxBtn.addEventListener('click', () => {
        const relaxAudio = sounds.relax;
        if (relaxBtn.classList.contains('active')) {
            relaxAudio.pause();
            relaxAudio.currentTime = 0;
            relaxBtn.classList.remove('active');
        } else {
            stopAll();
            relaxAudio.volume = sliderRaw;
            relaxAudio.play()
                .then(() => relaxBtn.classList.add('active'))
                .catch(() => relaxBtn.classList.remove('active'));
        }
    });

    // Mode toggles
    asmrToggle.addEventListener('click', () => {
        stopAll();
        asmrToggle.classList.add('active');
        relaxToggle.classList.remove('active');
        asmrButtons.classList.add('hidden');
        relaxButtons.classList.remove('hidden');
    });

    relaxToggle.addEventListener('click', () => {
        stopAll();
        relaxToggle.classList.add('active');
        asmrToggle.classList.remove('active');
        asmrButtons.classList.add('hidden');
        relaxButtons.classList.remove('hidden');
    });
});
