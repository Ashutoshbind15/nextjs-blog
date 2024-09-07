"use server";

import prisma from "@/lib/prisma";
import { authActionProcedure } from "@/lib/zsa-actions";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const publishAction = authActionProcedure
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const user = ctx.user;
    const uid = user.id;

    const postid = input.id;

    const post = await prisma.post.findUnique({
      where: {
        id: postid,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.userId !== uid) {
      throw new Error("Unauthorized");
    }

    await prisma.post.update({
      where: {
        id: postid,
      },
      data: {
        published: true,
      },
    });

    revalidatePath("/dashboard");
    revalidatePath(`/blogs`);
  });

export const updatePostAction = authActionProcedure
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
    })
  )
  .handler(async ({ input, ctx }) => {
    const user = ctx.user;
    const uid = user.id;

    const post = await prisma.post.findUnique({
      where: {
        id: input.id,
      },
    });

    if (!post) {
      throw new Error("Post not found");
    }

    if (post.userId !== uid) {
      throw new Error("Unauthorized");
    }

    const res = await prisma.post.update({
      where: {
        id: input.id,
      },
      data: {
        title: input.title,
        description: input.description,
      },
    });

    revalidatePath("/dashboard");

    return {
      post: {
        id: res.id,
        title: res.title,
        description: res.description,
      },
    };
  });
