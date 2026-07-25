"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";



export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { getMe } = useAuth();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login gagal.");
        return;
      }

      setSuccess("Login berhasil! Mengalihkan ke halaman utama...");
      
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await getMe();
      router.push("/");
      
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-shop flex min-h-[calc(100vh-110px)] items-center justify-center py-8">
      <div className="w-full max-w-md rounded bg-white p-6 shadow-card sm:p-8">
        <h1 className="mb-2 font-display text-2xl font-bold text-ink">
          Masuk ke Akun
        </h1>
        <p className="mb-6 text-sm text-gray-500">
          Masuk ke Belanja.in untuk melanjutkan belanja
        </p>

        {error && (
          <div className="mb-4 flex items-start gap-2 rounded bg-red-50 px-4 py-3 text-sm text-flash">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 flex items-start gap-2 rounded bg-green-50 px-4 py-3 text-sm text-green-700">
            <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="contoh@email.com"
              required
              className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-ink">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Masukkan password"
              required
              className="w-full rounded border border-gray-300 px-3 py-2.5 text-sm focus:border-brand focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 rounded-sm bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Belum punya akun?{" "}
          <Link href="/register" className="font-medium text-brand hover:underline">
            Daftar
          </Link>
        </p>
      </div>
    </div>
  );
}
