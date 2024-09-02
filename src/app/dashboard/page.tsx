import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import React from "react";
import PublishForm from "./edit-and-publish";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    return <div>Not authenticated</div>;
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      clerkUid: userId,
    },
  });

  if (!dbUser) {
    return <div>Not authorized</div>;
  }

  const userPosts = await prisma.post.findMany({
    where: {
      userId: dbUser.id,
    },
  });

  return (
    <div>
      {userPosts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>
          {!post.published ? (
            <PublishForm
              id={post.id}
              initVals={{ title: post.title, description: post.description }}
            />
          ) : (
            <span>Published</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Page;
