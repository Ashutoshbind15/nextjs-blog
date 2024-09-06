import { createServerActionProcedure, ZSAError } from "zsa";
import prisma from "./prisma";
import { validateRequest } from "./auth/lucia";

export const authActionProcedure = createServerActionProcedure().handler(
  async () => {
    const { user } = await validateRequest();

    if (!user) {
      throw new ZSAError("NOT_AUTHORIZED", "Unauthenticated");
    }

    const userId = user.id;

    if (!userId) {
      throw new ZSAError("NOT_AUTHORIZED", "Unauthenticated");
    }

    const dbUser = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!dbUser) {
      throw new ZSAError("NOT_AUTHORIZED", "User not found in database");
    }

    return {
      user: {
        email: dbUser?.email,
        username: dbUser?.username,
        id: dbUser.id,
      },
    };
  }
);
