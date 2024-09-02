"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useServerAction } from "zsa-react";
import { publishAction, updatePostAction } from "./actions";
import { toast } from "sonner";

const PublishForm = ({
  id,
  initVals,
}: {
  id: string;
  initVals: { title: string; description: string };
}) => {
  const [title, setTitle] = useState(initVals.title);
  const [description, setDescription] = useState(initVals.description);
  const [open, setOpen] = useState(false);

  const { execute, isPending, data } = useServerAction(updatePostAction, {
    onSuccess: () => {
      toast.success("Post updated successfully");
    },
    onError: () => {
      toast.error("Failed to update post");
    },
    onStart: () => {
      toast.info("Updating post...");
    },
    onFinish: () => {
      setOpen(false);
    },
  });

  const {
    execute: publishExecute,
    isPending: publishIsPending,
    data: publishData,
  } = useServerAction(publishAction);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit and Publish</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit and Publish Posts from here</DialogTitle>
        </DialogHeader>

        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              execute({
                id,
                title,
                description,
              });
            }}
          >
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <Button disabled={isPending}>
              {isPending ? "Updating..." : "Update"}
            </Button>
          </form>

          <Button
            onClick={() => {
              publishExecute({ id });
            }}
          >
            {publishIsPending ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishForm;
