import prisma from "../../../prisma";
import jwt from "jsonwebtoken";
import { connectToDb } from "../../../utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const authorization = req.headers.get("authorization");

    await connectToDb();

    if (!authorization) {
      return NextResponse.json(
        { error: "Le token est requis !" },
        { status: 400 }
      );
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your_secret_key") as jwt.JwtPayload;

    if (!decoded.userId) {
      return NextResponse.json(
        { error: "Le token est invalide." },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { friends: true },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé." },
        { status: 404 }
      );
    }

    return NextResponse.json({ friends: user.friends }, { status: 200 });
  } catch (error) {
    console.error("Erreur :", error);
    return NextResponse.json(
      { error: "Une erreur s'est produite." },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
