const API_URL = 'http://localhost:3000/productos';

// Obtener todos los productos
export const getProductos = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al obtener los productos:', error);
    }
};

// Crear un nuevo producto
export const createProducto = async (producto) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(producto)
        });
        return await response.json();
    } catch (error) {
        console.error('Error al crear el producto:', error);
    }
};

// Eliminar un producto
export const deleteProducto = async (id) => {
    try {
        await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
    }
};
