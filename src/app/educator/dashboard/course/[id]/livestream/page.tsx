"use client"

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { MoveLeftIcon } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

const Livestream = () => {

  const router = useRouter();
  const pathname = usePathname();
  const [showNewStreamForm, setShowNewStreamForm] = useState(false);
  const [streamName, setStreamName] = useState('');

  const handleNewStreamClick = () => {
    setShowNewStreamForm(true);
  };

  const handleBackClick = () => {
    setShowNewStreamForm(false);
  };


  const handleStreamNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStreamName(event.target.value);
  };

  // TO DO : Get the streamId dynamically
  const handleStartStream = () => {
    console.log('Stream Name:', streamName);
    const streamId = streamName.replace(/\s+/g, '-').toLowerCase();
    router.push(`${pathname}/${streamId}`);
  };


  return (
    <div className='py-8'>

      {!showNewStreamForm ? (
        <div className='flex flex-col gap-32'>
          <p className='text-3xl font-medium'>Livestream</p>
          <div className='flex flex-col gap-4 items-center mt-24'>
            <p className='text-4xl'>Create a live stream </p>
            <Button onClick={handleNewStreamClick} className='text-xl font-semibold'>New Stream</Button>
          </div>
        </div>
      ) : (
        <>
          <div className='flex justify-between'>
            <div
              className="h-6 w-6 cursor-pointer mr-2"
              onClick={handleBackClick}
            >
              <MoveLeftIcon className='h-6 w-6' />
            </div>
            <p className='text-3xl font-medium'>New Stream</p>
            <div></div>
          </div>
          <div className='flex flex-col gap-8 px-40 mt-40'>
            <div className="flex flex-col gap-2">
              <Label htmlFor="streamName" className="text-muted-foreground text-xl ml-1">Stream name</Label>
              <Input
                id="streamName"
                type='text'
                placeholder='Enter stream name'
                value={streamName}
                onChange={handleStreamNameChange}
                className='border text-md p-2 rounded-[10px] h-16'
              />
            </div>
            <div className='flex justify-center'>
              <Button onClick={handleStartStream} className='ml-2 text-lg'>
                Start Stream
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Livestream