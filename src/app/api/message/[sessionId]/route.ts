import prisma from "@/config/prisma";
import { generateRandomResponse } from "@/utils/generateRandomResponse";
import { sleep } from "@/utils/sleep";

export async function POST(req: Request) {
  try {
    const { content, sessionId, createdAt } = await req.json();

    await sleep(1000)

    if (!content || !sessionId) {
      return Response.json(
        { status: "Error", message: "'content' and 'sessionId' are required" },
        { status: 400 }
      );
    }

    const userMessage = await prisma.message.create({
      data: {
        author: 'USER',
        content,
        createdAt: createdAt,
        sessionId,
      }
    })

    const botResponse = generateRandomResponse()

    const botMessage = await prisma.message.create({
      data: {
        author: 'BOT',
        content: botResponse,
        sessionId,
      }
    })
    
    return Response.json(
      { status: "Success", content: [userMessage, botMessage] },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { status: "Error", message: error },
      { status: 500 }
    );
  }
}

export async function GET(req: Response, { params }: { params: Promise<{ sessionId: string }> }) {
  const sessionId = (await params).sessionId

  try {
    await sleep(1000)

    if (!sessionId) {
      return Response.json(
        { status: "Error", message: "sessionId is required" },
        { status: 400 }
      );
    }

    const session = await prisma.session.findUnique({
      where: {
        id: sessionId
      }
    })

    if (!session) {
      return Response.json(
        { status: "Error", message: "Session not found" },
        { status: 404 }
      );
    }

    return Response.json(
      { status: "Success", content: { session } },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      { status: "Error", message: error },
      { status: 500 }
    );
  }
}