import { getEnvVariable, getSuccessResponse, getErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { signJWT } from "@/lib/token";
import { LoginUserInput, LoginUserSchema } from "@/lib/validations/user.schema";
import { compare } from "bcryptjs";
import { NextRequest } from "next/server";
import { ZodError } from "zod";

interface RequestBody {
  email: string;
  password: string;
}
export async function POST(req: NextRequest) {
  try {

    const body: RequestBody = (await req.json()) as LoginUserInput;
    const data = LoginUserSchema.parse(body);


    const user = await prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (!user || !(await compare(data.password, user.password))) {
      return getErrorResponse(401, "Invalid email or password");
    }

    const JWT_EXPIRES_IN = getEnvVariable("JWT_EXPIRES_IN");
    
    const { password, ...userWithoutPass } = user;

    const token = await signJWT(
      { sub: user.id },
      { exp: `${JWT_EXPIRES_IN}m` }
    );

    const cookieOptions = {
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(Date.now() + parseInt(JWT_EXPIRES_IN) * 60 * 1000),
    };

    const response = getSuccessResponse('You have successfully logged in!', { token, user: userWithoutPass }, 200);
    await response.cookies.set(cookieOptions);

    return response;
  } catch (error: any) {
    console.log(error);
    if (error instanceof ZodError) {
      return getErrorResponse(400, "failed validations", error);
    }

    return getErrorResponse(500, error.message);
  }
}