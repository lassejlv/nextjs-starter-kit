import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const pop = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Starter Kit",
  description: "A starter kit for Next.js i like to use. Using Tailwind CSS, Shadcn, TypeScript, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={pop.className + ` ${cn("min-h-screen bg-background font-sans antialiased")}`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
