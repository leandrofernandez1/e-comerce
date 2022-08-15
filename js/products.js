const API = "https://japceibal.github.io/emercado-api/cats_products/101.json"; 
const contenedor = document.querySelector(".pb-5")


function obtenerProductos(){
    fetch(API)
    .then (resultado => {
        return resultado.json();
    })
     .then (datos => {
        const productos = datos.products;
        contenedor.innerHTML = `<p class="titulo">Productos</p> <br> 
                                <p class="sub-titulo">Verás aqui todos los productos de la categoría <span class="sp">Autos</span></p>` 
        for(let producto of productos){
            console.log(producto)
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
        
        
    })
 
     
}
obtenerProductos(); 


