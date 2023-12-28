const ingresoNombre = document.querySelector("#nuevoUsuario");
const mensajeBienvenidaNombre = document.querySelector("#usuarioGuardado p span");
const btnCargaUsuario = document.querySelector('#btnCargaUsuario');
const btnNoSoyUsuario = document.querySelector('#btnNoSoyUsuario');
const mascota = document.querySelector(".mascota");
const mascotaGuardada = document.querySelector("#mascotaGuardada")
// let arrMascotaGuardada = [];

//-------------------------------------------------
//funcion que oculta elementos - hacerla más abarcativa...
function displayNone(evt) {
    evt.preventDefault();
    let disNone = "displayNone";
    evt.target.parentElement.parentElement.setAttribute("class", disNone);
}


//Funcion que personaliza el encabezado de Bienvenida
function bienvenidoUsuario(nombre) {
    mensajeBienvenidaNombre.textContent = nombre;
    btnNoSoyUsuario.querySelector("span").textContent = nombre;
}

//Funcion que elimina datos y recarga la página -btn No soy Usuario-
//-----------------------------------

function borrarDatos(evt){
    evt.preventDefault();
    localStorage.clear();
    location.reload();
}

//----------------------------------------------------

//Funcion que muestra los datos de la mascota guardada:

function tuMascota(mascota){
    mascotaGuardada.querySelector(".mascotaGuardada_nombre").textContent = mascota.nombre;
    mascotaGuardada.querySelector(".mascotaGuardada_especie").textContent = mascota.especie;
    mascotaGuardada.querySelector(".mascotaGuardada_sexo").textContent = mascota.sexo;
    mascotaGuardada.querySelector(".mascotaGuardada_edad").textContent = mascota.edad;
    let rutaImg = `./asets/img/cardMascotaGuardada/${mascota.especie}.jpg`;
    mascotaGuardada.querySelector("#imgMascotaGuardada").setAttribute("src", rutaImg);
    console.log(rutaImg);
}

//--Funcion que lee los datos de la mascota
function leerMascota(item) {
    let sexoMascota;
    if (mascota.querySelector("#hembra").checked) {
        sexoMascota = "Hembra";
    } else if (mascota.querySelector("#macho").checked) {
        sexoMascota = "Macho";
    } else {
        sexoMascota = "Sexo sin definir";
    }
    const datosMascota = {
        nombre: item.querySelector("#nombreMascota").value,
        sexo: sexoMascota,
        edad: item.querySelector("#edadMascota").value,
        especie: item.querySelector("#especieMascota").value
    }
    return datosMascota;
}
//funcion que carga los datos de la mascota
function cargarMascota(evt) {
    if (evt.target.id == "btnCargarMascota") {
        evt.preventDefault();
        const pet = mascota.querySelector("#formDatosMascota");
        const nuevaMascota = leerMascota(pet);
        localStorage.setItem("mascota", JSON.stringify(nuevaMascota));
        mascota.setAttribute("class", "displayNone") 
        muestraTuMascota();      
    } 
}

//funcion muestra la tarjeta de carga de datos de mascota
function verVentanaMascota(){
    mascota.classList.remove("displayNone");
}



// -------INGRESO ----------
let usuarioGuardado = localStorage.getItem("usuario");

if (usuarioGuardado) {
    //--mensaje de bienvenida
    mensajeBienvenidaNombre.parentElement.parentElement.setAttribute("class", "usuario_guardado")
    bienvenidoUsuario(usuarioGuardado);
    muestraTuMascota();
} else {
    //--ingreso nuevo usuario
    ingresoNombre.setAttribute("class", "nuevo_usuario")
    function cargarUsuario(evt) {
        evt.preventDefault();
        const usuarioNombre = document.querySelector("#nombreUsuario").value;
        localStorage.setItem("usuario", usuarioNombre);
        usuarioGuardado = localStorage.getItem("usuario");
        bienvenidoUsuario(usuarioGuardado);
        mensajeBienvenidaNombre.parentElement.parentElement.setAttribute("class", "usuario_guardado")
        verVentanaMascota();
    }
}

//-----CARGA DATOS MASCOTA--------------

function muestraTuMascota(){
    let mascotaStorage = JSON.parse(localStorage.getItem("mascota"));
    mascotaGuardada.setAttribute("class", "mascota_guardada");
    tuMascota(mascotaStorage);
} 




//boton para cargar el usuario
btnCargaUsuario.addEventListener("click", cargarUsuario); //carga los datos del usuario
btnCargaUsuario.addEventListener("click", displayNone); //oculta el cuadro donde se carga el usuario
//boton para borrar el usuario
btnNoSoyUsuario.addEventListener("click", borrarDatos);
//boton para cargar mascota
mascota.addEventListener("click", cargarMascota); // carga los datos de la mascota


