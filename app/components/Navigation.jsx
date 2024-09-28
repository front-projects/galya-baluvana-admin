'use client';

import { IoExit } from 'react-icons/io5';
import { deleteSesssion } from '../../lib/sessions';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="w-screen h-[60px] border-b-2 flex justify-between items-center px-10">
      <div className="flex gap-2">
        <Link
          href="/menu"
          className={`${!pathname.includes('stores') ? 'bg-gray-600/60' : ''} border-2 px-4 p-2 rounded-xl`}
        >
          Menu
        </Link>
        <Link
          href="/menu/stores"
          className={`${pathname.includes('stores') ? 'bg-gray-600/60' : ''} border-2 px-4 p-2 rounded-xl`}
        >
          Stores
        </Link>
      </div>

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
