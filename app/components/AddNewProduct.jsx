/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { IoIosCheckmarkCircle } from 'react-icons/io';
import { IoCloseCircle } from 'react-icons/io5';
import { newProduct } from '../../lib/requests';
import { useRouter } from 'next/navigation';
import { CldUploadWidget } from 'next-cloudinary';
import { FaPlusCircle } from 'react-icons/fa';
import { v4 as uuidv4 } from 'uuid';

export default function AddNewProduct({ category }) {
  const [resource, setResource] = useState([]);
  const [isEditing, setIsEditing] = useState();
  const [updatedValue, setUpdatedValue] = useState({
    nameEn: '',
    nameUa: '',
    price: '',
    compositionUa: '',
    compositionEn: '',
    coockingEn: '',
    coockingUa: '',
    images: '',
    mainImage: '',
  });
  const router = useRouter();

  const confirmEditing = async () => {
    const images = resource.reduce((acc, url) => {
      acc[uuidv4()] = url;
      return acc;
    }, {});
    const response = await newProduct(
      {
        ...updatedValue,
        images: images,
        mainImage:
          updatedValue.mainImage !== ''
            ? updatedValue.mainImage
            : Object.values(updatedValue.images)[0],
      },
      category,
    );
    if (response) {
      setUpdatedValue({
        nameEn: '',
        nameUa: '',
        price: '',
        compositionUa: '',
        compositionEn: '',
        coockingEn: '',
        coockingUa: '',
        mainImage: '',
        images: '',
      });
      setResource([]);
      setIsEditing(false);
      router.refresh();
    } else {
      alert('Something went wrong, try again later');
    }
  };

  const removeImage = (image) => {
    const updatedResource = [...resource].filter((el) => el !== image);
    setResource(updatedResource);
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
              placeholder="English name of product"
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
              placeholder="English composition"
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
              placeholder="English coocking method"
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
              placeholder="Назва продукту українською"
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
              placeholder="Спосіб приготування українською"
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
              placeholder="Ціна"
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
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
          className="w-full text-center h-full p-4 flex items-center justify-center"
          onClick={() => setIsEditing(true)}
        >
          Add New
        </div>
      )}
    </div>
  );
}
