import { prisma } from "@/lib/prisma";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import PostsContainer from "@/components/PostsContainer";

export default async function page() {
  const user = await getKindeServerSession().getUser();
  if (!user) return;

  const posts = await prisma.posts.findMany({
    where: {
      kinde_userId: user.id,
    },
    take: 100,
  });

  return (
    <>
      <main className="container mx-auto py-12">
        <PostsContainer posts={posts} />
      </main>
    </>
  );
}
