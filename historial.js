let resultados = JSON.parse(localStorage.getItem("historial")) || [];
let operacion = JSON.parse(localStorage.getItem("operacion")) || [];
let hora = JSON.parse(localStorage.getItem("hora")) || [];


function mostrarhistorial() {
    let contenedor = document.getElementById("cards");
    contenedor.innerHTML = "";

    for (let i = 0; i < resultados.length; i++) {
        let res = resultados[i];
        let oh = hora[i];
        let op = operacion[i];


        let clase = "";

        if (i % 3 === 0) clase = "card";
        else if (i % 3 === 1) clase = "card white";
        else clase = "card green";

        contenedor.innerHTML += `
            <div class="${clase}">
                <p class="time"> ${oh}</p>
                <p class="operation"> ${op}</p>
                <h2>= ${res}</h2>
            </div>
        `;
    }
}

function borrarhistorial(){
    localStorage.removeItem("historial");
    localStorage.removeItem("operacion");
    localStorage.removeItem("hora");
    location.reload(true);
    mostrarhistorial();
}

mostrarhistorial();