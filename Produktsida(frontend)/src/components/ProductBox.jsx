import React, { useState } from 'react';

export function ProductBox({ product, addToCart }) {
  const [selectedQty, setSelectedQty] = useState(1); // Börjar med antal 1

  const totalPrice = product.price * selectedQty; // Beräkna totalpriset

  const handleAddToCart = () => {
    // Kontrollera att det finns tillräckligt med lager
    if (selectedQty <= product.stock) {
      addToCart({
        name: product.name,
        quantity: selectedQty,
        totalPrice: totalPrice,
      });
    }
  };

  return (
    <div className="product-page">
      <div className="product-details">
        <img src={product.image} alt={product.name} />
        <h1>{product.name}</h1>
        <p>Pris: SEK {product.price.toFixed(2)}</p>
        <p>Tillgängligt: {product.stock}</p> {/* Visa tillgänglig lagerstatus */}
      </div>

      <div className="quantity-selector">
        <label>Antal: </label>
        <input 
          type="number" 
          value={selectedQty} 
          onChange={(e) => setSelectedQty(parseInt(e.target.value) || 1)} 
          min="1" 
          max={product.stock} // Sätt maxvärde till lagret
        />
      </div>

      <p>Total pris: SEK {totalPrice.toFixed(2)}</p>
      <button 
        onClick={handleAddToCart} 
        disabled={selectedQty > product.stock} // Inaktivera knappen om kvantiteten är mer än lagret
      >
        Lägg till i varukorg
      </button>
    </div>
  );
}

