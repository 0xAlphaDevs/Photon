"use client"

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const UserRegistery = () => {
  const [formData, setFormData] = useState({ userName: '', userType: '' });
  const router = useRouter();
  const { address, isConnected } = useAccount();

  useEffect(() => {
    if (isConnected && address) {
      const userData = localStorage.getItem(address) ? localStorage.getItem(address) : `{"userType" : ""}`
      console.log("userData", userData);

      if (userData) {
        const { userType } = JSON.parse(userData);
        if (userType === 'educator') {
          router.push('/educator');
        } else if (userType === 'learner') {
          router.push('/learner');
        }
      }
    }
  }, [isConnected, address, router]);

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userData = { ...formData, address };
    if (address) {
      localStorage.setItem(address, JSON.stringify(userData));
      if (formData.userType === 'educator') {
        router.push('/educator');
      } else if (formData.userType === 'learner') {
        router.push('/learner');
      }
    }
  };

  return (
    <div>
      {!isConnected ? (
        <ConnectKitButton />
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">Register</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Register</DialogTitle>
              <DialogDescription>
                Provide the details below to get started with Photon
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleRegister}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="userName" className="text-right">
                    Username
                  </Label>
                  <Input
                    id="userName"
                    placeholder="John"
                    className="col-span-3"
                    value={formData.userName}
                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="userType" className='text-right'>UserType</Label>
                  <Select
                    value={formData.userType}
                    onValueChange={(value) => setFormData({ ...formData, userType: value })}
                  >
                    <SelectTrigger id="userType" className="col-span-3">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="educator">Educator</SelectItem>
                      <SelectItem value="learner">Learner</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className='w-full' type="submit">Register</Button>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

export default UserRegistery;
