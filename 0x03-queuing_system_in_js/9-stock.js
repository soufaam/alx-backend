const express = require('express');
const redis = require('redis');
const { promisify } = require('util');

const app = express();
const port = 1245;

// Create Redis client
const client = redis.createClient();

// Promisify Redis functions
const hgetAsync = promisify(client.hget).bind(client);
const hsetAsync = promisify(client.hset).bind(client);

// Data: Array of products
const listProducts = [
    { id: 1, name: 'Suitcase 250', price: 50, stock: 4 },
    { id: 2, name: 'Suitcase 450', price: 100, stock: 10 },
    { id: 3, name: 'Suitcase 650', price: 350, stock: 2 },
    { id: 4, name: 'Suitcase 1050', price: 550, stock: 5 }
];

// Function to reserve stock by itemId
async function reserveStockById(itemId) {
    const key = `item.${itemId}`;
    const currentStock = await hgetAsync(key, 'stock');
    if (currentStock > 0) {
        await hsetAsync(key, 'stock', currentStock - 1);
        return { status: 'Reservation confirmed', itemId };
    } else {
        return { status: 'Not enough stock available', itemId };
    }
}

// Route to reserve a product
app.get('/reserve_product/:itemId', async (req, res) => {
    const itemId = parseInt(req.params.itemId);
    const product = listProducts.find(p => p.id === itemId);
    if (!product) {
        res.json({ status: 'Product not found' });
        return;
    }
    const result = await reserveStockById(itemId);
    res.json(result);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
