import {Html5QrcodeScanner} from "html5-qrcode";

window.addEventListener('DOMContentLoaded', () => {
    var lastResult, countResults = 0;
    const formElement = document.querySelector('form[action="buscar-funcionario"]');
    const cinInput = formElement.querySelector('input[name="cin"]');

    // function onScanSuccess(decodeText, decodeResult) {
    //     if (decodeText !== lastResult) {
    //         lastResult = decodeText;

    //         cinInput.value = decodeText;

    //         $.ajax({
    //             url: '/buscar-funcionario',
    //             type: 'POST',
    //             timeout:-1,
    //             headers: {
    //                 'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content'),
    //             },
    //             data: JSON.stringify(
    //                 {
    //                     'cin' : cinInput.value
    //                 }
    //             ),
    //             contentType: 'application/json',
    //             success: function(response){
    //                 alert(response);
    //             },
    //             error: function(xhr, status, error){
    //                 console.log(xhr);
    //                 alert(status);
    //                 console.log(error);
    //             }
    //         });

    //     }
    // }

    async function sendRequest(cin) {
        try {
            const response = await fetch('/buscar-funcionario', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content
                },
                body: JSON.stringify({ cin })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un error al procesar la solicitud.');
            return null;
        }
    }

    async function onScanSuccess(decodeText, decodeResult) {
        if (decodeText !== lastResult) {
            lastResult = decodeText;
            cinInput.value = decodeText;

            // Realiza la solicitud POST usando async/await
            const response = await sendRequest(cinInput.value);

            if (response) {
                if (response.success) {
                    showInfoView(response.data);
                } else {
                    alert('No se encontró la persona.');
                }
            }
        }
    }

    var html5Scanner = new Html5QrcodeScanner(
        "videoElement", { fps:10, qrbox:500, rememberLastUsedCamera: true }
    )

    html5Scanner.render(onScanSuccess);
});