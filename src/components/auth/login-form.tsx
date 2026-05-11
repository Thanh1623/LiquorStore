"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { loginSchema } from "@/lib/validations/auth";
import { login as loginAction } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    
    const result = await loginAction(formData);
    if (result?.error) {
      setError("root", { message: result.error });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-300 font-serif">Email Address</Label>
        <Input 
          id="email" 
          {...register("email")} 
          type="email" 
          className="bg-transparent border-white/20 focus:border-white/50 rounded-none"
        />
        {errors.email && <p className="text-sm text-red-400">{errors.email.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password" className="text-gray-300 font-serif">Password</Label>
        <Input 
          id="password" 
          {...register("password")} 
          type="password" 
          className="bg-transparent border-white/20 focus:border-white/50 rounded-none"
        />
        {errors.password && <p className="text-sm text-red-400">{errors.password.message}</p>}
        {errors.root && <p className="text-sm text-red-400">{errors.root.message}</p>}
      </div>
      <Button type="submit" className="w-full rounded-none bg-white text-black hover:bg-gray-200 font-serif uppercase tracking-widest">
        Sign In
      </Button>
    </form>
  );
}
