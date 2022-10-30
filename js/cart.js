const tbody = document.querySelector("#tbody");
const transferencia = document.querySelector("#Transferencia");
const inputCuentaBanco = document.querySelector("#cuenta-banco");
const inputNumeroTarjeta = document.querySelector("#numero-tarjeta");
const inputCodigo = document.querySelector("#codigo");
const inputvencimiento = document.querySelector("#vencimiento");
const tarjeta = document.querySelector("#tarjeta");
const subTotal = document.querySelector("#subTotal");
const costoEnvio = document.querySelector("#costoEnvio");
const inputEnvioPremium = document.querySelector("#premium");
const inputEnvioExpres = document.querySelector("#expres");
const inputEnvioStandard = document.querySelector("#standard");
const formularioDeEnvio = document.querySelector("#formularioDeEnvio");
const totalCompra = document.querySelector("#totalCompra");
const btnFinalizarCompra = document.querySelector("#btnFinalizarCompra");
const inputCalle = document.querySelector("#calle");
const inputNumero = document.querySelector("#numero");
const inputEsquina = document.querySelector("#esquina");
const inputsEnvio = document.querySelectorAll('input[name="envio"]');


let arrCarrito = [];

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {

    let itemsCarrito = localStorage.getItem("carrito");
    let itemsCarr = JSON.parse(itemsCarrito);
    arrCarrito = arrCarrito.concat(itemsCarr);
    showProducts(arrCarrito);
  }

})

//Desafiate 5 Muestro los productos del carrito
const showProducts = (items) => {

  let i = -1;
  let sub = 0
  for (let producto of items) {
    i++;
    let { name, currency, unitCost, image, costoDolares, count } = producto

    const tbody = document.querySelector("#tbody");

    if (costoDolares == undefined) {
      costoDolares = unitCost;
    }

    let append = ``;
    append += `<tr>
                    <td>
                      <img src="${image}" width="30px">
                    </td>
                    <td>
                      ${name}
                    </td>
                    <td>
                      <span class="costo">${unitCost}</span> <span class="currency">${currency}</span>
                    </td>
                    <td>
                      <input type="number" class="input" min="1" size="5" 
                      oninput="itemsCarrito(${i}, ${costoDolares}),
                      calculoPrecios()" value="${count}"></input>
                    </td>
                    <td>
                      <span class="span">${costoDolares}</span>
                      <span> USD</span>  
                      <button onclick="borrar(${i})">E</button> 
                    </td>
                </tr>`
    tbody.innerHTML += append;

    sub += costoDolares;

    subTotal.textContent = sub.toFixed(2) + " USD";

  }

  totalCompra.textContent = subTotal.textContent + costoEnvio.textContent;

}


formularioDeEnvio.addEventListener("change", () => {
  let elementoActivo = document.querySelector('input[name="envio"]:checked').value;
  let sub = document.querySelector("#subTotal").textContent;
  let subParseado = parseInt(sub);
  if (elementoActivo == `premium`) {
    costoEnvio.innerHTML = subParseado * 0.15 + " USD";
    totalCompra.innerHTML = (subParseado * 0.15) + subParseado + " USD";
  } else if (elementoActivo == `expres`) {
    costoEnvio.innerHTML = subParseado * 0.07 + " USD";
    totalCompra.innerHTML = (subParseado * 0.07) + subParseado + " USD";
  } else if (elementoActivo == `standard`) {
    costoEnvio.innerHTML = subParseado * 0.05 + " USD";
    totalCompra.innerHTML = (subParseado * 0.05) + subParseado + " USD";
  }
})



const calculoPrecios = () => {
  let span = document.querySelectorAll(".span");
  let precio = 0;
  let sub = [];
  for (let valores of span) {
    let valor = parseInt(valores.textContent)
    sub.push(valor);
  }
  sub.forEach(function (precios) {
    precio += precios;
  })
  subTotal.textContent = precio + " USD";


  let elementoActivo = document.querySelector('input[name="envio"]:checked');
  if (elementoActivo === null) {
    totalCompra.textContent = "seleccione un metodo de envio";
    costoEnvio.textContent = "seleccione un metodo de envio";
  } else {
    if (elementoActivo.value == `premium`) {
      costoEnvio.textContent = precio * 0.15 + " USD";
      totalCompra.textContent = (precio * 0.15) + precio + " USD";
    } else if (elementoActivo.value == `expres`) {
      costoEnvio.textContent = precio * 0.07 + " USD";
      totalCompra.textContent = (precio * 0.07) + precio + " USD";
    } else if (elementoActivo.value == `standard`) {
      costoEnvio.textContent = precio * 0.05 + " USD";
      totalCompra.textContent = (precio * 0.05) + precio + " USD";
    }
  }
}



