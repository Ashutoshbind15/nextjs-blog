import { Button } from "@/components/ui/button";
import AuthWrapper from "@/components/wrappers/AuthWrapper";
import prisma from "@/lib/prisma";
import { Post } from "@prisma/client";
import Link from "next/link";
import Paginator from "./paginator";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const pagenum = searchParams.page;
  const take = 1;
  const skip = pagenum ? (parseInt(pagenum as string) - 1) * take : 0;
  const numposts = await prisma.post.count({
    where: {
      published: true,
    },
  });

  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: skip,
    take: take,
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

      <Paginator
        currentpage={pagenum ? parseInt(pagenum as string) : 1}
        totalpages={Math.ceil(numposts / take)}
      />
    </div>
  );
};

export default Page;
