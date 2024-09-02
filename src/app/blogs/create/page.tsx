"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { createPostAction } from "./actions";
import { toast } from "sonner";
import { useAuth } from "@clerk/nextjs";

const BlogCreatorPage = () => {
  const { isSignedIn, isLoaded } = useAuth();
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

  if (!isSignedIn) {
    return <div>Sign in to create a post</div>;
  }

  if (!isLoaded) {
    return <div>Loading </div>;
  }

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

        <Button disabled={isPending}>
          {isPending ? "Creating..." : "Create"}
        </Button>
      </form>
    </div>
  );
};

export default BlogCreatorPage;
