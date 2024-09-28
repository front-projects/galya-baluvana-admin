'use client';

import { IoExit } from 'react-icons/io5';
import { deleteSesssion } from '../../lib/sessions';

export default function Navigation() {
  return (
    <nav className="w-screen h-[60px] border-b-2 flex justify-end items-center px-10">
      <div
        className="flex gap-2 items-center hover:bg-gray-600/40 p-2 rounded-xl cursor-pointer"
        onClick={() => deleteSesssion()}
      >
        <p>Exit</p>
        <div className="text-[160%]">
          <IoExit />
        </div>
      </div>
    </nav>
  );
}
