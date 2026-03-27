
let fullOp = '';

let operador = true;

let punto = true

let igual = true;

let resultados = []

let operacion = []

let hora = []

let bloqueado = false;

resultados = JSON.parse(localStorage.getItem("historial")) || [];
operacion = JSON.parse(localStorage.getItem("operacion")) || [];
hora = JSON.parse(localStorage.getItem("hora")) || [];


const btn = document.querySelector(".btn-historial");

function actualizarEstado() {
    const btn = document.getElementById("btnHistorial");

    // Bloquear o desbloquear según el booleano
    btn.disabled = bloqueado;

    // Evento click
    btn.addEventListener("click", () => {
    if (bloqueado) return; // seguridad

    window.location.href = "historial.html";
    });
}

function handleClick(number){

        fullOp = fullOp + number;
        shownumber(fullOp)
        bloqueado = true
         actualizarEstado()
         operador = true;

}

function handleClick_dot(number){
    if(punto == true){

        fullOp = fullOp + number;
        shownumber(fullOp)
        punto = false;
        bloqueado = true
         actualizarEstado()

    }
}

function handleClickoperator(op){
    if (operador){
        fullOp = fullOp + op;
        shownumber(fullOp)
        operador = false;
        punto = true;
        bloqueado = true
        actualizarEstado() 
    }
}


function borrar(){

    shownumber('')
    fullOp = '';
    operador=true;
    punto = true;
    showresult("")
    bloqueado = false

     actualizarEstado()

}

function borraruno(){
    fullOp = fullOp.slice(0, -1);
    shownumber(fullOp)
    operador = true;
    punto = true

}

function calculate(){
    let a, op, b;
    const match = fullOp.match(/^(-?\d+\.?\d*)([\+\-\*\/\^])(-?\d+\.?\d*)$/);

    if (match) {
    [, a, op, b] = match;

    if (
        !isNaN(a) &&
        !isNaN(b) 
    ) {
        igual = true;
      }
    } 
    
    else {
        igual = false;
    }

    if(igual){
        console.log("Entro al if de igual")
        const operacionCompleta = fullOp; // guardamos la operación antes de cambiar fullOp
        operacion.push(operacionCompleta);
        localStorage.setItem("operacion", JSON.stringify(operacion));
        switch(op){
            case"+":
                res = Number(a) + Number(b);
                res = Number(res.toFixed(5));
                operador = true;
                fullOp = res;
            break
            
            case"-":
                res = Number(a) - Number(b);
                res = Number(res.toFixed(5));
                operador = true;
                fullOp = res;
            break
            
            case"*":
                res = Number(a) * Number(b);
                res = Number(res.toFixed(5));
                operador = true;
                fullOp = res;
            break
            
            case"/":
                res = Number(a) / Number(b);
                res = Number(res.toFixed(5));
                operador = true;
                fullOp = res;
            break
            
            case"^":
                res = Number(a) ** Number(b);
                res = Number(res.toFixed(5));
                operador = true;
                fullOp = res;
            break
            
            default:
                break;
            }
            showresult(res)

    }
}

function shownumber(n){
    document.getElementById("screen").innerHTML = n
}

function showresult(n){
    bloqueado = false
    actualizarEstado()
    document.getElementById("resultado").innerHTML = n
    resultados.push(n);
    localStorage.setItem("historial", JSON.stringify(resultados));
    ahora = new Date();
    hora.push(ahora.toLocaleString())
    localStorage.setItem("hora", JSON.stringify(hora));
}


actualizarEstado()