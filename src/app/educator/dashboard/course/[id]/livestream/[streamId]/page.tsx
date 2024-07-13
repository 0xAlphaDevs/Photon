import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "@/components/ui/select";
import { Separator } from '@/components/ui/separator';

const StreamId = () => {
  return (
    <div className='py-8'>
      <p className='text-3xl font-medium text-center'>Stream Name</p>
      <div className='flex gap-4 py-12 justify-center text-lg'>
        <div className='flex flex-col gap-4 text-right'>
          <p className=''>Stream Id : </p>
          <p>Stream Status : </p>
          <p className=''>Stream Ingestor :</p>
        </div>
        <div className='flex flex-col gap-4'>
          <p className='w-44'>abc</p>
          <p className='w-44'>Offline</p>
          <Select>
            <SelectTrigger id="streamIngestor" className='w-44'>
              <option>Select Ingestor</option>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ingestor1">Ingestor 1</SelectItem>
              <SelectItem value="ingestor2">Ingestor 2</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className='mt-8 flex justify-center'>
        <div className='w-96 h-48 bg-gray-800 border border-gray-700'>
          <video
            id="live-feed"
            className='w-full h-full object-cover'
            controls
            autoPlay
            src="https://path.to/live/feed"
          ></video>
        </div>
      </div>
    </div>
  );
}

export default StreamId;
