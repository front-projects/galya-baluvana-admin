'use client';

import { useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';
import { newStore } from '../../lib/requests';
import { useRouter } from 'next/navigation';
import Select from 'react-select';
import { customStyles } from './CustomSelect';

export default function AddNewStore() {
  const [isEditing, setIsEditing] = useState();
  const [updatedValue, setUpdatedValue] = useState({
    address: '',
    city: '',
    lat: '',
    lan: '',
    open: false,
  });
  const router = useRouter();

  const confirmEditing = async () => {
    const response = await newStore(updatedValue);
    if (response) {
      setUpdatedValue({
        address: '',
        city: '',
        lat: '',
        lan: '',
        open: false,
      });
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
    <div className="border-2 rounded-md text-center hover:bg-gray-600/40 flex gap-4 items-center justify-between cursor-pointer max-sm:w-[90vw]">
      {isEditing ? (
        <>
          <div
            className="flex flex-col gap-4 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="text"
              placeholder="City"
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
              placeholder="Address"
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
              placeholder="lat"
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
              placeholder="lan"
              value={updatedValue.lan}
              onChange={(e) =>
                setUpdatedValue({
                  ...updatedValue,
                  lan: e.target.value,
                })
              }
            />
            <Select
              placeholder="Open?"
              options={[
                { value: true, label: 'Open' },
                { value: false, label: 'Open soon' },
              ]}
              styles={customStyles}
              onChange={(option) =>
                setUpdatedValue({ ...updatedValue, open: option.value })
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
