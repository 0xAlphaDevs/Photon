"use client";
import Spinner from "@/components/spinner";
import React, { Component, useEffect } from "react";
// @ts-ignore
import { StudioPlayer } from "theta-video-api-drm-player";
import "../app/drm-player.css";

interface DRMPlayerProps {
  videoId: string;
}

export const DRMPlayer = ({ videoId }: DRMPlayerProps) => {
  const [loading, setLoading] = React.useState(false);
  const walletConnectParams = {
    appName: "Photon",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  };

  const params = {
    jwt: "",
    autoconnect: true,
    useBeta: false,
  };

  return (
    <div className="flex p-8 w-full ">
      {loading ? (
        <div className="flex justify-center items-center w-full mt-40">
          <Spinner />
        </div>
      ) : (
        <StudioPlayer
          videoId={videoId}
          walletConnectParams={walletConnectParams}
          params={params}
        />
      )}
    </div>
  );
};
