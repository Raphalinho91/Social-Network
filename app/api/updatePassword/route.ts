import prisma from "../../../prisma";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectToDb } from "../../../utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const authorization = req.headers.get('authorization');
    const { newPassword } = await req.json(); 

    await connectToDb();

    if (!authorization || !newPassword) {
      return NextResponse.json({ error: "Le token et le nouveau mot de passe est requis !" }, { status: 400 });
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your_secret_key") as jwt.JwtPayload;

    if (!decoded.userId) {
      return NextResponse.json({ error: "Le token est invalide." }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "Utilisateur introuvable." }, { status: 404 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });

    return NextResponse.json({ message: "Super, le mot de passe a été modifié !", token }, { status: 200 });
  } catch (error) {
    console.error("Erreur :", error);
    return NextResponse.json({ error: "Une erreur s'est produite." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
