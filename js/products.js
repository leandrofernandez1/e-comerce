const contenedor = document.querySelector("#cont-products");
// Entrega 2
const product = localStorage.getItem("catID");
const API = `${PRODUCTS_URL}${product}${EXT_TYPE}`;
const btnFiltrar = document.querySelector("#btnFiltrar");
const btnPrecioMax = document.querySelector("#btnPrecioMax");
const btnPrecioMin = document.querySelector("#btnPrecioMin");
const relevancia = document.querySelector("#relevancia");
const precioMax = document.querySelector("#precioMax");
const precioMin = document.querySelector("#precioMin");
const inputBuscar = document.querySelector("#search");
//

function limpiar() {
    contenedor.innerHTML = "";
}


document.addEventListener("DOMContentLoaded", () => {
    obtenerProductos();
})

function mostrarElementos(dato) {
    for (let producto of dato) {

        const { id, image, name, cost, currency, description, soldCount } = producto;

        contenedor.innerHTML +=

            `<button class="productos" onclick="setPoductoID(${id})">
<div class="producto">
<img id="imagen" src="${image}" />
<div class="pContenido text-start">${name} -  ${cost} ${currency}
<br>
<div id="pDes">${description}</div>
<div class="vendidos">
Vendidos: ${soldCount}
</div>
</div>
</div>
</button>`;
    }
}


function obtenerProductos() {
    fetch(API)
        .then(resultado => {
            return resultado.json();
        })
        .then(datos => {
            const productos = datos.products;
            mostrarElementos(productos)

            //Entrega 2
            relevancia.addEventListener("click", () => {
                productos
                    .sort((a, b) => {
                        if (a.soldCount < b.soldCount) return 1;
                        if (a.soldCount > b.soldCount) return -1;
                        return 0;
                    })
                contenedor.innerHTML = "";
                mostrarElementos(productos);
            })

            btnPrecioMax.addEventListener("click", () => {
                productos
                    .sort((a, b) => {
                        if (a.cost < b.cost) return 1;
                        if (a.cost > b.cost) return -1;
                        return 0;
                    })
                contenedor.innerHTML = "";
                mostrarElementos(productos);
            })

            btnPrecioMin.addEventListener("click", () => {
                productos
                    .sort((a, b) => {
                        if (a.cost < b.cost) return -1;
                        if (a.cost > b.cost) return 1;
                        return 0;
                    })
                contenedor.innerHTML = "";
                mostrarElementos(productos);

            })

            btnFiltrar.addEventListener("click", () => {
                let precioFiltrado = productos.filter((precio) => precio.cost >= precioMin.value && precio.cost <= precioMax.value);
                contenedor.innerHTML = "";
                mostrarElementos(precioFiltrado);

            })

            //buscador-Desafiate 2
            inputBuscar.addEventListener("input", (e) => {

                limpiar();

                for (let producto of productos) {
                    let nombre = producto.name.toLowerCase();
                    let description = producto.description.toLowerCase();
                    const valor = e.target.value;

                    if (nombre.includes(valor) || description.includes(valor)) {
                        const { id, image, name, cost, currency, description, soldCount } = producto;

                        contenedor.innerHTML += `<button class="productos" onclick="setPoductoID(${id})">
                    <div class="producto">
                    <img id="imagen" src="${image}" />
                    <div class="pContenido">${name} -  ${cost} ${currency}
                    <br>
                    <div id="pDes">${description}</div>
                    <div class="vendidos">
                    Vendidos: ${soldCount}
                    </div>
                    </div>
                    </div>
                    </button>`
                    }
                    else if (valor.length === 0) {
                        limpiar();
                        mostrarElementos(productos);
                    }

                }

            })


        })


}



// Entrega 3

function setPoductoID(id) {
    localStorage.setItem("productoID", id);
    window.location = "product-info.html"
}


