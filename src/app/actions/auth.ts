'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

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

  // 2. Kiểm tra mật khẩu (đang là plain text)
  if (user.password !== password) {
    return { error: 'Email hoặc mật khẩu không đúng' }
  }

  // 3. Đăng nhập thành công
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function register(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string 

  console.log('DEBUG - Đang lưu trực tiếp vào bảng User với email:', email);

  // CẢNH BÁO BẢO MẬT: Mật khẩu này đang được lưu ở dạng văn bản thuần (plain text).
  // TRONG MÔI TRƯỜNG PRODUCTION, BẠN PHẢI HASH MẬT KHẨU (ví dụ dùng bcrypt) TRƯỚC KHI LƯU VÀO DATABASE.
  const { data, error: dbError } = await supabase
    .from('User')
    .insert([
      { 
        email: email, 
        password: password, 
        role: 'user'
      }
    ])
    .select();

  if (dbError) {
    console.error('DEBUG - LỖI LƯU VÀO BẢNG USER:', dbError);
    return { error: `Database error: ${dbError.message}` };
  }

  console.log('DEBUG - Đã lưu thành công vào bảng User:', data);

  redirect('/login')
}

export async function signOut() {
  const supabase = await createClient()
  // No-op for now as we don't have Auth.js session
  revalidatePath('/', 'layout')
  redirect('/')
}
