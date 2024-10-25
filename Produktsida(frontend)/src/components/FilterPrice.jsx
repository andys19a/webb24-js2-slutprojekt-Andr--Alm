import React from 'react';
// delar upp produkter och filtrerar högst till lägst och lägst till högst
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
