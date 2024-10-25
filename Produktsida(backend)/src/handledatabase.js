import fs from 'fs';


export const getProducts = (req, res) => {
    console.log("Received request for /products");

    fs.readFile('./src/productdatabase.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading products file:", err);
            res.status(500).send('Error reading products file');
            return;
        }
        try {
            const products = JSON.parse(data);
            res.json(products);
        } catch (jsonError) {
            console.error("Error parsing JSON:", jsonError);
            res.status(500).send('Error parsing products data');
        }
    });
};

export const purchaseProducts = (req, res) => {
    const purchasedItems = req.body; 
    console.log("Received purchased items:", JSON.stringify(purchasedItems, null, 2)); // Logga mottagna produkter

    fs.readFile('./src/productdatabase.json', 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading products file:", err);
            res.status(500).send('Error reading products file');
            return;
        }

        try {
            const products = JSON.parse(data);
            let stockError = false;
            let errorMessage = '';

            purchasedItems.forEach((purchasedItem) => {
                const product = products.find((p) => p.id === purchasedItem.id);
                console.log("Checking product:", JSON.stringify(product, null, 2)); 

                if (product) {
                    console.log("Available stock:", product.stock, "Requested:", purchasedItem.quantity); 
                    if (product.stock >= purchasedItem.quantity) {
                        product.stock -= purchasedItem.quantity; 
                        console.log(`Updated stock for ${product.name}: ${product.stock}`); 
                    } else {
                        stockError = true;
                        errorMessage = `Not enough stock for product ${product.name}`;
                        console.error(errorMessage); 
                    }
                } else {
                    console.error(`Product with ID ${purchasedItem.id} not found`);
                }
            });

            
            if (!stockError) {
                fs.writeFile('./src/productdatabase.json', JSON.stringify(products, null, 2), 'utf8', (writeErr) => {
                    if (writeErr) {
                        console.error("Error writing updated products to file:", writeErr);
                        res.status(500).send('Error updating products');
                        return;
                    }
                    console.log("Product stock successfully updated.");
                    return res.status(200).send('Product stock successfully updated'); 
                });
            } else {
                res.status(400).send(errorMessage); 
            }
        } catch (jsonError) {
            console.error("Error parsing JSON:", jsonError);
            res.status(500).send('Error parsing products data');
        }
    });
};