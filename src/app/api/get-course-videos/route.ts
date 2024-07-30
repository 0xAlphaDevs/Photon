import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextRequest, res: NextResponse) {
  const requestURL = new URL(req.url as string);
  const courseId = requestURL.searchParams.get("courseId");
  const courseCreator = requestURL.searchParams.get("courseCreator");

  try {
    const courseVideos = await getCourseVideos(
      courseId as string,
      courseCreator as string
    );

    const response = {
      course_id: courseId,
      course_creator: courseCreator,
      course_videos: courseVideos,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

const getCourseVideos = async (courseId: string, courseCreator: string) => {
  const options = {
    method: "GET",
    url: `https://api.thetavideoapi.com/video/${process.env.API_KEY}/search?course-id=${courseId}&course-creator=${courseCreator}`,
    headers: {
      "x-tva-sa-id": process.env.API_KEY,
      "x-tva-sa-secret": process.env.API_SECRET,
    },
  };

  try {
    const response = await axios.get(options.url, { headers: options.headers });
    if (!response.data.body.videos) {
      return [];
    }
    return response.data.body.videos;
  } catch (error: any) {
    console.error("Error fetching course videos:", error);
    return { error: error.code };
  }
};
