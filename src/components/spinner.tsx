"use clinet";

import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";

export default function Spinner({ size, className }: { size?: number; className?: string }) {
  return <Loader size={size ? size : 24} className={cn(`${className} animate-spin`)} />;
}
