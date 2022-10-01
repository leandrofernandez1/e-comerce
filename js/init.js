const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
//Entrega 4
const usuario = document.querySelector("#usuario");

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

/* // Entrega 2
const usuario = document.getElementById("usuario");
usuario.innerHTML = ""

window.addEventListener("DOMContentLoaded", () => {
    usuario.innerHTML = localStorage.getItem("text");
}
); */

//Entrega 4
usuario.innerHTML += `<div class="dropdown">
<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  ${localStorage.getItem("text")}
</button>
<ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
  <li><a class="dropdown-item" onCLick="carrito()">Mi Carrito</a></li>
  <li><a class="dropdown-item" onCLick="perfil()">Mi perfil</a></li>
  <li><a class="dropdown-item" onCLick="cerrarSesion()">Cerrar Sesión</a></li>
</ul>
</div>`


const carrito = () => {
    location.replace("cart.html");
}

const perfil = () => {
  location.replace("my-profile.html");
}

const cerrarSesion = () => {
  location.replace("index.html");
  localStorage.clear();
}


