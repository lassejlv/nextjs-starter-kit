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
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <div className="flex items-center space-x-3">
            <span>
              {user.given_name} {user.family_name}
            </span>
            <img src={user.picture ?? ""} alt="profile" className="h-10 w-10 rounded-full" />
          </div>
        </div>
        <PostsContainer posts={posts} />
      </main>
    </>
  );
}
