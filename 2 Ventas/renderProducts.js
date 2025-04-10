// renderProducts.js
import { getProductos } from './data_base.js';
import { agregarProductoAlCarrito } from './cart.js';

let productCardTemplate = null; // Variable global para almacenar la plantilla

/**
 * Carga la plantilla de product-card.html y la almacena en productCardTemplate.
 * Luego, renderiza los productos en la interfaz llamando a actualizarProductos().
 */
export async function cargarProductos() {
  try {
    const response = await fetch('./partials/product-card.html');
    productCardTemplate = await response.text();
  } catch (error) {
    console.error('Error al cargar product-card.html:', error);
    return;
  }

  // Después de cargar la plantilla, llamamos a la función que renderiza
  actualizarProductos();
}

/**
 * Renderiza las tarjetas de productos en el contenedor #products-container,
 * utilizando el template almacenado en productCardTemplate. 
 * Se asume que la lista de productos ya está actualizada.
 */
export function actualizarProductos() {
  const container = document.getElementById('products-container');
  if (!container) {
    console.error('products-container no encontrado.');
    return;
  }
  if (!productCardTemplate) {
    console.error('No se ha cargado la plantilla de productos (productCardTemplate).');
    return;
  }

  // Limpiar contenedor antes de re-renderizar
  container.innerHTML = '';

  const fragment = document.createDocumentFragment();

  const productos = getProductos();
  productos.forEach(producto => {
    // Reemplazamos los marcadores de posición por los datos del producto

    let productoHTML = productCardTemplate
      .replaceAll('{{producto_id}}', producto.id)
      .replaceAll('{{nombre}}', producto.nombre)
      .replaceAll('{{precio}}', `Bs ${producto.precioUnitario}`)
      .replaceAll('{{foto}}', producto.foto)
      .replaceAll('{{stock}}', `${producto.stock} unidades`);

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = productoHTML; 

    const card = tempDiv.querySelector('.product-card');
    if (card) {
      card.addEventListener('click', () => {
        agregarProductoAlCarrito(producto.id);
      });
    } else {
      console.warn(`No se encontró la tarjeta para el producto con ID: ${producto.id}`);
    }

    // Agregamos los nodos hijos al fragment
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
  });

  container.appendChild(fragment);
}
