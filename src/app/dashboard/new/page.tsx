import { GetUser } from "@/actions/user";
import { auth } from "@/auth";
import NewPost from "@/components/NewPost";
import React from "react";

export default async function page() {
  const session = await auth();
  if (!session) return;

  const user = await GetUser(session.user?.email as string);
  if (!user) {
    throw new Error("User not found");
  }

  return <NewPost userId={user.id} />;
}
