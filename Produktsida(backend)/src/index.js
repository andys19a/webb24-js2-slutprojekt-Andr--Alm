import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { getProducts, purchaseProducts } from './handledatabase.js';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json()); 


//filtrerar produkter via sök
app.get('/products', (req, res) => {
    const searchTerm = req.query.name?.toLowerCase() || ''; 
    fs.readFile('./src/productdatabase.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read product data' });
        }
        
        const products = JSON.parse(data);
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        
        res.json(filteredProducts); 
    });
});


app.post('/purchase', (req, res) => {
    const cartItems = req.body;
    purchaseProducts(req, res); 
});

app.listen(port, () => {
    console.log(`API is running. Use /products to get the product list.`);
});

