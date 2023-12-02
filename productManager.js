class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }

    addProduct(product) {
        if (
            !product.title ||
            !product.description ||
            !product.price ||
            !product.thumbnail ||
            !product.code ||
            !product.stock
        ) {
            return 'Todos los campos son obligatorios.';
        }

        const exists = this.products.find((prod) => prod.code === product.code);

        if (exists) {
            return 'El código del producto ya existe.';
        }

        if (this.products.length === 0) {
            product.id = 1;
        } else {
            product.id = this.products.length + 1;
        }

        this.products.push(product);

        return 'Producto agregado:', product;
    }

    getProductById(pid) {
        const result = this.products.find((prod) => prod.id === pid);
        if (!result) {
            return 'Producto no encontrado.';
        }
        return result;
    }
}

// Pruebas

const products = new ProductManager();
console.log(
    products.addProduct({
        title: 'Producto 1',
        description: 'Descripción del producto 1',
        price: 29.99,
        thumbnail: '/images/product1.jpg',
        stock: 10,
        code: 'abc123',
    })
);

console.log(
    products.addProduct({
        title: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 39.99,
        thumbnail: '/images/product2.jpg',
        stock: 15,
        code: 'abc133',
    })
);

console.log(
    products.addProduct({
        title: 'Producto 2',
        description: 'Descripción del producto 2',
        price: 39.99,
        thumbnail: '/images/product2.jpg',
        stock: 15,

    })
);

console.log(products.getProductById(1));
