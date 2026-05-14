'use server'
import 'server-only'
import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import bcrypt from 'bcryptjs'

export async function login(_prevState: { error: string }, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // 1. Tìm người dùng theo email
  const { data: user, error } = await supabase
    .from('User')
    .select('*')
    .eq('email', email)
    .single()

  if (error || !user) {
    return { error: 'Email hoặc mật khẩu không đúng' }
  }

  // 2. Kiểm tra mật khẩu (đã hash)
  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) {
    return { error: 'Email hoặc mật khẩu không đúng' }
  }

  // 3. Đăng nhập thành công
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function register(_prevState: { error?: string }, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string 

  // 1. Kiểm tra xem người dùng đã tồn tại chưa
  const { data: existingUser } = await supabase
    .from('User')
    .select('id')
    .eq('email', email)
    .single()

  if (existingUser) {
    return { error: 'Email đã được sử dụng' };
  }

  // 2. Hash mật khẩu
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Lưu người dùng vào database
  const { error: dbError } = await supabase
    .from('User')
    .insert([
      { 
        email: email, 
        password: hashedPassword, 
        role: 'user'
      }
    ])

  if (dbError) {
    return { error: `Database error: ${dbError.message}` };
  }

  return { success: true };
}

export async function signOut() {
  const supabase = await createClient()
  // No-op for now as we don't have Auth.js session
  revalidatePath('/', 'layout')
  redirect('/')
}
