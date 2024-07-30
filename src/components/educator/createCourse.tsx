import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { useWriteContract } from "wagmi"
import { useEffect, useState } from "react"
import { PhotonCourseFactoryAbi, PhotonCourseFactoryAddress } from "@/lib/abi/PhotonCourseFactoryAbi"
import { PhotonTokenAddress } from "@/lib/abi/PhotonToken"
import Spinner from "../spinner"
import { CheckCircleIcon } from "lucide-react"
import { useToast } from "../ui/use-toast"

interface CreateCourseForm {
  name: string;
  symbol: string;
  description: string;
  price: number;
}

export function CreateCourse() {
  const [formData, setFormData] = useState<CreateCourseForm>({
    name: "",
    symbol: "",
    description: "",
    price: 0,
  })
  const [transactionSuccess, setTransactionSuccess] = useState(false);
  const { toast } = useToast();
  const { error, isPending, isSuccess, writeContract } = useWriteContract();

  useEffect(() => {
    if (error) {
      toast({
        title: "Opps!",
        description: error.message || "",
        variant: "destructive",
      });
    }
  }, [error]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    writeContract({
      address: PhotonCourseFactoryAddress,
      abi: PhotonCourseFactoryAbi,
      functionName: "createCourse",
      args: [formData.name, formData.symbol, formData.description, formData.price * 10 ** 18, PhotonTokenAddress]

    });
  };

  const handleCreateAnotherCourse = () => {
    setFormData({
      name: "",
      symbol: "",
      description: "",
      price: 0,
    })
    setTransactionSuccess(false)
  }

  useEffect(() => {
    isSuccess ? setTransactionSuccess(true) : setTransactionSuccess(false);
  }, [isSuccess])

  return (

    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-lg" >+ Create Course</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {isPending ? (
          <div className="flex justify-center items-center  h-96">
            <Spinner />
          </div>
        ) :
          transactionSuccess ? (
            <div className="flex flex-col justify-center gap-4 items-center text-green-500  h-96">
              <CheckCircleIcon className="h-12 w-12" />
              <p className="font-semibold text-lg">Course Created Successfully</p>
              <Button onClick={handleCreateAnotherCourse} className="absolute bottom-8">Create Another Course</Button>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Create Course</DialogTitle>
                <DialogDescription>
                  Add the required details below to create a course.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="name"
                      className="col-span-3"
                      value={formData.name}
                      onChange={(e: { target: { value: any } }) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="symbol" className="text-right">
                      Symbol
                    </Label>
                    <Input id="symbol"
                      type="text"
                      placeholder="symbol"
                      className="col-span-3"
                      value={formData.symbol}
                      onChange={(e: { target: { value: any } }) =>
                        setFormData({
                          ...formData,
                          symbol: e.target.value,
                        })
                      }
                      required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Type your description here."
                      value={formData.description}
                      className="col-span-3"
                      onChange={(e: { target: { value: any } }) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      Price
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="@peduarte"
                      className="col-span-3"
                      value={formData.price}
                      onChange={(e: { target: { value: any } }) =>
                        setFormData({
                          ...formData,
                          price: e.target.value,
                        })
                      }
                      required />
                  </div>
                </div>
                <Button type="submit" className="w-full">Create Course</Button>
              </form>
            </>
          )}
      </DialogContent>
    </Dialog>
  )
}
