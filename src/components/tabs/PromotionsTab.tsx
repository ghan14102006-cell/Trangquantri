import React, { useState } from 'react';
import { Plus, Ticket, Copy, Check, Trash2, Power } from 'lucide-react';
import { Voucher } from '../../types';

interface PromotionsTabProps {
  vouchers: Voucher[];
  onOpenVoucherModal: () => void;
  onToggleStatus: (voucherId: string) => void;
  onDeleteVoucher: (voucherId: string) => void;
}

export const PromotionsTab: React.FC<PromotionsTabProps> = ({
  vouchers,
  onOpenVoucherModal,
  onToggleStatus,
  onDeleteVoucher
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Quản Lý Mã Giảm Giá & Voucher ({vouchers.length})
            </h3>
            <p className="text-xs text-gray-500">
              Tạo mã ưu đãi cho khách đặt hoa tại chi nhánh Bình Thạnh.
            </p>
          </div>
          <button
            onClick={onOpenVoucherModal}
            className="px-4 py-2 bg-brand-darkpink text-white rounded-xl text-xs font-bold shadow-xs hover:opacity-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Tạo Mã Giảm Giá
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="p-3 font-semibold">Mã Voucher</th>
                <th className="p-3 font-semibold">Tiêu đề chương trình</th>
                <th className="p-3 font-semibold">Mức giảm</th>
                <th className="p-3 font-semibold">Đã Dùng</th>
                <th className="p-3 font-semibold">Hạn sử dụng</th>
                <th className="p-3 font-semibold">Trạng thái</th>
                <th className="p-3 font-semibold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vouchers.map((voucher) => (
                <tr key={voucher.id} className="hover:bg-pink-50/40 transition-colors">
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-brand-darkpink bg-pink-50 px-2 py-0.5 rounded-md border border-pink-100">
                        {voucher.code}
                      </span>
                      <button
                        onClick={() => handleCopy(voucher.code)}
                        className="text-gray-400 hover:text-brand-darkpink p-1 rounded-md hover:bg-white cursor-pointer"
                        title="Sao chép mã"
                      >
                        {copiedCode === voucher.code ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                      </button>
                    </div>
                  </td>
                  <td className="p-3 font-medium text-gray-800">
                    {voucher.title}
                  </td>
                  <td className="p-3 text-red-600 font-bold whitespace-nowrap">
                    {voucher.discountDisplay}
                  </td>
                  <td className="p-3 text-gray-600">
                    <span className="font-semibold text-gray-900">{voucher.usedCount}</span> lượt
                  </td>
                  <td className="p-3 text-gray-600 font-mono">
                    {voucher.expiryDate}
                  </td>
                  <td className="p-3">
                    {voucher.status === 'Đang hoạt động' && (
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-lg text-xs">
                        Đang hoạt động
                      </span>
                    )}
                    {voucher.status === 'Sắp diễn ra' && (
                      <span className="px-2 py-1 bg-amber-100 text-amber-700 font-bold rounded-lg text-xs">
                        Sắp diễn ra
                      </span>
                    )}
                    {voucher.status === 'Đã kết thúc' && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 font-bold rounded-lg text-xs">
                        Đã kết thúc
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center space-x-1 whitespace-nowrap">
                    <button
                      onClick={() => onToggleStatus(voucher.id)}
                      className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                        voucher.status === 'Đang hoạt động'
                          ? 'bg-amber-50 hover:bg-amber-100 text-amber-700'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                      }`}
                    >
                      {voucher.status === 'Đang hoạt động' ? 'Tạm dừng' : 'Kích hoạt'}
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Bạn có chắc muốn xóa mã voucher ${voucher.code}?`)) {
                          onDeleteVoucher(voucher.id);
                        }
                      }}
                      className="px-2 py-1 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                      title="Xóa voucher"
                    >
                      <Trash2 className="w-3.5 h-3.5 inline" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
