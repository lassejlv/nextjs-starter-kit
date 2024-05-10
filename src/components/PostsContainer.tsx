"use client";

import { Posts } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Trash2 } from "lucide-react";
import { DeletePost } from "@/actions/post";
import { useToast } from "./ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Spinner from "./spinner";

export default function PostsContainer({ posts }: { posts: Posts[] }) {
  const router = useRouter();
  const { toast } = useToast();
  const [postsList, setPostsList] = useState<Posts[]>(posts);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);

  return (
    <>
      <Button variant="outline" onClick={() => router.push("/dashboard/new")} className="my-2">
        New Post
      </Button>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        {postsList.map((post) => (
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center justify-between">
                  <h1>{post.title}</h1>

                  <div className="space-x-2">
                    <Button
                      variant="secondary"
                      onClick={async () => {
                        setDeleteLoading(post.id);

                        const deleted = await DeletePost(post.id);

                        new Promise((resolve) => setTimeout(resolve, 1500));

                        toast({ title: "Post deleted" });

                        if (deleted) {
                          toast({
                            title: "Post deleted",
                          });

                          setPostsList((prev) => prev.filter((p) => p.id !== post.id));
                        } else {
                          toast({
                            title: "Error deleting post",
                            variant: "destructive",
                          });
                        }
                      }}
                    >
                      {deleteLoading === post.id ? <Spinner /> : <Trash2 />}
                    </Button>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        router.push(`/posts/${post.id}`);
                      }}
                    >
                      <ExternalLink />
                    </Button>
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
            <CardFooter>
              <p>{new Date(post.created_at).toDateString()}</p>
            </CardFooter>
          </Card>
        ))}
      </div>
    </>
  );
}
