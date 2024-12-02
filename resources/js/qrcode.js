import {Html5QrcodeScanner} from "html5-qrcode";

window.addEventListener('DOMContentLoaded', () => {

    var lastResult, countResults = 0;

    async function sendRequest(cin) {
        try {

            const data = await new Promise((resolve, reject) => {
                $.ajax({
                    url: "/lectorffa/buscar-funcionario",
                    method: "POST",
                    timeout: -1,
                    headers: {
                        'X-CSRF-TOKEN' : $('meta[name="csrf-token"]').attr('content')
                    },
                    contentType: 'application/json',
                    data: JSON.stringify({ "cin" : cin }),
                    success: (response) => {
                        resolve(response);
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

    function cambioDeEstado(nombre, cedula, nuevo) {
        if (nuevo) {
            const infoContainer = document.getElementById('info-funcionario');
            const videoContainer = document.getElementById('video-container');
            const nombreFuncionario = document.getElementById('nombre-funcionario');
            const cedulaFuncionario = document.getElementById('cedula-funcionario');

            nombreFuncionario.innerHTML = nombre;
            cedulaFuncionario.innerHTML = cedula;

            infoContainer.classList.remove('d-none');
            infoContainer.classList.add('d-flex');

            videoContainer.classList.remove('d-flex');
            videoContainer.classList.add('d-none');

            // Después de 8 segundos, oculta la información y vuelve al escáner
            setTimeout(() => {
                infoContainer.classList.remove('d-flex');
                infoContainer.classList.add('d-none');

                videoContainer.classList.remove('d-none');
                videoContainer.classList.add('d-flex');

                nombreFuncionario.innerHTML = '';
                cedulaFuncionario.innerHTML = '';
            }, 5000);
        } else {
            const infoContainer = document.getElementById('info-ingresado');
            const videoContainer = document.getElementById('video-container');
            const nombreIngresado = document.getElementById('nombre-ingresado');
            const cedulaIngresado = document.getElementById('cedula-ingresado');

            nombreIngresado.innerHTML = nombre;
            cedulaIngresado.innerHTML = cedula;

            infoContainer.classList.remove('d-none');
            infoContainer.classList.add('d-flex');

            videoContainer.classList.remove('d-flex');
            videoContainer.classList.add('d-none');

            // Después de 8 segundos, oculta la información y vuelve al escáner
            setTimeout(() => {
                infoContainer.classList.remove('d-flex');
                infoContainer.classList.add('d-none');

                videoContainer.classList.remove('d-none');
                videoContainer.classList.add('d-flex');

                nombreIngresado.innerHTML = '';
                cedulaIngresado.innerHTML = '';
            }, 5000);
        }
    }

    async function onScanSuccess(decodeText, decodeResult) {
        if (decodeText !== lastResult) {
            lastResult = decodeText;

            try {
                const response = await sendRequest(decodeText);
    
                if (response && response.success) {

                    cambioDeEstado(response.nombre, response.cedula, true);

                } else {
                    if (response && response.message) {
                        cambioDeEstado(response.nombre, response.cedula, false);
                    } else {
                        alert(response?.message || 'No se encontró la persona.');
                    }
                    
                }
            } catch (error) {
                console.error('Error procesando la solicitud:', error);
                alert('Hubo un problema al buscar al funcionario.');
            }
        }
    }

    var html5Scanner = new Html5QrcodeScanner(
        "videoElement", { fps:20, qrbox:450, rememberLastUsedCamera: true }
    )

    html5Scanner.render(onScanSuccess);
});