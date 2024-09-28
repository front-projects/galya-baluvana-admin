'use client';
import { useRouter } from 'next/navigation';
export function Modal({ children }) {
  const router = useRouter();

  return (
    <div
      className="fixed w-screen h-[100dvh] top-0 left-0 flex items-center justify-center z-10 bg-black/30"
      onClick={router.back}
    >
      <div
        className={`bg-[#242424] border-2 border-white rounded-[24px] p-4 custom-shadow`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center ">{children}</div>
      </div>
    </div>
  );
}
