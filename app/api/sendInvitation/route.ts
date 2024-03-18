import prisma from "../../../prisma";
import jwt from "jsonwebtoken";
import { connectToDb } from "../../../utils";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const authorization = req.headers.get("authorization");
    const { userName } = await req.json();

    await connectToDb();

    if (!authorization || !userName) {
      return NextResponse.json(
        { error: "Le token et le nom d'utilisateur est requis !" },
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
      where: {
        id: decoded.userId,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur introuvable." },
        { status: 404 }
      );
    }
    const recipient = await prisma.user.findUnique({
      where: { userName },
    });

    if (!recipient) {
      return NextResponse.json({
        error: "Utilisateur destinataire introuvable",
      });
    }
    
    await prisma.invitation.create({
      data: {
        senderId: decoded.userId,
        recipientId: recipient.id,
        accepted: false,
      },
    });    

    return NextResponse.json(
      { message: "L'invitation a été envoyé avec succès !"},
      { status: 200 }
    );
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
