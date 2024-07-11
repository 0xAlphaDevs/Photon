"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import ReactPlayer from "react-player/lazy";

const Test = () => {
  const [data, setData] = React.useState(null);
  const [videoBlob, setVideoBlob] = React.useState<Uint8Array | null>(null);
  const [videoFile, setVideoFile] = React.useState<File | null>(null);

  const [videos, setVideos] = React.useState([]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const options = {
      method: "POST",
      url: "https://api.thetavideoapi.com/upload",
      headers: {
        "x-tva-sa-id": process.env.NEXT_PUBLIC_API_KEY,
        "x-tva-sa-secret": process.env.NEXT_PUBLIC_API_SECRET,
      },
    };

    // 1. Get the presigned URL and then upload the video
    axios
      .post(options.url, {}, { headers: options.headers })
      .then((response) => {
        console.log("After presigned URL");
        console.log(response.data);
        const source_upload_id = response.data.body.uploads[0].id;

        // 2. upload the video to the presigned URL as Uint8Array octet stream
        fetch(response.data.body.uploads[0].presigned_url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/octet-stream",
          },
          body: videoFile,
        }).then((response) => {
          console.log("After upload");
          console.log(response);
          // 3. transcode the video using an upload
          axios
            .post(
              "https://api.thetavideoapi.com/video",
              JSON.stringify({
                source_upload_id: source_upload_id, // or source_uri:"link to video"
                playback_policy: "public",
                resolutions: [720, 1080],
                use_drm: true,
                drm_rules: [
                  {
                    chain_id: 365,
                    nft_collection:
                      "0x7fe9b08c759ed2591d19c0adfe2c913a17c54f0c", // Corresponding Course NFT collection address
                  },
                ],
                metadata: {
                  name: "Macbook Screen Recording",
                  description: "This is a screen recording of a macbook air",
                  creator: "0x123434334235df920923fjd2304",
                },
              }),
              {
                headers: {
                  "x-tva-sa-id": process.env.NEXT_PUBLIC_API_KEY,
                  "x-tva-sa-secret": process.env.NEXT_PUBLIC_API_SECRET,
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              console.log("After transcoding");
              console.log(response.data); // video_8x7ft4k9ybmqvje3ep52syb92c
            });
        });
      });
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.includes("video")) {
      setVideoFile(file);
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

  const handleGetVideos = async () => {
    const options = {
      method: "GET",
      url: `https://api.thetavideoapi.com/video/${process.env.NEXT_PUBLIC_API_KEY}/list`,
      headers: {
        "x-tva-sa-id": process.env.NEXT_PUBLIC_API_KEY,
        "x-tva-sa-secret": process.env.NEXT_PUBLIC_API_SECRET,
      },
    };

    axios
      .get(options.url, { headers: options.headers })
      .then((response) => {
        console.log("After get videos call ..........");
        console.log(response.data);
        setVideos(response.data.body.videos);
      })
      .catch((error) => {
        console.log("Error getting videos", error);
      });
  };

  return (
    <div className="">
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input onChange={handleFileChange} accept="video/*" type="file" />
        <Button type="submit" disabled={!videoBlob}>
          Upload
        </Button>
      </form>

      <Button onClick={handleGetVideos}>Get Videos</Button>

      {/* <div className="w-full">{data ? JSON.stringify(data) : "No data"}</div> */}

      <div className="grid grid-cols-3 gap-10">
        {videos.map((video: any, index) => (
          <ReactPlayer
            key={index}
            url={video.playback_uri}
            controls={true}
            width="100%"
          />
        ))}
      </div>
    </div>
  );
};

export default Test;
