<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>FFA</title>

        {{-- @vite(['resources/js/qrcode.js']) --}}
    </head>
    <body>
        
        <h1 id="h1Element">
            Default
        </h1>
        <div id="videoElement" style="width: 500px;">

        </div>

        <script src="https://unpkg.com/html5-qrcode"></script>

        <script>

            var lastResult, countResults = 0;
            const videoElem = document.getElementById('videoElement');
            const h1Elem = document.getElementById('h1Element');

            function onScanSuccess(decodeText, decodeResult) {
                if (decodeText !== lastResult) {
                    ++countResults;
                    lastResult = decodeText

                    h1Elem.innerHTML = decodeText;

                }
            }

            var html5Scanner = new Html5QrcodeScanner(
                "videoElement", { fps:10, qrbox:250 }
            )

            html5Scanner.render(onScanSuccess);
        </script>

    </body>
</html>
