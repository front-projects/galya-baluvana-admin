'use client';

import { useState } from 'react';
import CategoryItem from './Category-Item';
import AddNewCategory from './AddNewCategory';
import { v4 as uuidv4 } from 'uuid';

export default function FilterCategory({ categories }) {
  const [query, setQuery] = useState('');

  const handleSearch = (event) => {
    setQuery(event.target.value);
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.nameEn.toLowerCase().includes(query.toLowerCase()) ||
      category.nameUa.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="w-full flex flex-col items-center py-4">
      <input
        type="text"
        placeholder="Search category..."
        value={query}
        onChange={handleSearch}
        className="border p-2 w-2/3 max-w-md mb-6"
      />
      <ul className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 w-full gap-4 mt-10 pb-10">
        <AddNewCategory />
        {filteredCategories.length > 0 ? (
          filteredCategories.map((category) => (
            <CategoryItem key={uuidv4()} category={category} />
          ))
        ) : (
          <div>No categories</div>
        )}
      </ul>
    </div>
  );
}
