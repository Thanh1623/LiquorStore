import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full max-w-sm bg-white p-6 border border-neutral-200">
      <h1 className="text-2xl font-serif text-neutral-900 mb-6 text-center uppercase tracking-widest">Create Account</h1>
      <RegisterForm />
      <p className="text-center text-sm text-neutral-500 font-serif mt-6">
        Already have an account?{" "}
        <Link href="/login" className="text-neutral-900 hover:text-neutral-600 underline underline-offset-4">
          Sign In
        </Link>
      </p>
    </div>
  );
}