const itemsCarrito = (i, costos) => {
  let currency = document.querySelectorAll(".currency")[i].innerHTML;
  let inputs = (document.querySelectorAll(".input")[i].value * parseInt(costos));
  let span = document.querySelectorAll(".span")[i];
  let spanCurrency = document.querySelectorAll(".currency")[i];
  spanCurrency.textContent = currency;
  span.textContent = inputs;
}


//desafio 6
function borrar(i) {
  arrCarrito.splice(i, 1);
  tbody.innerHTML = ``;
  showProducts(arrCarrito);
  localStorage.setItem("carrito", JSON.stringify(arrCarrito));
  if (arrCarrito.length == 0) {
    localStorage.removeItem("carrito");
  }
}

document.querySelector("#borrar").addEventListener("click", () => {
  localStorage.removeItem("carrito");
  alert("Carrito Vaciado");
  location.replace("cart.html")
});
window.addEventListener("change", () => {
  metodoDePago();
})

function metodoDePago() {
  if (tarjeta.checked) {
    inputCuentaBanco.disabled = true;
    inputNumeroTarjeta.disabled = false;
    inputvencimiento.disabled = false;
    inputCodigo.disabled = false;
  } else if (transferencia.checked) {
    inputNumeroTarjeta.disabled = true;
    inputvencimiento.disabled = true;
    inputCodigo.disabled = true;
    inputCuentaBanco.disabled = false;
  }
}

btnFinalizarCompra.addEventListener("click", (e) => {
  e.preventDefault();
  //Inputs
  if (inputCalle.value == "") {
    inputCalle.classList.add("is-invalid");
  }else{
    inputCalle.classList.add("validado");
  }
  if (inputNumero.value == "") {
    inputNumero.classList.add("is-invalid");
  }else{
    inputNumero.classList.add("validado");
  }
  if (inputEsquina.value == "") {
    inputEsquina.classList.add("is-invalid");
  }else{
    inputEsquina.classList.add("validado");
  }

  //Radios
  if (document.querySelector("#premium").checked || document.querySelector("#expres").checked
    || document.querySelector("#standard").checked) {
      formularioDeEnvio.classList.add("validado");
  } else {
    const alerta = document.querySelector(".alerta1");
    if (alerta) {
      alerta.remove();
    }
    let error = document.createElement("P");
    error.textContent = "seleccione un metodo de envio";
    error.classList.add("text-danger", "alerta1");
    formularioDeEnvio.appendChild(error);
  }
 
  //Metodo de pago
  if (document.querySelector("#tarjeta").checked == false &&
    document.querySelector("#Transferencia").checked == false) {
      const alerta = document.querySelector(".alerta2");
      if (alerta) {
        alerta.remove();
      }
      let error = document.createElement("P");
      error.textContent = "seleccione una forma de pago";
      error.classList.add("text-danger", "alerta2");
      document.querySelector("#modal").appendChild(error);
  }else{
    document.querySelector(".modal-content").classList.add("validado");
  }
  if((inputNumeroTarjeta.value == "" || inputvencimiento.value == "" || inputCodigo.value == "")
  && (inputCuentaBanco.value == "")){
    const alerta = document.querySelector(".alerta3");
    if (alerta) {
      alerta.remove();
    }
    let error = document.createElement("P");
    error.textContent = "Campos Vacios";
    error.classList.add("text-danger", "alerta3");
    document.querySelector(".modal-body").appendChild(error);
  }else{
    document.querySelector(".modal-body").classList.add("validado");
  }


  if(inputCalle.classList.contains("validado") && 
  inputNumero.classList.contains("validado") && 
  inputEsquina.classList.contains("validado") &&
  formularioDeEnvio.classList.contains("validado") &&
  document.querySelector(".modal-content").classList.contains("validado") &&
  document.querySelector(".modal-body").classList.contains("validado")
  ){
    document.querySelector("#mensajeExito").classList.remove("visually-hidden")
    setTimeout(()=>{
      location.replace("index2.html");
      localStorage.removeItem("carrito");
    }, 3000)
  }

})


