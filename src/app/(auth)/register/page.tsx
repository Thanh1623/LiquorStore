import { RegisterForm } from "@/components/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="space-y-6">
      <RegisterForm />
      <p className="text-center text-sm text-gray-400 font-serif">
        Already have an account?{" "}
        <Link href="/login" className="text-white hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
}
