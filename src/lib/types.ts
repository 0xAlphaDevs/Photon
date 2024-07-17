import React from "react";

export interface LinkItem {
  href: string;
  text: string;
  image?: React.ReactNode;
}

export interface NavbarProps {
  links: LinkItem[];
}

export interface Course {
  id: string;
  name: string;
  description: string;
  price: number;
  streamId: string;
  creator: string;
  thumbnailUrl: string;
  videos: Video[];
}

export interface Video {
  id: string;
  name: string;
  description: string;
}
