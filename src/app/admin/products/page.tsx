"use client";

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Sidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { compressImage } from '@/lib/utils/image';
import { deleteProductImage, uploadProductImage } from '@/lib/api/storage';
import { useCreateProduct, useDeleteProduct, useProducts, useUpdateProduct } from '@/hooks/useProducts';
import { Product } from '@/types/product';

type ProductForm = {
  name: string;
  price: string;
  categoryName: string;
  description: string;
  stockQuantity: string;
  imageFile: File | null;
};

const formatPrice = (value: number) => `$${value.toFixed(2)}`;

const getPreviewUrl = (file: File | null) => {
  if (!file) {
    return '';
  }
  return URL.createObjectURL(file);
};

const revokePreviewUrl = (url: string) => {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

function LuxuryTableSkeleton() {
  return (
    <div className="space-y-3">
      <div className="h-10 w-full animate-pulse rounded-lg bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100" />
      {Array.from({ length: 5 }).map((_, idx) => (
        <div key={idx} className="grid grid-cols-6 gap-3">
          <div className="col-span-2 h-12 animate-pulse rounded-lg bg-amber-100/80" />
          <div className="h-12 animate-pulse rounded-lg bg-amber-100/70" />
          <div className="h-12 animate-pulse rounded-lg bg-amber-100/60" />
          <div className="h-12 animate-pulse rounded-lg bg-amber-100/70" />
          <div className="h-12 animate-pulse rounded-lg bg-amber-100/80" />
        </div>
      ))}
    </div>
  );
}

function LuxuryDialogSkeleton() {
  return (
    <div className="space-y-3 py-2">
      <div className="h-10 w-full animate-pulse rounded-lg bg-gradient-to-r from-amber-100 via-amber-50 to-amber-100" />
      <div className="h-10 w-full animate-pulse rounded-lg bg-amber-100/80" />
      <div className="h-10 w-full animate-pulse rounded-lg bg-amber-100/70" />
      <div className="h-10 w-full animate-pulse rounded-lg bg-amber-100/60" />
      <div className="h-10 w-full animate-pulse rounded-lg bg-amber-100/80" />
      <div className="h-40 w-full animate-pulse rounded-xl bg-amber-100/70" />
    </div>
  );
}

function ImagePreviewCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-2">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.12em] text-amber-700">Image Preview</div>
      <div className="flex h-48 items-center justify-center overflow-hidden rounded-lg border border-amber-100 bg-white p-2">
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}

const emptyForm: ProductForm = {
  name: '',
  price: '',
  categoryName: '',
  description: '',
  stockQuantity: '0',
  imageFile: null,
};

