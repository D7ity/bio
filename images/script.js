const audio = document.getElementById('bg-audio');
audio.volume = 0;

window.addEventListener('load', () => {
    audio.play();
    let volume = 0;
    const targetVolume = 0.1;
    const fadeInterval = 50;
    const fadeStep = targetVolume / 20;

    const fadeIn = setInterval(() => {
        volume += fadeStep;
        if (volume >= targetVolume) {
            volume = targetVolume;
            clearInterval(fadeIn);
        }
        audio.volume = volume;
    }, fadeInterval);
});
