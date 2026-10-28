import React from 'react';
import { 
  Coins, 
  Receipt, 
  Box, 
  Users, 
  ArrowUp, 
  Check, 
  CircleCheck, 
  UserPlus, 
  ExternalLink, 
  PlusCircle, 
  MessageCircle, 
  Sparkles,
  MapPin,
  Clock
} from 'lucide-react';
import { Order, TabType } from '../../types';

interface OverviewTabProps {
  orders: Order[];
  productCount: number;
  onSwitchTab: (tab: TabType) => void;
  onSelectOrder: (order: Order) => void;
  onOpenNewOrderModal: () => void;
  onOpenNewProductModal: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  orders,
  productCount,
  onSwitchTab,
  onSelectOrder,
  onOpenNewOrderModal,
  onOpenNewProductModal
}) => {
  // Calculate total revenue from non-cancelled orders
  const totalRevenue = orders
    .filter((o) => o.status !== 'Đã hủy')
    .reduce((sum, o) => sum + o.totalAmount, 0) || 13460000;

  const completedOrdersCount = orders.filter((o) => o.status === 'Hoàn thành').length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'Chờ xác nhận').length;

  const renderStatus = (status: Order['status']) => {
    switch (status) {
      case 'Chờ xác nhận':
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-semibold inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            Chờ xác nhận
          </span>
        );
      case 'Đang giao':
        return (
          <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
            Đang giao
          </span>
        );
      case 'Hoàn thành':
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-700 font-semibold inline-flex items-center gap-1">
            <Check className="w-3 h-3" />
            Hoàn thành
          </span>
        );
      case 'Đã hủy':
        return (
          <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-700 font-semibold">
            Đã hủy
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-xs space-y-2 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center text-gray-500 text-xs font-medium">
            <span className="tracking-wider">TỔNG DOANH THU</span>
            <div className="w-8 h-8 rounded-full bg-pink-100 text-brand-darkpink flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">
            {totalRevenue.toLocaleString('vi-VN')} đ
          </h3>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <ArrowUp className="w-3.5 h-3.5" /> +12.5% so với tháng trước
          </span>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-xs space-y-2 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center text-gray-500 text-xs font-medium">
            <span className="tracking-wider">TỔNG ĐƠN HÀNG</span>
            <div className="w-8 h-8 rounded-full bg-pink-100 text-brand-darkpink flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{orders.length}</h3>
          <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> {completedOrdersCount > 0 ? `${completedOrdersCount} đơn hoàn thành tốt` : 'Đơn hoàn thành tốt'}
            {pendingOrdersCount > 0 && <span className="text-amber-600 font-bold ml-1">({pendingOrdersCount} chờ duyệt)</span>}
          </span>
        </div>

        {/* Products in warehouse */}
        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-xs space-y-2 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center text-gray-500 text-xs font-medium">
            <span className="tracking-wider">SẢN PHẨM KHO</span>
            <div className="w-8 h-8 rounded-full bg-brand-lightpink text-brand-darkpink flex items-center justify-center">
              <Box className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{productCount} Mẫu</h3>
          <span className="text-[11px] text-brand-darkgreen font-semibold flex items-center gap-1">
            <CircleCheck className="w-3.5 h-3.5" /> Sẵn sàng phục vụ
          </span>
        </div>

        {/* Loyal Customers */}
        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-xs space-y-2 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-center text-gray-500 text-xs font-medium">
            <span className="tracking-wider">KHÁCH HÀNG THÂN THIẾT</span>
            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">1.248</h3>
          <span className="text-[11px] text-purple-600 font-semibold flex items-center gap-1">
            <UserPlus className="w-3.5 h-3.5" /> +45 tuần này
          </span>
        </div>
      </div>

      {/* Quick operational actions banner */}
      <div className="bg-gradient-to-r from-pink-50 via-white to-pink-50/50 p-5 rounded-3xl border border-pink-100 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-brand-darkpink text-white flex items-center justify-center shadow-sm">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-sm text-gray-900">Thao Tác Nhanh Quầy Thu Ngân & Thợ Cắm Hoa</h4>
            <p className="text-xs text-gray-500">Chi nhánh 142/5 Điện Biên Phủ, Phường 25, Quận Bình Thạnh</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onOpenNewOrderModal}
            className="px-3.5 py-2 bg-brand-darkpink text-white font-bold rounded-xl text-xs hover:opacity-95 shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            Tạo Đơn Hoa Mới
          </button>
          <button
            onClick={onOpenNewProductModal}
            className="px-3.5 py-2 bg-white border border-pink-200 text-gray-700 hover:text-brand-darkpink hover:border-pink-300 font-semibold rounded-xl text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Box className="w-3.5 h-3.5" />
            Thêm Mẫu Vào Kho
          </button>
          <button
            onClick={() => onSwitchTab('chat')}
            className="px-3.5 py-2 bg-white border border-pink-200 text-gray-700 hover:text-brand-darkpink hover:border-pink-300 font-semibold rounded-xl text-xs shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <MessageCircle className="w-3.5 h-3.5 text-brand-darkpink" />
            Trực Hộp Thư KH
          </button>
        </div>
      </div>

      {/* Recent orders table */}
      <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-4">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-base font-bold text-gray-900">Đơn hàng mới nhất tại Bình Thạnh</h3>
            <p className="text-xs text-gray-400">Các đơn cần cắm và giao hỏa tốc trong ngày hôm nay</p>
          </div>
          <button
            onClick={() => onSwitchTab('orders')}
            className="text-xs font-semibold text-brand-darkpink hover:underline flex items-center gap-1 cursor-pointer"
          >
            Xem tất cả ({orders.length}) <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50/80 text-gray-500 border-b border-gray-100">
              <tr>
                <th className="p-3.5 font-semibold">Mã Đơn</th>
                <th className="p-3.5 font-semibold">Khách Hàng</th>
                <th className="p-3.5 font-semibold">Sản Phẩm & Yêu Cầu</th>
                <th className="p-3.5 font-semibold">Tổng Tiền</th>
                <th className="p-3.5 font-semibold">Trạng Thái</th>
                <th className="p-3.5 font-semibold text-right">Chi Tiết</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.slice(0, 5).map((order) => (
                <tr
                  key={order.id}
                  onClick={() => onSelectOrder(order)}
                  className="hover:bg-pink-50/40 transition-colors cursor-pointer group"
                >
                  <td className="p-3.5 font-mono font-bold text-brand-darkpink">
                    {order.id}
                  </td>
                  <td className="p-3.5 font-medium text-gray-800">
                    <div>{order.customerName}</div>
                    <div className="text-[11px] text-gray-400">{order.customerPhone}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-gray-800">{order.productName}</span>
                    <span className="block text-[11px] text-gray-500 line-clamp-1">{order.productDetails}</span>
                  </td>
                  <td className="p-3.5 font-bold text-gray-900">
                    {order.totalAmount.toLocaleString('vi-VN')} đ
                  </td>
                  <td className="p-3.5">{renderStatus(order.status)}</td>
                  <td className="p-3.5 text-right">
                    <span className="text-[11px] font-semibold text-brand-darkpink group-hover:underline">
                      Xem QR / Phiếu
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delivery and branch operational status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-brand-darkgreen font-bold text-xs uppercase tracking-wide">
            <MapPin className="w-4 h-4" />
            <span>Khu Vực Giao Hỏa Tốc Chính</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Điện Biên Phủ, Landmark 81, Vinhomes Central Park, HUTECH, ĐH Kinh Tế Tài Chính (UEF), Pearl Plaza Bình Thạnh.
          </p>
          <span className="text-[11px] text-emerald-600 font-semibold block pt-1">
            ✓ Bán kính dưới 3km cam kết 30-45 phút
          </span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-brand-darkpink font-bold text-xs uppercase tracking-wide">
            <Clock className="w-4 h-4" />
            <span>Thời Gian Cắm Hoa Trung Bình</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            - Bó hoa tươi: 15-20 phút<br/>
            - Hộp hoa lụa & lẵng hoa sự kiện: 30-45 phút<br/>
            - Kệ hoa chúc mừng 2 tầng: 60 phút
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-pink-100 shadow-xs space-y-2">
          <div className="flex items-center gap-2 text-purple-600 font-bold text-xs uppercase tracking-wide">
            <Sparkles className="w-4 h-4" />
            <span>Chất Lượng & Bảo Hành Hoa</span>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed">
            Chụp ảnh gửi khách duyệt trước khi giao. 100% bồi hoàn đổi bó mới nếu hoa bị dập gãy cánh do vận chuyển.
          </p>
        </div>
      </div>
    </div>
  );
};