export default function ProductManagement() {
  const { data: response, isLoading } = useProducts();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [newProduct, setNewProduct] = useState<ProductForm>(emptyForm);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<ProductForm>(emptyForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImagePreview, setNewImagePreview] = useState('');
  const [editImagePreview, setEditImagePreview] = useState('');
  const [newImageName, setNewImageName] = useState('No file selected');
  const [editImageName, setEditImageName] = useState('No file selected');

  useEffect(() => {
    return () => {
      revokePreviewUrl(newImagePreview);
      revokePreviewUrl(editImagePreview);
    };
  }, [newImagePreview, editImagePreview]);

  const productList = useMemo(() => response?.data ?? [], [response]);

  const setNextPreview = (currentPreview: string, nextFile: File | null, fallback = '') => {
    revokePreviewUrl(currentPreview);
    if (!nextFile) {
      return fallback;
    }
    return getPreviewUrl(nextFile);
  };

  const uploadIfNeeded = async (file: File | null) => {
    if (!file) {
      return '';
    }
    const compressed = await compressImage(file);
    const { url, error } = await uploadProductImage(compressed);
    if (error) {
      throw new Error(error);
    }
    return url;
  };

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.categoryName) {
      alert('Please fill name, price, and category.');
      return;
    }

    setIsSubmitting(true);
    try {
      const imageUrl = await uploadIfNeeded(newProduct.imageFile);
      await createProduct.mutateAsync({
        name: newProduct.name.trim(),
        price: Number(newProduct.price),
        categoryName: newProduct.categoryName.trim(),
        description: newProduct.description.trim(),
        imageUrl,
        stockQuantity: Number(newProduct.stockQuantity || 0),
      });
      setNewProduct(emptyForm);
      setNewImagePreview('');
      setNewImageName('No file selected');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Create product failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: String(product.price),
      categoryName: product.categoryName,
      description: product.description,
      stockQuantity: String(product.stockQuantity),
      imageFile: null,
    });
    setEditImagePreview(product.imageUrl);
    setEditImageName('Keep current image');
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) {
      return;
    }
    setIsSubmitting(true);
    let newImageUrl = editingProduct.imageUrl;

    try {
      if (editForm.imageFile) {
        newImageUrl = await uploadIfNeeded(editForm.imageFile);
      }

      await updateProduct.mutateAsync({
        id: editingProduct.id,
        name: editForm.name.trim(),
        price: Number(editForm.price),
        categoryName: editForm.categoryName.trim(),
        description: editForm.description.trim(),
        stockQuantity: Number(editForm.stockQuantity || 0),
        imageUrl: newImageUrl,
      });

      if (editForm.imageFile && editingProduct.imageUrl) {
        await deleteProductImage(editingProduct.imageUrl);
      }

      setEditingProduct(null);
      setEditImagePreview('');
      setEditImageName('No file selected');
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Update product failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (product: Product) => {
    if (!confirm(`Delete product ${product.name}?`)) {
      return;
    }
    try {
      await deleteProduct.mutateAsync(product.id);
      if (product.imageUrl) {
        await deleteProductImage(product.imageUrl);
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Delete product failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top,#fef7e7_0%,#f5efe2_35%,#ece5d7_100%)] font-sans">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="mb-8 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 p-6 shadow-[0_10px_30px_rgba(120,53,15,0.12)]">
          <h2 className="text-3xl font-bold tracking-wide text-amber-950">Product Management</h2>
          <p className="mt-2 text-sm text-amber-800">Curate premium inventory with rich details and refined visuals.</p>
        </div>

        <Card className="border-amber-200/70 bg-white/95 shadow-[0_15px_45px_rgba(120,53,15,0.12)] backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl text-amber-950">Inventory</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-amber-900 text-amber-50 hover:bg-amber-800">Add Product</Button>
              </DialogTrigger>
              <DialogContent className="flex max-h-[90vh] flex-col border-amber-200 bg-gradient-to-b from-amber-50/80 to-white sm:max-w-[560px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                {isSubmitting ? <LuxuryDialogSkeleton /> : <div className="flex-1 overflow-y-auto py-3 pr-1 pb-4">
                  <div className="grid gap-3">
                    <Label>Name</Label>
                    <Input value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
                    <Label>Price</Label>
                    <Input type="number" min="0" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
                    <Label>Category</Label>
                    <Input value={newProduct.categoryName} onChange={(e) => setNewProduct({ ...newProduct, categoryName: e.target.value })} />
                    <Label>Stock Quantity</Label>
                    <Input type="number" min="0" value={newProduct.stockQuantity} onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })} />
                    <Label>Description</Label>
                    <Input value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
                    <Label>Image</Label>
                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-2 transition hover:border-amber-400">
                      <span className="inline-flex items-center rounded-md bg-amber-900 px-3 py-1 text-xs font-semibold text-amber-50">Upload Image</span>
                      <span className="ml-3 max-w-[260px] truncate text-xs text-amber-900">{newImageName}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          setNewProduct({ ...newProduct, imageFile: file });
                          setNewImagePreview((prev) => setNextPreview(prev, file));
                          setNewImageName(file ? file.name : 'No file selected');
                        }}
                      />
                    </label>
                    {newImagePreview ? (
                      <ImagePreviewCard src={newImagePreview} alt="New product preview" />
                    ) : null}
                  </div>
                </div>}
                <DialogFooter className="border-t border-amber-100 bg-white/80 pt-4">
                  <Button disabled={isSubmitting || createProduct.isPending} onClick={handleAddProduct}>
                    {isSubmitting ? 'Saving...' : 'Save Product'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent>
            {isLoading ? (
              <LuxuryTableSkeleton />
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Preview</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {productList.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.name}</TableCell>
                      <TableCell>{product.categoryName}</TableCell>
                      <TableCell>{formatPrice(product.price)}</TableCell>
                      <TableCell>{product.stockQuantity}</TableCell>
                      <TableCell>
                        {product.imageUrl ? (
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            width={64}
                            height={64}
                            className="h-14 w-14 rounded-md border border-amber-200 object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => startEdit(product)}>Edit</Button>
                        <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-800" onClick={() => handleDeleteProduct(product)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={!!editingProduct} onOpenChange={(open) => { if (!open) setEditingProduct(null); }}>
              <DialogContent className="flex max-h-[90vh] flex-col border-amber-200 bg-gradient-to-b from-amber-50/80 to-white sm:max-w-[560px]">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                {isSubmitting ? <LuxuryDialogSkeleton /> : <div className="flex-1 overflow-y-auto py-3 pr-1 pb-4">
                  <div className="grid gap-3">
                    <Label>Name</Label>
                    <Input value={editForm.name} onChange={(e) => setEditForm({ ...editForm, name: e.target.value })} />
                    <Label>Price</Label>
                    <Input type="number" min="0" value={editForm.price} onChange={(e) => setEditForm({ ...editForm, price: e.target.value })} />
                    <Label>Category</Label>
                    <Input value={editForm.categoryName} onChange={(e) => setEditForm({ ...editForm, categoryName: e.target.value })} />
                    <Label>Stock Quantity</Label>
                    <Input type="number" min="0" value={editForm.stockQuantity} onChange={(e) => setEditForm({ ...editForm, stockQuantity: e.target.value })} />
                    <Label>Description</Label>
                    <Input value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} />
                    <Label>Replace Image</Label>
                    <label className="flex cursor-pointer items-center justify-between rounded-xl border border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50 px-3 py-2 transition hover:border-amber-400">
                      <span className="inline-flex items-center rounded-md bg-amber-900 px-3 py-1 text-xs font-semibold text-amber-50">Upload Image</span>
                      <span className="ml-3 max-w-[260px] truncate text-xs text-amber-900">{editImageName}</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0] ?? null;
                          setEditForm({ ...editForm, imageFile: file });
                          setEditImagePreview((prev) => setNextPreview(prev, file, editingProduct?.imageUrl ?? ''));
                          setEditImageName(file ? file.name : 'Keep current image');
                        }}
                      />
                    </label>
                    {editImagePreview ? (
                      <ImagePreviewCard src={editImagePreview} alt="Edit product preview" />
                    ) : null}
                  </div>
                </div>}
            <DialogFooter className="border-t border-amber-100 bg-white/80 pt-4">
              <Button disabled={isSubmitting || updateProduct.isPending} onClick={handleUpdateProduct}>
                {isSubmitting ? 'Updating...' : 'Update Product'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
