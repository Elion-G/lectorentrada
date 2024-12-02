<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>FFA</title>

        @vite(['resources/css/style.css', 'resources/js/qrcode.js'])
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/toastify-js/src/toastify.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        
        <style>
            @font-face {
                font-family: "Amplesoft_Bold";
                src: url("/lectorffa/fonts/AMPLESOFT_BOLD.ttf");
            }

            * {
                font-family: Amplesoft_Bold !important;
            }

            .text-center {
                font-size: 5rem;
                font-family: Amplesoft_Bold !important;
                z-index:999 !important;
            }

            .imagen-logo {
                margin-top: 20vh;
                width: 15rem !important;
            }

            .h1-block {
                font-size: 15rem; 
                z-index:0 !important; 
            }

            .btn-fullscreen {
                position: absolute;
                z-index:999 !important;
            }
        </style>

    </head>
    <body>

        <div class="btn-fullscreen">
            <button id="fullscreen-btn" class="btn btn-transparent text-dark"><i class="bi bi-arrows-angle-expand"></i></button>
        </div>

        <div id="video-container" class="mt-5 container flex-column align-items-center d-flex">
            <div class="w-100" id="videoContainer">
                <div id="videoElement" class="w-100"></div>
            </div>
        </div>

        <div id="info-funcionario" class="mt-5 container flex-column justify-content-center align-items-center vw-100 d-none">
            <h1 class="text-center mt-5">
                Bienvenido/a
            </h1>

            <h1 id="nombre-funcionario" class="text-center text-danger mb-4">
                
            </h1>

            <h2 id="cedula-funcionario" class="text-center mb-4">
                
            </h2>

            <div class=" text-center justify-content-center">
                <img class="imagen-logo" width="150" src="{{ asset('/img/logo_nissei.png') }}" alt="">
            </div>
        </div>

        <div id="info-ingresado" class="mt-2 container flex-column justify-content-center align-items-center vw-100 d-none">
            <h1 class="h1-block text-danger">
                <i class="bi bi-ban"></i>
            </h1>

            <h1 id="nombre-ingresado" class="text-center w-100">
                
            </h1>

            <h1 id="mensaje-ingresado" class="text-center mb-5 w-100 text-danger">
                Ya ingresó
            </h1>

            <h2 id="cedula-ingresado" class="text-center w-100">
                
            </h2>

            <div class=" text-center justify-content-center">
                <img class="imagen-logo" width="150" src="{{ asset('/img/logo_nissei.png') }}" alt="">
            </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
        <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/toastify-js"></script>

        <script src="https://code.jquery.com/jquery-3.7.1.min.js" integrity="sha256-/JqT3SQfawRcv/BIHPThkBvs0OEvtFFmqPF/lYI/Cxo=" crossorigin="anonymous"></script>

        @if (session('success'))
            <script>
                addEventListener("load", () => {
                    Toastify({
                        text: "{{ session('success') }}",
                        duration: 3000,
                        destination: "{{ session('destination') }}",
                        newWindow: true,
                        close: true,
                        gravity: 'bottom',
                        position: 'right',
                        stopOnFocus: true,
                        style: {
                            background: 'linear-gradient(to right, #00b09b, #96c93d)',
                        },
                        onClick: function() {}
                    }).showToast();
                });
            </script>
        @endif

        @if (session('error'))
            <script>
                window.addEventListener('load', () => {
                    Toastify({
                        text: "{{ session('error') }}",
                        duration: 3000,
                        destination: "",
                        newWindow: true,
                        close: true,
                        gravity: "bottom",
                        position: "right",
                        stopOnFocus: false,
                        style: {
                            background: "linear-gradient(to right, #ff0000, #ffd700)",
                        },
                        onClick: function(){}
                    }).showToast();
                })
            </script>
        @endif

        <script>
            window.addEventListener('load', () => {
                document.getElementById("fullscreen-btn").addEventListener("click", function() {
                    if (!document.fullscreenElement) {
                        document.documentElement.requestFullscreen().catch((err) => {
                            alert(`Error al intentar activar pantalla completa: ${err.message} (${err.name})`);
                        });
                    } else {
                        document.exitFullscreen();
                    }
                });
            })
        </script>

    </body>
</html>
