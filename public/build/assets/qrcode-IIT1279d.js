window.addEventListener("DOMContentLoaded",()=>{var r;const o=document.querySelector('form[action="buscar-funcionario"]').querySelector('input[name="cin"]'),s=document.getElementById("videoContainer"),t=document.createElement("div");t.classList.add("info-container"),t.style.display="none",document.body.appendChild(t);async function i(n){try{return await new Promise((e,m)=>{$.ajax({url:"/lectorffa/buscar-funcionario",method:"POST",timeout:-1,headers:{"X-CSRF-TOKEN":$('meta[name="csrf-token"]').attr("content")},contentType:"application/json",data:JSON.stringify({cin:n}),success:c=>{e(c)},error:(c,y,l)=>{alert(l.message),m(new Error(`Error: ${y}, ${l}`))}})})}catch(a){return alert(`Error en la solicitud: ${a.message}`),alert("Hubo un error al procesar la solicitud."),null}}async function u(n,a){if(n!==r){r=n,o.value=n;try{const e=await i(o.value);e&&e.success?d(e.nombre,e.cedula):alert((e==null?void 0:e.message)||"No se encontró la persona.")}catch{alert("Hubo un problema al buscar al funcionario.")}}}function d(n,a){s.style.display="none",t.innerHTML=`
            <h1 class="text-center">Bienvenido/a</h1>
            <h2 class="text-center">${n}</h2>
            <h3 class="text-center">${a}</h3>
        `,t.style.display="block",setTimeout(()=>{t.style.display="none",s.style.display="block"},8e3)}new Html5QrcodeScanner("videoElement",{fps:10,qrbox:500,rememberLastUsedCamera:!0}).render(u)});