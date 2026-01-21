"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Home page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
      <h2 className="text-heading2-bold text-light-1">Something went wrong!</h2>
      <p className="text-base-regular text-light-3 max-w-md text-center">
        We encountered an error while loading the threads. Please try again.
      </p>
      <Button
        onClick={() => reset()}
        className="bg-primary-500 hover:bg-primary-500/90"
      >
        Try again
      </Button>
    </div>
  );
}
