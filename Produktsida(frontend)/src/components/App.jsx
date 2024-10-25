import React, { useState, useEffect } from "react";
import { NavBar } from "./NavBar"; 
import { Form } from "./form";
import { ProductBox } from "./ProductBox";
import { Cart } from "./Cart";
import { ThankYouPage } from "./ThankYouPage";
import SortButton from "./FilterPrice";

function App() {
  const [currentView, setCurrentView] = useState("products");
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    fetchProducts();
  }, []);
  
  const fetchProducts = () => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        setLoading(false); 
      });
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <div>
      {/* NavBar med loading och products som props */}
      <NavBar
        showProducts={() => setCurrentView("products")}
        showCart={() => setCurrentView("cart")}
        cartItemCount={totalQuantity}
        loading={loading}
        products={products}
      />

      {currentView === "cart" ? (
        <Cart
          cartItems={cartItems}
          clearCart={() => setCartItems([])}
          setCurrentView={setCurrentView}
          setProducts={setProducts}
        />
      ) : currentView === "thankyou" ? (
        <ThankYouPage />
      ) : (
        <>
          <Form setProducts={setProducts} />
          <SortButton products={products} setProducts={setProducts} />

          <div className="products-list">
            {products.map((product) => (
              <ProductBox
                key={product.id}
                product={product}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;



