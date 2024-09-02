"use server";

import prisma from "@/lib/prisma";
import { authActionProcedure } from "@/lib/zsa-actions";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ZSAError } from "zsa";

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
    const uid = user.id;

    // todo: figure out the correct type for post
    let post;

    try {
      post = await prisma.post.create({
        data: {
          title: input.title,
          description: input.description,
          userId: uid,
        },
      });
    } catch (error) {
      throw new ZSAError("INTERNAL_SERVER_ERROR", "Failed to create post");
    }

    revalidatePath("/blogs");

    return {
      post: {
        title: post.title,
        description: post.description,
      },
    };
  });
