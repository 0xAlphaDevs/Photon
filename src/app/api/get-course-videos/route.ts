import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const requestURL = new URL(req.url as string);
  const courseId = requestURL.searchParams.get("courseId");
  const courseCreator = requestURL.searchParams.get("courseCreator");
  console.log("courseId", courseId);
  console.log("courseCreator", courseCreator);

  // const { courseId, courseCreator } = await req.json();
  // console.log("courseId", courseId);
  // console.log("courseCreator", courseCreator);

  try {
    const result = { courseId, courseCreator };
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
