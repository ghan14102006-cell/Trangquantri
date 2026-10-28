import React, { useState, useEffect } from 'react';
import { X, Image as ImageIcon, Sparkles, Plus } from 'lucide-react';
import { Product, ProductCategory } from '../../types';

interface ProductModalProps {
  isOpen: boolean;
  productToEdit?: Product | null;
  onClose: () => void;
  onSave: (product: Product) => void;
}

const PRESET_FLOWER_IMAGES = [
  { label: 'Hồng pastel', url: 'https://media.istockphoto.com/id/1242962658/vi/anh/hoa-h%E1%BB%93ng-hoa-m%E1%BA%ABu-%C4%91%C6%A1n-m%C3%A0u-h%E1%BB%93ng-hoa-%C4%91%E1%BA%B9p.jpg?s=1024x1024&w=is&k=20&c=PHrJ_c0n43uiKeQ-f3tPAxoeMBGYK-QyYklpqDPkaJM=' },
  { label: 'Tulip lụa', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2FZRJXfS51gx7HvYcDxn7PTuyC_8uh0J5crKxyZGiCg&s' },
  { label: 'Lẵng khai trương', url: 'https://hoahanoi.com.vn/wp-content/uploads/2022/05/gio-hoa-mung-khai-truong-1.jpg' },
  { label: 'Hướng dương', url: 'https://hoatuoi360.vn/upload/hinhanh/thumb/bo-hoa-huong-duong-dep-nhat714.jpg' },
  { label: 'Hộp pastel', url: 'https://www.hoathangba.com/wp-content/uploads/2026/08/1785489919074_4249342021217922167_4249342021217922167_5be61551f76a89b74962f032fead3deb-600x800.jpg' },
  { label: 'Hồng Ecuador', url: 'https://hoatuoi360.vn/upload/hinhanh/thumb/bo-hoa-hong-ecuador-noi-nay-co-anh134.jpg' }
];

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  productToEdit,
  onClose,
  onSave
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<ProductCategory>('Hoa tươi');
  const [price, setPrice] = useState<number | ''>(450000);
  const [stock, setStock] = useState<number | ''>(10);
  const [image, setImage] = useState(PRESET_FLOWER_IMAGES[0].url);
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name);
      setCategory(productToEdit.category);
      setPrice(productToEdit.price);
      setStock(productToEdit.stock);
      setImage(productToEdit.image);
      setDescription(productToEdit.description || '');
    } else {
      setName('');
      setCategory('Hoa tươi');
      setPrice(450000);
      setStock(10);
      setImage(PRESET_FLOWER_IMAGES[0].url);
      setDescription('');
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price === '') {
      alert('Vui lòng nhập tên sản phẩm và giá bán!');
      return;
    }

    const newProduct: Product = {
      id: productToEdit ? productToEdit.id : `prod-${Date.now()}`,
      name,
      category,
      price: Number(price),
      stock: stock === '' ? 10 : Number(stock),
      image: image || PRESET_FLOWER_IMAGES[0].url,
      isAvailable: true,
      description
    };

    onSave(newProduct);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-pink-100">
        <div className="p-5 border-b border-pink-50 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-100 text-brand-darkpink flex items-center justify-center font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">
                {productToEdit ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Mẫu Hoa Mới'}
              </h3>
              <span className="text-[11px] text-gray-400">Kho Blossom Garden Bình Thạnh</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 block mb-1">Tên Sản Phẩm (*)</label>
            <input
              type="text"
              required
              placeholder="VD: Bó Hoa Hồng Juliet Sang Trọng"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Phân Loại</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProductCategory)}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none bg-white"
              >
                <option value="Hoa tươi">Hoa tươi</option>
                <option value="Hoa lụa">Hoa lụa</option>
                <option value="Sự kiện">Sự kiện</option>
                <option value="Phụ kiện">Phụ kiện</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Giá Bán (VNĐ) (*)</label>
              <input
                type="number"
                required
                placeholder="480000"
                value={price}
                onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none font-bold text-brand-darkpink"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Số Lượng Kho</label>
              <input
                type="number"
                placeholder="10"
                value={stock}
                onChange={(e) => setStock(e.target.value ? Number(e.target.value) : '')}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Link Ảnh Sản Phẩm</label>
            <div className="flex gap-2">
              <input
                type="url"
                placeholder="https://..."
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="flex-1 p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>
            <div className="mt-2">
              <span className="text-[10px] text-gray-500 font-medium block mb-1">Hoặc chọn nhanh ảnh mẫu hoa:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_FLOWER_IMAGES.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImage(preset.url)}
                    className="text-[10px] px-2.5 py-1 rounded-lg bg-pink-50 text-brand-darkpink hover:bg-pink-100 border border-pink-200"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Image preview */}
          {image && (
            <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-xl border">
              <img
                src={image}
                alt="Preview"
                className="w-16 h-16 rounded-lg object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="text-gray-500 text-[11px]">Xem trước hình ảnh sản phẩm</span>
            </div>
          )}

          <div>
            <label className="font-bold text-gray-700 block mb-1">Mô Tả Sản Phẩm</label>
            <textarea
              rows={2}
              placeholder="Tone màu hoa, kiểu dáng cắm, ý nghĩa..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border font-semibold text-gray-600 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-brand-darkpink text-white font-bold hover:opacity-95 shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              {productToEdit ? 'Lưu Thay Đổi' : 'Thêm Vào Kho'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
