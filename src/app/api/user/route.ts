import { validateRequest } from "@/lib/auth/lucia";
import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { user } = await validateRequest();

  if (!user) {
    return NextResponse.json(
      {
        error: "User is not authorized",
      },
      {
        status: 401,
      }
    );
  }

  const uid = user.id;

  const dbUser = await prisma.user.findUnique({
    where: {
      id: uid,
    },
  });

  if (!dbUser) {
    return NextResponse.json(
      {
        error: "User not found in database",
      },
      {
        status: 404,
      }
    );
  }

  return NextResponse.json(
    {
      user: {
        email: dbUser?.email,
        username: dbUser?.username,
        id: dbUser.id,
      },
    },
    {
      status: 200,
    }
  );
};
