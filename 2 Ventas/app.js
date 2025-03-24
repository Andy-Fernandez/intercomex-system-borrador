// main.js
import { productos } from './data_base.js';

let carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Cargar el carrito desde localStorage o inicializar un array vacío

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
      cargarProductos(container); // Pasar el contenedor como argumento
      // Productos del carrito
      actualizarCarritoHTML(cart_container);
      agregarEventosVaciarCanasta();
      actualizarTotal();
      actualizarContadorProductos();
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
            .replace('value="1"', `value="${item.cantidad}"`); // Establece la cantidad actual
          cartContainer.innerHTML += productoHTML;
          agregarEventosDeCantidad();
          agregarEventosEliminar();
        })
        .catch((error) => console.error("Error al cargar product.html:", error));
    });
  }
}

function agregarProductoAlCarrito(producto) {
  const productoExistente = carrito.find((item) => item.producto_id === producto.id);

  if (productoExistente) {
    productoExistente.cantidad++;
  } else {
    carrito.push({
      producto_id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1,
    });
  }
  actualizarCarritoHTML();
  actualizarTotal();
  actualizarContadorProductos();
  guardarCarritoEnLocalStorage();
}

function agregarEventosVaciarCanasta() {
  const vaciarCanastaBtn = document.querySelector(".cart-view-btn");
  if (vaciarCanastaBtn) {
    vaciarCanastaBtn.addEventListener("click", vaciarCanasta);
  }
}

function vaciarCanasta() {
  const cartContainer = document.getElementById("cart-container");
  if (cartContainer) {
    cartContainer.innerHTML = ""; // Elimina todos los elementos del carrito en el HTML
    carrito = []; // Limpia el array del carrito
    actualizarTotal(); // Actualiza el total mostrado
    actualizarContadorProductos(); // Actualiza el contador de productos
    localStorage.removeItem("carrito"); // Limpia el carrito almacenado en localStorage
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

function agregarEventosDeCantidad() {
  const incrementButtons = document.querySelectorAll(".increment-button");
  const decrementButtons = document.querySelectorAll(".decrement-button");
  const quantityInputs = document.querySelectorAll(".quantity-input");

  incrementButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      carrito[index].cantidad++;
      quantityInputs[index].value = carrito[index].cantidad;
      actualizarTotal();
      actualizarContadorProductos();
      guardarCarritoEnLocalStorage();
    });
  });

  decrementButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        quantityInputs[index].value = carrito[index].cantidad;
        actualizarTotal();
        actualizarContadorProductos();
        guardarCarritoEnLocalStorage();
      }
    });
  });
}

function agregarEventosEliminar() {
    const removeButtons = document.querySelectorAll('.remove-item-button');
    removeButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            carrito.splice(index, 1);
            actualizarCarritoHTML();
            actualizarTotal();
            actualizarContadorProductos();
            guardarCarritoEnLocalStorage();
        });
    });
}