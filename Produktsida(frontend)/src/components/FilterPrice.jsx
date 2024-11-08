import React from 'react';
// 2 knappar för att visa produkter med högst pris i fallande ordning eller lägst pris med fallande ordning
function SortButton({ products, setProducts }) {
  const sortByPriceDescending = () => {
    const sortedProducts = [...products].sort((a, b) => b.price - a.price);
    setProducts(sortedProducts);
  };

  const sortByPriceAscending = () => {
    const sortedProducts = [...products].sort((a, b) => a.price - b.price);
    setProducts(sortedProducts);
  };

  return (
    <div>
      <button onClick={sortByPriceDescending}>Sortera efter pris (Högst till lägst)</button>
      <button onClick={sortByPriceAscending}>Sortera efter pris (Lägst till högst)</button>
    </div>
  );
}

export default SortButton;
