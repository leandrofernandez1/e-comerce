const url_cart = CART_INFO_URL + 25801 + EXT_TYPE;
const container = document.querySelector("#container");
const articulos = document.querySelector("#articulos");
const img = document.querySelector("#img");
const nombre = document.querySelector("#nombre");
const costo = document.querySelector("#costo");
const inputCantidad = document.querySelector("#inputCantidad");
const subtotal = document.querySelector("#subtotal");
const productosAgregadosAlCarrito = `${PRODUCT_INFO_URL}${localStorage.getItem("item")}${EXT_TYPE}`;
const tbody = document.querySelector("#tbody");

let arrCarrito = [];
let arrCarritoConcatenado = [];

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("carrito")) {

    let itemsCarrito = localStorage.getItem("carrito");
    let itemsCarr = JSON.parse(itemsCarrito);
    arrCarrito = arrCarrito.concat(itemsCarr);
    
  }

})


function getdata(url) {
  fetch(url)
    .then(resultado => {
      return resultado.json();
    })
    .then(productosDelCarrito => {

      const { articles } = productosDelCarrito;
      //Concateno los dos arrays, el del JSON y el que arma el usuario
      
      arrCarritoConcatenado = [...articles, ...arrCarrito];

      showProducts(arrCarritoConcatenado);
                               
    })
}

getdata(url_cart);


//Desafiate 5
const showProducts = (items) => {
  
  let i = -1;

  for (let producto of items) {
    i++;
    const { name, currency, unitCost, image} = producto
    
    const tbody = document.querySelector("#tbody");
    
    let append = ``;
    append += `<tr>
                  <td><img src="${image}" width="30px"></td>
                  <td>${name}</td>
                  <td><span class="costo">${unitCost}</span> <span class="currency">${currency}</span></td>
                  <td><input type="number" class="input" min="1" size="5" oninput="itemsCarrito(${i})" value="1"></input></td>
                  <td><span class="span">${unitCost} ${currency}</span></td>
              </tr>`
  tbody.innerHTML += append;

}

}

const itemsCarrito = i => {
  let currency = document.querySelectorAll(".currency")[i].innerHTML;
  let costo = document.querySelectorAll(".costo")[i].innerHTML;
  let inputs = (document.querySelectorAll(".input")[i].value * parseInt(costo));
  let span = document.querySelectorAll(".span")[i];
  span.innerHTML = inputs + " " + currency;
}

/* function borrar(i){
  arrCarritoConcatenado.splice(i, 1);
    console.log(arrCarritoConcatenado);
    tbody.innerHTML = ``;
    showProducts(arrCarritoConcatenado);
    localStorage.setItem("carrito", JSON.stringify(arrCarritoConcatenado));
}

<button onclick="borrar(${i})">Eliminar</button>

*/

document.querySelector("#borrar").addEventListener("click", ()=>{
  localStorage.removeItem("carrito");
  alert("Carrito Vaciado");
  location.replace("cart.html")
});