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

  // USE connectButtonAlt ONLY IF YOU DON'T WANT THE CONNECT WALLET BUTTON
  // AND WANT TO PROVIDE YOUR OWN CONNECT BUTTON
  // const connectButtonAlt = {
  //   label: "Button Label",
  //   link: "Button Link",
  // };

  const params = {
    // signin: signin,
    jwt: "",
    autoconnect: true,
    useBeta: false,
  };

  const videoJsParams = {
    tracks: [
      {
        kind: "captions",
        src: "/path/to/subtitles.vtt",
        srclang: "en",
        label: "English",
        default: true,
      },
    ],
  };

  const events = {
    onAccessOK: () => {
      console.log("onAccessOK");
    },
    onAccessDenied: (e: any) => {
      console.log("onAccessDenied", e);
    },
    onInit: (e: any) => {
      console.log("onInit", e);
    },
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
          // videoJsParams={videoJsParams}
          // events={events}
        />
      )}
    </div>
  );
};
