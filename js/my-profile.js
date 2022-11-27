//Constantes y variables
const inputEmail = document.querySelector("#inputEmail");
const inputNombre = document.querySelector("#inputNombre");
const inputSegundoNombre = document.querySelector("#inputSegundoNombre");
const inputPrimerApellido = document.querySelector("#inputPrimerApellido");
const inputSegundoApellido = document.querySelector("#inputSegundoApellido");
const inputTelefono = document.querySelector("#inputTelefono");
const btnGuardarCambios = document.querySelector("#btnGuardarCambios");
const inputImg = document.querySelector("#inputImg");
const imgPerfil = document.querySelector("#imgPerfil");
const reader = new FileReader();

reader.onload = function (event) {
    imgPerfil.src = event.target.result;
    localStorage.setItem("imgPerfil", event.target.result);
};

//Eventos
document.addEventListener("DOMContentLoaded", () => {
    traerDatosDelUsuario();
})

btnGuardarCambios.addEventListener("click", () => {
    guardarDatosDelUsuario();
    validarInputs();
    if (document.getElementById("inputImg").files.length > 0) {
        reader.readAsDataURL(document.getElementById("inputImg").files[0]);
    }
})

//Funciones

function traerDatosDelUsuario() {
    inputEmail.value = localStorage.getItem("usuario");
    let primerNombre = localStorage.getItem("primerNombre");
    let segundoNombre = localStorage.getItem("segundoNombre");
    let primerApellido = localStorage.getItem("primerApellido");
    let segundoApellido = localStorage.getItem("segundoApellido");
    let numeroDeTelefono = localStorage.getItem("numeroDeTelefono");
    let img = localStorage.getItem("imgPerfil");
    if (localStorage.getItem("imgPerfil")) {
        imgPerfil.src = img;
    }

    inputNombre.value = primerNombre;
    inputSegundoNombre.value = segundoNombre;
    inputPrimerApellido.value = primerApellido;
    inputSegundoApellido.value = segundoApellido;
    inputTelefono.value = numeroDeTelefono;
}

function guardarDatosDelUsuario() {
    localStorage.setItem("primerNombre", inputNombre.value);
    localStorage.setItem("segundoNombre", inputSegundoNombre.value);
    localStorage.setItem("primerApellido", inputPrimerApellido.value);
    localStorage.setItem("segundoApellido", inputSegundoApellido.value);
    localStorage.setItem("numeroDeTelefono", inputTelefono.value);
    if (inputEmail.value.length > 0 &&
    inputNombre.value.length > 0 &&
    inputPrimerApellido.value.length > 0) {
    document.querySelector("#mensajeExito").classList.remove("visually-hidden");
    setTimeout(() => {
        location.replace("my-profile.html");
    }, 3000)
} 
}

function validarInputs() {
    if (inputNombre.value === "") {
        inputNombre.classList.add("is-invalid");
    } else {
        inputNombre.classList.remove("is-invalid");
    }
    if (inputPrimerApellido.value === "") {
        inputPrimerApellido.classList.add("is-invalid");
    } else {
        inputPrimerApellido.classList.remove("is-invalid");
    }
    if (inputEmail.value === "") {
        inputEmail.classList.add("is-invalid");
    } else {
        inputEmail.classList.remove("is-invalid");
    }
}
