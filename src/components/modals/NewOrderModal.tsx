import React, { useState } from 'react';
import { X, Plus, Sparkles } from 'lucide-react';
import { Order, Product } from '../../types';

interface NewOrderModalProps {
  products: Product[];
  isOpen: boolean;
  onClose: () => void;
  onCreateOrder: (order: Order) => void;
}

export const NewOrderModal: React.FC<NewOrderModalProps> = ({
  products,
  isOpen,
  onClose,
  onCreateOrder
}) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [selectedProductId, setSelectedProductId] = useState(products[0]?.id || '');
  const [customDetails, setCustomDetails] = useState('');
  const [customPrice, setCustomPrice] = useState<number | ''>('');
  const [paymentMethod, setPaymentMethod] = useState<'Chuyển khoản' | 'Tiền mặt khi nhận (COD)'>('Chuyển khoản');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const selectedProduct = products.find((p) => p.id === selectedProductId);
  const calculatedTotal = customPrice !== '' ? Number(customPrice) : (selectedProduct?.price || 500000);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !recipientAddress) {
      alert('Vui lòng điền đầy đủ tên người đặt, số điện thoại và địa chỉ giao!');
      return;
    }

    const randomId = `BLS-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: Order = {
      id: randomId,
      customerName,
      customerPhone,
      recipientName: recipientName || customerName,
      recipientAddress,
      productName: selectedProduct?.name || 'Hoa thiết kế theo yêu cầu',
      productDetails: customDetails || 'Giấy gói phong cách Hàn Quốc | Kèm thiệp chúc',
      totalAmount: calculatedTotal,
      status: 'Chờ xác nhận',
      createdAt: 'Vừa xong',
      paymentMethod,
      note
    };

    onCreateOrder(newOrder);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-pink-100">
        <div className="p-5 border-b border-pink-50 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-100 text-brand-darkpink flex items-center justify-center font-bold">
              <Plus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Tạo Đơn Hàng Mới Tại Quầy</h3>
              <span className="text-[11px] text-gray-400">Chi nhánh Bình Thạnh</span>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Tên Người Đặt (*)</label>
              <input
                type="text"
                required
                placeholder="VD: Chị Mai"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Số Điện Thoại (*)</label>
              <input
                type="tel"
                required
                placeholder="VD: 0908123456"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Tên Người Nhận</label>
              <input
                type="text"
                placeholder="Để trống nếu là chính người đặt"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Phương Thức Thanh Toán</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none bg-white"
              >
                <option value="Chuyển khoản">Chuyển khoản (VietQR)</option>
                <option value="Tiền mặt khi nhận (COD)">Tiền mặt khi nhận (COD)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Địa Chỉ Nhận Hoa (*)</label>
            <input
              type="text"
              required
              placeholder="VD: 152/12 Điện Biên Phủ, Phường 25, Bình Thạnh"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Chọn Mẫu Sản Phẩm Có Sẵn</label>
            <select
              value={selectedProductId}
              onChange={(e) => {
                setSelectedProductId(e.target.value);
                const found = products.find((p) => p.id === e.target.value);
                if (found) setCustomPrice(found.price);
              }}
              className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none bg-white"
            >
              {products.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - {p.price.toLocaleString('vi-VN')} đ ({p.category})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Tùy Chọn / Giấy Gói / Thiệp</label>
              <input
                type="text"
                placeholder="VD: Giấy hồng HQ, Thiệp chúc mừng sinh nhật"
                value={customDetails}
                onChange={(e) => setCustomDetails(e.target.value)}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Tổng Tiền (VNĐ)</label>
              <input
                type="number"
                placeholder={selectedProduct?.price.toString() || '680000'}
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value ? Number(e.target.value) : '')}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none font-bold text-brand-darkpink"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Ghi Chú Giao Hoa</label>
            <textarea
              rows={2}
              placeholder="Ghi chú thời gian hỏa tốc, lưu ý bảo quản..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
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
              Lưu Đơn Hàng
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
