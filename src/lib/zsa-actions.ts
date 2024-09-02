import { auth, currentUser } from "@clerk/nextjs/server";
import { createServerActionProcedure, ZSAError } from "zsa";

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

    return {
      user: {
        email: user?.primaryEmailAddress,
        username: user?.username,
        id: userId,
      },
    };
  }
);
