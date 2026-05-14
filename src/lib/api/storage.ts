import { supabase } from '@/lib/supabase/client';

const BUCKET_NAME = 'product-images';

export const uploadProductImage = async (file: File): Promise<{ url: string; error: string | null }> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(filePath, file);

  if (uploadError) {
    return { url: '', error: uploadError.message };
  }

  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(filePath);
  
  return { url: data.publicUrl, error: null };
};

export const deleteProductImage = async (url: string): Promise<{ error: string | null }> => {
  const path = url.split(`${BUCKET_NAME}/`)?.[1];

  if (!path) {
    return { error: 'Invalid URL' };
  }

  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);

  return { error: error?.message ?? null };
};
