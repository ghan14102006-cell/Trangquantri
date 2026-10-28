import React from 'react';
import { RotateCcw, CheckCircle, ShieldAlert, Phone } from 'lucide-react';
import { ReturnRequest } from '../../types';

interface ReturnsTabProps {
  returns: ReturnRequest[];
  onApproveRefund: (returnId: string) => void;
  onRejectRefund: (returnId: string) => void;
}

export const ReturnsTab: React.FC<ReturnsTabProps> = ({
  returns,
  onApproveRefund,
  onRejectRefund
}) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-4">
        <div className="flex justify-between items-center flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Quản Lý Yêu Cầu Trả Hàng / Hoàn Tiền ({returns.length})
            </h3>
            <p className="text-xs text-gray-500">
              Chính sách đổi trả trong vòng 2 giờ sau khi nhận hoa nếu hoa bị dập cánh, héo úa hoặc giao trễ giờ hẹn.
            </p>
          </div>
          <span className="text-xs px-3 py-1 bg-pink-50 text-brand-darkpink font-medium rounded-full border border-pink-100">
            Cam kết hài lòng 100% tại Bình Thạnh
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="p-3 font-semibold">Mã đơn</th>
                <th className="p-3 font-semibold">Khách hàng</th>
                <th className="p-3 font-semibold">Lý do trả hàng</th>
                <th className="p-3 font-semibold">Số tiền hoàn</th>
                <th className="p-3 font-semibold">Ngày yêu cầu</th>
                <th className="p-3 font-semibold">Trạng thái</th>
                <th className="p-3 font-semibold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {returns.map((ret) => (
                <tr key={ret.id} className="hover:bg-pink-50/40 transition-colors">
                  <td className="p-3 font-mono font-bold text-brand-darkpink">
                    {ret.orderId}
                  </td>
                  <td className="p-3">
                    <span className="font-semibold text-gray-900 block">{ret.customerName}</span>
                    <span className="text-[11px] text-gray-400 font-mono">{ret.customerPhone}</span>
                  </td>
                  <td className="p-3 text-gray-700 max-w-xs">
                    {ret.reason}
                  </td>
                  <td className="p-3 font-bold text-brand-darkpink whitespace-nowrap">
                    {ret.refundDisplay}
                  </td>
                  <td className="p-3 text-gray-500 font-mono whitespace-nowrap">
                    {ret.createdAt}
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    {ret.status === 'Chờ xử lý' && (
                      <span className="px-2.5 py-1 bg-amber-100 text-amber-700 font-bold rounded-lg text-xs inline-flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                        Chờ xử lý
                      </span>
                    )}
                    {ret.status === 'Đã hoàn tiền' && (
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-lg text-xs">
                        Đã hoàn tiền
                      </span>
                    )}
                    {ret.status === 'Từ chối' && (
                      <span className="px-2.5 py-1 bg-red-100 text-red-700 font-bold rounded-lg text-xs">
                        Từ chối
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-center whitespace-nowrap">
                    {ret.status === 'Chờ xử lý' ? (
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => onApproveRefund(ret.id)}
                          className="px-3 py-1 bg-brand-darkgreen hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                        >
                          Xác nhận hoàn
                        </button>
                        <button
                          onClick={() => onRejectRefund(ret.id)}
                          className="px-2.5 py-1 bg-gray-100 hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-lg transition-colors cursor-pointer"
                        >
                          Từ chối
                        </button>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Đã giải quyết</span>
                    )}
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
