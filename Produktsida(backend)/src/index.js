// index.js
import express from 'express';
import cors from 'cors';
import { getProducts } from './handledatabase.js'; // Importera funktionen

const app = express();
const port = 3000;

app.use(cors());

app.get('/products', getProducts); // Använd den importerade funktionen

app.listen(port, () => {
    console.log(`API is running. Use /products to get the product list.`);
});






