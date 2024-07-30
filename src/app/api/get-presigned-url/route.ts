import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { source_upload_id, presigned_url } = await getPresignedURL();

    const response = {
      presigned_url: presigned_url,
      source_upload_id: source_upload_id,
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

const getPresignedURL = async () => {
  const options = {
    method: "POST",
    url: `https://api.thetavideoapi.com/upload`,
    headers: {
      "x-tva-sa-id": process.env.API_KEY,
      "x-tva-sa-secret": process.env.API_SECRET,
    },
  };

  try {
    const response = await axios.post(
      options.url,
      {},
      { headers: options.headers }
    );

    const presigned_url = response.data.body.uploads[0].presigned_url;
    const source_upload_id = response.data.body.uploads[0].id;

    console.log("pre_signed_url", presigned_url);
    console.log("source_upload_id", source_upload_id);
    if (!presigned_url || !source_upload_id) {
      return { error: "No source upload ID or Presigned URL found" };
    }
    return { source_upload_id, presigned_url };
  } catch (error: any) {
    console.error("Error fetching course videos:", error);
    return { error: error.code };
  }
};
