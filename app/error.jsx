'use client';
import { IoReloadCircleSharp } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();

  return (
    <div
      className="w-screen h-screen flex flex-col items-center justify-center text-[500%] cursor-pointer"
      onClick={() => {
        router.push('/api/refresh-token');
        setTimeout(() => {
          router.push('/menu');
        }, 1000);
      }}
    >
      <p className="text-[30px] text-center">
        Something went wrong, try reload app
      </p>
      Reload
      <IoReloadCircleSharp />
    </div>
  );
}
