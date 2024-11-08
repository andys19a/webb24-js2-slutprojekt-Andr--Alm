import React, { useState } from 'react';
// ett sätt för kunderna att hitta produkten som dem söker på via ett form, behöver innehålla rätt bokstäver i ordet för att sökningen ska fungera
export const Form = ({ setProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (searchTerm) => {
    fetch(`http://localhost:3000/products?name=${encodeURIComponent(searchTerm)}`)
      .then((response) => response.json())
      .then((filteredProducts) => {
        setProducts(filteredProducts);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Sök produkt..."
      />
      <button type="submit">Sök</button>
    </form>
  );
};

