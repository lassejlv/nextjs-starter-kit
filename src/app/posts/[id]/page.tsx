import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function page({ params }: { params: { id: string } }) {
  const post = await prisma.posts.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (!post) return notFound();
  if (!post.published) return notFound();

  return (
    <main className="container mx-auto py-12">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p>{post.content}</p>
    </main>
  );
}
