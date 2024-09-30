import Link from 'next/link';
import { FaCircleArrowLeft } from 'react-icons/fa6';
import { getProduct } from '../../../lib/requests';
import AddNewProduct from '../../components/AddNewProduct';
import ProductItem from '../../components/Product-Item';

export default async function CategoryPage({ params }) {
  const product = await getProduct(params.category);
  const list = product.products
    ? Object.entries(product.products).map(([key, value]) => {
        return { ...value, id: key };
      })
    : [];

  return (
    <>
      <div className="flex items-center gap-2">
        <Link
          href="/menu"
          className="flex border-2 rounded-xl w-max p-2 px-6 hover:bg-gray-600/40 items-center gap-2"
        >
          <FaCircleArrowLeft />
          <div>Back</div>
        </Link>
        <h1>
          {product.nameUa} / {product.nameEn}
        </h1>
      </div>

      <div className="mt-6 grid grid-cols-3 max-lg:grid-cols-2 w-full max-sm:grid-cols-1 gap-2">
        <AddNewProduct category={params.category} />
        {list.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            category={params.category}
          >
            Product
          </ProductItem>
        ))}
      </div>
    </>
  );
}
