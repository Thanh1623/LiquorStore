import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm bg-white p-6 border border-neutral-200">
      <h1 className="text-2xl font-serif text-neutral-900 mb-6 text-center uppercase tracking-widest">Sign In</h1>
      <LoginForm />
      <p className="text-center text-sm text-neutral-500 font-serif mt-6">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-neutral-900 hover:text-neutral-600 underline underline-offset-4">
          Create Account
        </Link>
      </p>
      <div className="text-center mt-4">
        <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-900 font-serif uppercase tracking-widest">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
