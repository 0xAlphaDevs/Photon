interface TranscodeVideoOptions {
  sourceUploadId: string;
  courseNftAddress: string;
  videoTitle: string;
  videoDescription: string;
  courseId: string;
  courseCreator: string;
}

export const transcodeVideo = async ({
  sourceUploadId,
  courseNftAddress,
  videoTitle,
  videoDescription,
  courseId,
  courseCreator,
}: TranscodeVideoOptions) => {
  const result = await callApi({
    sourceUploadId,
    courseNftAddress,
    videoTitle,
    videoDescription,
    courseId,
    courseCreator,
  });
  return result;
};

async function callApi({
  sourceUploadId,
  courseNftAddress,
  videoTitle,
  videoDescription,
  courseId,
  courseCreator,
}: TranscodeVideoOptions) {
  const res = await fetch(
    `/api/transcode-video?source_upload_id=${sourceUploadId}&course_nft_address=${courseNftAddress}&video_title=${videoTitle}&video_description=${videoDescription}&course_id=${courseId}&course_creator=${courseCreator}`
  );
  if (!res.ok) {
    const json = await res.json();
    if (json.error) {
      const error = new Error(json.error) as Error & { status: number };
      error.status = res.status;
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }

  return res.json();
}
