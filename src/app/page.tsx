"use client";

import { Button } from "@/components/primitives/button";
import { signIn } from "next-auth/react";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="grid h-screen items-center justify-center">
      <div className="flex flex-col">
        <h1 className="text-center text-6xl font-bold text-primary">
          Welcome to Oceanic Flow!
        </h1>
        <Link className="mx-auto my-6" href="/dashboard">
          <Button
            onClick={() =>
              signIn("google", {
                callbackUrl: "http://localhost:3000/dashboard",
              })
            }
            size={"lg"}
          >
            Get Started
          </Button>
        </Link>
      </div>
    </main>
  );
}
