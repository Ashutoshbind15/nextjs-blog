import { Button } from "@/components/ui/button";
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import Link from "next/link";

const Page = async () => {
  const posts = await prisma.post.findMany();

  return (
    <div>
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
