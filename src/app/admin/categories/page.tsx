"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { Sidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { compressImage } from '@/lib/utils/image';
import { deleteProductImage, uploadProductImage } from '@/lib/api/storage';
import { useCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from '@/hooks/useCategories';

function ImagePreviewCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="overflow-hidden rounded-xl border border-amber-200 bg-gradient-to-b from-amber-50 to-white p-2 mt-2">
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

export default function CategoryManagementPage() {
  const { data: response, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [imageName, setImageName] = useState('No file selected');

  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [editImageFile, setEditImageFile] = useState<File | null>(null);
  const [editImagePreview, setEditImagePreview] = useState('');
  const [editImageName, setEditImageName] = useState('No file selected');

  const [createError, setCreateError] = useState('');

  const [tableError, setTableError] = useState('');
  const [isReassignOpen, setIsReassignOpen] = useState(false);
  const [pendingDeleteCategoryId, setPendingDeleteCategoryId] = useState('');
  const [pendingDeleteCategoryName, setPendingDeleteCategoryName] = useState('');
  const [replacementCategoryId, setReplacementCategoryId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      if (imagePreview.startsWith('blob:')) URL.revokeObjectURL(imagePreview);
      if (editImagePreview.startsWith('blob:')) URL.revokeObjectURL(editImagePreview);
    };
  }, [imagePreview, editImagePreview]);

  const categories = response?.data ?? [];

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

  const submitCreate = async () => {
    if (name.trim().length < 2) {
      setCreateError('Category name must be at least 2 characters');
      return;
    }
    setIsSubmitting(true);
    try {
      const imageUrl = await uploadIfNeeded(imageFile);
      await createCategory.mutateAsync({ name: name.trim(), imageUrl: imageUrl || null });
      setName('');
      setImageFile(null);
      setImagePreview('');
      setImageName('No file selected');
      setCreateError('');
      setIsOpen(false);
    } catch (e) {
      setCreateError(e instanceof Error ? e.message : 'Create category failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitEdit = async (oldImageUrl: string | null) => {
    if (!editId) {
      return;
    }
    if (editName.trim().length < 2) {
      setTableError('Category name must be at least 2 characters');
      return;
    }
    setIsSubmitting(true);
    let imageUrl = oldImageUrl;
    try {
      if (editImageFile) {
        imageUrl = await uploadIfNeeded(editImageFile);
        if (oldImageUrl) await deleteProductImage(oldImageUrl);
      }
      await updateCategory.mutateAsync({ id: editId, name: editName.trim(), imageUrl });
      setEditId('');
      setEditName('');
      setEditImageFile(null);
      setEditImagePreview('');
      setEditImageName('No file selected');
      setTableError('');
    } catch (e) {
      setTableError(e instanceof Error ? e.message : 'Update category failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  const executeDelete = async (id: string, replacementId?: string) => {
    await deleteCategory.mutateAsync({ id, replacementCategoryId: replacementId });
  };

  const removeCategory = async (id: string, categoryName: string, productCount: number, imageUrl: string | null) => {
    if (productCount > 0) {
      setPendingDeleteCategoryId(id);
      setPendingDeleteCategoryName(categoryName);
      setReplacementCategoryId('');
      setIsReassignOpen(true);
      return;
    }

    if (!confirm(`Delete category ${categoryName}?`)) {
      return;
    }

    try {
      await executeDelete(id);
      if (imageUrl) await deleteProductImage(imageUrl);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 409) {
        setTableError('Category này đang có sản phẩm, hãy chọn category thay thế để chuyển sản phẩm trước khi xóa.');
        return;
      }
      setTableError(e instanceof Error ? e.message : 'Delete category failed');
    }
  };

  const submitReassignAndDelete = async () => {
    if (!pendingDeleteCategoryId) {
      return;
    }
    if (!replacementCategoryId) {
      setTableError('Vui lòng chọn category thay thế.');
      return;
    }

    try {
      const categoryToDelete = categories.find(c => c.id === pendingDeleteCategoryId);
      await executeDelete(pendingDeleteCategoryId, replacementCategoryId);
      if (categoryToDelete?.imageUrl) await deleteProductImage(categoryToDelete.imageUrl);
      setIsReassignOpen(false);
      setPendingDeleteCategoryId('');
      setPendingDeleteCategoryName('');
      setReplacementCategoryId('');
      setTableError('');
    } catch (e) {
      setTableError(e instanceof Error ? e.message : 'Delete category failed');
    }
  };

  return (
    <div className="flex min-h-screen bg-[radial-gradient(circle_at_top,#fef7e7_0%,#f5efe2_35%,#ece5d7_100%)] font-sans">
      <Sidebar />
      <main className="flex-1 p-10">
        <div className="mb-8 rounded-2xl border border-amber-200/60 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100 p-6 shadow-[0_10px_30px_rgba(120,53,15,0.12)]">
          <h2 className="text-3xl font-bold tracking-wide text-amber-950">Category Management</h2>
          <p className="mt-2 text-sm text-amber-800">Define collections once and reuse across product catalog.</p>
        </div>

        <Card className="border-amber-200/70 bg-white/95 shadow-[0_15px_45px_rgba(120,53,15,0.12)] backdrop-blur">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl text-amber-950">Categories</CardTitle>
            <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) { setName(''); setImageFile(null); setImagePreview(''); setImageName('No file selected'); setCreateError(''); } }}>
              <DialogTrigger
                render={<Button className="bg-amber-900 text-amber-50 hover:bg-amber-800">Add Category</Button>}
              />
              <DialogContent className="sm:max-w-[460px]">
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label>Name</Label>
                    <Input value={name} onChange={(e) => { setName(e.target.value); setCreateError(''); }} placeholder="Whiskey" />
                  </div>
                  <div className="space-y-2">
                    <Label>Image</Label>
                    <label className="flex cursor-pointer items-center justify-between rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs">
                      <span className="font-semibold text-amber-900">Upload</span>
                      <span className="truncate text-amber-700">{imageName}</span>
                      <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                        const file = e.target.files?.[0] ?? null;
                        setImageFile(file);
                        setImagePreview(file ? URL.createObjectURL(file) : '');
                        setImageName(file ? file.name : 'No file selected');
                      }} />
                    </label>
                    {imagePreview && <ImagePreviewCard src={imagePreview} alt="New category preview" />}
                  </div>
                  {createError ? <p className="text-xs text-rose-600">{createError}</p> : null}
                </div>
                <DialogFooter>
                  <Button onClick={submitCreate} disabled={isSubmitting}>Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            {tableError ? <p className="mb-3 text-sm text-rose-600">{tableError}</p> : null}
            {isLoading ? (
              <p>Loading categories...</p>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        {editId === category.id ? (
                          <div className="space-y-2">
                            <Input value={editName} onChange={(e) => { setEditName(e.target.value); setTableError(''); }} placeholder="Name" />
                            <label className="flex cursor-pointer items-center justify-between rounded-lg border border-amber-300 bg-amber-50 px-3 py-2 text-xs">
                              <span className="font-semibold text-amber-900">Change Image</span>
                              <span className="truncate text-amber-700">{editImageName}</span>
                              <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setEditImageFile(file);
                                setEditImagePreview(file ? URL.createObjectURL(file) : (category.imageUrl ?? ''));
                                setEditImageName(file ? file.name : 'Keep current image');
                              }} />
                            </label>
                            {editImagePreview && <ImagePreviewCard src={editImagePreview} alt="Edit category preview" />}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            {category.imageUrl && <img src={category.imageUrl} alt={category.name} className="h-8 w-8 rounded-full object-cover" />}
                            {category.name}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>{category.productCount ?? 0}</TableCell>
                      <TableCell className="text-right">
                        {editId === category.id ? (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => submitEdit(category.imageUrl ?? null)} disabled={isSubmitting}>Save</Button>
                            <Button variant="ghost" size="sm" onClick={() => { setEditId(''); setEditName(''); setEditImageFile(null); setEditImagePreview(''); setEditImageName('No file selected'); setTableError(''); }}>Cancel</Button>
                          </>
                        ) : (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => { setEditId(category.id); setEditName(category.name); setEditImagePreview(category.imageUrl ?? ''); setEditImageName(category.imageUrl ? 'Keep current image' : 'No file selected'); setTableError(''); }}>Edit</Button>
                            <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-800" onClick={() => removeCategory(category.id, category.name, category.productCount ?? 0, category.imageUrl ?? null)}>
                              Delete
                            </Button>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>

        <Dialog
          open={isReassignOpen}
          onOpenChange={(open) => {
            setIsReassignOpen(open);
            if (!open) {
              setPendingDeleteCategoryId('');
              setPendingDeleteCategoryName('');
              setReplacementCategoryId('');
            }
          }}
        >
          <DialogContent className="sm:max-w-[480px]">
            <DialogHeader>
              <DialogTitle>Reassign Products Before Delete</DialogTitle>
            </DialogHeader>
            <div className="space-y-3 py-2">
              <p className="text-sm text-slate-600">
                Category <span className="font-semibold text-slate-900">{pendingDeleteCategoryName}</span> has products.
                Select another category to move those products before deletion.
              </p>
              <Label>Replacement Category</Label>
              <select
                value={replacementCategoryId}
                onChange={(e) => { setReplacementCategoryId(e.target.value); setTableError(''); }}
                className="h-10 rounded-md border border-amber-300 bg-white px-3 text-sm"
              >
                <option value="">Select category</option>
                {categories
                  .filter((category) => category.id !== pendingDeleteCategoryId)
                  .map((category) => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
              </select>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsReassignOpen(false)}>Cancel</Button>
              <Button
                className="bg-amber-900 text-amber-50 hover:bg-amber-800"
                onClick={submitReassignAndDelete}
                disabled={deleteCategory.isPending}
              >
                Reassign & Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
}
