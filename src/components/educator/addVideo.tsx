import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, ChangeEvent } from "react";

export function AddVideo() {
  const [videoURL, setVideoURL] = useState("");
  const [videoName, setVideoName] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Handle the submit logic here
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Add Video</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>New Video</DialogTitle>
          <DialogDescription>
            Add the required details below to add a video.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="video-source" className="block">
              Video source
            </Label>
            <Input
              id="video-source"
              placeholder="Enter video url"
              value={videoURL}
              onChange={(e) => setVideoURL(e.target.value)}
              className="mt-1"
            />
          </div>
          <div className="text-center my-2">OR</div>
          <div>
            <input
              type="file"
              id="file-upload"
              accept="video/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Label htmlFor="file-upload" className="block cursor-pointer">
              <div className="border border-dashed border-gray-500 p-4 rounded-md text-center">
                Drag & drop or <span className="text-blue-500">Choose a file</span> to upload
              </div>
            </Label>
          </div>
          <div>
            <Label htmlFor="video-name" className="block">
              Video name
            </Label>
            <Input
              id="video-name"
              placeholder="Enter video name"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
              className="mt-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} className="w-full">
            Save Video
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
