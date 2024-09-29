'use client';

import { useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';
import { newCategory } from '../../lib/requests';
import { useRouter } from 'next/navigation';

export default function AddNewCategory() {
  const [isEditing, setIsEditing] = useState();
  const [updatedValue, setUpdatedValue] = useState({
    nameEn: '',
    nameUa: '',
    products: '',
  });
  const [key, setKey] = useState('');
  const router = useRouter();

  const confirmEditing = async () => {
    const response = await newCategory(updatedValue, key);
    if (response) {
      setUpdatedValue({
        nameEn: '',
        nameUa: '',
        products: '',
      });
      setKey('');
      setIsEditing(false);
      router.refresh();
    } else {
      alert('Something went wrong, try again later');
    }
  };

  const closeEditing = () => {
    setIsEditing(false);
  };

  return (
    <div className="border-2 rounded-md text-center hover:bg-gray-600/40 flex gap-4 items-center justify-between cursor-pointer max-sm:w-[90vw] max-sm:flex-col">
      {isEditing ? (
        <>
          <div
            className="flex flex-col gap-4 p-4 w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="URL"
              value={key}
              onChange={(e) => setKey(e.target.value)}
            />
            <input
              type="text"
              placeholder="English name of category"
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
              placeholder="Українська назва категорії"
              value={updatedValue.nameUa}
              onChange={(e) =>
                setUpdatedValue({
                  ...updatedValue,
                  nameUa: e.target.value,
                })
              }
            />
          </div>
          <div
            className="flex items-center gap-2 text-[250%] p-4 "
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-green-600" onClick={confirmEditing}>
              <IoIosCheckmarkCircle />
            </div>
            <div className="text-red-500" onClick={closeEditing}>
              <IoCloseCircle />
            </div>
          </div>
        </>
      ) : (
        <div
          className="w-full text-center h-full flex items-center justify-center p-4"
          onClick={() => setIsEditing(true)}
        >
          Add New
        </div>
      )}
    </div>
  );
}
