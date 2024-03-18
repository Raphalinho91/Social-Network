import prisma from "../../../prisma";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    const authorization = req.headers.get("authorization");
    const { invitationId } = await req.json();

    if (!authorization || !invitationId) {
      return NextResponse.json(
        { error: "Le token et l'ID de l'invitation sont requis !" },
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

    const invitation = await prisma.invitation.findUnique({
      where: {
        id: invitationId,
      },
      include: {
        sender: true,
      },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Invitation introuvable." },
        { status: 404 }
      );
    }

    await prisma.invitation.update({
      where: {
        id: invitationId,
      },
      data: {
        accepted: true,
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    const sender = await prisma.user.findUnique({
      where: { id: invitation.senderId },
    });
    
    if (user && sender) {
      let updatedUserFriends = [...user.friends, { userName: sender.userName, dateStarted: new Date() }];
      let updatedSenderFriends = [...sender.friends, { userName: user.userName, dateStarted: new Date() }];
    
      await prisma.user.update({
        where: { id: decoded.userId },
        data: { friends: updatedUserFriends },
      });
    
      await prisma.user.update({
        where: { id: invitation.senderId },
        data: { friends: updatedSenderFriends },
      });
    }

    await prisma.invitation.delete({
      where: {
        id: invitationId,
      },
    });

    return NextResponse.json(
      {
        message: "L'invitation a été acceptée et l'expéditeur a été ajouté à la liste des amis.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur :", error);
    return NextResponse.json(
      { error: "Une erreur s'est produite." },
      { status: 500 }
    );
  }
};
