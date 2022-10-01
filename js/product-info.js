
const productsInfo = `${PRODUCT_INFO_URL}${localStorage.getItem("productoID")}${EXT_TYPE}`;
const container = document.querySelector("#container");
const comentarios = `${PRODUCT_INFO_COMMENTS_URL}${localStorage.getItem("productoID")}${EXT_TYPE}`;
const contComentarios = document.querySelector("#listaComentarios");
const enviarComentario = document.querySelector("#enviarComentario");
const comentarioTexto = document.querySelector("#comentarioTexto");
const select = document.querySelector("#select");
const contProductosRelacionados = document.querySelector(".productos-relacionados");

// Fetch prodcts-info
fetch(productsInfo)
.then (resultado => {
    return resultado.json();
})
 .then (datos => {
    const { name, cost, description, category, soldCount, images, relatedProducts } = datos;
    let htmlContentToAppend =  "";
    htmlContentToAppend += `<h1>${name}</h1><hr>
                            <div>
                            <p><b>Precio:</b></p> 
                            <p>${cost}</p>
                            </div>
                            <div>
                            <p><b>Descripción:</b></p> 
                            <p>${description}</p>
                            </div>
                            <div>
                            <p><b>Categoría:</b></p> 
                            <p>${category}</p>
                            </div>
                            <div>
                            <p><b>Cantidad de vendidos:</b></p> 
                            <p>${soldCount}</p>
                            </div>
                            <p><b>Imagenes ilustrativas:</b></p>
                            `

                            //Desafiate 4
                            htmlContentToAppend += `
                            <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
                            <div class="carousel-inner">
                              <div class="carousel-item active">
                                <img src="${images[0]}" class="d-block w-100">
                              </div>`

                               
                              for (let i = 1; i < images.length; i++){
                              htmlContentToAppend += `<div class="carousel-item">
                                <img src="${images[i]}" class="d-block w-100">
                              </div>`
                              }

                              htmlContentToAppend += 
                            `</div>
                            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Previous</span>
                            </button>
                            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                              <span class="carousel-control-next-icon" aria-hidden="true"></span>
                              <span class="visually-hidden">Next</span>
                            </button>
                            </div>` 

                            container.innerHTML += htmlContentToAppend;
                                                   
//Entrega 4 Producto relacionado
for (let productoRelacionado of relatedProducts){
    const { name, image, id } = productoRelacionado;
    contProductosRelacionados.innerHTML += `
                       <button class="btnProductosRelacionados" onclick="setPoductoID(${id})">
                       <img src="${image}" class="imgProductosRelacionados"></img>
                       <p>${name}</p>
                       </button>
                       `
}
                                        
                                                                              

});


// Fetch comentarios
fetch(comentarios)
.then (resultado => {
    return resultado.json();
})
.then (comentarios => {
    contComentarios.innerHTML += `<br><hr>
                            <h2>Comentarios</h2> 
                           `
                           for (let comentario of comentarios){
                            
                            contComentarios.innerHTML += `<li class="li"><b>${comentario.user}</b> - ${comentario.dateTime}<br>`
                            contComentarios.innerHTML += `<li class="li">${comentario.description}</li>`;
                            contComentarios.innerHTML += `<li class="li">Calificación:</li>`;
                            for (let i = 1; i <= comentario.score; i++){
                                contComentarios.innerHTML += `<span class="fa fa-star checked"></span>`

                            }
                            for (let i = 4; i >= comentario.score; i--){
                                contComentarios.innerHTML += `<span class="fa fa-star"></span>`
                            }
                            
                           } 
                        
    
})


// Desafiate 3
enviarComentario.addEventListener("click", () => {
    let calificacion = select.options[select.selectedIndex].value;
    let today = new Date();
    let now = today.toLocaleString();
    const user = localStorage.getItem("text");
    contComentarios.innerHTML += `<li class="li"><b>${user}</b> - ${now}</li>`  
    contComentarios.innerHTML += `<li class="li">${comentarioTexto.value}</li>`;
    contComentarios.innerHTML += `<li class="li">Calificación:</li>`;
    for (let i = 1; i <= calificacion; i++){
        contComentarios.innerHTML += `<span class="fa fa-star checked"></span>`

    }
    for (let i = 4; i >= calificacion; i--){
        contComentarios.innerHTML += `<span class="fa fa-star"></span>`
    }                          
})
  

// Entrega 4

function setPoductoID(id) {
    localStorage.setItem("productoID", id);
    window.location = "product-info.html"
}

     

