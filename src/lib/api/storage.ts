export const uploadProductImage = async (file: File): Promise<{ url: string; error: string | null }> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('/api/storage/product-images', {
    method: 'POST',
    body: formData,
  });

  const payload = await response.json();

  if (!response.ok) {
    return { url: '', error: payload?.error ?? 'Upload failed' };
  }

  return { url: payload.data.url as string, error: null };
};

export const deleteProductImage = async (url: string): Promise<{ error: string | null }> => {
  const response = await fetch('/api/storage/product-images', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  const payload = await response.json();

  if (!response.ok) {
    return { error: payload?.error ?? 'Delete failed' };
  }

  return { error: null };
};
