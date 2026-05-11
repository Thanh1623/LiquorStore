import { login } from '@/app/actions/auth'

export default function LoginPage() {
  return (
    <form action={login} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
      <h1 className="text-2xl font-bold">Login</h1>
      <input name="email" type="email" placeholder="Email" required className="border p-2" />
      <input name="password" type="password" placeholder="Password" required className="border p-2" />
      <button type="submit" className="bg-blue-500 text-white p-2">Login</button>
    </form>
  )
}
