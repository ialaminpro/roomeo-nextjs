import { NextRequest } from "next/server";
import { getSuccessResponse } from "@/lib/helpers";

export async function GET(req: NextRequest) {
  const response = getSuccessResponse('You have successfully logged out.',{ }, 200);

  await response.cookies.set({
    name: "token",
    value: "",
    expires: -1,
  });

  return response;
}
