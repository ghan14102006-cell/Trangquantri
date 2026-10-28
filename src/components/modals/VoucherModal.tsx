import React, { useState } from 'react';
import { X, Ticket, Sparkles } from 'lucide-react';
import { Voucher } from '../../types';

interface VoucherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (voucher: Voucher) => void;
}

export const VoucherModal: React.FC<VoucherModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [discountType, setDiscountType] = useState<'fixed' | 'percent'>('fixed');
  const [discountValue, setDiscountValue] = useState<number | ''>(50000);
  const [expiryDate, setExpiryDate] = useState('31/12/2026');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || !title || discountValue === '') {
      alert('Vui lòng điền đầy đủ mã voucher, tiêu đề và mức giảm!');
      return;
    }

    const formattedCode = code.trim().toUpperCase();
    const discountDisplay = discountType === 'fixed'
      ? `-${Number(discountValue).toLocaleString('vi-VN')} đ`
      : `-${discountValue}% (Tối đa 200K)`;

    const newVoucher: Voucher = {
      id: `vouch-${Date.now()}`,
      code: formattedCode,
      title,
      discountDisplay,
      discountValue: Number(discountValue),
      discountType,
      expiryDate,
      status: 'Đang hoạt động',
      usedCount: 0
    };

    onSave(newVoucher);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-pink-100">
        <div className="p-5 border-b border-pink-50 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-pink-100 text-brand-darkpink flex items-center justify-center font-bold">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-gray-900">Tạo Mã Giảm Giá Mới</h3>
              <span className="text-[11px] text-gray-400">Chương trình khuyến mãi chi nhánh</span>
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
            <label className="font-bold text-gray-700 block mb-1">Mã Voucher (In hoa) (*)</label>
            <input
              type="text"
              required
              placeholder="VD: HOAHONG30K"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full p-2.5 border rounded-xl font-mono font-bold text-brand-darkpink focus:ring-2 focus:ring-brand-pink focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Tiêu Đề Chương Trình (*)</label>
            <input
              type="text"
              required
              placeholder="VD: Giảm 30K cho khách đặt hoa giao Bình Thạnh"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 block mb-1">Loại Giảm Giá</label>
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as any)}
                className="w-full p-2.5 border rounded-xl bg-white focus:ring-2 focus:ring-brand-pink focus:outline-none"
              >
                <option value="fixed">Giảm số tiền cố định (đ)</option>
                <option value="percent">Giảm theo %</option>
              </select>
            </div>
            <div>
              <label className="font-bold text-gray-700 block mb-1">Mức Giảm (*)</label>
              <input
                type="number"
                required
                placeholder={discountType === 'fixed' ? '50000' : '15'}
                value={discountValue}
                onChange={(e) => setDiscountValue(e.target.value ? Number(e.target.value) : '')}
                className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-brand-pink focus:outline-none font-bold"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 block mb-1">Hạn Sử Dụng</label>
            <input
              type="text"
              placeholder="31/12/2026"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
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
              Kích Hoạt Voucher
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
