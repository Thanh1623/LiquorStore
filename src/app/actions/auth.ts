'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // NOTE: For login, we will need to implement custom logic 
  // to check the password in the User table since we are bypassing Auth.
  // This is a placeholder for now.
  
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
