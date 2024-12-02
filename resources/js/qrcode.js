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
            const data = await new Promise((resolve, reject) => {
                $.ajax({
                    url: "http://lectorentrada.test/buscar-funcionario",
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Cookie": "XSRF-TOKEN=eyJpdiI6Ii9ndUJTTkZVWmttV2drUVB4LzFtS2c9PSIsInZhbHVlIjoiSjZKZktqdElMQ0ZWQ2xWS01NL0h0blBrOXBGby9MQjB4V0kwYXMxRlZVOXI2cS9tdmVqNXRWaFhjR09QbmNrcTg3R0JVV1VxK3FxeDRwWVhzZFN5aXNZNUpPOEg0RWJFVG5oeExnb21DcFpBaWsrRGNiRStWOHY0djJvOGF0SmEiLCJtYWMiOiIwMWI4ZWE1MGMwMGU0ZTE2Nzg2ZWE1ZDU2YTUzYzQ4YzNjNDI5ZTNlOTJmY2U3ZmZjYWRjYmRhMDE2N2RiYjg1IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Im1ab1BxR2FBWEt0VzBuWWhqTUxQUWc9PSIsInZhbHVlIjoiR0htaVVUdEVRQ0V4bkdyN1BZMWVvN3hNNHNkNm5OMU9PL3pJdXRBWFJjckVUUm9jYnVkSU1aUWVIbDFxWnBIWkJubEIzZmpWRHhWY1h1Q1B0ek1EV0Q2WlE1bTNBSEtlaEFPeFJNYUJ1NjhOclpwdkJXL3M4dnFDbk9pQXBCTG4iLCJtYWMiOiI0OTE5YzM5OWEyNmRlOGQ1OGJmM2Y0NmUzZWFkMjZmMjM0MzYwZWM0NTdmNjM4MzkyYjBiMmY4OWI2OWEyYTgxIiwidGFnIjoiIn0%3D"
                    },
                    data: JSON.stringify({ "cin" : cin }),
                    success: resolve,
                    error: (xhr, status, error) => reject(new Error(`Error: ${status}, ${error}`))
                });
            });
            return data;
        } catch (error) {
            alert('Error en la solicitud:', error);
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
    
                if (response) {
                    if (response.success) {
                        showInfoView(response.data);
                    } else {
                        alert('No se encontró la persona.');
                    }
                }
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