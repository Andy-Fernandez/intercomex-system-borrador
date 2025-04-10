// Datos de productos
export const productos = [
  { id: 1, nombre: 'Globos', codigo: 'G001', categoria: 'Fiesta', stock: 1000, stockMinimo: 50, precioUnitario: 12.00, precioPorMayor: 10.00, precioPreferencial: 11.00, costoAdquisicion: 8.00, descripcion: 'Caja con 100 bolsas pequeñas de globos', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcaFAlErs0hH7TI7XulA7WFyNA9CezD17p3w&s' },
  { id: 2, nombre: 'Cohetillo', codigo: 'Q001', categoria: 'Fiesta', stock: 500, stockMinimo: 20, precioUnitario: 5.00, precioPorMayor: 4.50, precioPreferencial: 4.80, costoAdquisicion: 3.50, descripcion: 'Cohetillo para fiestas', foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkC72kfsSst-xXZreAIFEa3g7v42WiWUnIFA&s' },
  { id: 3, nombre: 'Petardo', codigo: 'P001', categoria: 'Fiesta', stock: 800, stockMinimo: 30, precioUnitario: 20.00, precioPorMayor: 18.00, precioPreferencial: 19.00, costoAdquisicion: 15.00, descripcion: 'Petardo de alta potencia', foto: 'https://tuexpres.com/web/image/product.template/617/image_1024?unique=b41d76d' },
  { id: 4, nombre: 'Cerpentina', codigo: 'C001', categoria: 'Fiesta', stock: 1200, stockMinimo: 50, precioUnitario: 8.00, precioPorMayor: 7.50, precioPreferencial: 7.80, costoAdquisicion: 6.00, descripcion: 'Cerpentina para decoración de fiestas', foto: 'https://bolmarket.com/cdn/shop/products/bolmarket-serpentina.png?v=1605723095' },
  { id: 5, nombre: 'Inflador', codigo: 'I001', categoria: 'Fiesta', stock: 150, stockMinimo: 10, precioUnitario: 25.00, precioPorMayor: 22.00, precioPreferencial: 23.00, costoAdquisicion: 18.00, descripcion: 'Inflador manual para globos', foto: 'https://i5.walmartimages.com/asr/4ab50df9-0020-4ce1-90b7-007f769bf0ee.3727d9f7ea085432deb6d4c85790d1b5.jpeg?odnHeight=612&odnWidth=612&odnBg=FFFFFF' },
  { id: 6, nombre: 'Banderín', codigo: 'B001', categoria: 'Fiesta', stock: 300, stockMinimo: 10, precioUnitario: 5.50, precioPorMayor: 5.00, precioPreferencial: 5.20, costoAdquisicion: 4.00, descripcion: 'Banderines decorativos para techos', foto: 'https://http2.mlstatic.com/D_NQ_NP_989079-MLM69916968201_062023-O.webp' },
  { id: 7, nombre: 'Globo Lápiz', codigo: 'GL001', categoria: 'Fiesta', stock: 200, stockMinimo: 10, precioUnitario: 15.00, precioPorMayor: 13.00, precioPreferencial: 14.00, costoAdquisicion: 10.00, descripcion: 'Globo en forma de lápiz para eventos', foto: 'https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/tottusPE/42410375_1/w=1500,h=1500,fit=pad' }
];

export function getProductos() {
  return productos;
}

export function actualizarStock(productId, nuevoStock) {
  const producto = productos.find(p => p.id === productId);
  if (producto) {
    producto.stock = nuevoStock;
  }
}

// Datos de clientes
export const clientes = [
  { id: 1, nombre: 'Carlos Torrez', telefono: '70123456', documentoIdentidad: '4587621', tipoCliente: 'regular', email: 'carlos@gmail.com', direccion: 'Av. América #123' },
  { id: 2, nombre: 'Tienda La Magia', telefono: '71234567', documentoIdentidad: '5698741', tipoCliente: 'preferencial', email: 'magia@tienda.com', direccion: 'Calle Bolívar #456' },
  { id: 3, nombre: 'Eventos Happy Day', telefono: '72345678', documentoIdentidad: '1023654789', tipoCliente: 'mayorista', email: 'contacto@happyday.com', direccion: 'Av. Banzer #789' }
];

// Datos de usuarios (empleados)
export const usuarios = [
  { id: 1, username: 'pedro', nombre: 'Pedro Suárez', email: 'pedro@fiestabolivia.com', password: 'password_encriptado_1', telefono: '68754123', rol: 'vendedor' },
  { id: 2, username: 'laura', nombre: 'Laura Flores', email: 'laura@fiestabolivia.com', password: 'password_encriptado_2', telefono: '69852147', rol: 'administrador' }
];

// Ventas y detalles de venta
export const ventas = [
  {
    id: 1,
    clienteId: 1, // Carlos Torrez
    usuarioId: 1, // Pedro Suárez
    fechaVenta: '2025-04-02 09:30:00',
    subtotal: 138.50,
    descuentoGlobalMonto: 8.50,
    tipoVenta: 'menor',
    total: 130.00,
    estadoPago: 'completado',
    cajaAsignada: 'Caja 1',
    comentario: 'Compra para fiesta de cumpleaños',
    moneda: 'BOB',
    detalles: [
      { productoId: 1, cantidad: 3, precioUnitarioAplicado: 12.00, descuentoPorProducto: 0.00, subtotal: 36.00 },
      { productoId: 2, cantidad: 5, precioUnitarioAplicado: 5.00, descuentoPorProducto: 0.00, subtotal: 25.00 },
      { productoId: 3, cantidad: 2, precioUnitarioAplicado: 20.00, descuentoPorProducto: 0.00, subtotal: 40.00 },
      { productoId: 4, cantidad: 2, precioUnitarioAplicado: 8.00, descuentoPorProducto: 0.00, subtotal: 16.00 },
      { productoId: 6, cantidad: 4, precioUnitarioAplicado: 5.50, descuentoPorProducto: 1.00, subtotal: 21.50 }
    ]
  },
  {
    id: 2,
    clienteId: 2, // Tienda La Magia
    usuarioId: 1, // Pedro Suárez
    fechaVenta: '2025-04-02 13:45:00',
    subtotal: 310.80,
    descuentoGlobalPorcentaje: 2.00,
    tipoVenta: 'menor',
    total: 304.58,
    estadoPago: 'completado',
    cajaAsignada: 'Caja 1',
    comentario: 'Cliente frecuente, precios preferenciales aplicados',
    moneda: 'BOB',
    detalles: [
      { productoId: 1, cantidad: 10, precioUnitarioAplicado: 11.00, descuentoPorProducto: 0.00, subtotal: 110.00 },
      { productoId: 3, cantidad: 4, precioUnitarioAplicado: 19.00, descuentoPorProducto: 0.00, subtotal: 76.00 },
      { productoId: 5, cantidad: 3, precioUnitarioAplicado: 23.00, descuentoPorProducto: 0.00, subtotal: 69.00 },
      { productoId: 7, cantidad: 4, precioUnitarioAplicado: 14.00, descuentoPorProducto: 1.30, subtotal: 55.80 }
    ]
  },
  {
    id: 3,
    clienteId: 3, // Eventos Happy Day
    usuarioId: 2, // Laura Flores
    fechaVenta: '2025-04-02 16:15:00',
    subtotal: 1765.00,
    descuentoGlobalPorcentaje: 5.00,
    tipoVenta: 'mayor',
    total: 1676.75,
    estadoPago: 'pendiente',
    cajaAsignada: 'Caja 2',
    comentario: 'Pedido grande para evento escolar, crédito a 15 días',
    moneda: 'BOB',
    detalles: [
      { productoId: 1, cantidad: 50, precioUnitarioAplicado: 10.00, descuentoPorProducto: 0.00, subtotal: 500.00 },
      { productoId: 2, cantidad: 100, precioUnitarioAplicado: 4.50, descuentoPorProducto: 0.00, subtotal: 450.00 },
      { productoId: 3, cantidad: 25, precioUnitarioAplicado: 18.00, descuentoPorProducto: 0.00, subtotal: 450.00 },
      { productoId: 4, cantidad: 30, precioUnitarioAplicado: 7.50, descuentoPorProducto: 0.00, subtotal: 225.00 },
      { productoId: 6, cantidad: 20, precioUnitarioAplicado: 5.00, descuentoPorProducto: 0.00, subtotal: 100.00 },
      { productoId: 7, cantidad: 3, precioUnitarioAplicado: 13.00, descuentoPorProducto: 1.00, subtotal: 40.00 }
    ]
  }
];
