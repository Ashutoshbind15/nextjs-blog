import prisma from "@/lib/prisma";

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  console.log(id);

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.description}</p>
    </div>
  );
};

export default Page;
