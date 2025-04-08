// main.js
import { productos } from './data_base.js';
import { cargarProductos } from './renderProducts.js';

let carrito = []; // Array global del carrito
let cartTemplateHTML = null; // Plantilla global para productos en el carrito

// Función helper para cargar un fragmento HTML en un contenedor por su ID
async function loadPartial(url, containerId) {
  try {
    const response = await fetch(url);
    const html = await response.text();
    document.getElementById(containerId).innerHTML = html;
  } catch (error) {
    console.error(`Error al cargar ${url}:`, error);
  }
}

// Función principal para cargar la interfaz
async function loadHTML() {
  // Cargar sidebar y sells-container en paralelo
  await Promise.all([
    loadPartial('./partials/sidebar.html', 'sidebar-container'),
    loadPartial('./partials/sells-container.html', 'sells-container')
  ]);

  // Una vez cargado sells-container, renderizamos los productos y el carrito
  const productsContainer = document.getElementById('products-container');
  const cartContainer = document.getElementById('cart-container');

  await Promise.all([
    cargarProductos(productsContainer),
    productoCarrito(cartContainer)
  ]);

  // Asignar eventos de eliminación a los botones encontrados
  const removeButtons = document.querySelectorAll('.remove-item-button');
  agregarEventosEliminar(removeButtons);
}

// Asegurarse de que el DOM esté completamente cargado antes de ejecutar loadHTML
document.addEventListener('DOMContentLoaded', () => {
  loadHTML();
});

// Función para cargar y renderizar los productos del carrito
async function productoCarrito(cart_container) {
  if (!cart_container) {
    console.error('cart-container no encontrado.');
    return;
  }
  
  // Inicializar el carrito con los productos
  carrito = productos.map(producto => ({
    producto_id: producto.id,
    nombre: producto.nombre,
    precio: producto.precioUnitario,
    cantidad: 1,
    foto: producto.foto,
    stock: producto.stock
  }));
  
  // Cargar la plantilla para los productos del carrito (se hace una sola vez)
  try {
    const response = await fetch('./partials/producto-en-carrito.html');
    cartTemplateHTML = await response.text();
  } catch (error) {
    console.error('Error al cargar producto-en-carrito.html:', error);
    return;
  }
  
  // Renderizamos el carrito inicial
  actualizarCarritoHTML();
}

// Función para asignar los eventos de eliminación a los botones del carrito
function agregarEventosEliminar(removeButtons) {
  if (!removeButtons) return;
  removeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // alert("Producto eliminado del carrito");
      // En este ejemplo se usa el índice; podrías usar un data-attribute para mayor precisión
      carrito.splice(index, 1);
      actualizarCarritoHTML();
      actualizarTotal();
      actualizarContadorProductos();
      guardarCarritoEnLocalStorage();
    });
  });
}

// Función para actualizar la interfaz del carrito
async function actualizarCarritoHTML() {
  const cartContainer = document.getElementById("cart-container");
  if (!cartContainer) return;
  cartContainer.innerHTML = "";
  
  // Si la plantilla no se cargó aún, la obtenemos
  if (!cartTemplateHTML) {
    try {
      const response = await fetch('./partials/producto-en-carrito.html');
      cartTemplateHTML = await response.text();
    } catch (error) {
      console.error('Error al cargar producto-en-carrito.html:', error);
      return;
    }
  }
  
  const fragment = document.createDocumentFragment();
  carrito.forEach(item => {
    let productoHTML = cartTemplateHTML
      .replaceAll("{{nombre}}", item.nombre)
      .replace("{{precio}}", item.precio)
      .replaceAll('{{foto}}', item.foto)
      .replaceAll('{{stock}}', `${item.stock}`)
      // Actualizamos la cantidad en el input, suponiendo que el template tenga value="1"
      .replace('value="1"', `value="${item.cantidad}"`);
    
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = productoHTML;
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
  });
  cartContainer.appendChild(fragment);
  
  // Re-asignar eventos de eliminación a los botones recién creados
  const removeButtons = cartContainer.querySelectorAll('.remove-item-button');
  agregarEventosEliminar(removeButtons);
}

// Función para actualizar el total del carrito
function actualizarTotal() {
  const totalElement = document.querySelector(".continue-btn-total");
  if (totalElement) {
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalElement.textContent = `Bs. ${total.toFixed(2)}`;
  }
}

// Función para actualizar el contador de productos en el carrito
function actualizarContadorProductos() {
  const contadorElement = document.querySelector(".continue-btn-count");
  if (contadorElement) {
    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorElement.textContent = `${totalProductos} productos`;
  }
}

// Función para guardar el carrito en LocalStorage
function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
