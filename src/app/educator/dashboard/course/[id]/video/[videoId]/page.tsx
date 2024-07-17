"use client"

import React from 'react'
import { MoveLeftIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

const VideoIdPage = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className='py-8'>
      <div className='flex items-center gap-4'>
        <div
          className="h-6 w-6 cursor-pointer mr-2"
          onClick={handleBackClick}
        >
          <MoveLeftIcon className='h-6 w-6' />
        </div>
        <p className='text-3xl font-medium'>Video Id </p>
      </div>
    </div>
  )
}

export default VideoIdPage