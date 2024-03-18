const nodemailer = require("nodemailer");
import { NextResponse } from "next/server";
import prisma from "../../../prisma";
import { connectToDb } from "../../../utils";

export const POST = async (req: Request) => {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: "Email non renseigné !" },
        { status: 422 }
      );
    }
    await connectToDb();

    const verificationCode = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: "Code pour vérifier votre adresse mail sur AppAll",
      text: `Votre code de vérification : ${verificationCode}`,
      html: `<b>Votre code de vérification : ${verificationCode}</b>`,
    });

    await prisma.verifyEmail.create({
      data: {
        email: email,
        code: verificationCode,
        createdAt: new Date(),
        expiresAt: new Date(new Date().getTime() + 5 * 60000),
      },
    });

    return NextResponse.json(
      { message: "L'email a été envoyé avec succès !" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur :", error);
    return NextResponse.json({ error: error }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
