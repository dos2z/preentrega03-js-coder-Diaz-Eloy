
const btnAbrirCarrito = document.querySelector(".btncarrito");
const btnCerrarCarrito = document.querySelector(".salirCarrito");
const btnEliminarCarrito = document.querySelector(".eliminarCarrito");
const divCarrito = document.querySelector(".carrito");

let productosCarrito = [];
const productos = document.querySelector("#productos");
const carritoHTML = document.querySelector(".carritoProductos");


// funciones que controlan los botones del carrito
function abrirCarrito(evt){
    evt.preventDefault();
    divCarrito.classList.remove("displayNone");
}
function cerrarCarrito(evt){
    evt.preventDefault();
    divCarrito.classList.add("displayNone")
}

function eliminarCarrito(evt){
    evt.preventDefault();
    localStorage.removeItem("carrito");
    productosCarrito = [];
    pasarAcarritoHTML();
    totalesHTML();
}
//------------------------------

//Funcionamiento del carrito
//Funcion que agrega los productos al carrito del html

function agregarProducto(evt) {
    evt.preventDefault();
    console.log(evt.target);
    if (evt.target.classList.contains("agregar_carrito")) {
        let productoSelec = evt.target.parentElement;
        console.log(productoSelec);
        let producto = datosProducto(productoSelec);
        console.log(producto);
        let recienAgregado = producto.nombre;
        if (productosCarrito.some((prod) => prod.nombre === recienAgregado)) {
            for (producto of productosCarrito) {
                if (producto.nombre === recienAgregado) {
                    producto.cantidad++
                }
            }
        } else {
            agregarAproductosCarrito(producto);
        }
        console.log(productosCarrito);
        pasarAcarritoHTML();
        actualizarStorageCarrito();
        console.log(localStorage.getItem("carrito"))
    }
}

function actualizarStorageCarrito(){
    localStorage.setItem("carrito", JSON.stringify(productosCarrito));
}

function datosProducto(prod) {
    const infoProducto = {
        nombre: prod.querySelector(".nombreProducto").textContent,
        precio: prod.querySelector(".precio span").textContent,
        id: prod.querySelector("a").getAttribute("data-id"), //sacado del after de carrito, para usarlo en la eliminacion de productos
        cantidad: 1,
    }
    return infoProducto;
}

//funcion que agrega los productos al array productosCarrito
function agregarAproductosCarrito(producto) {
    //productosCarrito.push(producto),
    productosCarrito = [...productosCarrito, producto];
}

function pasarAcarritoHTML() {
    limpiarCarrito();
    productosCarrito.forEach((producto) => {
        const productoCarrito = document.createElement("div");
        productoCarrito.innerHTML = `
        <p>Producto: ${producto.nombre}</p>
        <p>Precio $${producto.precio}</p>
        <p>Cantidad: ${producto.cantidad}</p>`;
        carritoHTML.appendChild(productoCarrito);
        totalesHTML();
    })
}

function limpiarCarrito() {
    while (carritoHTML.firstChild) {
        carritoHTML.removeChild(carritoHTML.firstChild);
    }
}
//Funcion que calcula el monto total final
function totales() {
    let total = 0;
    for (producto of productosCarrito) {
        let precio = Number(producto.precio.replace(".", ""));
        let cantidad = Number(producto.cantidad);
        total += precio * cantidad;
        console.log(`Precio = ${total}`);
    }
    return total;
}
//Funcion que escribe el precio final en el carrito del HTML
function totalesHTML(){
    let precioTotal = totales();
    document.querySelector("#totalCarrito p span").textContent = precioTotal;
}

// Código que recibe info del local storage si es que hay y la carga en el carrito
let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
if(carritoGuardado){
    productosCarrito = carritoGuardado;
    pasarAcarritoHTML();
}


//Eventos
productos.addEventListener("click", agregarProducto)
btnAbrirCarrito.addEventListener("click", abrirCarrito)
btnCerrarCarrito.addEventListener("click", cerrarCarrito) 
btnEliminarCarrito.addEventListener("click", eliminarCarrito)

