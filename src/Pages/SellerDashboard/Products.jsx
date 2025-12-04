

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";
import AddProductModal from "./AddProductModal/AddProductModal";
import EditProductModal from "./EditProductModal/EditProductModal"; 
import ProductDetailsModal from "../ProductDetailsModal/ProductDetailsModal";
import { AuthContext } from "../../contexts/AuthContext/AuthProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access");
  const sellerId = user?.id || localStorage.getItem("id");
  const [selectedProduct, setSelectedProduct] = useState(null);

// console.log("Seller ID:", sellerId);

  // ✅ Fetch seller’s products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      console.log("Fetching products for seller_id:", sellerId);
      const res = await axios.get(
        `http://127.0.0.1:8000/api/products/?seller_id=${sellerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProducts(res.data);
    } catch (error) {
      console.error("❌ Error fetching products:", error.response?.data || error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Add Product
  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  // ✅ Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("আপনি কি সত্যিই এই পণ্যটি মুছে ফেলতে চান?")) return;
    try {
      await axios.delete(`http://127.0.0.1:8000/api/products/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts((prev) => prev.filter((p) => p.id !== id));
      toast.success("পণ্যটি সফলভাবে মুছে ফেলা হয়েছে!", {
      position: "top-right",
    });
    } catch (error) {
      console.error("❌ Delete Error:", error.response?.data || error);
      toast.error("পণ্যটি মুছতে সমস্যা হয়েছে!", {
      position: "top-right",
    });
    }
  };

  // ✅ Save Edited Product
  const handleProductUpdate = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    setEditProduct(null); // close modal
  };

  if (loading) return <p className="text-center py-10">⏳ পণ্য লোড হচ্ছে...</p>;

  return (
    <div className="p-4">
      {/* === Header === */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">পণ্য ব্যবস্থাপনা</h3>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium bg-gray-900 text-white hover:bg-gray-700 h-9 px-4 py-2"
        >
          + নতুন পণ্য যোগ করুন
        </button>
      </div>

      {/* === Product Grid === */}
      {products.length === 0 ? (
        <p className="text-center text-gray-500">কোন পণ্য পাওয়া যায়নি</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-lg overflow-hidden flex flex-col hover:shadow-sm transition-all"
            >
              <div className="relative">
                <div className="h-40 overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {product.discount > 0 && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full shadow">
                    {product.discount}% ছাড়
                  </span>
                )}
              </div>

              <div className="p-2 space-y-1">
                <h3 className="font-semibold text-xs line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-[10px] text-gray-500 line-clamp-1">
                  {product.description}
                </p>
                <p className="text-[10px] text-gray-400">
                  ক্যাটাগরি:{" "}
                  {product.categories?.length
                    ? product.categories.map((c) => c.name).join(", ")
                    : "Uncategorized"}
                </p>

                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">৳{product.price}</p>
                  <span className="text-[9px] bg-red-500 text-white px-1.5 py-0.5 rounded">
                    স্টক: {product.stock}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-yellow-500">
                  ⭐ {product.rating || 0} ({product.reviews?.length || 0})
                </div>

                <div className="border-t my-1"></div>

                <div className="flex gap-1">
                  <button
  onClick={() => setSelectedProduct(product)}
  className="flex-1 flex items-center justify-center gap-1 text-[12px] border rounded px-2 py-1 hover:bg-gray-100"
>
  <FiEye className="w-3 h-3" /> দেখুন
</button>

                  <button
                    onClick={() => setEditProduct(product)} // 👈 open edit modal
                    className="flex-1 flex items-center justify-center gap-1 text-[12px] border rounded px-2 py-1 hover:bg-gray-100"
                  >
                    <FiEdit2 className="w-3 h-3" /> এডিট
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center justify-center gap-1 text-[12px] bg-red-500 text-white rounded px-2 py-1 hover:bg-red-600"
                  >
                    <FiTrash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* === Add Product Modal === */}
      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProduct}
        />
      )}

      {/* === Edit Product Modal === */}
      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onUpdate={handleProductUpdate}
        />
      )}
      {/* === View Product Modal === */}
      {selectedProduct && (
  <ProductDetailsModal
    product={selectedProduct}
    onClose={() => setSelectedProduct(null)}
    // addToCart={(p) => console.log("Add to Cart:", p)} // চাইলে আপনার cart function দিন
  />
)}

    </div>
  );
};

export default Products;

