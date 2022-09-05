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


function obtenerProductos(){
    fetch(API)
    .then (resultado => {
        return resultado.json();
    })
     .then (datos => {
        const productos = datos.products;
        mostrarElementos(productos)
    })      
}

document.addEventListener ("DOMContentLoaded", () => {
    obtenerProductos(); 
    ordenar ();
})

function mostrarElementos(dato){
for(let producto of dato){
contenedor.innerHTML += `<div class="producto">
<img id="imagen" src="${producto.image}" />
<div class="pContenido">${producto.name} -  ${producto.cost} ${producto.currency}
<br>
<div id="pDes">${producto.description}</div>
<div class="vendidos">
Vendidos: ${producto.soldCount}
</div>
</div>
</div>`;       
}       
}




// Entrega 2

function ordenar () {
fetch(API)
.then (resultado => {
    return resultado.json();
})
 .then (datos => {
    const productos = datos.products;
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
    
    /* inputBuscar.addEventListener("input", (e) => {
        
        for(let producto of productos){
            let nombre = producto.name.toLowerCase();
            if (nombre.indexOf(e.target.value) !== -1)
            {      
                console.log(producto);
            }    
        } 
         
    }) */
    
})     

}



//



