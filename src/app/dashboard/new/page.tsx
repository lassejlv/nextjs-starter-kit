"use client";

import { CreatePost } from "@/actions/post";
import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useState } from "react";
import { z } from "zod";

export default function page() {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { user } = useKindeBrowserClient();
  if (!user) return;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const schema = z.object({
      title: z
        .string({
          message: "Title must be a string",
        })
        .min(3, {
          message: "Title must be at least 3 characters",
        })
        .max(255, {
          message: "Title must be at most 255 characters",
        }),
      content: z
        .string({
          message: "Content must be a string",
        })
        .min(3, {
          message: "Content must be at least 3 characters",
        })
        .max(255, {
          message: "Content must be at most 255 characters",
        }),
    });

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    const parsedData = schema.safeParse(values);

    if (!parsedData.success) {
      toast({
        title: "Invalid data",
        description: `${parsedData.error.errors.map((e) => `${e.path} - ${e.message}`).join("\n")}`,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }

    const created = await CreatePost(parsedData.data.title, parsedData.data.content, user.id);

    if (created) {
      toast({
        title: "Post created",
      });
    } else {
      toast({
        title: "Error creating post",
        variant: "destructive",
      });
    }

    setLoading(false);
  };

  return (
    <form className="container mx-auto py-12" onSubmit={handleSubmit}>
      <h1 className="text-4xl font-bold">New Post</h1>

      <div className="my-4">
        <Label htmlFor="title">Title</Label>
        <Input id="title" name="title" placeholder="Title" />
      </div>

      <div className="my-4">
        <Label htmlFor="content">Content</Label>
        <Textarea id="content" name="content" placeholder="Content" />
      </div>

      <Button type="submit">
        {loading ? (
          <>
            <Spinner size={20} /> Creating...
          </>
        ) : (
          "Create Post"
        )}
      </Button>
    </form>
  );
}
