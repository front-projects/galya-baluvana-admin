'use client';

import { useState } from 'react';
import ProductItem from './Product-Item';
import AddNewProduct from './AddNewProduct';
import { v4 as uuidv4 } from 'uuid';

export default function FilterProducts({ products, category }) {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.nameEn.toLowerCase().includes(query.toLowerCase()) ||
      product.nameUa.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="w-full flex flex-col items-center py-4">
      <input
        type="text"
        placeholder="Search product..."
        value={query}
        onChange={handleSearch}
        className="border p-2 w-2/3 max-w-md mb-6"
      />
      <div className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 w-full gap-4 mt-10 pb-10">
        <AddNewProduct category={category} />
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem key={uuidv4()} product={product} category={category} />
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
}
