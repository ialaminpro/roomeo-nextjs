import { NextResponse, NextRequest } from "next/server";

export async function GET( request: NextRequest, {params} : {params:{id:number}} ) {
    const id = params.id
    const { searchParams } = request.nextUrl;
    // const { searchParams } = new URL(request.url);
    const sort = searchParams.get('sort');
    return NextResponse.json({message: "Hello NextJs", id, sort}, {status: 201})
    
}