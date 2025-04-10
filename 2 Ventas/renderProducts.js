// renderProducts.js
import { productos } from './data_base.js';
import { agregarProductoAlCarrito } from './cart.js';

// Función para cargar y renderizar las tarjetas de producto
export async function cargarProductos(container) {
  if (!container) {
    console.error('products-container no encontrado.');
    return;
  }

  let templateHTML = ''; // En esta variable almacenaremos HTML de la plantilla
  try {
    const response = await fetch('./partials/product-card.html');
    templateHTML = await response.text();
  } catch (error) {
    console.error('Error al cargar product-card.html:', error);
    return;
  }

  const fragment = document.createDocumentFragment();
  productos.forEach(producto => {
    // Reemplazamos los marcadores de posición por los datos del producto
    let productoHTML = templateHTML
      .replaceAll("{{producto_id}}", producto.id)
      .replaceAll('{{nombre}}', producto.nombre)
      .replaceAll('{{precio}}', `Bs ${producto.precioUnitario}`)
      .replaceAll('{{foto}}', producto.foto)
      .replaceAll('{{stock}}', `${producto.stock} unidades`);
    
    // Convertimos el HTML en nodos y los agregamos al fragment
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = productoHTML; // Usamos innerHTML para parsear el string HTML
    
    const card = tempDiv.querySelector('.product-card');
    if (card) {
      card.addEventListener('click', () => {
        agregarProductoAlCarrito(producto.id);
      });
    } else {
      console.warn(`No se encontró la tarjeta para el producto con ID: ${producto.id}`);
    }
    
    // Aseguramos que solo agregamos los nodos hijos al fragment
    while (tempDiv.firstChild) {
      fragment.appendChild(tempDiv.firstChild);
    }
  });
  container.appendChild(fragment);
}