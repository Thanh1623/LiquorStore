"use client";
import { useState } from 'react';
import { products as initialProducts } from '@/lib/mock-data';
import { Sidebar } from '@/components/admin/Sidebar';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ProductManagement() {
  const [productList, setProductList] = useState(initialProducts);
  const [newProduct, setNewProduct] = useState({ name: '', price: '' });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    setProductList([...productList, { id: Date.now().toString(), name: newProduct.name, price: Number(newProduct.price), description: '', image: '', category: '' }]);
    setNewProduct({ name: '', price: '' });
  };

  const handleDeleteProduct = (id: string) => {
    setProductList(productList.filter(p => p.id !== id));
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar />
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-8 tracking-wide">Product Management</h2>
        
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="font-serif text-xl">Inventory</CardTitle>
            <Dialog>
              <DialogTrigger>
                <Button className="bg-slate-950 text-white hover:bg-slate-800 font-light tracking-wide">Add Product</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="font-serif">Add New Product</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right font-serif">Name</Label>
                    <Input id="name" className="col-span-3" value={newProduct.name} onChange={(e) => setNewProduct({...newProduct, name: e.target.value})} />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right font-serif">Price</Label>
                    <Input id="price" className="col-span-3" type="number" value={newProduct.price} onChange={(e) => setNewProduct({...newProduct, price: e.target.value})} />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddProduct} className="font-light tracking-wide">Save Product</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="border-slate-200 hover:bg-transparent">
                  <TableHead className="font-serif text-slate-600">Name</TableHead>
                  <TableHead className="font-serif text-slate-600">Price</TableHead>
                  <TableHead className="font-serif text-slate-600 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {productList.map((p) => (
                  <TableRow key={p.id} className="border-slate-100 hover:bg-slate-50 transition-colors">
                    <TableCell className="font-medium text-slate-900">{p.name}</TableCell>
                    <TableCell className="text-slate-700">${p.price}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">Edit</Button>
                      <Button variant="ghost" size="sm" className="text-rose-600 hover:text-rose-800" onClick={() => handleDeleteProduct(p.id)}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
