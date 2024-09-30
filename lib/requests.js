'use server';
import axios from 'axios';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';

export const getProducts = async () => {
  const accessToken = cookies().get('accessToken')?.value;
  const response = await axios.get(
    'https://galya-baluvana-ec037-default-rtdb.firebaseio.com/products.json?auth=' +
      accessToken,
  );
  return response.data;
};
export const getStores = async () => {
  const accessToken = cookies().get('accessToken')?.value;
  const response = await axios.get(
    'https://galya-baluvana-ec037-default-rtdb.firebaseio.com/stores.json?auth=' +
      accessToken,
  );
  return response.data;
};

export const getProduct = async (product) => {
  const accessToken = cookies().get('accessToken')?.value;
  const response = await axios.get(
    `https://galya-baluvana-ec037-default-rtdb.firebaseio.com/products/${product}.json?auth=` +
      accessToken,
  );
  return response.data;
};

export const deleteCategory = async (category) => {
  const accessToken = cookies().get('accessToken')?.value;
  //   console.log(category);
  try {
    await axios.delete(
      `https://galya-baluvana-ec037-default-rtdb.firebaseio.com/products/${category}.json?auth=${accessToken}`,
    );
    return true;
  } catch {
    return false;
  }
};

export const deleteStore = async (store) => {
  const accessToken = cookies().get('accessToken')?.value;
  //   console.log(category);
  try {
    await axios.delete(
      `https://galya-baluvana-ec037-default-rtdb.firebaseio.com/stores/${store}.json?auth=${accessToken}`,
    );
    return true;
  } catch {
    return false;
  }
};

export const deleteProduct = async (category, product) => {
  const accessToken = cookies().get('accessToken')?.value;
  //   console.log(category);
  try {
    await axios.delete(
      `https://galya-baluvana-ec037-default-rtdb.firebaseio.com/products/${category}/products/${product}.json?auth=${accessToken}`,
    );
    return true;
  } catch {
    return false;
  }
};

export const updateCategory = async (category) => {
  let accessToken = cookies().get('accessToken')?.value;

  const updatedCategory = {
    nameEn: category.nameEn,
    nameUa: category.nameUa,
    products: category.products,
  };

  try {
    await axios.patch(
      `https://galya-baluvana-ec037-default-rtdb.firebaseio.com/products/${category.category}.json?auth=${accessToken}`,
      updatedCategory,
    );
    return true;
  } catch {
    return false;
  }
};

export const updateStore = async (store) => {
  const accessToken = cookies().get('accessToken')?.value;
  const updatedStore = {
    address: store.address,
    city: store.city,
    lat: store.lat,
    lan: store.lan,
    open: store.open,
  };

  try {
    await axios.patch(
      `https://galya-baluvana-ec037-default-rtdb.firebaseio.com/stores/${store.id}.json?auth=${accessToken}`,
      updatedStore,
    );
    return true;
  } catch {
    return false;
  }
};

export const updateProduct = async (category, product) => {
  const accessToken = cookies().get('accessToken')?.value;
  const updatedCategory = {
    nameEn: product.nameEn,
    nameUa: product.nameUa,
    price: product.price,
    compositionUa: product.compositionUa,
    compositionEn: product.compositionEn,
    coockingEn: product.coockingEn,
    coockingUa: product.coockingUa,
    images: product.images,
    mainImage: product.mainImage,
  };
  try {
    await axios.patch(
      `https://galya-baluvana-ec037-default-rtdb.firebaseio.com/products/${category}/products/${product.id}.json?auth=${accessToken}`,
      updatedCategory,
    );
    return true;
  } catch {
    return false;
  }
};

export const newCategory = async (category, key) => {
  const accessToken = cookies().get('accessToken')?.value;
  try {
    await axios.put(
      `https://galya-baluvana-ec037-default-rtdb.firebaseio.com/products/${key}.json?auth=${accessToken}`,
      category,
    );
    return true;
  } catch {
    return false;
  }
};
export const newStore = async (store) => {
  const accessToken = cookies().get('accessToken')?.value;
  try {
    await axios.put(
      `https://galya-baluvana-ec037-default-rtdb.firebaseio.com/stores/${uuidv4()}.json?auth=${accessToken}`,
      store,
    );
    return true;
  } catch {
    return false;
  }
};

export const newProduct = async (product, category) => {
  const accessToken = cookies().get('accessToken')?.value;
  try {
    await axios.put(
      `https://galya-baluvana-ec037-default-rtdb.firebaseio.com/products/${category}/products/${uuidv4()}.json?auth=${accessToken}`,
      product,
    );
    return true;
  } catch {
    return false;
  }
};
