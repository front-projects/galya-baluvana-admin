'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Modal } from '../components/Modal';
import { Button } from '@mui/material';
import { RiEdit2Fill } from 'react-icons/ri';
import { deleteCategory, updateCategory } from '../../lib/requests';
import { useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';

export default function CategoryItem({ category }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const show = searchParams.get('show');
  const deletedCategory = searchParams.get('category');
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(category);
  const [updatedValue, setUpdatedValue] = useState(value);

  //removing

  const submitHandler = async () => {
    const response = await deleteCategory(deletedCategory);
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
    setIsEditing(false);
  };

  const confirmEditing = async () => {
    const response = await updateCategory(updatedValue);
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
      <div onClick={() => router.push(`/menu/${category.category}`)}>
        <div className="border-2 rounded-xl p-4 hover:bg-gray-600/40 flex gap-4 items-center justify-between cursor-pointer max-sm:w-[90vw]">
          <div>
            {isEditing ? (
              <div
                className="flex max-sm:flex-col gap-4 w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={updatedValue.nameEn}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      nameEn: e.target.value,
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
              </div>
            ) : (
              <div className="flex gap-4 max-sm:flex-col text-[14px] sm:items-center">
                <div>{updatedValue.nameEn}</div>
                <div>
                  {updatedValue.nameUa}{' '}
                  <span className="font-bold text-gray-600 text-[16px]">
                    ({Object.values(category.products).length})
                  </span>
                </div>
              </div>
            )}
            {/* {category.nameUa} / {category.nameEn} */}
          </div>
          {isEditing ? (
            <div
              className="flex items-center gap-2 text-[250%] "
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
                  router.push(`/menu?show=true&category=${category.category}`);
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
