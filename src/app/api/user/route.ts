import prisma from "@/config/prisma";
import { sleep } from "@/utils/sleep";

export async function POST(req: Request) {
  try {
    const { userName } = await req.json();

    // ONLY TO SIMULATE A REAL REQUEST DELAY
    await sleep(1000)

    if (!userName) {
      return Response.json(
        { status: "Error", message: "Name is required" },
        { status: 400 }
      );
    }

    let user = await prisma.user.findFirst({ where: { name: userName } });

    if (user) {
      const session = await prisma.session.create({ data: { userId: user.id } });

      return Response.json(
        { status: "Success", content: { user, session } },
        { status: 200 }
      );
    }

    user = await prisma.user.create({ data: { name: userName } });
    const session = await prisma.session.create({ data: { userId: user.id } });

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