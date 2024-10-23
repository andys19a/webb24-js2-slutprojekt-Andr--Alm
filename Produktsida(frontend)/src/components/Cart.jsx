import React from 'react';

export function Cart({ cartItems, clearCart, onCheckout }) {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  return (
    <div className="cart">
      <h2>Din Kundvagn</h2>
      {cartItems.length === 0 ? (
        <p>Varukorgen är tom.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - Antal: {item.quantity}, Totalpris: SEK {item.totalPrice.toFixed(2)}
              </li>
            ))}
          </ul>
          <h3>Totalt pris: SEK {totalPrice.toFixed(2)}</h3>
          <button onClick={onCheckout}>Betala</button> {/* Viktigt att onCheckout anropas */}
          <button onClick={clearCart}>Töm varukorgen</button>
        </>
      )}
    </div>
  );
}

