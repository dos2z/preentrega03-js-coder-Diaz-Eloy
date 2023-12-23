class mascota {
    constructor(especie, nombre, sexo, edad) {
        this.especie = especie.toLowerCase();
        this.nombre = nombre.toLowerCase();
        this.sexo = sexo.toLowerCase();
        this.edad = Number(edad);
    }
}
const mascotas = []
mascotas.push(mascota_1 = new mascota("Gato", "Lupito", "M", 3));
mascotas.push(mascota_2 = new mascota("Perro", "Rolfy", "M", 4));
mascotas.push(mascota_3 = new mascota("Gato", "Michita", "H", 5));
mascotas.push(mascota_4 = new mascota("Loro", "Capitan", "M", 30));
mascotas.push(mascota_5 = new mascota("Perro", "Lola", "H", 5));
mascotas.push(mascota_6 = new mascota("Hamster", "Bolita", "M", 1));
mascotas.push(mascota_7 = new mascota("Gato", "Pelusa", "H", 3));
mascotas.push(mascota_8 = new mascota("Perro", "Clifford", "M", 8));
mascotas.push(mascota_9 = new mascota("Hamster", "Chefsito", "M", 2));
mascotas.push(mascota_10 = new mascota("Hamster", "Emil", "M", 3));
mascotas.push(mascota_11 = new mascota("Gato", "Leon", "M", 5));
mascotas.push(mascota_12 = new mascota("Perro", "Rufo", "M", 4));
mascotas.push(mascota_13 = new mascota("Gato", "Pepino", "M", 3));


//------------- funciones--------------

function filtroEspecie(grupo, especie) {
    const mascotasEspecie = grupo.filter((mascota) => mascota.especie == especie);
    return mascotasEspecie;
}

function filtroSexo(grupo, sexo) {
    const mascotasSexo = grupo.filter((mascota) => mascota.sexo == sexo);
    return mascotasSexo;
}

function filtroEdadMinima(grupo, edad) {
    const mascotasEdadMinima = grupo.filter((mascota) => mascota.edad >= edad);
    return mascotasEdadMinima;
}

function filtroEdadMaxima(grupo, edad) {
    const mascotasEdadMaxima = grupo.filter((mascota) => mascota.edad <= edad);
    return mascotasEdadMaxima;
}

function filtroRangoEdad(grupo, minimo, maximo) {
    const mascotasEdadMinima = filtroEdadMinima(grupo, minimo);
    const rangoEdad = filtroEdadMaxima(mascotasEdadMinima, maximo)
    return rangoEdad;
}

function traspasoLoro() {
    let indexLoro;
    for (mascota of mascotas) {
        if (mascota.especie == "loro") {
            mascotasPropias.push(mascota);
            indexLoro = mascotas.indexOf(mascota);
        }
    }
    mascotas.splice(indexLoro, 1);
}

function obtenerMascota(nombre) {
    for (mascota of mascotas) {
        if (mascota.nombre == nombre) {
            mascotasPropias.push(mascota);
        }
    }
}
function eliminarMascota(nombre) {
    let indexMascota;
    for (mascota of mascotas) {
        if (mascota.nombre == nombre) {
            indexMascota == mascotas.indexOf(mascota);
            mascotas.splice(indexMascota, 1);
        }
    }
}

function traspasoMascota(nombre) {
    nombre = nombre;
    obtenerMascota(nombre);
    eliminarMascota(nombre);
}

function listaMascotas(grupo) {
    let lista = ""
    grupo.forEach(mascota => {
        lista += mascota.especie + " de " + mascota.edad + " años " + " de nombre " + mascota.nombre + ";\n"
    });
    return lista;
}

//------------



const mascotasPropias = [];

let tengoMascota = prompt("¿Tenes mascota? si/no").toLowerCase();
let mascotaUsuario;

if (tengoMascota == "si") {
    const nombre = prompt("Ingresa el nombre de tu mascota");
    mascotasPropias.push(mascotaUsuario = new mascota(prompt("Ingresa la especie de " + nombre + " (Perro, Gato, Hamster, etc)"),
        nombre,
        prompt("Selecciona si " + nombre + " es Macho o Hembra (M/H)"),
        Number(prompt("ingresa la edad de " + nombre)),
    ));
} else {
    alert("Ya lo resolvemos");
}
alert("Nosotros tenemos " + mascotas.length + " animalitos en adopción");
if (mascotaUsuario != undefined) {
    const mascotasMismaEspecie = filtroEspecie(mascotas, mascotaUsuario.especie);
    if (mascotasMismaEspecie != "") {
        alert("de los cuales " + mascotasMismaEspecie.length + " son " + mascotaUsuario.especie);
    } else {
        alert("No tenemos " + mascotaUsuario.especie);
    }
} else {
    alert(listaMascotas(mascotas));
}

//Parte de adopción
let mascotasFinal;
let preguntaAdoptar = prompt("¿Queres adoptar uno? si/no").toLowerCase();
if (preguntaAdoptar != "no") {
    let numero = 0;
    let elegiEspecie;
    let seleccion;
    while (numero == 0) {
        elegiEspecie = prompt("elegí la especie: (Gato, Perro, Loro, Hamster").toLowerCase();
        const especieSeleccionada = filtroEspecie(mascotas, elegiEspecie);
        alert("Tenemos " + especieSeleccionada.length + " animales de la especie " + elegiEspecie);
        numero = especieSeleccionada.length;
        seleccion = especieSeleccionada;
    }
    let selectSexo = prompt("elegí el sexo del " + elegiEspecie + " ('m' para macho/ 'h' para hembra/ 'no' para saltear)").toLowerCase();
    if (selectSexo != "no") {
        const sexoSeleccionado = filtroSexo(seleccion, selectSexo);
        alert("Tenemos " + sexoSeleccionado.length + " " + elegiEspecie + " del sexo seleccionado");
        seleccion = sexoSeleccionado;
    }
    let selectEdad = prompt("¿queres definir un rango de edades? (si/no)").toLowerCase();
    if (selectEdad != "no") {
        let selectEdadMinima = Number(prompt("elegí la edad mínima"));
        let selectEdadMaxima = Number(prompt("elegí la edad máxima"));
        const edadSeleccionada = filtroRangoEdad(seleccion, selectEdadMinima, selectEdadMaxima);
        alert("Entre " + selectEdadMinima + " y " + selectEdadMaxima + " años tenemos " + edadSeleccionada.length);
        seleccion = edadSeleccionada;
    }
    if (seleccion.length != 0) {
        let muestraMascotas = listaMascotas(seleccion);
        alert(muestraMascotas);
        let nombre = prompt("Elegi el nombre de la mascota que queres:").toLowerCase();
        traspasoMascota(nombre);
    } else {
        alert("Lamentablemente no tenemos animalitos con esas caracteristicas \nIgual te llevas el Loro");
        traspasoLoro();
    }
} else {
    alert("Igual te llevas el Loro");
    traspasoLoro();
}
mascotasFinal = listaMascotas(mascotasPropias);
alert("Lista de tus mascotas: \n" + mascotasFinal);
