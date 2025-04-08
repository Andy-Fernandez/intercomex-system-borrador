// cartHelpers.js

// Importamos el getter para acceder al carrito actual
import { getCarrito } from './cart.js';

/**
 * Incrementa la cantidad de un producto en el carrito.
 * @param {Number} productId - ID del producto.
 */
export function incrementarCantidad(productId) {
  const carrito = getCarrito();
  const item = carrito.find(item => item.producto_id === productId);
  if (item) {
    item.cantidad += 1;
  }
}

/**
 * Disminuye la cantidad de un producto en el carrito,
 * garantizando que la cantidad no baje de 1.
 * @param {Number} productId - ID del producto.
 */
export function disminuirCantidad(productId) {
  const carrito = getCarrito();
  const item = carrito.find(item => item.producto_id === productId);
  if (item && item.cantidad > 1) {
    item.cantidad -= 1;
  }
}

/**
 * Actualiza la cantidad de un producto a un valor específico.
 * @param {Number} productId - ID del producto.
 * @param {Number} nuevaCantidad - La nueva cantidad (debe ser > 0).
 */
export function actualizarCantidad(productId, nuevaCantidad) {
  const carrito = getCarrito();
  const item = carrito.find(item => item.producto_id === productId);
  if (item && nuevaCantidad > 0) {
    item.cantidad = nuevaCantidad;
  }
}

/**
 * Actualiza el precio de un producto en el carrito.
 * @param {Number} productId - ID del producto.
 * @param {Number} nuevoPrecio - El nuevo precio (debe ser >= 0).
 */
export function actualizarPrecio(productId, nuevoPrecio) {
  const carrito = getCarrito();
  const item = carrito.find(item => item.producto_id === productId);
  if (item && nuevoPrecio >= 0) {
    item.precio = nuevoPrecio;
  }
}

/**
 * Calcula el total para un producto (precio * cantidad).
 * @param {Number} productId - ID del producto.
 * @returns {Number} - Total del ítem.
 */
export function calcularTotalItem(productId) {
  const carrito = getCarrito();
  const item = carrito.find(item => item.producto_id === productId);
  return item ? item.precio * item.cantidad : 0;
}
