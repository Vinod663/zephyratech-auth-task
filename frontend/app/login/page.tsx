"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const urlParams = new URLSearchParams(window.location.search);
            if (urlParams.get("registered") === "true") {
                setSuccessMsg("Registration successful! Please sign in.");
            }
        }
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setSuccessMsg(null);

        try {
            const response = await api.post("/login", { email, password });
            localStorage.setItem("token", response.data.token);
            router.push("/dashboard");
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 403 || err.response?.status === 401) {
                    setError("Invalid email or password.");
                } else if (err.response?.data?.error) {
                    setError(err.response.data.error);
                } else {
                    setError("An error occurred during login.");
                }
            } else {
                setError("Network error. Is the backend running?");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative flex min-h-screen items-center justify-center bg-[#0f172a] overflow-hidden px-4 sm:px-6 lg:px-8">

            {/* Animated Aurora Background Orbs */}
            <div className="absolute top-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-indigo-600/30 blur-[128px] animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-purple-600/30 blur-[128px] animate-pulse pointer-events-none delay-1000"></div>

            {/* Glassmorphism Card */}
            <div className="relative w-full max-w-md p-10 space-y-8 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] z-10 transition-all duration-500 hover:bg-white/10">

                <div className="text-center">
                    <h2 className="mt-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
                        Welcome Back
                    </h2>
                    <p className="mt-3 text-sm text-gray-400">
                        Sign in to your ZephyraTech account
                    </p>
                </div>

                {/* Success Banner (Glassy Green) */}
                {successMsg && (
                    <div className="rounded-xl bg-emerald-500/10 backdrop-blur-md p-4 border border-emerald-500/20">
                        <p className="text-sm font-medium text-emerald-400 text-center">{successMsg}</p>
                    </div>
                )}

                {/* Error Banner (Glassy Red) */}
                {error && (
                    <div className="rounded-xl bg-red-500/10 backdrop-blur-md p-4 border border-red-500/20">
                        <p className="text-sm font-medium text-red-400 text-center">{error}</p>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <div className="space-y-5">
                        <div className="group">
                            <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase mb-2 ml-1" htmlFor="email">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className="block w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:border-indigo-400 focus:outline-none focus:ring-4 focus:ring-indigo-400/20 transition-all duration-300 sm:text-sm"
                                placeholder="developer@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase mb-2 ml-1" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                required
                                className="block w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/20 transition-all duration-300 sm:text-sm"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="relative flex w-full justify-center items-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px] focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <div className="flex w-full items-center justify-center rounded-xl bg-[#0f172a] px-4 py-3 transition-all duration-300 hover:bg-transparent">
                <span className="text-sm font-bold text-white tracking-wide">
                  {isLoading ? "Authenticating..." : "Sign in"}
                </span>
                            </div>
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm pt-2">
                    <span className="text-gray-400">Don't have an account? </span>
                    <Link href="/register" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                        Sign up here
                    </Link>
                </div>

            </div>
        </div>
    );
}