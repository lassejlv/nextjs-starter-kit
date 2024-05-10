"use client";

import Spinner from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Github, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const { user } = useKindeBrowserClient();
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <main className="flex h-screen select-none flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-primary">Next.js Starter Kit</h1>
      <p className="my-2 text-center text-lg text-gray-400">
        A starter kit for Next.js i like to use. Using Tailwind CSS, Shadcn, TypeScript, and more.
      </p>

      <div className="flex space-x-4">
        <Button variant="outline">
          <Github size={19} className="mr-1" /> View on GitHub
        </Button>
        <Button
          variant="outline"
          disabled={user ? true : false}
          onClick={() => {
            setLoading(true);

            new Promise((resolve) => {
              setTimeout(resolve, 1000);
            });

            router.push("/api/auth/login");
          }}
        >
          {loading ? (
            <>
              <Spinner size={20} className="" /> Logging in...
            </>
          ) : (
            <>
              <LogIn size={19} className="mr-1" />
              Login
            </>
          )}
        </Button>
      </div>
    </main>
  );
}
