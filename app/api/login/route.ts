import prisma from "../../../prisma";
import { connectToDb } from "../../../utils";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req: Request) => {
  try {
    const { userName, password } = await req.json();
    if (!userName || !password) {
      return NextResponse.json({ error: "Veuillez remplir tous les champs !" }, { status: 422 });
    }
    await connectToDb();

    const existingUser = await prisma.user.findFirst({
      where: {
        userName,
        emailIsVerified: true, 
      },
    });

    if (!existingUser) {
      return NextResponse.json({ message: "Utilisateur introuvable ou non vérifié." }, { status: 401 });
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: "Mot de passe invalide." }, { status: 403 });
    }

    const token = jwt.sign({ userId: existingUser.id }, "your_secret_key", { expiresIn: "2h" });
    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 2);

    const tokenRecord = await prisma.tokenUser.findFirst({
      where: {
        userId: existingUser.id, 
      },
    });
    
    if (tokenRecord) {
      await prisma.tokenUser.update({
        where: {
          id: tokenRecord.id,
        },
        data: {
          token: token,
          expiratDate: expirationDate,
        },
      });
    } else {
      await prisma.tokenUser.create({
        data: {
          userId: existingUser.id,
          token: token,
          expiratDate: expirationDate,
        },
      });
    }

    return NextResponse.json({ message: "Super, vous êtes connecté !", token }, { status: 200 });
  } catch (error) {
    console.error("Erreur durant la connection :", error);
    return NextResponse.json({ error: "Une erreur s'est produite." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
