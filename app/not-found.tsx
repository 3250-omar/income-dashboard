import Link from "next/link";
import { MoveLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="relative">
          <h1 className="text-[12rem] font-black leading-none tracking-tighter text-slate-100 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 bg-blue-600 rounded-3xl rotate-12 flex items-center justify-center shadow-xl shadow-blue-200">
              <Home className="w-16 h-16 text-white -rotate-12" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-slate-900">
            Oops! Page not found
          </h2>
          <p className="text-slate-500 font-medium">
            The page you are looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
        </div>

        <div className="pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all"
          >
            <MoveLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>

        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">
          Personal Income Dashboard
        </p>
      </div>
    </div>
  );
}
