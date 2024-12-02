<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>FFA</title>

        @vite(['resources/css/style.css'])
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">

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
                z-index:999 !important;
            }

            .imagen-logo {
                margin-top: 20vh;
                width: 15rem !important;
            }

            .container {
                margin-top: 25vh;
            }

            .h1-block {
                position: absolute !important; 
                font-size:35rem; 
                z-index:0 !important; 
                color: red; top:7%;
            }
        </style>
    </head>
    <body>

        @if (!empty($ingresado))
            <div class="container d-flex flex-column justify-content-center align-items-center vw-100">
                @if (!empty($nombre))
                    <h1 class="text-center">
                        Bienvenido/a
                    </h1>

                    <h1 class="text-center mb-4">
                        {{ $nombre }}
                    </h1>

                    <h2 class="text-center mb-4">
                        {{ $cedula }}
                    </h2>
                @else
                    <h1 class="text-center">
                        Bienvenido/a
                    </h1>

                    <h1 class="text-center mb-5">
                        Elias Gonzalez
                    </h1>

                    <h2 class="text-center">
                        12345678
                    </h2>
                @endif
                
                <div class=" text-center justify-content-center">
                    <img class="imagen-logo" width="150" src="{{ asset('/img/logo_nissei.png') }}" alt="">
                </div>
                
            </div>
        @else
            <div class="container d-flex flex-column justify-content-center align-items-center vw-100">
                @if (!empty($nombre))
                    <h1 class="text-center mb-4 w-100">
                        <i class="bi bi-ban"></i>
                    </h1>

                    <h1 class="text-center w-100">
                        {{ $nombre }}
                    </h1>

                    <h1 class="text-center mb-4 w-100">
                        Ya ingresó
                    </h1>

                    <h2 class="text-center mb-4 w-100">
                        {{ $cedula }}
                    </h2>
                @else
                    <h1 class="h1-block mb-4 w-100">
                        <i class="bi bi-ban"></i>
                    </h1>

                    <h1 class="text-center w-100">
                        Elias Gonzalez
                    </h1>

                    <h1 class="text-center mb-5 w-100">
                        Ya ingresó
                    </h1>

                    <h2 class="text-center w-100">
                        12345678
                    </h2>
                @endif
                
                <div class=" text-center justify-content-center w-100">
                    <img class="imagen-logo" width="150" src="{{ asset('/img/logo_nissei.png') }}" alt="">
                </div>
                
            </div>
        @endif

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>

        <script>
            // window.addEventListener('load', () => {
            //     setInterval(() => {
            //         window.location.href = "{{ route('welcome') }}";
            //     }, 5000);
            // });
        </script>

    </body>
</html>
