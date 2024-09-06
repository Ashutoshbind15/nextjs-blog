import prisma from "@/lib/prisma";
import React, { Suspense } from "react";
import PublishForm from "./edit-and-publish";
import { validateRequest } from "@/lib/auth/lucia";
import Userdata from "@/components/layout/userdata";
import LogoutButton from "@/components/auth/Logout";
import UserFetcher from "@/components/auth/fetcher";
import AdminData from "./admindata";

const Page = async () => {
  const { user } = await validateRequest();

  if (!user || !user.id) {
    return <div>Not authorized</div>;
  }

  const dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
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
      <AdminData />

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

      <Suspense>
        <UserFetcher />
      </Suspense>
    </div>
  );
};

export default Page;
