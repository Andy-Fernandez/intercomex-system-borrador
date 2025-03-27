// main.js
import { productos } from './data_base.js';

let carrito = []; // Inicializamos el array carrito

function loadHTML() {
  fetch('./partials/sidebar.html')
    .then(response => response.text())
    .then(data => document.getElementById('sidebar-container').innerHTML = data)
    .catch(error => console.error('Error al cargar sidebar:', error));

  fetch('./partials/sells-container.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('sells-container').innerHTML = data;
      // Cargar los productos
      const container = document.getElementById('products-container');
      const cart_container = document.getElementById('cart-container');
      cargarProductos(container); // Cargamos los productos del inventario.
      productoCarrito(cart_container); // TEST: Cargamos productos del carrito
      const removeButtons = document.querySelectorAll('.remove-item-button');
      agregarEventosEliminar(removeButtons); // Agregamos los eventos de eliminar
    })
    .catch(error => console.error('Error al cargar sells-container:', error));
}

window.onload = loadHTML;

// Función para cargar los productos (ahora recibe el contenedor)
function cargarProductos(container) {
  if (!container) {
    console.error('products-container no encontrado.');
    return;
  }
  productos.forEach(producto => {
    fetch('./partials/product-card.html')
      .then(response => response.text())
      .then(data => {
        // Modificamos el contenido de la plantilla con la información del producto
        let productoHTML = data.replaceAll('{{nombre}}', producto.nombre)
                                .replaceAll('{{precio}}', `Bs ${producto.precioUnitario}`)
                                .replaceAll('{{stock}}', `${producto.stock} unidades`);
        container.innerHTML += productoHTML;
      })
      .catch(error => console.error('Error al cargar product.html:', error));
  });
}

function productoCarrito(cart_container){
  if (!cart_container) {
    console.error('products-container no encontrado.');
    return;
  }
  carrito = productos.map(producto => ({ // Usamos map para crear el array carrito
    producto_id: producto.id,
    nombre: producto.nombre,
    precio: producto.precioUnitario,
    cantidad: 1,
  }));

  carrito.forEach(item => {
    fetch('./partials/producto-en-carrito.html')
      .then(response => response.text())
      .then(data => {
        let productoHTML = data.replaceAll('{{nombre}}', item.nombre)
                                .replace('{{precio}}', item.precio)
                                .replace('{{stock}}', item.stock);
        cart_container.innerHTML += productoHTML;
      })
      .catch(error => console.error('Error al cargar product.html:', error));
  });
}

function agregarEventosEliminar(removeButtons) {
  console.log(removeButtons);
  removeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      alert("hola");
      carrito.splice(index, 1); // Elimina el producto del array carrito
      actualizarCarritoHTML(); // Actualiza el carrito en el DOM
      actualizarTotal(); // Actualiza el total
      actualizarContadorProductos(); // Actualiza el contador de productos
      guardarCarritoEnLocalStorage(); // Guarda el carrito en localStorage
    });
  });
}

function actualizarCarritoHTML() {
  const cartContainer = document.getElementById("cart-container");
  if (cartContainer) {
    cartContainer.innerHTML = "";
    carrito.forEach((item) => {
      fetch("./partials/producto-en-carrito.html")
        .then((response) => response.text())
        .then((data) => {
          let productoHTML = data
            .replaceAll("{{nombre}}", item.nombre)
            .replace("{{precio}}", item.precio)
            .replace('value="1"', `value="${item.cantidad}"`);
          cartContainer.innerHTML += productoHTML;
        })
        .catch((error) => console.error("Error al cargar product.html:", error));
    });
    agregarEventosEliminar(); // Re-agregamos los eventos de eliminar después de actualizar el HTML
  }
}

function actualizarTotal() {
  const totalElement = document.querySelector(".continue-btn-total");
  if (totalElement) {
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalElement.textContent = `Bs. ${total.toFixed(2)}`;
  }
}

function actualizarContadorProductos() {
  const contadorElement = document.querySelector(".continue-btn-count");
  if (contadorElement) {
    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorElement.textContent = `${totalProductos} productos`;
  }
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}