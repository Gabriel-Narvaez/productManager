const fs = require('fs');

class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.products = [];
        this.productIdCounter = 1;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);

            const maxId = this.products.reduce((max, product) => (product.id > max ? product.id : max), 0);
            this.productIdCounter = maxId + 1;
        } catch (error) {

        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data);
    }

    addProduct(productData) {
        const { title, description, price, thumbnail, code, stock } = productData;


        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.error("Todos los campos son obligatorios.");
            return;
        }

        if (this.products.some(product => product.code === code)) {
            console.error("El código del producto ya existe.");
            return;
        }

        const newProduct = {
            id: this.productIdCounter++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        this.products.push(newProduct);
        this.saveProducts();
        console.log("Producto agregado:", newProduct);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);

        if (product) {
            return product;
        } else {
            console.error("Producto no encontrado. ID:", id);
        }
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);

        if (index !== -1) {
            updatedFields.id = id;
            this.products[index] = updatedFields;
            this.saveProducts();
            console.log("Producto actualizado:", updatedFields);
        } else {
            console.error("Producto no encontrado. ID:", id);
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);

        if (index !== -1) {
            const deletedProduct = this.products.splice(index, 1)[0];
            this.saveProducts();
            console.log("Producto eliminado:", deletedProduct);
        } else {
            console.error("Producto no encontrado. ID:", id);
        }
    }
}

// Prueba
const productManager = new ProductManager('productos.json');
productManager.addProduct({
    title: 'Producto Uno',
    description: 'Descripción del producto Uno',
    price: 19.99,
    thumbnail: 'path/to/image.jpg',
    code: 'P123',
    stock: 50
});

const allProducts = productManager.getProducts();
console.log("Todos los productos:", allProducts);

const productId = 1;
const productById = productManager.getProductById(productId);
console.log("Producto por ID:", productById);

const updatedFields = {
    title: 'Producto Modificado',
    price: 29.99,
    stock: 40
};
productManager.updateProduct(productId, updatedFields);

const productIdToDelete = 2;
productManager.deleteProduct(productIdToDelete);