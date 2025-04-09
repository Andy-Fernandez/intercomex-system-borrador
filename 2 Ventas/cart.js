// cart.js
import { productos } from './data_base.js';
// Importamos nuestras funciones helper (más adelante las usaremos en los event handlers)
import {
  incrementarCantidad,
  disminuirCantidad,
  actualizarCantidad,
  actualizarPrecio,
  calcularTotalItem
} from './cartHelpers.js';

let carrito = [];
let cartTemplateHTML = "";

/**
 * Getter para obtener el carrito actual.
 * @returns {Array} Carrito de productos.
 */
export function getCarrito() {
  return carrito;
}

/**
 * Inicializa y renderiza el carrito con los productos.
 * @param {HTMLElement} cart_container - Elemento donde se renderizará el carrito.
 */
export async function productoCarrito(cart_container) {
  if (!cart_container) {
    console.error('cart-container no encontrado.');
    return;
  }
  
  // Inicializa el carrito a partir de la base de datos ficticia
  // Esta parte debería ser reemplazada por el carrito real que se cargará desde el servidor
  carrito = productos.map(producto => ({
    producto_id: producto.id,
    nombre: producto.nombre,
    precio: producto.precioUnitario,
    cantidad: 1,
    foto: producto.foto,
    stock: producto.stock
  }));
  
  // Cargar la plantilla HTML para un ítem del carrito
  try {
    const response = await fetch('./partials/producto-en-carrito.html');
    cartTemplateHTML = await response.text();
  } catch (error) {
    console.error('Error al cargar producto-en-carrito.html:', error);
    return;
  }
  
  actualizarCarritoHTML();
}

/**
 * Renderiza el carrito completo en la interfaz.
 */
export async function actualizarCarritoHTML() {
  const cartContainer = document.getElementById("cart-container");
  if (!cartContainer) {
    console.error('cart-container no encontrado.');
    return;
  }

  // Borrar contenido previo
  cartContainer.innerHTML = "";
  
  // Si la plantilla no se ha cargado, intentamos cargarla
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
    // Es importante que el HTML tenga un atributo data con el id del producto para identificarlo en los event handlers.
    const totalItem = calcularTotalItem(item.producto_id);

    let productoHTML = cartTemplateHTML
      .replaceAll("{{producto_id}}", item.producto_id)
      .replaceAll("{{nombre}}", item.nombre)
      .replace("{{precio}}", item.precio)
      .replaceAll('{{foto}}', item.foto)
      .replaceAll('{{stock}}', `${item.stock}`)
      .replaceAll('{{cantidad}}', `${item.cantidad}`)
      .replace('{{totalItem}}', totalItem.toFixed(2));

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = productoHTML;
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
  });
  cartContainer.appendChild(fragment);
  
  // Asignamos los eventos de eliminación y también los de cantidad (más adelante)
  const removeButtons = cartContainer.querySelectorAll('.remove-item-button');
  asignarEventosDeEliminacion(removeButtons);
  asignarEventosCantidad(cartContainer);
  asignarEventosCambioPrecio(cartContainer);
}

/**
 * Asigna el evento para eliminar ítems del carrito.
 */
export function asignarEventosDeEliminacion(removeButtons) {
  if (!removeButtons) return;
  removeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Eliminar el ítem del carrito con base en el índice.
      carrito.splice(index, 1);
      actualizarCarritoHTML();
      actualizarTotal();
      actualizarContadorProductos();
      guardarCarritoEnLocalStorage();
    });
  });
}

/**
 * Asigna eventos a los controles de cantidad: botones increment, decrement y el input.
 * Usamos el atributo data-producto-id.
 */
export function asignarEventosCantidad(cartContainer) {
  // Botones para incrementar y decrementar cantidad
  const decrementButtons = cartContainer.querySelectorAll('.decrement-button');
  const incrementButtons = cartContainer.querySelectorAll('.increment-button');
  const quantityInputs = cartContainer.querySelectorAll('.quantity-input');

  incrementButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const cartItem = e.target.closest('.cart-item');
      const productId = Number(cartItem.getAttribute('data-producto-id'));
      // Llamamos a nuestro helper
      incrementarCantidad(productId);
      actualizarCarritoHTML(); // Re-renderizamos el carrito (o solo el ítem si optimizamos)
      actualizarTotal();
      actualizarContadorProductos();
      guardarCarritoEnLocalStorage();
    });
  });

  decrementButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const cartItem = e.target.closest('.cart-item');
      const productId = Number(cartItem.getAttribute('data-producto-id'));
      disminuirCantidad(productId);
      actualizarCarritoHTML();
      actualizarTotal();
      actualizarContadorProductos();
      guardarCarritoEnLocalStorage();
    });
  });

  quantityInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const nuevaCantidad = Number(e.target.value);
      const cartItem = e.target.closest('.cart-item');
      const productId = Number(cartItem.getAttribute('data-producto-id'));
      actualizarCantidad(productId, nuevaCantidad);
      actualizarCarritoHTML();
      actualizarTotal();
      actualizarContadorProductos();
      guardarCarritoEnLocalStorage();
    });
  });
}

/**
 * Función para actualizar el total general del carrito.
 * Esta función puede seguir en cart.js o exportarse a cartHelpers.js si lo prefieres.
 */
export function actualizarTotal() {
  const totalElement = document.querySelector(".continue-btn-total");
  if (totalElement) {
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    totalElement.textContent = `Bs. ${total.toFixed(2)}`;
  }
}

/**
 * Función para actualizar el contador de productos.
 */
export function actualizarContadorProductos() {
  const contadorElement = document.querySelector(".continue-btn-count");
  if (contadorElement) {
    const totalProductos = carrito.reduce((acc, item) => acc + item.cantidad, 0);
    contadorElement.textContent = `${totalProductos} productos`;
  }
}

/**
 * Guarda el estado actual del carrito en LocalStorage.
 * Se utiliza para mantener persistencia entre sesiones del usuario.
 */
export function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/**
 * Asigna los eventos necesarios para permitir la edición del precio de productos
 * directamente desde el carrito (campo editable).
 * Permite aplicar el cambio tanto al perder el foco como al presionar Enter.
 *
 * @param {HTMLElement} cartContainer - Elemento contenedor del carrito.
 */
export function asignarEventosCambioPrecio(cartContainer) {
  const priceFields = cartContainer.querySelectorAll('.item-price');

  priceFields.forEach(field => {
    // Aplica el cambio cuando se pierde el foco del campo
    field.addEventListener('blur', (e) => {
      procesarCambioPrecio(e.target);
    });

    // Aplica el cambio al presionar Enter
    field.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault(); // Evita salto de línea en contenteditable
        procesarCambioPrecio(e.target);
        e.target.blur(); // Fuerza pérdida de foco para reflejar el cambio
      }
    });
  });
}

/**
 * Procesa la actualización del precio de un ítem del carrito a partir de un campo editable.
 *
 * @param {HTMLElement} elemento - Elemento DOM editable que contiene el nuevo precio.
 */
function procesarCambioPrecio(elemento) {
  const nuevoPrecio = parseFloat(elemento.textContent.replace('Bs', '').trim());
  if (!isNaN(nuevoPrecio)) {
    const cartItem = elemento.closest('.cart-item');
    const productId = Number(cartItem.getAttribute('data-producto-id'));
    actualizarPrecio(productId, nuevoPrecio);
    actualizarCarritoHTML();
    actualizarTotal();
    actualizarContadorProductos();
    guardarCarritoEnLocalStorage();
  }
}

