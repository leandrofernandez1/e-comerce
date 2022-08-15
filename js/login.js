const contenedor = document.querySelector(".mt-5");
contenedor.innerHTML = "";


contenedor.innerHTML += `
                            <div><img id="img" src="img/login.png"/></div>
                            <div>
                            <div class="formulario">
                             <legend class="legend">Inicio de sesión</legend>
                              <div class="contenido-formulario">    
                                  <div class="label"><label for="email">Email</label></div>
                                  <input id="email" type="e-mail" placeholder="Email" name="email" class="formulario_campos">
                                  <div class="label"><label for="contraseña">Contraseña</label></div>
                                  <input id="contraseña" type="password" placeholder="Contraseña" name="contraseña" class="formulario_campos"></div>   
                                  <input type="submit" value="Ingresar" class="boton"></input>
                            </div>
                            </div>`;

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
      location.replace("https://leandrofernandez1.github.io/e-comerce/")
   }
})
