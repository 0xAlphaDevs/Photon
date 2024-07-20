import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import React from 'react'

const EducatorWallet = () => {
  return (
    <div className="flex flex-col gap-10 p-16">
      <div className="flex flex-col gap-4 justify-center items-center">
        <div className='text-4xl font-semibold'>Your Holdings</div>
        <div className="border border-solid border-slate-800 w-full" />
      </div>
      <div className='flex justify-around'>
        <Card className='flex flex-col gap-4 p-4 shadow-md w-48'>
          <CardDescription> Current balance </CardDescription>
          <CardTitle> $ 12,500 </CardTitle>
        </Card>
      </div>
    </div>
  )
}

export default EducatorWallet