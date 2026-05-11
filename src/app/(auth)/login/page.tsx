import { LoginForm } from "@/components/auth/login-form";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <LoginForm />
      <p className="text-center text-sm text-gray-400 font-serif">
        Don't have an account?{" "}
        <Link href="/register" className="text-white hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
}
