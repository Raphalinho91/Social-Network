import prisma from "../../../prisma";
import { connectToDb } from "../../../utils";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();
    if (!email && !password) {
      return NextResponse.json({ error: "Invalid Data" }, { status: 422 });
    }
    await connectToDb();

    const existingUser = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        { message: "User not registered" },
        { status: 401 }
      );
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return NextResponse.json(
        { message: "Invalid Password" },
        { status: 403 }
      );
    }
    const token = jwt.sign({ userId: existingUser.id }, "your_secret_key", {
      expiresIn: "2h",
    });
    return NextResponse.json(
      { message: "Logged in", existingUser, token },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: error }, { status: 200 });
  } finally {
    await prisma.$disconnect();
  }
};
