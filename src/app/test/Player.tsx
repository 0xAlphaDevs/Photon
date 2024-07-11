import React, { Component } from "react";
// @ts-ignore
import { StudioPlayer } from "theta-video-api-drm-player";
import "theta-video-api-drm-player/dist/index.css";

interface DRMPlayerProps {
  videoId: string;
}

export const DRMPlayer = ({ videoId }: DRMPlayerProps) => {
  const walletConnectParams = {
    appName: "Photon",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID,
  };

  // USE connectButtonAlt ONLY IF YOU DON'T WANT THE CONNECT WALLET BUTTON
  // AND WANT TO PROVIDE YOUR OWN CONNECT BUTTON
  const connectButtonAlt = {
    label: "Button Label",
    link: "Button Link",
  };

  const params = {
    // signin: signin,
    jwt: "",
    autoconnect: true,
    useBeta: false,
    // connectButtonAlt: connectButtonAlt,
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
    <StudioPlayer
      videoId={videoId}
      walletConnectParams={walletConnectParams}
      params={params}
      videoJsParams={videoJsParams}
      events={events}
    />
  );
};
