/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Modal } from '../components/Modal';
import { Button } from '@mui/material';
import { RiEdit2Fill } from 'react-icons/ri';
import { deleteProduct, updateProduct } from '../../lib/requests';
import { useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';
import { CldUploadWidget } from 'next-cloudinary';
import { FaPlusCircle } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

export default function ProductItem({ product, category }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const show = searchParams.get('show');
  const deletedProduct = searchParams.get('product');
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(product);
  const [resource, setResource] = useState(
    value.images ? Object.values(value.images) : [],
  );
  const [updatedValue, setUpdatedValue] = useState(value);

  //removing

  const submitHandler = async () => {
    const response = await deleteProduct(category, deletedProduct);
    if (response) {
      router.back();
      setTimeout(() => {
        router.refresh();
      }, 200);
    } else {
      alert('Something went wrong, try again later');
    }
  };
  //cancel edit
  const closeEditing = () => {
    setUpdatedValue(value);
    setResource(Object.values(value.images));
    setIsEditing(false);
  };

  const confirmEditing = async () => {
    const images = resource.reduce((acc, url) => {
      acc[uuidv4()] = url;
      return acc;
    }, {});
    const response = await updateProduct(category, {
      ...updatedValue,
      images: images,
      mainImage:
        updatedValue.mainImage !== '' ? updatedValue.mainImage : resource[0],
    });
    if (response) {
      router.refresh();
      setValue({ ...updatedValue, images: images });
      setIsEditing(false);
    } else {
      alert('Error, try again later');
    }
  };
  const removeImage = (image) => {
    const updatedResource = [...resource].filter((el) => el !== image);
    setResource(updatedResource);
  };

  return (
    <>
      <div className="w-full">
        <div className="border-2 rounded-xl p-4 hover:bg-gray-600/40 flex gap-4 items-center justify-between cursor-pointer max-sm:w-[90vw] h-full w-full  max-sm:flex-col">
          <div className="w-full">
            {isEditing ? (
              <div
                className="flex flex-col gap-4 w-[90%] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  className="w-full"
                  placeholder="Name of product"
                  value={updatedValue.nameEn}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      nameEn: e.target.value,
                    })
                  }
                />
                <textarea
                  type="text"
                  placeholder="Composition En"
                  value={updatedValue.compositionEn}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      compositionEn: e.target.value,
                    })
                  }
                />
                <textarea
                  type="text"
                  placeholder="Cooking En"
                  value={updatedValue.coockingEn}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      coockingEn: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Назва українською"
                  value={updatedValue.nameUa}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      nameUa: e.target.value,
                    })
                  }
                />
                <textarea
                  type="text"
                  placeholder="Склад продукту"
                  value={updatedValue.compositionUa}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      compositionUa: e.target.value,
                    })
                  }
                />
                <textarea
                  type="text"
                  placeholder="Спосіб приготування"
                  value={updatedValue.coockingUa}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      coockingUa: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="Price"
                  value={updatedValue.price}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      price: e.target.value,
                    })
                  }
                />
                <h3>Images:</h3>
                <div className="grid grid-cols-4 gap-2">
                  <CldUploadWidget
                    uploadPreset="galya-baluvana-products"
                    onSuccess={(result, { widget }) => {
                      setResource((prevResource) => [
                        ...prevResource,
                        result?.info.url,
                      ]);
                    }}
                  >
                    {({ open }) => {
                      return (
                        <button onClick={() => open()} className="text-[300%]">
                          <FaPlusCircle />
                        </button>
                      );
                    }}
                  </CldUploadWidget>
                  {resource &&
                    resource.map((img) => (
                      <div
                        key={img}
                        className={`w-[70px] h-[70px] rounded-md relative ${updatedValue.mainImage == img ? 'border-4 border-yellow-500' : ''}`}
                      >
                        <img
                          alt="image"
                          src={img}
                          className={`w-full h-full`}
                          onClick={() =>
                            setUpdatedValue({ ...updatedValue, mainImage: img })
                          }
                          onDoubleClick={() => {
                            setUpdatedValue({ ...updatedValue, mainImage: '' });
                            removeImage(img);
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className="flex gap-4 flex-col text-[12px] max-w-[100%] text-gray-400">
                <div>
                  Name EN:{' '}
                  <span className="font-bold text-white">
                    {updatedValue.nameEn}
                  </span>
                </div>
                <div>
                  Compostion EN:{' '}
                  <span className="font-bold text-white">
                    {updatedValue.compositionEn}
                  </span>
                </div>
                <div>
                  Coocking EN:{' '}
                  <span className="font-bold text-white">
                    {updatedValue.coockingEn}
                  </span>
                </div>
                <div>
                  Назва:{' '}
                  <span className="font-bold text-white">
                    {updatedValue.nameUa}
                  </span>
                </div>
                <div>
                  Склад:
                  <span className="font-bold text-white">
                    {updatedValue.compositionUa}
                  </span>
                </div>
                <div>
                  Спосіб приготування:{' '}
                  <span className="font-bold text-white">
                    {updatedValue.coockingUa}
                  </span>
                </div>
                <div>
                  Ціна :{' '}
                  <span className="font-bold text-white">
                    {updatedValue.price}
                  </span>
                </div>
                <h3>Images:</h3>
                <div className="grid grid-cols-4 gap-2">
                  {updatedValue.images &&
                    resource.map((img) => (
                      <div
                        key={img}
                        className={`w-[70px] h-[70px] rounded-md relative ${updatedValue.mainImage == img ? 'border-4 border-yellow-500' : ''}`}
                      >
                        <img
                          alt="image"
                          src={img}
                          className={`w-full h-full`}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )}
            {/* {category.nameUa} / {category.nameEn} */}
          </div>
          {isEditing ? (
            <div
              className="flex items-center gap-2 text-[250%]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-green-600" onClick={confirmEditing}>
                <IoIosCheckmarkCircle />
              </div>
              <div className="text-red-500" onClick={closeEditing}>
                <IoCloseCircle />
              </div>
            </div>
          ) : (
            <div className="flex gap-4 items-center">
              <div
                className="border-2 rounded-md p-2 flex items-center gap-2 hover:bg-gray-300/50"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsEditing(true);
                }}
              >
                <p>Edit</p>
                <div>
                  <RiEdit2Fill />
                </div>
              </div>
              <div
                className="text-[150%] text-red-500 hover:scale-[1.2]"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(
                    `/menu/${category}?show=true&product=${product.id}`,
                  );
                }}
              >
                <RiDeleteBin6Fill />
              </div>
            </div>
          )}
        </div>
      </div>
      {show && (
        <Modal>
          <div className="flex flex-col gap-4 w-full">
            <p>
              Do you really want to delete a category with all the products?
            </p>
            <div className="flex items-center justify-center gap-10">
              <Button
                variant="contained"
                color="secondary"
                onClick={submitHandler}
              >
                Yes
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={router.back}
              >
                No
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
