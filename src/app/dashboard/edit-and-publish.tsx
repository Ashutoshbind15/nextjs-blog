"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { useState } from "react";
import { useServerAction } from "zsa-react";
import { publishAction, updatePostAction } from "./actions";
import { toast } from "sonner";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const PublishForm = ({
  id,
  initVals,
}: {
  id: string;
  initVals: { title: string; description: string };
}) => {
  const [open, setOpen] = useState(false);

  const { execute, isPending } = useServerAction(updatePostAction, {
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

  const postSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
  });

  type PostSchema = z.infer<typeof postSchema>;
  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: initVals.title,
      description: initVals.description,
    },
  });

  const onSubmit: SubmitHandler<PostSchema> = async (values, event) => {
    const [data, error] = await execute({
      id,
      title: values.title,
      description: values.description,
    });

    if (error) {
      toast.error("Failed to update post");
    } else {
      form.reset({
        title: data.post.title,
        description: data.post.description,
      });
    }

    form.reset();
  };

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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Title" {...field} />
                    </FormControl>
                    <FormDescription>This is your post title.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Description" {...field} />
                    </FormControl>
                    <FormDescription>
                      This is your post Description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">
                {isPending ? "Updating..." : "Update"}
              </Button>
            </form>
          </Form>

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
