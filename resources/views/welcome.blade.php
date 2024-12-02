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
    <style>
        @font-face {
            font-family: "Amplesoft_Bold";
            src: url("/fonts/AMPLESOFT_BOLD.ttf");
        }

        * {
            font-family: Amplesoft_Bold !important;
        }

        .text-center {
            font-size: 5rem;
            font-family: Amplesoft_Bold !important;
            z-index: 999 !important;
        }

        .imagen-logo {
            margin-top: 20vh;
            width: 15rem !important;
        }

        .h1-block {
            font-size: 15rem;
            z-index: 0 !important;
        }

        .info-container {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            text-align: center;
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            display: none;
        }
    </style>
</head>
<body>
    <form action="buscar-funcionario" method="POST">
        @csrf
        <input type="hidden" name="cin">
    </form>

    <!-- Escáner de QR -->
    <div class="mt-5 container d-flex flex-column align-items-center" id="videoContainer">
        <div class="w-100" id="videoElement"></div>
    </div>

    <!-- Contenedor de información dinámico -->
    <div id="infoContainer" class="info-container"></div>

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

</body>
</html>
