let productosCarrito = [];
const productos = document.querySelector("#productos");
const carritoHTML = document.querySelector(".carritoProductos");

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
        id: prod.querySelector("a").getAttribute("data-id"), //sacado del after de carrito
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
        let precioTotal = totales();
        document.querySelector("#totalCarrito p span").textContent = precioTotal;
    })
    //console.log(totales())

}

function limpiarCarrito() {
    while (carritoHTML.firstChild) {
        carritoHTML.removeChild(carritoHTML.firstChild);
    }
}



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

let carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
if(carritoGuardado){
    productosCarrito = carritoGuardado;
    pasarAcarritoHTML();
}



productos.addEventListener("click", agregarProducto)
