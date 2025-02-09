import prisma from "@/config/prisma";
import { sleep } from "@/utils/sleep";

// ONLY FOR SIMULATE A REAL REQUEST DELAY
export async function POST(req: Request) {
  try {
    const { userName } = await req.json();

    // ONLY TO SIMULATE A REAL REQUEST DELAY
    await sleep(2000)

    if (!userName) {
      return Response.json(
        { status: "Error", message: "Name is required" },
        { status: 400 }
      );
    }

    
    return Response.json(
      { status: "Success", content: { user, session } },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { status: "Error", message: error },
      { status: 500 }
    );
  }
}