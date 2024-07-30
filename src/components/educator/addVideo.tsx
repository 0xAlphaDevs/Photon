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
import Spinner from "../spinner";
import { CircleCheck } from "lucide-react";
import { getPresignedURL } from "@/lib/getPresignedURL";
import { transcodeVideo } from "@/lib/transcodeVideo";

export function AddVideo({
  courseNftAddress,
  courseId,
  courseCreator,
}: {
  courseNftAddress: string;
  courseId: string;
  courseCreator: string;
}) {
  // const [videoURL, setVideoURL] = useState("");
  const [videoTitle, setVideoTitle] = useState("");
  const [videoDescription, setVideoDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [videoBlob, setVideoBlob] = useState<Uint8Array | null>(null);
  const [step, setStep] = useState("start"); // start, uploading, transcoding, done

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.includes("video")) {
      setFile(file);
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () => {
        const octetStream = new Uint8Array(reader.result as ArrayBuffer);
        // Set the videoBlob to the binary octet stream
        setVideoBlob(octetStream);

        console.log("octetStream", octetStream);
      };
    } else {
      setVideoBlob(null);
    }
  };

  const handleSubmit = async () => {
    // Handle the submit logic here
    console.log("Video Title", videoTitle);
    console.log("Video Description", videoDescription);
    console.log("File", file);
    setStep("gettingPresignedURL");
    // Step 1 : get the presigned URL ✅
    const presignedURLResponse = await getPresignedURL();
    const sourceUploadId: string = presignedURLResponse.source_upload_id;

    console.log("Pre signed url response", presignedURLResponse);

    setStep("uploading");
    // Step 2 : Upload the video blob file
    await fetch(presignedURLResponse.presigned_url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/octet-stream",
      },
      body: file,
    }).then(async (response) => {
      console.log("After upload");
      console.log(response);
      // Step 3 : Transcode the video
      if (response.ok) {
        setStep("transcoding");
        const transcodeResponse = await transcodeVideo({
          sourceUploadId,
          courseNftAddress,
          videoTitle,
          videoDescription,
          courseId,
          courseCreator,
        });

        console.log("Transcode response", transcodeResponse);
      } else {
        // handle error here : TO DO
      }

      // Step 4 : check the video status

      // Step 5 : Show success message
      setFile(null);
      setVideoTitle("");
      setVideoDescription("");
      setStep("done");
    });
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
          <div className="flex flex-col items-center gap-2">
            <CircleCheck size={50} className="text-green-500" />
            <p className="text-lg"> Video processed successfully</p>
          </div>
        )}
        {step === "transcoding" && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
        {step === "uploading" && (
          <div className="flex justify-center">
            <Spinner />
          </div>
        )}
        {step === "gettingPresignedURL" && (
          <div className="flex justify-center">
            <Spinner />
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
                placeholder="Enter video title"
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
                placeholder="Enter video description"
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
                onChange={handleFileChange}
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
