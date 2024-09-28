import { Suspense } from 'react';
import StoreItem from '../../components/Store-Item';
import AddNewStore from '../../components/AddNewStore';
import { v4 as uuidv4 } from 'uuid';
import { getStores } from '../../../lib/requests';

export default async function Stores() {
  const products = await getStores();
  const array = products
    ? Object.entries(products).map(([key, value]) => {
        return {
          id: key,
          ...value,
        };
      })
    : [];

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="w-full text-center font-bold text-[24px]">Category</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <ul className="grid grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1 w-full gap-4 mt-10 pb-10">
          <AddNewStore />
          {array ? (
            array.map((store) => <StoreItem key={uuidv4()} store={store} />)
          ) : (
            <div>No categories</div>
          )}
        </ul>
      </Suspense>
    </div>
  );
}
