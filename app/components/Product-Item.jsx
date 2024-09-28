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

export default function ProductItem({ product, category }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const show = searchParams.get('show');
  const deletedProduct = searchParams.get('product');
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(product);
  const [updatedValue, setUpdatedValue] = useState(value);

  //removing

  const submitHandler = async () => {
    const response = await deleteProduct(category, deletedProduct);
    if (response) {
      router.refresh();
      setTimeout(() => {
        router.back();
      }, 200);
    } else {
      alert('Something went wrong, try again later');
    }
  };
  //cancel edit
  const closeEditing = () => {
    setUpdatedValue(value);
    setIsEditing(false);
  };

  const confirmEditing = async () => {
    const response = await updateProduct(category, updatedValue);
    if (response) {
      router.refresh();
      setValue(updatedValue);
      setIsEditing(false);
    } else {
      alert('Error, try again later');
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="border-2 rounded-xl p-4 hover:bg-gray-600/40 flex gap-4 items-center justify-between cursor-pointer max-sm:w-[90vw] h-full w-full">
          <div>
            {isEditing ? (
              <div
                className="flex flex-col gap-4 w-[90%]"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  className="w-full"
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
                  value={updatedValue.price}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      price: e.target.value,
                    })
                  }
                />
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
              </div>
            )}
            {/* {category.nameUa} / {category.nameEn} */}
          </div>
          {isEditing ? (
            <div
              className="flex items-center gap-2 text-[250%] max-sm:flex-col"
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
            <div className="flex gap-4 items-center max-sm:flex-col">
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
