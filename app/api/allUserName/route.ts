import prisma from "../../../prisma";
import jwt from "jsonwebtoken";
import { connectToDb } from "../../../utils";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    const authorization = req.headers.get('authorization');
    await connectToDb();

    if (!authorization) {
      return NextResponse.json({ error: "Le token est requis !" }, { status: 400 });
    }

    const token = authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your_secret_key") as jwt.JwtPayload;

    if (!decoded.userId) {
      return NextResponse.json({ error: "Le token est invalide." }, { status: 401 });
    }

    const userWithFriends = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { userName: true, friends: true }
    });

    if (!userWithFriends) {
      return NextResponse.json({ error: "Utilisateur non trouvé." }, { status: 404 });
    }

    const excludeUserNames = userWithFriends.friends.map(friend => friend.userName);
    excludeUserNames.push(userWithFriends.userName); 

    const users = await prisma.user.findMany({
      where: {
        NOT: {
          userName: {
            in: excludeUserNames,
          },
        },
      },
      select: { userName: true }
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error("Erreur :", error);
    return NextResponse.json({ error: "Une erreur s'est produite." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
