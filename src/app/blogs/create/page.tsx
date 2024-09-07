"use client";

import { useServerAction } from "zsa-react";
import { createPostAction } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
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

const BlogCreatorPage = () => {
  const router = useRouter();

  const { isPending, execute } = useServerAction(createPostAction, {
    onStart: () => {
      toast.info("Creating post");
    },
  });

  const postSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(3),
  });

  type PostSchema = z.infer<typeof postSchema>;
  const form = useForm<PostSchema>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit: SubmitHandler<PostSchema> = async (values, event) => {
    const [data, error] = await execute({
      title: values.title,
      description: values.description,
    });

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
    }

    form.reset();
  };

  // todo:done : check for the authentication status with a client-side hook

  return (
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
            {isPending ? "Creating post..." : "Create Post"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BlogCreatorPage;
