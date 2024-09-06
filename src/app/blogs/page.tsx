import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/wrappers/AuthWrapper";
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import Link from "next/link";

const Page = async () => {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
  });

  return (
    <div>
      <AuthWrapper>
        <Button>
          <Link href="/blogs/create">Create post</Link>
        </Button>
      </AuthWrapper>

      {posts.map((post: Post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.description}</p>

          <Button asChild>
            <Link href={`/blogs/${post.id}`}>Read more</Link>
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Page;
