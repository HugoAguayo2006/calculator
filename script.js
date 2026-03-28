
let fullOp = '';

let operador = true;

let operador_negativo = true;

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


function regrex() {
    const numero = "-?(?:\\d+(?:\\.\\d*)?|\\.\\d+)";
    const match = fullOp.match(new RegExp(`^(${numero})([\\+\\-\\*\\/\\^])(${numero})?$`));

    if (!match) return null;

    const [, a, op, b] = match;
    return [a, op, b];
}

function actualizarEstado() {
    const btn = document.getElementById("btnHistorial");


    btn.disabled = bloqueado;

    btn.addEventListener("click", () => {
    if (bloqueado) return; 

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
    const ultimo = String(fullOp).slice(-1);
    const ultimoEsOperador = /[\+\-\*\/\^]/.test(ultimo);


    if (fullOp === "") {
        if (op === "-") {
            fullOp += op;
            shownumber(fullOp);
            bloqueado = true;
        }
        actualizarEstado();
        return;
    }

    if (ultimoEsOperador) {
        if (op === "-" && /[\+\*\/\^]/.test(ultimo)) {
            fullOp += op;
            shownumber(fullOp);
            bloqueado = true;
            punto = true;
        }
        actualizarEstado();
        return;
    }

    fullOp += op;
    shownumber(fullOp);
    operador = false;
    punto = true;
    bloqueado = true;
    actualizarEstado();

}


function borrar(){

    shownumber('')
    fullOp = '';
    operador=true;
    punto = true;
    document.getElementById("resultado").innerHTML = "";
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

    const numero = "-?(?:\\d+(?:\\.\\d*)?|\\.\\d+)";
    const match = fullOp.match(new RegExp(`^(${numero})([\\+\\-\\*\\/\\^])(${numero})$`));

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
        const operacionCompleta = fullOp; 
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
