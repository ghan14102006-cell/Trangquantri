import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product, ProductCategory } from '../../types';

interface ProductsTabProps {
  products: Product[];
  onOpenProductModal: (product?: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onToggleAvailability: (productId: string) => void;
}

export const ProductsTab: React.FC<ProductsTabProps> = ({
  products,
  onOpenProductModal,
  onDeleteProduct,
  onToggleAvailability
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['Tất cả', 'Hoa tươi', 'Hoa lụa', 'Sự kiện', 'Phụ kiện'];

  const filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'Tất cả' || p.category === selectedCategory;
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getCategoryBadgeClass = (category: ProductCategory) => {
    switch (category) {
      case 'Hoa tươi':
        return 'bg-pink-100 text-brand-darkpink';
      case 'Hoa lụa':
        return 'bg-purple-100 text-purple-600';
      case 'Sự kiện':
        return 'bg-amber-100 text-amber-700';
      case 'Phụ kiện':
        return 'bg-pink-100 text-brand-darkpink';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-5">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Kho Sản Phẩm ({products.length} Mẫu)
            </h3>
            <p className="text-xs text-gray-500">
              Quản lý các bó hoa, lẵng hoa và phụ kiện đang bán tại cửa hàng chi nhánh Bình Thạnh.
            </p>
          </div>
          <button
            onClick={() => onOpenProductModal()}
            className="px-4 py-2 bg-brand-darkpink text-white rounded-xl text-xs font-bold shadow-xs hover:opacity-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Thêm Sản Phẩm
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-pink-50 pb-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-brand-darkpink text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-pink-50 hover:text-brand-darkpink'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-60">
            <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm tên mẫu hoa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:outline-none focus:ring-1 focus:ring-brand-pink focus:bg-white"
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-xs">
            Không tìm thấy mẫu hoa nào phù hợp.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="border border-pink-100 rounded-2xl p-3 space-y-2.5 bg-gray-50/50 hover:bg-white hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative overflow-hidden rounded-xl bg-pink-50 h-36">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        // Fallback placeholder image if external image fails
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=600&q=80';
                      }}
                    />
                    <div className="absolute top-2 right-2">
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shadow-xs ${getCategoryBadgeClass(
                          product.category
                        )}`}
                      >
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <h4 className="font-bold text-xs text-gray-800 line-clamp-1 mt-2.5">
                    {product.name}
                  </h4>
                  {product.description && (
                    <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5">
                      {product.description}
                    </p>
                  )}
                </div>

                <div className="space-y-2 pt-1 border-t border-gray-100/80">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-brand-darkpink text-sm">
                      {product.price.toLocaleString('vi-VN')} đ
                    </span>
                    <span className="text-[11px] text-gray-500 font-medium">
                      Kho: <strong className="text-gray-800">{product.stock}</strong>
                    </span>
                  </div>

                  {/* Actions: Edit & Delete */}
                  <div className="flex items-center justify-between pt-1 text-xs">
                    <button
                      onClick={() => onToggleAvailability(product.id)}
                      className={`text-[10px] px-2 py-1 rounded-lg font-medium flex items-center gap-1 transition-colors cursor-pointer ${
                        product.isAvailable
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                      }`}
                    >
                      {product.isAvailable ? (
                        <>
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Đang bán
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-3 h-3 text-gray-400" />
                          Tạm hết
                        </>
                      )}
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => onOpenProductModal(product)}
                        className="p-1.5 text-gray-500 hover:text-brand-darkpink hover:bg-pink-50 rounded-lg transition-colors cursor-pointer"
                        title="Chỉnh sửa sản phẩm"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc muốn xóa sản phẩm "${product.name}"?`)) {
                            onDeleteProduct(product.id);
                          }
                        }}
                        className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                        title="Xóa sản phẩm"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
