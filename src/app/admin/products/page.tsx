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
import { useCategories } from '@/hooks/useCategories';
import { Product } from '@/types/product';

type ProductForm = {
  name: string;
  price: string;
  categoryId: string;
  description: string;
  stockQuantity: string;
  imageFile: File | null;
  badge: string;
  oldPrice: string;
};

type ProductFormErrors = Partial<Record<keyof ProductForm, string>>;
type ToastState = {
  open: boolean;
  title: string;
  message: string;
  type: 'success' | 'error';
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
      <div className="relative flex h-48 items-center justify-center overflow-hidden rounded-lg border border-amber-100 bg-white p-2">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 640px) 90vw, 520px"
          className="object-contain p-2"
          unoptimized
        />
      </div>
    </div>
  );
}

function LuxuryToast({ toast }: { toast: ToastState }) {
  if (!toast.open) {
    return null;
  }

  const isError = toast.type === 'error';

  return (
    <div className="fixed right-5 top-5 z-[70] w-[340px] rounded-xl border bg-white/95 p-4 shadow-[0_12px_28px_rgba(0,0,0,0.18)] backdrop-blur">
      <div className={`mb-1 text-sm font-semibold ${isError ? 'text-rose-700' : 'text-emerald-700'}`}>
        {toast.title}
      </div>
      <p className="text-sm text-slate-700">{toast.message}</p>
      <div className={`mt-3 h-1 w-full rounded-full ${isError ? 'bg-rose-200' : 'bg-emerald-200'}`} />
    </div>
  );
}

const emptyForm: ProductForm = {
  name: '',
  price: '',
  categoryId: '',
  description: '',
  stockQuantity: '0',
  imageFile: null,
  badge: '',
  oldPrice: '',
};

