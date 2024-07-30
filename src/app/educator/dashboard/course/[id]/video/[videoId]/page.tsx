"use client";

import React from "react";
import { MoveLeftIcon } from "lucide-react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { DRMPlayer } from "@/app/test/Player";

const VideoIdPage = () => {
  const router = useRouter();
  const { id } = useParams();
  console.log("ID", id);

  const videoId = "video_bwfu8ir6mjmfaf0edtb2dz6vi6";

  console.log("Video ID", videoId);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <div className="py-8">
      <div className="flex items-center gap-4">
        <div className="h-6 w-6 cursor-pointer mr-2" onClick={handleBackClick}>
          <MoveLeftIcon className="h-6 w-6" />
        </div>
        <p className="text-3xl font-medium">Video Player </p>
      </div>

      <DRMPlayer videoId={videoId} />
    </div>
  );
};

export default VideoIdPage;
