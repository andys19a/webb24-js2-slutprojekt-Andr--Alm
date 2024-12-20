import React from "react";
// Simpel meny för att antingen visa produkter eller varukorg. Visar ett meddelande om produkterna inte syns
export function NavBar({ showProducts, showCart, cartItemCount, loading, products }) {
  return (
    <nav>
      <ul>
        <li onClick={showProducts}>Produkter</li>
        <li onClick={showCart}>
          Kundvagn {cartItemCount > 0 && <span>({cartItemCount})</span>}
        </li>
      </ul>
      {/* Lägg till logik för att hantera laddning och tomma produkter */}
      {loading ? (
        <div>Laddar produkter...</div>
      ) : products.length === 0 ? (
        <div>Inga produkter tillgängliga.</div>
      ) : null}
    </nav>
  );
}

