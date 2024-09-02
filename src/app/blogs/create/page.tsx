"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { createPostAction } from "./actions";
import { toast } from "sonner";

const BlogCreatorPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const { isPending, execute, data, error } = useServerAction(
    createPostAction,
    {
      onSuccess: () => {
        toast.success("Post created");
        setTitle("");
        setDescription("");
      },
      onStart: () => {
        toast.info("Creating post");
      },
      onError: () => {
        toast.error(`Failed to create post: ${error?.message}`);
      },
    }
  );

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          execute({ title, description });
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

        <Button disabled={isPending}>Submit</Button>
      </form>
    </div>
  );
};

export default BlogCreatorPage;
