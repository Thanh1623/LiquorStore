"use client";
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Logged in as ${email}`);
  };

  return (
    <div className="container mx-auto px-8 py-16 max-w-md">
      <h1 className="text-[32px] font-serif font-bold mb-8 text-[#212529]">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          type="email" 
          placeholder="Email Address" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-[#CCCCCC] rounded-[4px] font-serif"
        />
        <button type="submit" className="w-full bg-[#212529] text-white py-3 font-serif hover:bg-[#333]">
          Sign In
        </button>
      </form>
    </div>
  );
}