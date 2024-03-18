import { NextResponse } from "next/server";
import prisma from "../../../prisma";
import jwt from "jsonwebtoken"; 
import { connectToDb } from "../../../utils";

export const POST = async (req: Request) => {
  try {
    const { email, code } = await req.json();

    await connectToDb();
    const verifyEmailEntry = await prisma.verifyEmail.findFirst({
      where: {
        email: email,
        code: code,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!verifyEmailEntry) {
      return new NextResponse(
        JSON.stringify({ error: "Le code ou l'email est invalide, ou le code a expiré !" }),
        { status: 404 }
      );
    }

    await prisma.verifyEmail.update({
      where: {
        id: verifyEmailEntry.id,
      },
      data: {
        codeIsValid: true,
      },
    });

    await prisma.verifyEmail.delete({
      where: {
        id: verifyEmailEntry.id,
      },
    });

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return new NextResponse(JSON.stringify({ error: "Utilisateur introuvable." }), {
        status: 404,
      });
    }

    await prisma.tokenUser.deleteMany({
      where: {
        userId: user.id,
      },
    });

    const token = jwt.sign(
      { userId: user.id, email: email },
      "your_secret_key",
      { expiresIn: "1h" }
    );

    await prisma.tokenUser.create({
      data: {
        token: token,
        userId: user.id,
        expiratDate: new Date(new Date().getTime() + 60 * 60 * 1000),
      },
    });

    return new NextResponse(
      JSON.stringify({ message: "Super, le code est bon !", token: token }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur: ", error);
    return new NextResponse(
      JSON.stringify({ error: "Une erreur s'est produite." }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
