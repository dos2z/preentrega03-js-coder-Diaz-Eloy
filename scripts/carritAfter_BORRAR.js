//Este es el javascript funcional para el carrito de compras

//alert();
let articulosCarrito = [];

const contenedorCarrito = document.querySelector("#lista-carrito tbody");
//console.log(contenedorCarrito);
const listaProductos = document.querySelector("#lista-productos");
//console.log(listaProductos);

//const productos = document.querySelectorAll(".agregar-carrito");
//console.log(productos);

const vaciarCarrito = document.querySelector("#vaciar-carrito");

const carrito = document.querySelector("#carrito");

function agregarProducto(evt) {
  evt.preventDefault();
  //console.log(evt.target.classList.contains("agregar-carrito"));
  if (evt.target.classList.contains("agregar-carrito")) {
    //console.log("Es aca donde queria llegar");
    //console.log(evt.target.parentElement.parentElement);
    const producto = evt.target.parentElement.parentElement;
    leerDatosProducto(producto);
  }
}

function leerDatosProducto(item) {
  //console.log(item);
  console.log(item.querySelector("a").getAttribute("data-id"));
  const inforProducto = {
    imagen: item.querySelector("img").src,
    titulo: item.querySelector("h4").textContent,
    precio: item.querySelector(".precio span").textContent,
    id: item.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };
  //console.log(inforProducto);

  // si el producto esta en el carrito
  if (articulosCarrito.some((prod) => prod.id === inforProducto.id)) {
    const productos = articulosCarrito.map((producto) => {
      if (producto.id === inforProducto.id) {
        let cantidad = parseInt(producto.cantidad);
        cantidad += 1;
        producto.cantidad = cantidad;
        return producto;
      } else {
        return producto;
      }
    });
    articulosCarrito = [...productos];
  } else {
    //articulosCarrito.push(inforProducto);
    articulosCarrito = [...articulosCarrito, inforProducto];
  }
  console.log(articulosCarrito);

  dibujarCarritoHTML();
}

function dibujarCarritoHTML() {
  limpiarCarrito();
  articulosCarrito.forEach((producto) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
        <td><img src="${producto.imagen}" width="100" /></td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>${producto.cantidad}</td>
        <td><a href="#" class="borrar-producto" data-id="${producto.id}">❌</a></td>
        `;
    contenedorCarrito.appendChild(fila);
  });
  sincronizarStorage();
}

function limpiarCarrito() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

function eliminarProducto(evt) {
  evt.preventDefault();
  if (evt.target.classList.contains("borrar-producto")) {
    const producto = evt.target.parentElement.parentElement;
    const productoId = producto.querySelector("a").getAttribute("data-id");
    articulosCarrito = articulosCarrito.filter(
      (producto) => producto.id !== productoId
    );
    dibujarCarritoHTML();
  }
}

function sincronizarStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

listaProductos.addEventListener("click", agregarProducto);
vaciarCarrito.addEventListener("click", limpiarCarrito);
carrito.addEventListener("click", eliminarProducto);
window.addEventListener("DOMContentLoaded", () => {
  articulosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  dibujarCarritoHTML();
});

