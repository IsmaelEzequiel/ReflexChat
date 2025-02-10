import prisma from "@/config/prisma";

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      include: { sessions: true },
      where: {
        sessions: {
          some: {
            messages: {
              some: {}
            }
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