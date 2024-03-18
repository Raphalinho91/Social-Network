import { NextResponse } from "next/server";
import prisma from "../../../prisma";
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

    return new NextResponse(
      JSON.stringify({ message: "Super, le code est bon !" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur: ", error);
    return new NextResponse(
      JSON.stringify({ error: "Une erreur s'est produite" }),
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
