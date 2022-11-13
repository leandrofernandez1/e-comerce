// Constantes y varialbes
const formulario = document.querySelector(".formulario");
const boton = document.querySelector(".boton");
const email = document.querySelector("#email");
const contraseña = document.querySelector("#contraseña");

// Eventos
boton.addEventListener("click", function(e){
  
   if (email.value.length == 0 || contraseña.value.length == 0){
      error("Todos los campos son obligatorios");
   }
   else if(!(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email.value))){
      error("Email invalido"); 
   }
   else {
      location.replace("index2.html");
   }
})

// Entrega 2
boton.addEventListener("click", (evt) => {
   if (email.value) localStorage.setItem("usuario", email.value)
   }
 );

 // Funciones
 function error (mensaje){
   const error = document.createElement("P");
   error.textContent = mensaje;
   error.classList.add("error");
   formulario.appendChild(error);
   setTimeout(() => {
     error.remove();
   }, 2000);
}
