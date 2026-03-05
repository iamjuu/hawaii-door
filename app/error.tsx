"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  const isChunkError =
    error?.name === "ChunkLoadError" ||
    error?.message?.includes("Failed to fetch dynamically imported module") ||
    error?.message?.includes("Loading chunk");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfffc] px-4">
      <div className="max-w-md text-center">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-6">
          {isChunkError
            ? "A new version of the site may have been deployed. Please refresh to load the latest version."
            : "An unexpected error occurred. Please try again."}
        </p>
        <button
          onClick={() => (window.location.href = window.location.pathname)}
          className="px-6 py-3 bg-[#FF6E4A] text-white font-medium rounded-md hover:bg-[#e55a3a] transition-colors"
        >
          Refresh page
        </button>
      </div>
    </div>
  );
}
