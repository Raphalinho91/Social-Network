import prisma from "../../../prisma";
import { connectToDb } from "../../../utils";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req: Request) => {
  try {
    const { userName, password } = await req.json();
    if (!userName || !password) {
      return NextResponse.json({ error: "Veuillez remplir tous les champs" }, { status: 422 });
    }
    await connectToDb();

    const existingUser = await prisma.user.findFirst({
      where: {
        userName,
      },
    });
    if (!existingUser) {
      return NextResponse.json({ message: "Utilisateur introuvable" }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Mot de passe invalide" }, { status: 403 });
    }

    const token = jwt.sign({ userId: existingUser.id }, "your_secret_key", { expiresIn: "2h" });
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);

    await prisma.tokenUser.create({
      data: {
        token: token,
        expiratDate: expirationDate,
        User: {
          connect: { id: existingUser.id },
        },
      },
    });

    return NextResponse.json({ message: "Connecté", token }, { status: 200 });
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json({ error: "An error occurred during authentication." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};