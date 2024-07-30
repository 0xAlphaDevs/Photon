import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  const requestURL = new URL(req.url as string);
  const courseId = requestURL.searchParams.get("course_id");
  const courseCreator = requestURL.searchParams.get("course_creator");
  const sourceUploadId = requestURL.searchParams.get("source_upload_id");
  const courseNftAddress = requestURL.searchParams.get("course_nft_address");
  const videoTitle = requestURL.searchParams.get("video_title");
  const videoDescription = requestURL.searchParams.get("video_description");

  // log the request
  console.log("sourceUploadId", sourceUploadId);
  console.log("courseNftAddress", courseNftAddress);
  console.log("videoTitle", videoTitle);
  console.log("videoDescription", videoDescription);
  console.log("courseId", courseId);
  console.log("courseCreator", courseCreator);

  try {
    const response = await transcodeVideo(
      sourceUploadId as string,
      courseNftAddress as string,
      videoTitle as string,
      videoDescription as string,
      courseId as string,
      courseCreator as string
    );

    console.log("Transcode response", response);

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

const transcodeVideo = async (
  sourceUploadId: string,
  courseNftAddress: string,
  videoTitle: string,
  videoDescription: string,
  courseId: string,
  courseCreator: string
) => {
  try {
    const response = await axios.post(
      "https://api.thetavideoapi.com/video",
      JSON.stringify({
        source_upload_id: sourceUploadId, // or source_uri:"link to video"
        playback_policy: "public",
        resolutions: [720, 1080],
        use_drm: true,
        drm_rules: [
          {
            chain_id: 365,
            nft_collection: courseNftAddress, // Corresponding Course NFT collection address
          },
        ],
        metadata: {
          title: videoTitle,
          description: videoDescription,
          "course-id": courseId,
          "course-creator": courseCreator,
        },
      }),
      {
        headers: {
          "x-tva-sa-id": process.env.API_KEY,
          "x-tva-sa-secret": process.env.API_SECRET,
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.data) {
      return { error: "Error transcoding video" };
    }
    return response.data.body.videos;
  } catch (error: any) {
    console.error("Error transcoding video:", error);
    return { error: error.code };
  }
};
