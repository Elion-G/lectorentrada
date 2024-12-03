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
            const imagenFuncionario = document.getElementById('imagen-funcionario');

            nombreFuncionario.innerHTML = nombre;
            cedulaFuncionario.innerHTML = cedula;

            imagenFuncionario.src = `/lectorffa/images/${cedula}.jpg`;
            imagenFuncionario.alt = nombre;

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
                imagenFuncionario.src = '';
                imagenFuncionario.alt = '';
            }, 5000);
        } else {
            const infoContainer = document.getElementById('info-ingresado');
            const videoContainer = document.getElementById('video-container');
            const nombreIngresado = document.getElementById('nombre-ingresado');
            const cedulaIngresado = document.getElementById('cedula-ingresado');
            const bodyContainer = document.getElementById('body');

            nombreIngresado.innerHTML = nombre;
            cedulaIngresado.innerHTML = cedula;

            bodyContainer.classList.add('bg-danger');

            infoContainer.classList.remove('d-none');
            infoContainer.classList.add('d-flex');

            videoContainer.classList.remove('d-flex');
            videoContainer.classList.add('d-none');

            // Después de 8 segundos, oculta la información y vuelve al escáner
            setTimeout(() => {
                bodyContainer.classList.remove('bg-danger');

                infoContainer.classList.remove('d-flex');
                infoContainer.classList.add('d-none');

                videoContainer.classList.remove('d-none');
                videoContainer.classList.add('d-flex');

                nombreIngresado.innerHTML = '';
                cedulaIngresado.innerHTML = '';
            }, 4000);
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
        "videoElement", { fps:20, qrbox:350, rememberLastUsedCamera: true }
    )

    html5Scanner.render(onScanSuccess);

    // Buscador

    const inputBuscador = document.getElementById('buscador');
    const btnBuscador = document.getElementById('button-addon2');

    async function searchForCI(decodeText) {
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

    btnBuscador.addEventListener('click', () => {
        let cedula = inputBuscador.value;
        searchForCI(cedula);
        inputBuscador.value = '';

    });

    inputBuscador.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            let cedula = inputBuscador.value;
            searchForCI(cedula);
            inputBuscador.value = '';
        }
    });
});