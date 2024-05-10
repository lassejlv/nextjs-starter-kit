"use client";

import React from "react";

export default function NotFound() {
  return (
    <main className="flex h-screen select-none flex-col items-center justify-center">
      <h1 className="text-5xl font-bold text-primary">404</h1>
      <p className="my-2 text-center text-lg text-gray-400">Page not found</p>
    </main>
  );
}
