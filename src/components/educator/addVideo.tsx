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
import { useState, ChangeEvent, useEffect } from "react";

export function AddVideo() {
  // const [videoURL, setVideoURL] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [step, setStep] = useState("start"); // start, uploading, transcoding, done

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = () => {
    // Handle the submit logic here
    console.log("Video Title", videoTitle);
    console.log("Video Description", videoDescription);
    console.log("File", file);
    setStep("uploading");
    setTimeout(() => {
      setStep("transcoding");
      setTimeout(() => {
        setFile(null);
        setVideoTitle("");
        setVideoDescription("");
        setStep("done");
      }, 500);
    }, 500);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-lg">+ Add Video</Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>New Course Video</DialogTitle>
          <DialogDescription>
            Add the required details below to add a video.
          </DialogDescription>
        </DialogHeader>
        {step === "done" && (
          <div className="bg-green-100 p-4 rounded-md text-green-700">
            Video processed successfully
          </div>
        )}
        {step === "transcoding" && (
          <div className="bg-yellow-100 p-4 rounded-md text-yellow-700">
            Video is being transcoded
          </div>
        )}
        {step === "uploading" && (
          <div className="bg-blue-100 p-4 rounded-md text-blue-700">
            Video is being uploaded
          </div>
        )}
        {step === "start" && (
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="video-source" className="block">
                Video Title
              </Label>
              <Input
                id="video-source"
                placeholder="Enter video url"
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="video-source" className="block">
                Video Description
              </Label>
              <Input
                id="video-source"
                placeholder="Enter video url"
                value={videoDescription}
                onChange={(e) => setVideoDescription(e.target.value)}
                className="mt-2"
              />
            </div>
            <div>
              <input
                type="file"
                id="file-upload"
                accept="video/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <Label htmlFor="video-source" className="block">
                Video File
              </Label>

              <Label
                htmlFor="file-upload"
                className="block cursor-pointer mt-2"
              >
                <div className="border border-dashed border-gray-500 p-4 rounded-md text-center">
                  {file ? (
                    <>
                      <div>Video File : {file.name}</div>
                      <br />
                      <div>File Size : {file.size} bytes</div>
                    </>
                  ) : (
                    "Choose a video file"
                  )}
                </div>
              </Label>
            </div>
          </div>
        )}
        <DialogFooter>
          {step === "start" && (
            <Button type="submit" onClick={handleSubmit} className="w-full">
              Upload Video
            </Button>
          )}
          {step === "uploading" && (
            <Button className="w-full" disabled>
              Uploading...
            </Button>
          )}
          {step === "transcoding" && (
            <Button className="w-full" disabled>
              Transcoding...
            </Button>
          )}
          {step === "done" && (
            <>
              <Button className="w-full" onClick={() => setStep("start")}>
                Add Another Video
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
