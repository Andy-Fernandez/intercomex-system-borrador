// cart.js
import { productos } from './data_base.js';
import { actualizarTotal, actualizarContadorProductos, guardarCarritoEnLocalStorage } from './cartHelpers.js';

let carrito = [];
let cartTemplateHTML = "";

// Función para cargar y renderizar los productos del carrito
export async function productoCarrito(cart_container) {
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

// Función para actualizar la interfaz del carrito
export async function actualizarCarritoHTML() {
  const cartContainer = document.getElementById("cart-container");
  if (!cartContainer){
    console.error('cart-container no encontrado.');
    return;
  }

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

// Función para asignar los eventos de eliminación a los botones del carrito
export function agregarEventosEliminar(removeButtons) {
  if (!removeButtons) return;
  removeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // En este ejemplo se usa el índice; podrías usar un data-attribute para mayor precisión
      carrito.splice(index, 1);
      actualizarCarritoHTML();
      actualizarTotal();
      actualizarContadorProductos();
      guardarCarritoEnLocalStorage();
    });
  });
}