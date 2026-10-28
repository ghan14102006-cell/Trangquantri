import React from 'react';
import { X, CheckCircle, Printer, QrCode, Phone, MapPin, User, Tag, Clock } from 'lucide-react';
import { Order, OrderStatus } from '../../types';

interface OrderDetailsModalProps {
  order: Order | null;
  onClose: () => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
}

export const OrderDetailsModal: React.FC<OrderDetailsModalProps> = ({
  order,
  onClose,
  onUpdateStatus
}) => {
  if (!order) return null;

  const handlePrint = () => {
    window.print();
  };

  // Generate a real VietQR image URL using VietQR standard quick API
  // https://img.vietqr.io/image/MB-090888824799-compact2.png?amount=...&addInfo=...&accountName=...
  const qrImageUrl = `https://img.vietqr.io/image/MB-090888824799-compact2.png?amount=${order.totalAmount}&addInfo=${encodeURIComponent(
    order.id + ' ' + order.customerPhone.slice(-4)
  )}&accountName=${encodeURIComponent('TIEM HOA BLOSSOM GARDEN')}`;

  const statusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Chờ xác nhận':
        return <span className="px-3 py-1 bg-amber-100 text-amber-700 font-bold rounded-full text-xs">Chờ xác nhận</span>;
      case 'Đang giao':
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 font-bold rounded-full text-xs">Đang giao hàng</span>;
      case 'Hoàn thành':
        return <span className="px-3 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-full text-xs">Hoàn thành</span>;
      case 'Đã hủy':
        return <span className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded-full text-xs">Đã hủy</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-pink-100 animate-in fade-in duration-200">
        {/* Header */}
        <div className="p-5 border-b border-pink-50 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-pink-100 text-brand-darkpink flex items-center justify-center font-bold">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-gray-900">Chi Tiết Đơn Hàng {order.id}</h3>
                {statusBadge(order.status)}
              </div>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> Đặt lúc: {order.createdAt}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-xs text-gray-700">
          {/* Status changer buttons */}
          <div className="bg-pink-50/50 p-4 rounded-2xl border border-pink-100 flex items-center justify-between flex-wrap gap-2">
            <span className="font-bold text-gray-800 text-xs">Chuyển trạng thái đơn:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateStatus(order.id, 'Chờ xác nhận')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  order.status === 'Chờ xác nhận'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-amber-50 border'
                }`}
              >
                Chờ xác nhận
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'Đang giao')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  order.status === 'Đang giao'
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-blue-50 border'
                }`}
              >
                Đang giao
              </button>
              <button
                onClick={() => onUpdateStatus(order.id, 'Hoàn thành')}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  order.status === 'Hoàn thành'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-gray-600 hover:bg-emerald-50 border'
                }`}
              >
                Hoàn thành
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Customer & Recipient Info */}
            <div className="space-y-4">
              <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-brand-darkpink font-bold">
                  <User className="w-4 h-4" />
                  <span>Người Đặt Hàng</span>
                </div>
                <p className="font-semibold text-gray-900 text-sm">{order.customerName}</p>
                <p className="text-gray-600 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  <a href={`tel:${order.customerPhone}`} className="hover:underline text-brand-darkpink font-medium">
                    {order.customerPhone}
                  </a>
                </p>
              </div>

              <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-100 space-y-2">
                <div className="flex items-center gap-2 text-brand-darkgreen font-bold">
                  <MapPin className="w-4 h-4" />
                  <span>Người Nhận & Địa Chỉ Giao</span>
                </div>
                <p className="font-semibold text-gray-900 text-sm">{order.recipientName}</p>
                <p className="text-gray-600 leading-relaxed">{order.recipientAddress}</p>
              </div>
            </div>

            {/* VietQR Code preview */}
            <div className="bg-pink-50/30 p-4 rounded-2xl border border-pink-100 flex flex-col items-center justify-center text-center">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
                Mã VietQR Thanh Toán Blossom Garden
              </span>
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-pink-100">
                <img
                  src={qrImageUrl}
                  alt="VietQR Chuyển khoản"
                  className="w-44 h-44 object-contain"
                  onError={(e) => {
                    // Fallback if network blocked
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>
              <div className="mt-2 text-[11px] text-gray-600">
                <p className="font-bold text-gray-800">MBBank: 090888824799</p>
                <p>Nội dung CK: <strong className="text-brand-darkpink">{order.id} {order.customerPhone.slice(-4)}</strong></p>
              </div>
            </div>
          </div>

          {/* Product & Order Details */}
          <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-3">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-xs uppercase tracking-wider border-b pb-2">
              <Tag className="w-4 h-4 text-brand-darkpink" />
              <span>Sản Phẩm & Tùy Chỉnh Yêu Cầu</span>
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-bold text-sm text-gray-900">{order.productName}</h4>
                <p className="text-pink-600 font-medium mt-0.5">{order.productDetails}</p>
                {order.note && (
                  <p className="text-gray-500 mt-2 bg-yellow-50 p-2.5 rounded-xl border border-yellow-100 italic">
                    Ghi chú từ khách: "{order.note}"
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 block">Thành tiền</span>
                <span className="text-base font-bold text-brand-darkpink">
                  {order.totalAmount.toLocaleString('vi-VN')} đ
                </span>
                <span className="text-[10px] text-gray-500 block mt-1">
                  {order.paymentMethod}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 border-t border-pink-50 flex items-center justify-between bg-gray-50/50 rounded-b-3xl">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white border border-gray-200 hover:bg-gray-100 text-gray-700 font-semibold rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-2xs"
          >
            <Printer className="w-3.5 h-3.5" />
            In Phiếu Giao Hoa
          </button>

          <div className="flex items-center gap-2">
            {order.status === 'Chờ xác nhận' && (
              <button
                onClick={() => {
                  onUpdateStatus(order.id, 'Đang giao');
                  onClose();
                }}
                className="px-4 py-2 bg-brand-darkgreen text-white font-bold rounded-xl text-xs flex items-center gap-1.5 shadow-sm hover:opacity-90 cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                Duyệt & Giao Hàng
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl text-xs cursor-pointer"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
