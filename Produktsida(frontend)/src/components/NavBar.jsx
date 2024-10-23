import React from "react";

export function NavBar({ showProducts, showCart, cartItemCount }) {

    
  return (
    <nav>
      <ul>
        <li onClick={showProducts}>Produkter</li>
        <li onClick={showCart}>
          Kundvagn {cartItemCount > 0 && <span>({cartItemCount})</span>}
        </li>
      </ul>
    </nav>
  );
}
