"use client";
import { useState } from 'react';
import { products } from '@/lib/mock-data';

export default function AdminDashboard() {
  const [productList, setProductList] = useState(products);

  return (
    <div className="container mx-auto px-8 py-16">
      <h1 className="text-[32px] font-serif font-bold mb-8 text-[#212529]">Admin Dashboard</h1>
      <table className="w-full border-collapse border border-[#CCCCCC]">
        <thead>
          <tr className="bg-[#F5F4F0]">
            <th className="border p-4 text-left">Name</th>
            <th className="border p-4 text-left">Price</th>
            <th className="border p-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((p) => (
            <tr key={p.id}>
              <td className="border p-4">{p.name}</td>
              <td className="border p-4">${p.price}</td>
              <td className="border p-4">
                <button className="text-[#AB4227] hover:underline">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
