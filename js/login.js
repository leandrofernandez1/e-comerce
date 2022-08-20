
const formulario = document.querySelector(".formulario");
const boton = document.querySelector(".boton");
const email = document.querySelector("#email");
const contraseña = document.querySelector("#contraseña");


function error (){
   const error = document.createElement("P");
   error.textContent = "Todos los campos son obligatorios";
   error.classList.add("error");
   formulario.appendChild(error);
   setTimeout(() => {
     error.remove();
   }, 2000);
}


boton.addEventListener("click", function(e){
   if (email.value.length == 0 || contraseña.value.length == 0){
      error();
   }
   else {
      location.replace("https://leandrofernandez1.github.io/e-comerce/index2.html")
   }
})
