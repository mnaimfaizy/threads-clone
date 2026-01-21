"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error("Profile error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
      <h2 className="text-heading2-bold text-light-1">
        Unable to load profile
      </h2>
      <p className="text-base-regular text-light-3 max-w-md text-center">
        We couldn't load this profile. The user may not exist or there was a
        technical issue.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={() => reset()}
          className="bg-primary-500 hover:bg-primary-500/90"
        >
          Try again
        </Button>
        <Button
          onClick={() => router.push("/")}
          variant="outline"
          className="border-dark-4"
        >
          Go home
        </Button>
      </div>
    </div>
  );
}
