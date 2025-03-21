const productos = [
  { id: 1, nombre: 'Producto 1', precio: '25.00', stock: 15 },
  { id: 2, nombre: 'Producto 2', precio: '30.00', stock: 8 },
  { id: 3, nombre: 'Producto 3', precio: '15.50', stock: 22 },
  { id: 4, nombre: 'Producto 4', precio: '20.00', stock: 10 },
  { id: 5, nombre: 'Producto 5', precio: '35.00', stock: 5 },
  { id: 6, nombre: 'Producto 6', precio: '18.00', stock: 30 },
  { id: 7, nombre: 'Producto 6', precio: '18.00', stock: 30 },
];

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
      console.log(container);
      cargarProductos(container); // Pasar el contenedor como argumento
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
    fetch('./partials/product.html')
      .then(response => response.text())
      .then(data => {
        // Modificamos el contenido de la plantilla con la información del producto
        console.log(producto);
        let productoHTML = data.replace('{{nombre}}', producto.nombre)
                                .replace('{{precio}}', `Bs ${producto.precio}`)
                                .replace('{{stock}}', `${producto.stock} unidades`);
        container.innerHTML += productoHTML;
      })
      .catch(error => console.error('Error al cargar product.html:', error));
  });
}