
let fullOp = '';

let operador = true;

let punto = true

let resultados = []

let operacion = []

let hora = []

let i = 0


let bloqueado = false;

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
        console.log(number)
        fullOp = fullOp + number;
        shownumber(fullOp)
        bloqueado = true
         actualizarEstado()
}

function handleClick_dot(number){
    if(punto == true){
        console.log(number)
        fullOp = fullOp + number;
        shownumber(fullOp)
        punto = false;
        bloqueado = true
         actualizarEstado()
    }
}

function handleClickoperator(op){
    if (operador){
        console.log(fullOp)
        fullOp = fullOp + op;
        shownumber(fullOp)
        operador = false;
        punto = true;
        bloqueado = true
         actualizarEstado()
    }
}

function borrar(){
    console.log('')
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
    const operacionCompleta = fullOp; // guardamos la operación antes de cambiar fullOp
    operacion.push(operacionCompleta);
    localStorage.setItem("operacion", JSON.stringify(operacion));
    const [a,op,b] = fullOp.split(/(\+|-|\*|\/|\^)/gm);
        console.log({a,op,b});
   
        switch(op){
            case"+":
                res = Number(a) + Number(b);
                operador = true;
                fullOp = res;
            break

            case"-":
                res = Number(a) - Number(b);
                operador = true;
                fullOp = res;
            break

            case"*":
                res = Number(a) * Number(b);
                operador = true;
                fullOp = res;
            break

            case"/":
                res = Number(a) / Number(b);
                operador = true;
                fullOp = res;
            break

            case"^":
                res = Number(a) ** Number(b);
                operador = true;
                fullOp = res;
            break

            default:
                break;
        }
        showresult(res)

}

function shownumber(n){
    document.getElementById("screen").innerHTML = n
}

function showresult(n){
    bloqueado = false
    actualizarEstado()
    document.getElementById("resultado").innerHTML = n
    resultados[i] = n;
    console.log(resultados[i]);
    localStorage.setItem("historial", JSON.stringify(resultados));
    ahora = new Date();
    hora[i] = ahora.toLocaleString()
    localStorage.setItem("hora", JSON.stringify(hora));
    i ++ ;
    
}


     actualizarEstado()