export default function ProductManagement() {
  const { data: response, isLoading } = useProducts();
  const { data: categoriesResponse } = useCategories();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const [newProduct, setNewProduct] = useState<ProductForm>(emptyForm);
  const [newProductErrors, setNewProductErrors] = useState<ProductFormErrors>({});
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isFeaturedDialogOpen, setIsFeaturedDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editForm, setEditForm] = useState<ProductForm>(emptyForm);
  const [editFormErrors, setEditFormErrors] = useState<ProductFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newImagePreview, setNewImagePreview] = useState('');
  const [editImagePreview, setEditImagePreview] = useState('');
  const [newImageName, setNewImageName] = useState('No file selected');
  const [editImageName, setEditImageName] = useState('No file selected');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  const [toast, setToast] = useState<ToastState>({
    open: false,
    title: '',
    message: '',
    type: 'success',
  });

  useEffect(() => {
    return () => {
      revokePreviewUrl(newImagePreview);
      revokePreviewUrl(editImagePreview);
    };
  }, [newImagePreview, editImagePreview]);

  useEffect(() => {
    if (!toast.open) {
      return;
    }
    const timer = setTimeout(() => {
      setToast((prev) => ({ ...prev, open: false }));
    }, 3200);

    return () => clearTimeout(timer);
  }, [toast.open]);

  const productList = useMemo(() => response?.data ?? [], [response]);
  const filteredProducts = useMemo(() => {
    if (selectedCategoryFilter === 'all') {
      return productList;
    }
    return productList.filter((product) => product.categoryId === selectedCategoryFilter);
  }, [productList, selectedCategoryFilter]);

  const setNextPreview = (currentPreview: string, nextFile: File | null, fallback = '') => {
    revokePreviewUrl(currentPreview);
    if (!nextFile) {
      return fallback;
    }
    return getPreviewUrl(nextFile);
  };

  const showToast = (title: string, message: string, type: 'success' | 'error') => {
    setToast({ open: true, title, message, type });
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

  const validateForm = (form: ProductForm, mode: 'create' | 'edit'): ProductFormErrors => {
    const errors: ProductFormErrors = {};
    const price = Number(form.price);
    const stock = Number(form.stockQuantity);

    if (!form.name.trim()) {
      errors.name = 'Product name is required';
    } else if (form.name.trim().length < 2) {
      errors.name = 'Name should be at least 2 characters';
    }

    if (!form.categoryId.trim()) {
      errors.categoryId = 'Category is required';
    }

    if (!form.price.trim()) {
      errors.price = 'Price is required';
    } else if (Number.isNaN(price) || price < 0) {
      errors.price = 'Price must be a valid non-negative number';
    }

    if (!form.stockQuantity.trim()) {
      errors.stockQuantity = 'Stock is required';
    } else if (Number.isNaN(stock) || stock < 0 || !Number.isInteger(stock)) {
      errors.stockQuantity = 'Stock must be a non-negative integer';
    }

    if (form.oldPrice && (Number.isNaN(Number(form.oldPrice)) || Number(form.oldPrice) < 0)) {
      errors.oldPrice = 'Old price must be a valid non-negative number';
    }

    if (mode === 'create' && !form.imageFile) {
      errors.imageFile = 'Please select a product image';
    }

    if (form.imageFile && !form.imageFile.type.startsWith('image/')) {
      errors.imageFile = 'Selected file must be an image';
    }

    return errors;
  };

  const resetAddForm = () => {
    setNewProduct(emptyForm);
    setNewProductErrors({});
    setNewImageName('No file selected');
    setNewImagePreview((prev) => {
      revokePreviewUrl(prev);
      return '';
    });
  };

  const resetEditForm = () => {
    setEditingProduct(null);
    setEditForm(emptyForm);
    setEditFormErrors({});
    setEditImageName('No file selected');
    setEditImagePreview((prev) => {
      revokePreviewUrl(prev);
      return '';
    });
  };

  const handleAddProduct = async () => {
    const errors = validateForm(newProduct, 'create');
    setNewProductErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      const imageUrl = await uploadIfNeeded(newProduct.imageFile);
      await createProduct.mutateAsync({
        name: newProduct.name.trim(),
        price: Number(newProduct.price),
        categoryId: newProduct.categoryId,
        description: newProduct.description.trim(),
        imageUrl,
        stockQuantity: Number(newProduct.stockQuantity || 0),
        badge: newProduct.badge || null,
        oldPrice: newProduct.oldPrice ? Number(newProduct.oldPrice) : null,
      });
      resetAddForm();
      setIsAddDialogOpen(false);
      showToast('Saved', 'Product created successfully.', 'success');
    } catch (error) {
      showToast('Create failed', error instanceof Error ? error.message : 'Create product failed', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setEditForm({
      name: product.name,
      price: String(product.price),
      categoryId: product.categoryId,
      description: product.description,
      stockQuantity: String(product.stockQuantity),
      imageFile: null,
      badge: product.badge ?? '',
      oldPrice: product.oldPrice ? String(product.oldPrice) : '',
    });
    setEditImagePreview(product.imageUrl);
    setEditImageName('Keep current image');
    setEditFormErrors({});
  };

  const handleUpdateProduct = async () => {
    if (!editingProduct) {
      return;
    }
    const errors = validateForm(editForm, 'edit');
    setEditFormErrors(errors);
    if (Object.keys(errors).length > 0) {
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
        categoryId: editForm.categoryId,
        description: editForm.description.trim(),
        stockQuantity: Number(editForm.stockQuantity || 0),
        imageUrl: newImageUrl,
        badge: editForm.badge || null,
        oldPrice: editForm.oldPrice ? Number(editForm.oldPrice) : null,
      });

      if (editForm.imageFile && editingProduct.imageUrl) {
        await deleteProductImage(editingProduct.imageUrl);
      }

      resetEditForm();
      showToast('Updated', 'Product updated successfully.', 'success');
    } catch (error) {
      showToast('Update failed', error instanceof Error ? error.message : 'Update product failed', 'error');
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
      showToast('Deleted', 'Product deleted successfully.', 'success');
    } catch (error) {
      showToast('Delete failed', error instanceof Error ? error.message : 'Delete product failed', 'error');
    }
  };

  const categories = categoriesResponse?.data ?? [];

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top,#fef7e7_0%,#f5efe2_35%,#ece5d7_100%)] font-sans">
      <LuxuryToast toast={toast} />
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="mb-8 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 p-6 shadow-[0_10px_30px_rgba(120,53,15,0.12)]">
          <h2 className="text-3xl font-bold tracking-wide text-amber-950">Product Management</h2>
          <p className="mt-2 text-sm text-amber-800">Curate premium inventory with rich details and refined visuals.</p>
        </div>

        <Card className="border-amber-200/70 bg-white/95 shadow-[0_15px_45px_rgba(120,53,15,0.12)] backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="text-xl text-amber-950">Inventory</CardTitle>
            <div className="flex items-center gap-3">
              <Dialog
                open={isFeaturedDialogOpen}
                onOpenChange={(open) => {
                  setIsFeaturedDialogOpen(open);
                }}
              >
                <DialogTrigger
                  render={<Button variant="outline" className="border-amber-900 text-amber-900 hover:bg-amber-100">Manage Featured</Button>}
                />
                <DialogContent className="max-h-[90vh] flex flex-col sm:max-w-[560px]">
                  <DialogHeader>
                    <DialogTitle>Manage Featured Products (Max 4)</DialogTitle>
                  </DialogHeader>
                  <div className="flex-1 overflow-y-auto py-3 pr-1 pb-4">
                    <div className="grid gap-2">
                      {productList.map((product) => {
                        const isFeatured = product.isFeatured;
                        const featuredCount = productList.filter((p) => p.isFeatured).length;
                        const isDisabled = !isFeatured && featuredCount >= 4;

                        return (
                          <div key={product.id} className="flex items-center gap-3 rounded-lg border p-3">
                            <input
                              type="checkbox"
                              checked={isFeatured}
                              disabled={isDisabled}
                              onChange={async (e) => {
                                await updateProduct.mutateAsync({
                                  id: product.id,
                                  isFeatured: e.target.checked,
                                });
                              }}
                              className="h-5 w-5"
                            />
                            <span className={isDisabled ? "text-slate-400" : "text-slate-900"}>{product.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="h-10 rounded-md border border-amber-300 bg-white px-3 text-sm text-amber-900"
              >
                <option value="all">All categories</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              <Dialog
                open={isAddDialogOpen}
                onOpenChange={(open) => {
                  setIsAddDialogOpen(open);
                  if (!open) {
                    resetAddForm();
                  }
                }}
              >
                <DialogTrigger
                render={<Button className="bg-amber-900 text-amber-50 hover:bg-amber-800">Add Product</Button>}
              />
                <DialogContent className="flex max-h-[90vh] flex-col border-amber-200 bg-gradient-to-b from-amber-50/80 to-white sm:max-w-[560px]">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                </DialogHeader>
                {isSubmitting ? <LuxuryDialogSkeleton /> : <div className="flex-1 overflow-y-auto py-3 pr-1 pb-4">
                  <div className="grid gap-3">
                    <Label>Name</Label>
                  <Input value={newProduct.name} onChange={(e) => { setNewProduct({ ...newProduct, name: e.target.value }); setNewProductErrors({ ...newProductErrors, name: undefined }); }} />
                  {newProductErrors.name ? <p className="text-xs text-rose-600">{newProductErrors.name}</p> : null}
                  <Label>Price</Label>
                  <Input type="number" min="0" value={newProduct.price} onChange={(e) => { setNewProduct({ ...newProduct, price: e.target.value }); setNewProductErrors({ ...newProductErrors, price: undefined }); }} />
                  {newProductErrors.price ? <p className="text-xs text-rose-600">{newProductErrors.price}</p> : null}
                  <Label>Category</Label>
                  <select
                    value={newProduct.categoryId}
                    onChange={(e) => { setNewProduct({ ...newProduct, categoryId: e.target.value }); setNewProductErrors({ ...newProductErrors, categoryId: undefined }); }}
                    className="h-10 rounded-md border border-amber-300 bg-white px-3 text-sm"
                  >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                  {newProductErrors.categoryId ? <p className="text-xs text-rose-600">{newProductErrors.categoryId}</p> : null}
                  <Label>Stock Quantity</Label>
                  <Input type="number" min="0" value={newProduct.stockQuantity} onChange={(e) => { setNewProduct({ ...newProduct, stockQuantity: e.target.value }); setNewProductErrors({ ...newProductErrors, stockQuantity: undefined }); }} />
                  {newProductErrors.stockQuantity ? <p className="text-xs text-rose-600">{newProductErrors.stockQuantity}</p> : null}
                  <Label>Description</Label>
                  <Input value={newProduct.description} onChange={(e) => { setNewProduct({ ...newProduct, description: e.target.value }); setNewProductErrors({ ...newProductErrors, description: undefined }); }} />
                  <div className="flex items-center justify-between">
                    {newProductErrors.description ? <p className="text-xs text-rose-600">{newProductErrors.description}</p> : <span />}
                    <p className="text-[11px] text-amber-700">{newProduct.description.length}/500</p>
                  </div>
                  <Label>Badge</Label>
                  <select
                    value={newProduct.badge}
                    onChange={(e) => setNewProduct({ ...newProduct, badge: e.target.value })}
                    className="h-10 rounded-md border border-amber-300 bg-white px-3 text-sm"
                  >
                    <option value="">None</option>
                    <option value="Sale">Sale</option>
                    <option value="Best Seller">Best Seller</option>
                    <option value="New Arrival">New Arrival</option>
                  </select>
                  <Label>Old Price</Label>
                  <Input type="number" min="0" value={newProduct.oldPrice} onChange={(e) => { setNewProduct({ ...newProduct, oldPrice: e.target.value }); setNewProductErrors({ ...newProductErrors, oldPrice: undefined }); }} />
                  {newProductErrors.oldPrice ? <p className="text-xs text-rose-600">{newProductErrors.oldPrice}</p> : null}
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
                        setNewProductErrors({ ...newProductErrors, imageFile: undefined });
                      }}
                    />
                  </label>
                  {newProductErrors.imageFile ? <p className="text-xs text-rose-600">{newProductErrors.imageFile}</p> : null}
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
            </div>
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
                  {filteredProducts.map((product) => (
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
                        <button type="button" className="text-sm font-medium text-amber-900 hover:text-amber-700" onClick={() => startEdit(product)}>Edit</button>
                        <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-800" onClick={() => handleDeleteProduct(product)}>Delete</Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog open={!!editingProduct} onOpenChange={(open) => { if (!open) resetEditForm(); }}>
              <DialogContent className="flex max-h-[90vh] flex-col border-amber-200 bg-gradient-to-b from-amber-50/80 to-white sm:max-w-[560px]">
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                </DialogHeader>
                {isSubmitting ? <LuxuryDialogSkeleton /> : <div className="flex-1 overflow-y-auto py-3 pr-1 pb-4">
                  <div className="grid gap-3">
                    <Label>Name</Label>
              <Input value={editForm.name} onChange={(e) => { setEditForm({ ...editForm, name: e.target.value }); setEditFormErrors({ ...editFormErrors, name: undefined }); }} />
              {editFormErrors.name ? <p className="text-xs text-rose-600">{editFormErrors.name}</p> : null}
              <Label>Price</Label>
              <Input type="number" min="0" value={editForm.price} onChange={(e) => { setEditForm({ ...editForm, price: e.target.value }); setEditFormErrors({ ...editFormErrors, price: undefined }); }} />
              {editFormErrors.price ? <p className="text-xs text-rose-600">{editFormErrors.price}</p> : null}
              <Label>Category</Label>
              <select
                value={editForm.categoryId}
                onChange={(e) => { setEditForm({ ...editForm, categoryId: e.target.value }); setEditFormErrors({ ...editFormErrors, categoryId: undefined }); }}
                className="h-10 rounded-md border border-amber-300 bg-white px-3 text-sm"
              >
                <option value="">Select category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
              {editFormErrors.categoryId ? <p className="text-xs text-rose-600">{editFormErrors.categoryId}</p> : null}
              <Label>Stock Quantity</Label>
              <Input type="number" min="0" value={editForm.stockQuantity} onChange={(e) => { setEditForm({ ...editForm, stockQuantity: e.target.value }); setEditFormErrors({ ...editFormErrors, stockQuantity: undefined }); }} />
              {editFormErrors.stockQuantity ? <p className="text-xs text-rose-600">{editFormErrors.stockQuantity}</p> : null}
              <Label>Description</Label>
              <Input value={editForm.description} onChange={(e) => { setEditForm({ ...editForm, description: e.target.value }); setEditFormErrors({ ...editFormErrors, description: undefined }); }} />
              <div className="flex items-center justify-between">
                {editFormErrors.description ? <p className="text-xs text-rose-600">{editFormErrors.description}</p> : <span />}
                <p className="text-[11px] text-amber-700">{editForm.description.length}/500</p>
              </div>
              <Label>Badge</Label>
              <select
                value={editForm.badge}
                onChange={(e) => setEditForm({ ...editForm, badge: e.target.value })}
                className="h-10 rounded-md border border-amber-300 bg-white px-3 text-sm"
              >
                <option value="">None</option>
                <option value="Sale">Sale</option>
                <option value="Best Seller">Best Seller</option>
                <option value="New Arrival">New Arrival</option>
              </select>
              <Label>Old Price</Label>
              <Input type="number" min="0" value={editForm.oldPrice} onChange={(e) => { setEditForm({ ...editForm, oldPrice: e.target.value }); setEditFormErrors({ ...editFormErrors, oldPrice: undefined }); }} />
              {editFormErrors.oldPrice ? <p className="text-xs text-rose-600">{editFormErrors.oldPrice}</p> : null}
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
                    setEditFormErrors({ ...editFormErrors, imageFile: undefined });
                  }}
                />
              </label>
              {editFormErrors.imageFile ? <p className="text-xs text-rose-600">{editFormErrors.imageFile}</p> : null}
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
