window.addEventListener('DOMContentLoaded', () => {
    var lastResult, countResults = 0;
    const formElement = document.querySelector('form[action="buscar-funcionario"]');
    const cinInput = formElement.querySelector('input[name="cin"]');
    const videoContainer = document.getElementById('videoContainer');
    const infoContainer = document.createElement('div'); // Contenedor para mostrar información dinámica
    infoContainer.classList.add('info-container');
    infoContainer.style.display = 'none';
    document.body.appendChild(infoContainer); // Añadimos al cuerpo para mostrarlo dinámicamente

    async function sendRequest(cin) {
        try {
            const data = await new Promise((resolve, reject) => {
                $.ajax({
                    url: "/lectorffa/buscar-funcionario",
                    method: "POST",
                    timeout: -1,
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
                    },
                    contentType: 'application/json',
                    data: JSON.stringify({ "cin": cin }),
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
            alert(`Error en la solicitud: ${error.message}`);
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

                if (response && response.success) {
                    showInfo(response.nombre, response.cedula);
                } else {
                    alert(response?.message || 'No se encontró la persona.');
                }
            } catch (error) {
                alert('Hubo un problema al buscar al funcionario.');
            }
        }
    }

    function showInfo(nombre, cedula) {
        // Oculta el escáner
        videoContainer.style.display = 'none';

        // Muestra la información
        infoContainer.innerHTML = `
            <h1 class="text-center">Bienvenido/a</h1>
            <h2 class="text-center">${nombre}</h2>
            <h3 class="text-center">${cedula}</h3>
        `;
        infoContainer.style.display = 'block';

        // Después de 8 segundos, oculta la información y vuelve al escáner
        setTimeout(() => {
            infoContainer.style.display = 'none';
            videoContainer.style.display = 'block';
        }, 8000);
    }

    const html5Scanner = new Html5QrcodeScanner(
        "videoElement", { fps: 10, qrbox: 500, rememberLastUsedCamera: true }
    );

    html5Scanner.render(onScanSuccess);
});
