let carrito = [];

function agregarAlCarrito(id, nombre, precio) {
  const cantidadInput = document.querySelector(`[data-producto="${id}"]`);
  const cantidad = parseInt(cantidadInput.value);
  
  if (cantidad <= 0) {
    alert('Por favor ingresa una cantidad válida');
    return;
  }

  // Buscar si el producto ya existe en el carrito
  const productoExistente = carrito.find(item => item.id === id);
  
  if (productoExistente) {
    productoExistente.cantidad += cantidad;
  } else {
    carrito.push({
      id: id,
      nombre: nombre,
      precio: precio,
      cantidad: cantidad
    });
  }

  cantidadInput.value = 0;
  
  actualizarResumen();
}

function calcularDescuentos() {
  let totalSinDescuento = 0;
  let descuentoTotal = 0;

  carrito.forEach(item => {
    totalSinDescuento += item.precio * item.cantidad;
  });

  const productosPromo1 = carrito.filter(item => 
    ['iphone15', 'macbook', 'ipad'].includes(item.id)
  );
  
  productosPromo1.forEach(item => {
    if (item.cantidad >= 2) {
      const pares = Math.floor(item.cantidad / 2);
      const descuento = (item.precio * 0.5) * pares;
      descuentoTotal += descuento;
    }
  });

  const productosPromo2 = carrito.filter(item => 
    ['airpods', 'watch', 'mouse'].includes(item.id)
  );
  
  productosPromo2.forEach(item => {
    if (item.cantidad >= 3) {
      const grupos = Math.floor(item.cantidad / 3);
      const descuento = item.precio * grupos; // El tercero es gratis
      descuentoTotal += descuento;
    }
  });

  if (totalSinDescuento > 300000) {
    const productosPromo3 = carrito.filter(item => 
      ['gamingpc', 'monitor', 'teclado'].includes(item.id)
    );
    
    productosPromo3.forEach(item => {
      const subtotal = item.precio * item.cantidad;
      const descuento = subtotal * 0.1;
      descuentoTotal += descuento;
    });
  }

  return {
    totalSinDescuento: totalSinDescuento,
    descuentoTotal: descuentoTotal,
    totalFinal: totalSinDescuento - descuentoTotal
  };
}

function actualizarResumen() {
  const listaProductos = document.getElementById('lista-productos');
  const totalSinDescuento = document.getElementById('total-sin-descuento');
  const descuentoAplicado = document.getElementById('descuento-aplicado');
  const totalFinal = document.getElementById('total-final');

  if (carrito.length === 0) {
    listaProductos.innerHTML = '<p>No hay productos en el carrito</p>';
    totalSinDescuento.textContent = '0';
    descuentoAplicado.textContent = '0';
    totalFinal.textContent = '0';
    return;
  }

  let html = '<ul>';
  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    html += `<li>${item.nombre} x${item.cantidad} - $${subtotal.toLocaleString()}</li>`;
  });
  html += '</ul>';

  listaProductos.innerHTML = html;

  const calculos = calcularDescuentos();
  totalSinDescuento.textContent = calculos.totalSinDescuento.toLocaleString();
  descuentoAplicado.textContent = calculos.descuentoTotal.toLocaleString();
  totalFinal.textContent = calculos.totalFinal.toLocaleString();
}

function limpiarCarrito() {
  carrito = [];
  actualizarResumen();
}

document.addEventListener('DOMContentLoaded', function() {
  actualizarResumen();
});
