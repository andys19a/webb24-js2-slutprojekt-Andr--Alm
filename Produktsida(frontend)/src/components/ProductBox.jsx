import React from 'react';

export const ProductBox = ({ product, cartItems, setCartItems }) => {
  //Ser till att det inte går att köpa vid 0
  const addToCart = (product) => {
    const remainingStock = product.stock - (cartItems.find(item => item.id === product.id)?.quantity || 0);

    if (remainingStock > 0) {
      const existingItem = cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === product.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  totalPrice: item.totalPrice + product.price,
              }
              : item
          )
        );
      } else {
        setCartItems((prevItems) => [
          ...prevItems,
          {
            ...product,
            quantity: 1,
            totalPrice: product.price,
          },
        ]);
      }
    } else {
      alert("Tyvärr, inte tillräckligt med lager för den här produkten.");
    }
  };
  //data från backend json fil
  return (
    <div className="product-box">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3>{product.name}</h3>
      <p>Price: {product.price} SEK</p>
      <p>Stock: {product.stock}</p>
      <button 
        onClick={() => addToCart(product)} 
        disabled={product.stock === 0}
      >
        {product.stock > 0 ? "Lägg till i kundvagn" : "Slut i lager"}
      </button>
    </div>
  );
};

