"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import footerLogo from "../../../public/assets/icon/footerlogo.png";

export const dynamic = "force-dynamic";

function AdminLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccess(
        "Registration successful! Please login with your credentials.",
      );
    }

    // Check if admin is already logged in
    const checkAdminAuth = async () => {
      try {
        const res = await fetch("/api/admin/profile", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success && data.data) {
            // Admin is already logged in, redirect to dashboard
            router.push("/admin/dashboard");
          }
        }
      } catch {
        // If check fails, admin is not logged in, stay on login page
      }
    };

    checkAdminAuth();
  }, [searchParams, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // Validate response data
      if (!data.success || !data.data?.token || !data.data?.role) {
        setError("Invalid response from server");
        return;
      }

      // Verify admin role before navigation
      if (data.data.role !== "admin") {
        setError("Access denied. Admin login required.");
        return;
      }

      // Store token in localStorage (for client-side reference)
      localStorage.setItem("adminToken", data.data.token);
      localStorage.setItem("adminRole", "admin");

      // Wait a bit for cookie to be set, then navigate
      // The middleware will verify the cookie token
      await new Promise((resolve) => setTimeout(resolve, 100));

      router.push("/admin/dashboard");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="mb-8">
          <Image
            src={footerLogo}
            alt="Hawaii Door Logo"
            width={150}
            height={50}
            className="object-contain"
            priority
          />
        </div>
        <h1 className="mb-6 text-3xl font-bold text-center text-white">
          Hawaii Adminstrator
        </h1>
        {/* <p className="mb-6 text-sm text-zinc-400">hawaii Administration</p> */}
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mb-1 text-zinc-300"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
              placeholder="Admin@Hawaii.com"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-1 text-zinc-300"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full rounded-md border border-zinc-700 bg-zinc-900 px-3 py-2 text-white placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500"
            />
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          {success && <p className="text-sm text-green-500">{success}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-[#FF6E4A] px-4 py-2 text-white font-medium hover:bg-[#FF6E4A]/90 transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-zinc-500">
          <Link
            href="/"
            className="text-zinc-400 hover:text-white underline transition-colors"
          >
            Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-black flex flex-col items-center justify-center p-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-white mx-auto mb-4"></div>
            <p className="text-zinc-400">Loading...</p>
          </div>
        </div>
      }
    >
      <AdminLoginContent />
    </Suspense>
  );
}
