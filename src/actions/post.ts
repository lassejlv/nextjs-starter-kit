"use server";

import { prisma } from "@/lib/prisma";

export const CreatePost = async (title: string, content: string, userId: string): Promise<number | false> => {
  try {
    const post = await prisma.posts.create({
      data: {
        title,
        content,
        published: true,
        kinde_userId: userId,
      },
    });

    return post.id;
  } catch (error) {
    return false;
  }
};

export const DeletePost = async (id: number) => {
  try {
    await prisma.posts.delete({ where: { id } });
    return true;
  } catch (error) {
    return false;
  }
};
