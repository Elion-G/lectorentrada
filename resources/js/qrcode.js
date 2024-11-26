import QrScanner from 'qr-scanner';

window.addEventListener('DOMContentLoaded', () => {
    const videoElem = document.getElementById('videoElement');
    const h1Elem = document.getElementById('h1Element');

    const qrScanner = new QrScanner(
        videoElem,
        result => h1Elem.innerHTML = result,
        { calculateScanRegion: true, returnDetailedScanResult: true }
    );

    qrScanner.start();
});