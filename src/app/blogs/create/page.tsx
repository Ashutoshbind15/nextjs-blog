"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { createPostAction } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const BlogCreatorPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const router = useRouter();

  const { isPending, execute } = useServerAction(createPostAction, {
    onStart: () => {
      toast.info("Creating post");
    },
  });

  // todo:done : check for the authentication status with a client-side hook

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const [data, error] = await execute({ title, description });

          if (error) {
            const { code, message } = error;

            if (code === "NOT_AUTHORIZED") {
              toast.error("Not authorized");
              router.push("/login?redirect=loggedout");
            } else {
              toast.error(message);
            }
          } else {
            const post = data.post;
            toast.success(`Post created: ${post.title}`);
            setTitle("");
            setDescription("");
          }
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default BlogCreatorPage;
