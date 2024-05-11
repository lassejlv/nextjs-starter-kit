"use server";

import { prisma } from "@/lib/prisma";
import { User } from "@prisma/client";

export const GetUser = async (email: string): Promise<User | null> => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
