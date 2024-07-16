import { createProducto, deleteProducto, getProductos } from './api.js';

document.addEventListener('DOMContentLoaded', async () => {
    const productosGrid = document.getElementById('productos-grid');
    const noProductos = document.getElementById('no-productos');

    const renderProductos = async () => {
        const productos = await getProductos();
        productosGrid.innerHTML = '';
        if (productos.length === 0) {
            noProductos.style.display = 'block';
        } else {
            noProductos.style.display = 'none';
            productos.forEach(producto => {
                const productoCard = document.createElement('div');
                productoCard.classList.add('card');
                productoCard.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="card-container--info">
                        <p>${producto.nombre}</p>
                        <div class="card-container--value">
                            <p>$ ${producto.precio.toFixed(2)}</p>
                            <img src="imagenes/basura.png" class="eliminar-producto" alt="Eliminar" data-id="${producto.id}">
                        </div>
                    </div>
                `;
                productosGrid.appendChild(productoCard);
            });
        }
    };

    renderProductos();

    productosGrid.addEventListener('click', async (event) => {
        if (event.target.classList.contains('eliminar-producto')) {
            const id = event.target.dataset.id;
            await deleteProducto(id);
            renderProductos();
        }
    });

    const formProducto = document.getElementById('form-producto');
    formProducto.addEventListener('submit', async (event) => {
        event.preventDefault();
        const nombre = formProducto.querySelector('input[placeholder="nombre..."]').value;
        const precio = formProducto.querySelector('input[placeholder="precio..."]').value;
        const imagen = formProducto.querySelector('input[placeholder="imagen..."]').value;
        
        const nuevoProducto = {
            nombre,
            precio: parseFloat(precio),
            imagen
        };
        
        await createProducto(nuevoProducto);
        formProducto.reset();
        renderProductos();
    });
});
