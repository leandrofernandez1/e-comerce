
const productsInfo = `${PRODUCT_INFO_URL}${localStorage.getItem("productoID")}${EXT_TYPE}`;
const container = document.querySelector("#container");
const comentarios = `${PRODUCT_INFO_COMMENTS_URL}${localStorage.getItem("productoID")}${EXT_TYPE}`;
const contComentarios = document.querySelector("#listaComentarios");
const enviarComentario = document.querySelector("#enviarComentario");
const comentarioTexto = document.querySelector("#comentarioTexto");
const select = document.querySelector("#select");


fetch(productsInfo)
.then (resultado => {
    return resultado.json();
})
 .then (datos => {
    container.innerHTML += `<h1>${datos.name}</h1><hr>
                            <div>
                            <p><b>Precio:</b></p> 
                            <p>${datos.cost}</p>
                            </div>
                            <div>
                            <p><b>Descripción:</b></p> 
                            <p>${datos.description}</p>
                            </div>
                            <div>
                            <p><b>Categoría:</b></p> 
                            <p>${datos.category}</p>
                            </div>
                            <div>
                            <p><b>Cantidad de vendidos:</b></p> 
                            <p>${datos.soldCount}</p>
                            </div>
                            <p><b>Imagenes ilustrativas:</b></p>
                            `
                            for (let imagen of datos.images){
                            container.innerHTML += `<img src="${imagen}" id="imgProductos"></img>`
                            }



});



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
  


     

