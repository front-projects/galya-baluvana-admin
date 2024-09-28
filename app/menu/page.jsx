import { Suspense } from 'react';
import { getProducts } from '../../lib/requests';
import CategoryItem from '../components/Category-Item';
import AddNewCategory from '../components/AddNewCategory';
import { v4 as uuidv4 } from 'uuid';

export default async function Dashboard() {
  const products = await getProducts();
  const array = products
    ? Object.entries(products).map(([key, value]) => {
        return {
          category: key,
          nameEn: value.nameEn,
          nameUa: value.nameUa,
          products: value.products,
        };
      })
    : [];

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="w-full text-center font-bold text-[24px]">Category</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 w-full gap-4 mt-10 pb-10">
          <AddNewCategory />
          {array ? (
            array.map((category) => (
              <CategoryItem key={uuidv4()} category={category} />
            ))
          ) : (
            <div>No categories</div>
          )}
        </ul>
      </Suspense>
    </div>
  );
}
