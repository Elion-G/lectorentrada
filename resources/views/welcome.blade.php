<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>FFA</title>

        @vite(['resources/js/qrcode.js'])
    </head>
    <body>
        
        <h1 id="h1Element">
            Default
        </h1>
        <video id="videoElement"></video>

    </body>
</html>
