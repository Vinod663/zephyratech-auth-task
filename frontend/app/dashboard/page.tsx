"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
    const router = useRouter();
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (!savedToken) {
            router.push("/login");
        } else {
            setToken(savedToken);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        router.push("/login");
    };

    if (!token) return null;

    return (
        <div className="relative min-h-screen bg-[#0f172a] overflow-hidden py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">

            {/* Animated Aurora Background Orbs */}
            <div className="absolute top-[20%] left-[20%] w-[30rem] h-[30rem] rounded-full bg-emerald-600/20 blur-[128px] animate-pulse pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[20%] w-[30rem] h-[30rem] rounded-full bg-indigo-600/20 blur-[128px] animate-pulse pointer-events-none delay-700"></div>

            <div className="relative w-full max-w-3xl space-y-8 z-10">

                {/* Glassmorphism Dashboard Panel */}
                <div className="backdrop-blur-2xl bg-white/5 border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-3xl p-8 sm:p-10 transition-all duration-500 hover:bg-white/10">

                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400 tracking-tight">
                                Secure Terminal
                            </h1>
                            <p className="mt-1 text-sm text-gray-400">Authentication verified.</p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="group relative inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-red-500 to-orange-500 p-[1px] focus:outline-none focus:ring-4 focus:ring-red-500/30 transition-all hover:scale-[1.02]"
                        >
                            <div className="flex items-center justify-center rounded-xl bg-[#0f172a] px-6 py-2 transition-all group-hover:bg-transparent">
                <span className="text-sm font-bold text-white tracking-wide">
                  Terminate Session
                </span>
                            </div>
                        </button>
                    </div>

                    <div className="rounded-xl bg-emerald-500/10 backdrop-blur-md border-l-4 border-emerald-500 p-5 mb-8">
                        <div className="flex items-center">
                            <svg className="h-6 w-6 text-emerald-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-sm font-medium text-emerald-300">
                                Connection established. You have securely accessed the private network.
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-xs font-semibold tracking-wide text-gray-400 uppercase ml-1">
                            Active Authorization Token
                        </h3>
                        <div className="bg-black/40 border border-white/5 rounded-xl p-5 overflow-x-auto shadow-inner">
                            <code className="text-sm text-emerald-400/90 break-all font-mono leading-relaxed selection:bg-emerald-500/30">
                                {token}
                            </code>
                        </div>
                        <p className="mt-3 text-xs text-gray-500 ml-1">
                            * This token is cryptographically signed and required for all subsequent API requests.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}