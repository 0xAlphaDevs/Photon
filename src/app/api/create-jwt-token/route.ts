import jwt, { Secret, SignOptions } from "jsonwebtoken";
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

function createTvaJwt() {
  let expiration = new Date().getTime() / 1000;
  expiration += 120; // partners can choose how long the JWT can last

  const algorithm: SignOptions = { algorithm: "HS256" };

  let payload: object = {
    service_account_id: process.env.NEXT_PUBLIC_API_KEY,
    iss: "auth0",
    exp: expiration,
  };

  let secretOrPrivateKey: string = process.env.NEXT_PUBLIC_API_SECRET || "";
  return jwt.sign(payload, secretOrPrivateKey, algorithm);
}
