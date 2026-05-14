"use client";

import { useState } from 'react';
import axios from 'axios';
import { Sidebar } from '@/components/admin/Sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useCategories, useCreateCategory, useDeleteCategory, useUpdateCategory } from '@/hooks/useCategories';

export default function CategoryManagementPage() {
  const { data: response, isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [editId, setEditId] = useState('');
  const [editName, setEditName] = useState('');
  const [createError, setCreateError] = useState('');
  const [tableError, setTableError] = useState('');

  const categories = response?.data ?? [];

  const submitCreate = async () => {
    if (name.trim().length < 2) {
      setCreateError('Category name must be at least 2 characters');
      return;
    }
    try {
      await createCategory.mutateAsync({ name: name.trim() });
      setName('');
      setCreateError('');
      setIsOpen(false);
    } catch (e) {
      setCreateError(e instanceof Error ? e.message : 'Create category failed');
    }
  };

  const submitEdit = async () => {
    if (!editId) {
      return;
    }
    if (editName.trim().length < 2) {
      setTableError('Category name must be at least 2 characters');
      return;
    }
    try {
      await updateCategory.mutateAsync({ id: editId, name: editName.trim() });
      setEditId('');
      setEditName('');
      setTableError('');
    } catch (e) {
      setTableError(e instanceof Error ? e.message : 'Update category failed');
    }
  };

  const removeCategory = async (id: string, categoryName: string) => {
    if (!confirm(`Delete category ${categoryName}?`)) {
      return;
    }
    try {
      await deleteCategory.mutateAsync(id);
    } catch (e) {
      if (axios.isAxiosError(e) && e.response?.status === 409) {
        setTableError('Category này đang có sản phẩm, vui lòng chuyển hoặc xóa sản phẩm trước khi xóa category.');
        return;
      }
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
            <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) { setName(''); setCreateError(''); } }}>
              <DialogTrigger asChild>
                <Button className="bg-amber-900 text-amber-50 hover:bg-amber-800">Add Category</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[460px]">
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 py-2">
                  <Label>Name</Label>
                  <Input value={name} onChange={(e) => { setName(e.target.value); setCreateError(''); }} placeholder="Whiskey" />
                  {createError ? <p className="text-xs text-rose-600">{createError}</p> : null}
                </div>
                <DialogFooter>
                  <Button onClick={submitCreate} disabled={createCategory.isPending}>Save</Button>
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
                          <Input value={editName} onChange={(e) => { setEditName(e.target.value); setTableError(''); }} />
                        ) : (
                          category.name
                        )}
                      </TableCell>
                      <TableCell>{category.productCount ?? 0}</TableCell>
                      <TableCell className="text-right">
                        {editId === category.id ? (
                          <>
                            <Button variant="ghost" size="sm" onClick={submitEdit} disabled={updateCategory.isPending}>Save</Button>
                            <Button variant="ghost" size="sm" onClick={() => { setEditId(''); setEditName(''); setTableError(''); }}>Cancel</Button>
                          </>
                        ) : (
                          <>
                            <Button variant="ghost" size="sm" onClick={() => { setEditId(category.id); setEditName(category.name); setTableError(''); }}>Edit</Button>
                            <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-800" onClick={() => removeCategory(category.id, category.name)}>
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
      </main>
    </div>
  );
}
