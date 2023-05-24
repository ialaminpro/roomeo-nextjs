import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET( request: NextRequest, {params} : {params:{id:string}} ) {
  

  //   const userPosts = await prisma.post.findMany({
  //       where: { authorId: params.id },
  //       include: {
  //           author: {
  //               select: {
  //                   email: true,
  //                   name: true,
  //               }
  //           }
  //       }

  //  });
    return NextResponse.json({message: "Hello NextJs"}, {status: 200})
    
}