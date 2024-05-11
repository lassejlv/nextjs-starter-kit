import { auth, signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Github } from "lucide-react";
import { redirect } from "next/navigation";
import React, { FormEvent } from "react";

export default async function page() {
  const session = await auth();

  if (session) return redirect("/dashboard?error=already_signed_in");

  async function loginWithGithub() {
    "use server";

    await signIn("github");
  }

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle>Login to continue</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={loginWithGithub}>
            <Button type="submit" variant="outline">
              <Github className="ml-2" /> Continue with Github
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
