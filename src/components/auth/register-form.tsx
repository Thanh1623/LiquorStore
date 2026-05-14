"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerSchema } from "@/lib/validations/auth";
import { register as registerAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function RegisterForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    
    const result = await registerAction({}, formData);
    if (result?.error) {
      setError("root", { message: result.error });
      toast.error(result.error);
    } else if (result?.success) {
      toast.success("Account created successfully. Please sign in.");
      router.push('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-1">
        <Label htmlFor="email" className="text-neutral-600 font-serif text-xs tracking-wide uppercase">Email Address</Label>
        <Input 
          id="email" 
          {...register("email")} 
          type="email" 
          className="bg-white border-neutral-300 focus:border-neutral-900 rounded-none h-10 shadow-none transition-colors"
        />
        {errors.email && <p className="text-xs text-red-600 font-serif">{errors.email.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="password" className="text-neutral-600 font-serif text-xs tracking-wide uppercase">Password</Label>
        <Input 
          id="password" 
          {...register("password")} 
          type="password" 
          className="bg-white border-neutral-300 focus:border-neutral-900 rounded-none h-10 shadow-none transition-colors"
        />
        {errors.password && <p className="text-xs text-red-600 font-serif">{errors.password.message}</p>}
      </div>
      <div className="space-y-1">
        <Label htmlFor="confirmPassword" className="text-neutral-600 font-serif text-xs tracking-wide uppercase">Confirm Password</Label>
        <Input 
          id="confirmPassword" 
          {...register("confirmPassword")} 
          type="password" 
          className="bg-white border-neutral-300 focus:border-neutral-900 rounded-none h-10 shadow-none transition-colors"
        />
        {errors.confirmPassword && <p className="text-xs text-red-600 font-serif">{errors.confirmPassword.message}</p>}
      </div>
      
      <Button 
        type="submit" 
        disabled={isSubmitting}
        className="w-full rounded-none bg-neutral-900 text-white hover:bg-neutral-800 font-serif uppercase tracking-widest h-10 disabled:opacity-50 mt-2"
      >
        {isSubmitting ? "Processing..." : "Create Account"}
      </Button>
    </form>
  );
}
