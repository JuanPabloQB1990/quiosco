import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const prisma = new PrismaClient();

  if (req.method === "POST") {
    const { id } = req.query;
    console.log(Number(id));
    await prisma.orden.update({
      where: {
        id: Number(id),
      },
      data: {
        estado: true,
      },
    });

    res.status(200).json(id)
  }
}
