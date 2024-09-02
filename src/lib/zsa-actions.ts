import { auth, currentUser } from "@clerk/nextjs/server";
import { createServerActionProcedure, ZSAError } from "zsa";
import prisma from "./prisma";

export const authActionProcedure = createServerActionProcedure().handler(
  async () => {
    const { userId } = auth();

    if (!userId) {
      throw new ZSAError("NOT_AUTHORIZED", "User is not authorized");
    }

    const user = await currentUser();

    if (!user) {
      throw new ZSAError("NOT_AUTHORIZED", "User not found");
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        clerkUid: userId,
      },
    });

    if (!dbUser) {
      throw new ZSAError("NOT_AUTHORIZED", "User not found in database");
    }

    return {
      user: {
        email: user?.primaryEmailAddress,
        username: user?.username,
        id: dbUser.id,
      },
    };
  }
);
