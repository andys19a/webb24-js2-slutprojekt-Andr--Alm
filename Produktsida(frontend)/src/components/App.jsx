import React, { useState, useEffect } from "react";
import { NavBar } from "./NavBar";
import { Form } from "./form";
import { ProductBox } from "./ProductBox";
import { Cart } from "./Cart";
import { ThankYouPage } from "./ThankYouPage";

function App() {
  const [currentView, setCurrentView] = useState("products"); // Hantera aktuell vy
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const clearCart = () => {
    setCartItems([]);
  };

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const addToCart = (product) => {
    // Kontrollera att det finns tillräckligt med lager innan produkten läggs till
    const existingItem = cartItems.find(item => item.name === product.name);
    if (existingItem) {
      // Om produkten redan finns, öka kvantiteten
      if (existingItem.quantity + product.quantity <= product.stock) {
        setCartItems((prevItems) =>
          prevItems.map(item =>
            item.name === product.name
              ? { ...item, quantity: item.quantity + product.quantity, totalPrice: item.totalPrice + product.totalPrice }
              : item
          )
        );
      }
    } else {
      // Om produkten inte finns i kundvagnen, lägg till den
      setCartItems((prevItems) => [...prevItems, product]);
    }
  };

  // Funktion för att summera alla kvantiteter av produkterna i varukorgen
  const getTotalItemsInCart = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const showProducts = () => {
    setCurrentView("products"); 
  };

  const showCartView = () => {
    setCurrentView("cart"); 
  };

  const handleCheckout = () => {
    setCurrentView("thankyou"); 
    clearCart(); 
  };

  if (products.length === 0) {
    return <div>Laddar produkter... eller inga produkter tillgängliga.</div>;
  }

  return (
    <div>
      <NavBar
        showProducts={showProducts}
        showCart={showCartView}
        cartItemCount={getTotalItemsInCart()} // Skicka totalt antal produkter i varukorgen
      />

      {currentView === "cart" ? (
        <Cart cartItems={cartItems} clearCart={clearCart} onCheckout={handleCheckout} />
      ) 
      :currentView === "thankyou" ? (
        <ThankYouPage />
      ) 

      : (
        <>
          <Form />
          <div className="products-list">
            {products.map((product) => (
              <ProductBox
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
