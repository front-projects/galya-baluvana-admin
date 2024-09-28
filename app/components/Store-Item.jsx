'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { RiDeleteBin6Fill } from 'react-icons/ri';
import { Modal } from '../components/Modal';
import { Button } from '@mui/material';
import { RiEdit2Fill } from 'react-icons/ri';
import { deleteStore, updateStore } from '../../lib/requests';
import { useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';

export default function StoreItem({ store }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const show = searchParams.get('show');
  const deletedStore = searchParams.get('store');
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(store);
  const [updatedValue, setUpdatedValue] = useState(value);

  //removing

  const submitHandler = async () => {
    const response = await deleteStore(deletedStore);
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
    const response = await updateStore(updatedValue);
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
      <div>
        <div className="border-2 rounded-xl p-4 hover:bg-gray-600/40 flex gap-4 items-center justify-between cursor-pointer max-sm:w-[90vw]">
          <div>
            {isEditing ? (
              <div
                className="flex flex-col max-sm:flex-col gap-4"
                onClick={(e) => e.stopPropagation()}
              >
                <input
                  type="text"
                  value={updatedValue.address}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      address: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={updatedValue.city}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      city: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  value={updatedValue.lat}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      lat: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  value={updatedValue.lan}
                  onChange={(e) =>
                    setUpdatedValue({
                      ...updatedValue,
                      lan: e.target.value,
                    })
                  }
                />
              </div>
            ) : (
              <div className="flex flex-col gap-4 max-sm:flex-col text-[12px]">
                <div>Address : {updatedValue.address}</div>
                <div>City : {updatedValue.city}</div>
                <div>Lat : {updatedValue.lat}</div>
                <div>Lan {updatedValue.lan}</div>
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
                  router.push(`/menu/stores?show=true&store=${store.id}`);
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
