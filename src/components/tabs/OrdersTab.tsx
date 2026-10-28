import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Check, 
  QrCode, 
  Eye, 
  Trash2, 
  Phone, 
  MapPin, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { Order, OrderStatus } from '../../types';

interface OrdersTabProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onUpdateStatus: (orderId: string, status: OrderStatus) => void;
  onDeleteOrder: (orderId: string) => void;
  onOpenNewOrderModal: () => void;
}

export const OrdersTab: React.FC<OrdersTabProps> = ({
  orders,
  onSelectOrder,
  onUpdateStatus,
  onDeleteOrder,
  onOpenNewOrderModal
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('Tất cả trạng thái');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter((o) => {
    const matchesStatus =
      statusFilter === 'Tất cả trạng thái' || o.status === statusFilter;
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerPhone.includes(searchTerm) ||
      o.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.recipientName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const renderStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'Chờ xác nhận':
        return (
          <span className="px-2.5 py-1 bg-amber-100 text-amber-700 font-bold rounded-lg text-xs inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Chờ xác nhận
          </span>
        );
      case 'Đang giao':
        return (
          <span className="px-2.5 py-1 bg-blue-100 text-blue-700 font-bold rounded-lg text-xs inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Đang giao
          </span>
        );
      case 'Hoàn thành':
        return (
          <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 font-bold rounded-lg text-xs inline-flex items-center gap-1">
            <Check className="w-3 h-3" />
            Hoàn thành
          </span>
        );
      case 'Đã hủy':
        return (
          <span className="px-2.5 py-1 bg-red-100 text-red-700 font-bold rounded-lg text-xs">
            Đã hủy
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-4">
        {/* Top Controls */}
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Danh Sách Đơn Hàng Chi Nhánh ({orders.length})
            </h3>
            <p className="text-xs text-gray-500">
              Theo dõi tiến độ cắm hoa, điều phối shipper và đối soát thanh toán VietQR.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Search within orders */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
              <input
                type="text"
                placeholder="Lọc mã đơn, SĐT..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 pr-3 py-1.5 border border-gray-200 rounded-xl text-xs bg-gray-50 w-44 focus:outline-none focus:ring-1 focus:ring-brand-pink focus:bg-white"
              />
            </div>

            {/* Status dropdown filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-1.5 border border-gray-200 rounded-xl text-xs bg-gray-50 focus:outline-none focus:ring-1 focus:ring-brand-pink font-medium cursor-pointer"
            >
              <option value="Tất cả trạng thái">Tất cả trạng thái</option>
              <option value="Chờ xác nhận">Chờ xác nhận</option>
              <option value="Đang giao">Đang giao</option>
              <option value="Hoàn thành">Hoàn thành</option>
              <option value="Đã hủy">Đã hủy</option>
            </select>

            {/* Create order button */}
            <button
              onClick={onOpenNewOrderModal}
              className="px-3.5 py-1.5 bg-brand-darkpink text-white rounded-xl text-xs font-bold shadow-xs hover:opacity-95 flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Tạo Đơn Mới
            </button>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="p-3 font-semibold">Mã đơn</th>
                <th className="p-3 font-semibold">Người đặt & SĐT</th>
                <th className="p-3 font-semibold">Người nhận</th>
                <th className="p-3 font-semibold">Sản phẩm & Tùy chỉnh</th>
                <th className="p-3 font-semibold">Thành tiền</th>
                <th className="p-3 font-semibold">Trạng thái</th>
                <th className="p-3 font-semibold text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-gray-400">
                    Không có đơn hàng nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-pink-50/40 transition-colors"
                  >
                    <td className="p-3 font-mono font-bold text-brand-darkpink">
                      {order.id}
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-gray-900">{order.customerName}</div>
                      <span className="text-gray-400 font-mono">{order.customerPhone}</span>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-gray-900">{order.recipientName}</div>
                      <span className="text-gray-500 line-clamp-1 max-w-[150px]">
                        {order.recipientAddress}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-semibold text-gray-900">{order.productName}</div>
                      <span className="text-[11px] text-pink-600 block line-clamp-1 max-w-[200px]">
                        {order.productDetails}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="font-bold text-gray-900 text-sm">
                        {order.totalAmount.toLocaleString('vi-VN')} đ
                      </div>
                      <span className="text-[10px] text-gray-400 block">{order.paymentMethod}</span>
                    </td>
                    <td className="p-3">
                      {renderStatusBadge(order.status)}
                    </td>
                    <td className="p-3 text-center space-x-1 whitespace-nowrap">
                      {order.status === 'Chờ xác nhận' && (
                        <button
                          onClick={() => onUpdateStatus(order.id, 'Đang giao')}
                          className="px-2.5 py-1 bg-brand-darkgreen hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                          title="Duyệt đơn và chuyển sang giao hàng"
                        >
                          Duyệt
                        </button>
                      )}

                      {order.status === 'Đang giao' && (
                        <button
                          onClick={() => onUpdateStatus(order.id, 'Hoàn thành')}
                          className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-semibold transition-colors cursor-pointer"
                          title="Đã giao xong"
                        >
                          Xong
                        </button>
                      )}

                      <button
                        onClick={() => onSelectOrder(order)}
                        className="px-2.5 py-1 bg-pink-50 hover:bg-pink-100 text-brand-darkpink font-semibold rounded-lg transition-colors cursor-pointer"
                        title="Xem chi tiết & mã VietQR"
                      >
                        Xem QR
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Bạn có chắc chắn muốn xóa đơn hàng ${order.id}?`)) {
                            onDeleteOrder(order.id);
                          }
                        }}
                        className="px-2 py-1 bg-gray-100 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors cursor-pointer"
                        title="Xóa đơn hàng"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
