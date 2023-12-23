const ingresoNombre = document.querySelector("#nuevoUsuario");
const mensajeBienvenidaNombre = document.querySelector("#usuarioGuardado p span");
const btnCargaUsuario = document.querySelector('#btnCargaUsuario');
const btnNoSoyUsuario = document.querySelector('#btnNoSoyUsuario');
const mascota = document.querySelector(".mascota");

//-------------------------------------------------
//funcion que oculta elementos - hacerla más abarcativa...
function displayNone(evt) {
    evt.preventDefault();
    let disNone = "displayNone";
    evt.target.parentElement.parentElement.setAttribute("class", disNone);
}
//funcion que muestra elementos ocultos - 

//Funcion que personaliza el encabezado de Bienvenida
function bienvenidoUsuario(nombre) {
    mensajeBienvenidaNombre.textContent = nombre;
    btnNoSoyUsuario.querySelector("span").textContent = nombre;
}

//Funcion que elimina datos btn No soy Usuario
//-----------------------------------











// -------INGRESO ----------
let usuarioGuardado = localStorage.getItem("usuario");

if (usuarioGuardado) {
    //--mensaje de bienvenida
    mensajeBienvenidaNombre.parentElement.parentElement.setAttribute("class", "usuario_guardado")
    bienvenidoUsuario(usuarioGuardado);
} else {
    //--ingreso nuevo usuario
    ingresoNombre.setAttribute("class", "nuevo_usuario")
    function cargarUsuario(evt) {
        evt.preventDefault();
        const usuarioNombre = document.querySelector("#nombreUsuario").value;
        localStorage.setItem("usuario", usuarioNombre);
        console.log(usuarioNombre);
        usuarioGuardado = localStorage.getItem("usuario");
        console.log(`El nombre guardado es: ${usuarioGuardado}`);
        bienvenidoUsuario(usuarioGuardado);
        mensajeBienvenidaNombre.parentElement.parentElement.setAttribute("class", "usuario_guardado")
    }
}

//-----CARGA DATOS MASCOTA--------------

//--Funcion que lee los datos de la mascota




function leerMascota(item) {
    let sexoMascota;
    if (mascota.querySelector("#hembra").value === "on") {
        sexoMascota = "Hembra";
    } else if (mascota.querySelector("#macho").value === "on") {
        sexoMascota = "Macho";
    } else {
        sexoMascota = "No hay datos";
    }
    const datosMascota = {
        nombre: item.querySelector("#nombreMascota").value,
        sexo: sexoMascota,
        edad: item.querySelector("#edadMascota").value,
        especie: item.querySelector("#especieMascota").value
    }
    console.log(datosMascota);
}

function cargarMascota(evt) {
    if (evt.target.id == "btnCargarMascota") {
        evt.preventDefault();
        console.log(evt.target);
        const pet = mascota.querySelector("#formDatosMascota");
        console.log(pet);
        leerMascota(pet);
    }
    console.log(evt.target.value)

}







mascota.addEventListener("click", cargarMascota);
btnCargaUsuario.addEventListener("click", cargarUsuario);
btnCargaUsuario.addEventListener("click", displayNone);

