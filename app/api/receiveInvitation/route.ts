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

    const invitations = await prisma.invitation.findMany({
      where: {
        recipientId: decoded.userId,
        accepted: false  
      },
      include: {
        sender: {
          select: { userName: true }
        }
      }
    });

    const invitationsData = invitations.map(invitation => ({
      id: invitation.id,
      senderUserName: invitation.sender.userName
    }));

    return NextResponse.json({ invitationsData }, { status: 200 });
  } catch (error) {
    console.error("Erreur :", error);
    return NextResponse.json({ error: "Une erreur s'est produite." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
