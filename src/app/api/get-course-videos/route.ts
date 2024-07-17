import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: Response) {
  // const product = await req.json();

  try {
    const result = { message: "Hello from the API!" };
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
