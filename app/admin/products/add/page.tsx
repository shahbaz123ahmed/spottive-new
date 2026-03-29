"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AddProductPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    category: "",
    brand: "",
    pageId: "",
    stock: "",
    featured: false,
  });

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
          stock: parseInt(formData.stock),
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Product created successfully!");
        router.push("/admin/products");
      } else {
        alert("Error: " + data.error);
      }
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setFormData((prev) => ({ ...prev, image: data.url }));
        alert("Image uploaded successfully!");
      } else {
        alert("Image upload failed: " + data.error);
      }
    } catch (error: any) {
      alert("Image upload error: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Product Name *</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description *</label>
          <textarea
            required
            rows={4}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Price *</label>
            <input
              type="number"
              required
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Stock *</label>
            <input
              type="number"
              required
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Product Image *</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading}
            className="w-full border rounded-lg px-4 py-2"
          />
          {uploading && <p className="text-sm text-blue-600 mt-2">Uploading...</p>}
          {formData.image && (
            <img src={formData.image} alt="Preview" className="mt-2 h-32 object-cover rounded" />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Brand *</label>
          <select
            required
            value={formData.brand}
            onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Brand</option>
            <option value="Dahua">Dahua</option>
            <option value="Hikvision">Hikvision</option>
            <option value="Uniview">Uniview</option>
            <option value="UNV">UNV</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Page *</label>
          <select
            required
            value={formData.pageId}
            onChange={(e) => setFormData({ ...formData, pageId: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Select Page</option>
            <option value="dahua-saudi">Dahua Saudi</option>
            <option value="hikvision">Hikvision</option>
            <option value="uniview">Uniview</option>
            <option value="unv">UNV</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category *</label>
          <input
            type="text"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full border rounded-lg px-4 py-2"
            placeholder="e.g., CCTV Cameras, NVR, DVR"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="mr-2"
          />
          <label className="text-sm font-medium">Featured Product</label>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || uploading || !formData.image}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Product"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/products")}
            className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}