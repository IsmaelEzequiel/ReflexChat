import prisma from "@/config/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ name: string }> }) {
  const name = (await params).name

  try {
    const users = await prisma.user.findMany({
      where: {
        name: {
          search: name
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