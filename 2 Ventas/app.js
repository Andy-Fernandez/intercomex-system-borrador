// app.js
import { productos } from './data_base.js';
import { cargarProductos } from './renderProducts.js';
import { productoCarrito,
  asignarEventosDeEliminacion,
  actualizarTotal,
  actualizarContadorProductos,
  guardarCarritoEnLocalStorage
} from './cart.js';


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
  asignarEventosDeEliminacion(removeButtons);
}

document.addEventListener('DOMContentLoaded', () => {
  loadHTML();
});

