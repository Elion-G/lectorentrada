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

    function onScanSuccess(decodeText, decodeResult) {
        if (decodeText !== lastResult) {
            lastResult = decodeText;
            cinInput.value = decodeText;

            // Realiza la solicitud POST usando async/await
            var settings = {
            "url": "http://lectorentrada.test/buscar-funcionario",
            "method": "GET",
            "timeout": 0,
            "headers": {
                "Content-Type": "application/json",
                "Cookie": "XSRF-TOKEN=eyJpdiI6Ii9ndUJTTkZVWmttV2drUVB4LzFtS2c9PSIsInZhbHVlIjoiSjZKZktqdElMQ0ZWQ2xWS01NL0h0blBrOXBGby9MQjB4V0kwYXMxRlZVOXI2cS9tdmVqNXRWaFhjR09QbmNrcTg3R0JVV1VxK3FxeDRwWVhzZFN5aXNZNUpPOEg0RWJFVG5oeExnb21DcFpBaWsrRGNiRStWOHY0djJvOGF0SmEiLCJtYWMiOiIwMWI4ZWE1MGMwMGU0ZTE2Nzg2ZWE1ZDU2YTUzYzQ4YzNjNDI5ZTNlOTJmY2U3ZmZjYWRjYmRhMDE2N2RiYjg1IiwidGFnIjoiIn0%3D; laravel_session=eyJpdiI6Im1ab1BxR2FBWEt0VzBuWWhqTUxQUWc9PSIsInZhbHVlIjoiR0htaVVUdEVRQ0V4bkdyN1BZMWVvN3hNNHNkNm5OMU9PL3pJdXRBWFJjckVUUm9jYnVkSU1aUWVIbDFxWnBIWkJubEIzZmpWRHhWY1h1Q1B0ek1EV0Q2WlE1bTNBSEtlaEFPeFJNYUJ1NjhOclpwdkJXL3M4dnFDbk9pQXBCTG4iLCJtYWMiOiI0OTE5YzM5OWEyNmRlOGQ1OGJmM2Y0NmUzZWFkMjZmMjM0MzYwZWM0NTdmNjM4MzkyYjBiMmY4OWI2OWEyYTgxIiwidGFnIjoiIn0%3D"
            },
            "data": JSON.stringify({
                "cin": "5266710"
            }),
            };
            
            $.ajax(settings).done(function (response) {
                alert(response);
            });
        }
    }

    var html5Scanner = new Html5QrcodeScanner(
        "videoElement", { fps:10, qrbox:500, rememberLastUsedCamera: true }
    )

    html5Scanner.render(onScanSuccess);
});