import prisma from "@/config/prisma";
import { sleep } from "@/utils/sleep";

export async function GET(req: Request, { params }: { params: Promise<{ sessionId: string }> }) {
  const sessionId = (await params).sessionId

  await sleep(1000)

  try {
    const users = await prisma.message.findMany({
      where: {
        sessionId
      },
      include: {
        session: {
          include: {
            user: true
          }
        }
      }
    })

    return Response.json(
      { status: "Success", content: users },
      { status: 200 }
    );

  } catch (error) {
    return Response.json(
      { status: "Error", message: error },
      { status: 500 }
    );
  }
}