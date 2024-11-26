// import QrScanner from 'qr-scanner';

// window.addEventListener('DOMContentLoaded', () => {
//     const videoElem = document.getElementById('videoElement');
//     const h1Elem = document.getElementById('h1Element');

//     const qrScanner = new QrScanner(
//         videoElem,
//         result => h1Elem.innerHTML = result,
//         { 'returnDetailedScanResult': true }
//     );

//     qrScanner.start();
// });

import {Html5QrcodeScanner} from "html5-qrcode";

window.addEventListener('DOMContentLoaded', () => {
    var lastResult, countResults = 0;
    const h1Elem = document.getElementById('h1Element');

    function onScanSuccess(decodeText, decodeResult) {
        if (decodeText !== lastResult) {
            lastResult = decodeText;

            h1Elem.innerHTML = decodeText;

            fetch('/buscar-funcionario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({ CIN: decodeText })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    Toastify({
                        text: data.message,
                        duration: 3000,
                        gravity: "bottom",
                        position: "right",
                        style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                            fontSize: "1.3rem"
                        }
                    }).showToast();
                } else {
                    Toastify({
                        text: data.message,
                        duration: 3000,
                        gravity: "bottom",
                        position: "right",
                        style: {
                            background: "linear-gradient(to right, #ff5f6d, #ffc371)",
                            fontSize: "1.3rem"
                        }
                    }).showToast();
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });

            // Toastify({
            //     text: "Bienvenido",
            //     duration: 3000,
            //     destination: "",
            //     newWindow: true,
            //     close: true,
            //     gravity: "bottom",
            //     position: "right",
            //     stopOnFocus: true,
            //     style: {
            //       background: "linear-gradient(to right, #00b09b, #96c93d)",
            //       fontSize: "1.3rem"
            //     },
            //     onClick: function(){}
            //   }).showToast();
        }
    }

    var html5Scanner = new Html5QrcodeScanner(
        "videoElement", { fps:10, qrbox:250, rememberLastUsedCamera: true }
    )

    html5Scanner.render(onScanSuccess);
});