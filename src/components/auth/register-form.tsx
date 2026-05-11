"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { registerSchema } from "@/lib/validations/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-gray-300 font-serif">Full Name</Label>
        <Input 
          id="name" 
          {...register("name")} 
          className="bg-transparent border-white/20 focus:border-white/50 rounded-none"
        />
        {errors.name && <p className="text-sm text-red-400">{errors.name.message}</p>}
      </div>
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
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-gray-300 font-serif">Confirm Password</Label>
        <Input 
          id="confirmPassword" 
          {...register("confirmPassword")} 
          type="password" 
          className="bg-transparent border-white/20 focus:border-white/50 rounded-none"
        />
        {errors.confirmPassword && <p className="text-sm text-red-400">{errors.confirmPassword.message}</p>}
      </div>
      <Button type="submit" className="w-full rounded-none bg-white text-black hover:bg-gray-200 font-serif uppercase tracking-widest">
        Create Account
      </Button>
    </form>
  );
}
