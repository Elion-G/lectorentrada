import {Html5QrcodeScanner} from "html5-qrcode";

window.addEventListener('DOMContentLoaded', () => {

    var lastResult, countResults = 0;
    const formElement = document.querySelector('form[action="buscar-funcionario"]');
    const cinInput = formElement.querySelector('input[name="cin"]');

    // function onScanSuccess(decodeText, decodeResult) {
    //     if (decodeText !== lastResult) {
    //         lastResult = decodeText;

    //         cinInput.value = decodeText;

            // $.ajax({
            //     url: '/buscar-funcionario',
            //     type: 'POST',
            //     timeout:-1,
            //     headers: {
            //         'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content'),
            //     },
            //     data: JSON.stringify(
            //         {
            //             'cin' : cinInput.value
            //         }
            //     ),
            //     contentType: 'application/json',
            //     success: function(response){
            //         alert(response);
            //     },
            //     error: function(xhr, status, error){
            //         console.log(xhr);
            //         alert(status);
            //         console.log(error);
            //     }
            // });

    //     }
    // }

    async function sendRequest(cin) {
        try {

            alert(JSON.stringify({ "cin" : cin }));
            const tokenn = document.querySelector('meta[name="csrf-token"]').content;
            alert(tokenn);

            const data = await new Promise((resolve, reject) => {
                $.ajax({
                    url: "/lectorffa/buscar-funcionario",
                    method: "GET",
                    timeout: -1,
                    headers: {
                        'X-CSRF-TOKEN' : tokenn
                    },
                    contentType: 'application/json',
                    data: JSON.stringify({ cin }),
                    success: (response) => {
                        // Si el servidor devuelve un string en lugar de JSON
                        if (typeof response === 'string') {
                            resolve(JSON.parse(response));
                        } else {
                            resolve(response);
                        }
                    },
                    error: (xhr, status, error) => {
                        alert(error.message);
                        reject(new Error(`Error: ${status}, ${error}`));
                    }
                });
            });
            return data;
        } catch (error) {
            // Convierte el error en un mensaje de texto y lo muestra
            alert(`Error en la solicitud: ${error.message}`);
            console.error('Error completo:', error); // Imprime el error completo en la consola
            alert('Hubo un error al procesar la solicitud.');
            return null;
        }
    }

    async function onScanSuccess(decodeText, decodeResult) {
        if (decodeText !== lastResult) {
            lastResult = decodeText;
            cinInput.value = decodeText;

            try {
                const response = await sendRequest(cinInput.value);
    
                alert(response);
            } catch (error) {
                console.error('Error procesando la solicitud:', error);
                alert('Hubo un problema al buscar al funcionario.');
            }
        }
    }

    var html5Scanner = new Html5QrcodeScanner(
        "videoElement", { fps:10, qrbox:500, rememberLastUsedCamera: true }
    )

    html5Scanner.render(onScanSuccess);
});