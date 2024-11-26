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

            $.ajax({
                url: '/buscar-funcionario',
                type: 'POST',
                timeout:-1,
                headers: {
                    'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content'),
                },
                data: JSON.stringify({ CIN: decodeText }),
                contentType: 'application/json',
                success: function(response){
                        Toastify({
                            text: "Bienvenido",
                            duration: 3000,
                            destination: "",
                            newWindow: true,
                            close: true,
                            gravity: "bottom",
                            position: "right",
                            stopOnFocus: true,
                            style: {
                            background: "linear-gradient(to right, #00b09b, #96c93d)",
                            fontSize: "1.3rem"
                            },
                            onClick: function(){}
                        }).showToast();
                },
                error: function(xhr, status, error){
                    console.log(xhr);
                    console.log(status);
                    console.log(error);
                }
            });
        }
    }

    var html5Scanner = new Html5QrcodeScanner(
        "videoElement", { fps:10, qrbox:250, rememberLastUsedCamera: true }
    )

    html5Scanner.render(onScanSuccess);
});