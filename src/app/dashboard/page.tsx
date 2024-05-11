import PostsContainer from "@/components/PostsContainer";
import { auth } from "@/auth";
import { GetUser } from "@/actions/user";
import { prisma } from "@/lib/prisma";

export default async function page() {
  const session = await auth();
  if (!session) return;

  const user = await GetUser(session.user?.email as string);
  if (!user) {
    throw new Error("User not found");
  }

  const posts = await prisma.posts.findMany({
    where: {
      user_id: user.id,
    },
    take: 25,
    orderBy: {
      created_at: "desc",
    },
  });

  return (
    <>
      <main className="container mx-auto py-12">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold">Dashboard</h1>

          <div className="flex items-center space-x-3">
            <span>{session.user?.name}</span>
            <img src={session.user?.image ?? ""} alt="profile" className="h-10 w-10 rounded-full" />
          </div>
        </div>
        <PostsContainer posts={posts} />
      </main>
    </>
  );
}
