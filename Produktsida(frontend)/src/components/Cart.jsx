import React from 'react';
export function Cart({ cartItems, clearCart, setCurrentView, setProducts }) {
  const totalPrice = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

  const handleCheckout = () => {
    console.log("Cart items before checkout:", cartItems);

    fetch('http://localhost:3000/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    })
    .then((response) => {
      if (response.ok) {
        console.log('Köp genomfört och lagersaldo uppdaterat!');
        clearCart(); 
        setCurrentView('thankyou');
        fetch("http://localhost:3000/products")
          .then((response) => response.json())
          .then((data) => {
            setProducts(data); 
          })
          .catch((error) => {
            console.error("Error fetching product data:", error);
          });
      } else {
        response.text().then(text => {
          console.error('Köp misslyckades:', text); 
        });
      }
    })
    .catch((error) => {
      console.error('Något gick fel:', error);
    });
  };

  return (
    <div className="cart">
      <h2>Din Kundvagn</h2>
      {cartItems.length === 0 ? (
        <p>Varukorgen är tom.</p>
      ) : (
        //toFixed för att hålla decimaler till 2
        <>
        
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - Antal: {item.quantity}, Totalpris: SEK {item.totalPrice.toFixed(2)}
              </li>
            ))}
          </ul>
          
          <h3>Totalt pris: SEK {totalPrice.toFixed(2)}</h3>  
          <button onClick={handleCheckout}>Betala</button>   
          <button 
            onClick={() => {
              clearCart();
              setCurrentView('products');
            }}
          >
            Töm varukorgen
          </button>        
        </>
      )}
    </div>
  );
}
