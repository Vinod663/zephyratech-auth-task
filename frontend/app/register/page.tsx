"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { AxiosError } from "axios";

export default function RegisterPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState<string | null>(null);
    const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);

    const [strength, setStrength] = useState(0);

    useEffect(() => {
        let score = 0;
        if (!password) {
            setStrength(0);
            return;
        }
        if (password.length >= 8) score += 1;
        if (/[a-z]/.test(password)) score += 1;
        if (/[A-Z]/.test(password)) score += 1;
        if (/[0-9]/.test(password)) score += 1;
        if (/[@#$%^&+=!]/.test(password)) score += 1;

        setStrength(score);
    }, [password]);

    const getStrengthColor = () => {
        if (strength === 0) return "bg-gray-600";
        if (strength <= 2) return "bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]";
        if (strength <= 4) return "bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]";
        return "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]";
    };

    const getInputBorderColor = () => {
        if (fieldErrors.password) return "border-red-500/50 focus:border-red-500 focus:ring-red-500/20";
        if (!password) return "border-white/10 focus:border-purple-400 focus:ring-purple-400/20";
        if (strength <= 2) return "border-red-500/50 focus:border-red-400 focus:ring-red-400/20";
        if (strength <= 4) return "border-orange-500/50 focus:border-orange-400 focus:ring-orange-400/20";
        return "border-emerald-500/50 focus:border-emerald-400 focus:ring-emerald-400/20";
    };

    const getStrengthText = () => {
        if (strength === 0) return "";
        if (strength <= 2) return "Weak";
        if (strength <= 4) return "Almost there";
        return "Strong";
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setFieldErrors({});

        try {
            const response = await api.post("/register", { email, password });
            localStorage.setItem("token", response.data.token);
            router.push("/login?registered=true");
        } catch (err) {
            if (err instanceof AxiosError && err.response?.data) {
                const backendErrors = err.response.data;
                if (typeof backendErrors === 'object' && !backendErrors.error) {
                    setFieldErrors(backendErrors);
                } else {
                    setError(backendErrors.error || "Registration failed. Please try again.");
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
            <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] rounded-full bg-purple-600/30 blur-[128px] animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] rounded-full bg-indigo-600/30 blur-[128px] animate-pulse pointer-events-none delay-1000"></div>

            {/* Glassmorphism Card */}
            <div className="relative w-full max-w-md p-10 space-y-8 rounded-3xl backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] z-10 transition-all duration-500 hover:bg-white/10">

                <div className="text-center">
                    <h2 className="mt-2 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 tracking-tight">
                        ZephyraTech
                    </h2>
                    <p className="mt-3 text-sm text-gray-400">
                        Initialize your premium account
                    </p>
                </div>

                {error && (
                    <div className="rounded-xl bg-red-500/10 backdrop-blur-md p-4 border border-red-500/20">
                        <p className="text-sm font-medium text-red-400 text-center">{error}</p>
                    </div>
                )}

                <form className="mt-8 space-y-6" onSubmit={handleRegister}>
                    <div className="space-y-6">

                        {/* Email Input */}
                        <div className="group">
                            <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase mb-2 ml-1" htmlFor="email">
                                Email address
                            </label>
                            <input
                                id="email"
                                type="email"
                                required
                                className={`block w-full rounded-xl border ${fieldErrors.email ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20' : 'border-white/10 focus:border-indigo-400 focus:ring-indigo-400/20'} bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-4 transition-all duration-300 sm:text-sm`}
                                placeholder="developer@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            {fieldErrors.email && <p className="mt-2 text-xs text-red-400 ml-1">{fieldErrors.email}</p>}
                        </div>

                        {/* Password Input with Real-Time UX */}
                        <div className="group relative">
                            <div className="flex justify-between items-end mb-2 ml-1 mr-1">
                                <label className="block text-xs font-semibold tracking-wide text-gray-400 uppercase" htmlFor="password">
                                    Secure Password
                                </label>
                                {/* Dynamic Text Feedback */}
                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${strength === 5 ? 'text-emerald-400' : strength >= 3 ? 'text-orange-400' : strength > 0 ? 'text-red-400' : 'text-transparent'}`}>
                  {getStrengthText()}
                </span>
                            </div>

                            <input
                                id="password"
                                type="password"
                                required
                                className={`block w-full rounded-xl border ${getInputBorderColor()} bg-black/20 px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-4 transition-all duration-300 sm:text-sm`}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />

                            {/* Animated Progress Bar */}
                            <div className="h-1.5 w-full bg-gray-800 rounded-full mt-3 overflow-hidden">
                                <div
                                    className={`h-full rounded-full transition-all duration-500 ease-out ${getStrengthColor()}`}
                                    style={{ width: `${(strength / 5) * 100}%` }}
                                ></div>
                            </div>

                            {/* Requirement Hint */}
                            <p className="mt-3 text-[11px] text-gray-500 leading-relaxed ml-1">
                                Must be at least 8 characters, containing uppercase, lowercase, numbers, and special characters.
                            </p>

                            {fieldErrors.password && <p className="mt-2 text-xs text-red-400 ml-1">{fieldErrors.password}</p>}
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={isLoading || (password.length > 0 && strength < 5)}
                            className="relative flex w-full justify-center items-center rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-[1px] focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
                        >
                            <div className="flex w-full items-center justify-center rounded-xl bg-[#0f172a] px-4 py-3 transition-all duration-300 hover:bg-transparent">
                <span className="text-sm font-bold text-white tracking-wide">
                  {isLoading ? "Authenticating..." : "Create Account"}
                </span>
                            </div>
                        </button>
                    </div>
                </form>

                <div className="text-center text-sm pt-2">
                    <span className="text-gray-400">Already a member? </span>
                    <Link href="/login" className="font-semibold text-indigo-400 hover:text-indigo-300 transition-colors">
                        Sign in here
                    </Link>
                </div>

            </div>
        </div>
    );
}