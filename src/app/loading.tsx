import Spinner from "@/components/spinner";
import React from "react";

export default function loading() {
  return (
    <main className="flex h-screen select-none flex-col items-center justify-center">
      <Spinner size={32} />
    </main>
  );
}
