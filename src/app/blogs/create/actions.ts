"use server";

import prisma from "@/lib/prisma";
import { authActionProcedure } from "@/lib/zsa-actions";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const createPostAction = authActionProcedure
  .createServerAction()
  .input(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const user = ctx.user;
    const clerkuid = user.id;

    const dbuser = await prisma.user.findUnique({
      where: {
        clerkUid: clerkuid,
      },
    });

    if (!dbuser) {
      throw new Error("User not found");
    }

    const post = await prisma.post.create({
      data: {
        title: input.title,
        description: input.description,
        userId: dbuser.id,
      },
    });

    revalidatePath("/blogs");

    return {
      post: {
        title: post.title,
        description: post.description,
      },
    };
  });
