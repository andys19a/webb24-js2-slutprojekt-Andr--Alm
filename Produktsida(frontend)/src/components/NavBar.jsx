import React from "react";

export function NavBar({ showProducts, showCart, cartItemCount, loading, products }) {
  return (
    <nav>
      <ul>
        <li onClick={showProducts}>Produkter</li>
        <li onClick={showCart}>
          Kundvagn {cartItemCount > 0 && <span>({cartItemCount})</span>}
        </li>
      </ul>
// Ligger här istället för app pga navbar ska visas om backend är nere / produkter inte visas
      {/* Lägg till logik för att hantera laddning och tomma produkter */}
      {loading ? (
        <div>Laddar produkter...</div>
      ) : products.length === 0 ? (
        <div>Inga produkter tillgängliga.</div>
      ) : null}
    </nav>
  );
}

