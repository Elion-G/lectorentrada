import {Html5QrcodeScanner} from "html5-qrcode";

window.addEventListener('DOMContentLoaded', () => {
    var lastResult, countResults = 0;
    const formElement = document.querySelector('form[action="buscar-funcionario"]');
    const cinInput = formElement.querySelector('input[name="cin"]');

    function onScanSuccess(decodeText, decodeResult) {
        if (decodeText !== lastResult) {
            lastResult = decodeText;

            cinInput.value = decodeText;

            formElement.submit();

        }
    }

    var html5Scanner = new Html5QrcodeScanner(
        "videoElement", { fps:10, qrbox:500, rememberLastUsedCamera: true }
    )

    html5Scanner.render(onScanSuccess);
});