import prisma from "../../../prisma";
import { connectToDb } from "../../../utils";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req: Request) => {
  try {
    const {
      firstName,
      lastName,
      userName,
      dateOfBirth,
      phoneNumber,
      email,
      password,
    } = await req.json();
    if (
      !firstName ||
      !lastName ||
      !userName ||
      !dateOfBirth ||
      !phoneNumber ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        { error: "Veuillez remplir tous les champs" },
        { status: 422 }
      );
    }

    await connectToDb();

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (existingUser) {
      return NextResponse.json(
        { message: "Utilisateur déjà existant. Connectez-vous !" },
        { status: 403 }
      );
    }

    const verifyEmailEntry = await prisma.verifyEmail.findFirst({
      where: {
        email,
        codeIsValid: true,
      },
    });

    if (!verifyEmailEntry) {
      return NextResponse.json(
        { error: "L'email n'a pas été vérifié !" },
        { status: 404 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        userName,
        dateOfBirth,
        phoneNumber,
        email,
        password: hashedPassword,
        emailIsVerified: true,
      },
    });

    await prisma.verifyEmail.delete({
      where: {
        id: verifyEmailEntry.id,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
