// handledatabase.js
import fs from 'fs';

export const getProducts = (req, res) => {
    console.log("Received request for /products"); // Loggar inkommande förfrågan

    fs.readFile('./src/productdatabase.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading products file:", err);
            res.status(500).send('Error reading products file');
            return;
        }
        console.log("Raw data read from file:", data); // Loggar raw data
        try {
            const products = JSON.parse(data);
            console.log("Parsed products:", products); // Loggar parsed data
            res.json(products);
        } catch (jsonError) {
            console.error("Error parsing JSON:", jsonError);
            res.status(500).send('Error parsing products data');
        }
    });
};
