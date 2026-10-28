import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Search, 
  Bell, 
  Menu, 
  Plus, 
  ShoppingBag, 
  MessageCircle, 
  PackageCheck, 
  ExternalLink,
  X
} from 'lucide-react';
import { TabType, Order, Product } from '../types';

interface HeaderProps {
  activeTab: TabType;
  onOpenMobileSidebar: () => void;
  onOpenNewOrderModal: () => void;
  onSelectTab: (tab: TabType) => void;
  onSelectOrder?: (order: Order) => void;
  orders: Order[];
  products: Product[];
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenMobileSidebar,
  onOpenNewOrderModal,
  onSelectTab,
  onSelectOrder,
  orders,
  products
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadNotifications, setUnreadNotifications] = useState(2);

  const searchRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowSearchDropdown(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const titles: Record<TabType, string> = {
    overview: 'Tổng quan cửa hàng',
    orders: 'Quản lý đơn hàng',
    products: 'Quản lý sản phẩm',
    chat: 'Trò chuyện trực tuyến với khách hàng',
    promotions: 'Quản lý khuyến mãi & Voucher',
    returns: 'Khách trả hàng & Hoàn tiền',
    reviews: 'Đánh giá khách hàng',
    ads: 'Quản lý chiến dịch quảng cáo',
    settings: 'Cài đặt cửa hàng'
  };

  // Filter orders and products for the search preview
  const filteredOrders = searchQuery.trim()
    ? orders.filter(
        (o) =>
          o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          o.customerPhone.includes(searchQuery) ||
          o.productName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredProducts = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const notifications = [
    {
      id: 1,
      title: 'Đơn hàng mới BLS-8921',
      desc: 'Trần Thị Mai vừa đặt Bó Hoa Hồng Eos Hàn Quốc (Hỏa tốc)',
      time: '15 phút trước',
      type: 'order',
      actionTab: 'orders' as TabType
    },
    {
      id: 2,
      title: 'Tin nhắn mới từ khách hàng',
      desc: 'Trần Thị Mai: "Shop ơi bó hồng Eos có giao hỏa tốc đến Điện Biên Phủ kịp trước 12h không ạ?"',
      time: '20 phút trước',
      type: 'chat',
      actionTab: 'chat' as TabType
    },
    {
      id: 3,
      title: 'Sắp hết hàng trong kho',
      desc: 'Kệ Hoa Chúc Mừng Thành Công còn 5 mẫu sẵn sàng.',
      time: '2 giờ trước',
      type: 'stock',
      actionTab: 'products' as TabType
    }
  ];

  return (
    <header className="h-20 bg-white border-b border-pink-100 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-30 shadow-xs">
      {/* Left title and mobile hamburger */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileSidebar}
          className="md:hidden p-2 text-gray-600 hover:text-brand-darkpink hover:bg-pink-50 rounded-xl"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-bold text-gray-900 leading-tight">
            {titles[activeTab] || 'Trang Quản Trị'}
          </h1>
          <p className="text-[11px] text-gray-400 hidden sm:block">
            Hệ thống quản lý Blossom Garden chi nhánh Bình Thạnh
          </p>
        </div>

        <span className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-100/80 text-brand-darkpink text-xs font-semibold ml-2">
          <MapPin className="w-3.5 h-3.5 text-brand-darkpink" />
          Quận Bình Thạnh, TP.HCM
        </span>
      </div>

      {/* Right actions */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search input with live results dropdown */}
        <div ref={searchRef} className="relative hidden sm:block">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setShowSearchDropdown(true);
            }}
            onFocus={() => setShowSearchDropdown(true)}
            placeholder="Tìm nhanh mã đơn, khách, hoa..."
            className="pl-9 pr-8 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs w-60 lg:w-72 focus:outline-none focus:ring-2 focus:ring-brand-pink focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          {/* Search Dropdown Results */}
          {showSearchDropdown && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-2 bg-white rounded-2xl shadow-xl border border-pink-100 p-3 max-h-96 overflow-y-auto z-50 text-xs">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                Kết quả tìm kiếm
              </div>

              {filteredOrders.length === 0 && filteredProducts.length === 0 ? (
                <div className="py-4 text-center text-gray-400">
                  Không tìm thấy kết quả phù hợp cho "{searchQuery}"
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredOrders.length > 0 && (
                    <div>
                      <div className="font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5 text-[11px]">
                        <ShoppingBag className="w-3.5 h-3.5 text-brand-darkpink" /> Đơn hàng ({filteredOrders.length})
                      </div>
                      <div className="space-y-1">
                        {filteredOrders.map((o) => (
                          <div
                            key={o.id}
                            onClick={() => {
                              onSelectTab('orders');
                              if (onSelectOrder) onSelectOrder(o);
                              setShowSearchDropdown(false);
                            }}
                            className="p-2 hover:bg-pink-50 rounded-xl cursor-pointer flex justify-between items-center transition-colors"
                          >
                            <div>
                              <span className="font-mono font-bold text-brand-darkpink">{o.id}</span>
                              <span className="text-gray-700 ml-2 font-medium">{o.customerName}</span>
                              <p className="text-[11px] text-gray-400 truncate">{o.productName}</p>
                            </div>
                            <span className="font-semibold text-gray-800">
                              {o.totalAmount.toLocaleString('vi-VN')} đ
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredProducts.length > 0 && (
                    <div>
                      <div className="font-semibold text-gray-700 mb-1.5 flex items-center gap-1.5 text-[11px]">
                        <PackageCheck className="w-3.5 h-3.5 text-brand-darkgreen" /> Sản phẩm ({filteredProducts.length})
                      </div>
                      <div className="space-y-1">
                        {filteredProducts.map((p) => (
                          <div
                            key={p.id}
                            onClick={() => {
                              onSelectTab('products');
                              setShowSearchDropdown(false);
                            }}
                            className="p-2 hover:bg-pink-50 rounded-xl cursor-pointer flex items-center gap-2.5 transition-colors"
                          >
                            <img src={p.image} alt={p.name} className="w-8 h-8 rounded-lg object-cover" />
                            <div className="flex-1 truncate">
                              <p className="font-medium text-gray-800 truncate">{p.name}</p>
                              <span className="text-[10px] text-gray-400">{p.category}</span>
                            </div>
                            <span className="font-semibold text-brand-darkpink">
                              {p.price.toLocaleString('vi-VN')} đ
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Quick Create Order Button */}
        <button
          onClick={onOpenNewOrderModal}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-gradient-to-r from-brand-darkpink to-pink-400 text-white font-semibold text-xs rounded-xl shadow-xs hover:opacity-95 transition-all cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Tạo Đơn Nhanh</span>
        </button>

        {/* Notification Bell */}
        <div ref={notifRef} className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setUnreadNotifications(0);
            }}
            className="w-10 h-10 rounded-xl bg-pink-50 text-brand-darkpink hover:bg-pink-100 flex items-center justify-center cursor-pointer transition-colors relative"
            aria-label="Thông báo"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifications > 0 && (
              <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 sm:w-88 bg-white rounded-2xl shadow-xl border border-pink-100 p-4 z-50 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-pink-50 mb-2">
                <span className="font-bold text-gray-900 text-sm">Thông Báo Cửa Hàng</span>
                <span className="text-[10px] text-brand-darkpink font-medium cursor-pointer hover:underline">
                  Đánh dấu đã đọc
                </span>
              </div>

              <div className="space-y-2 max-h-80 overflow-y-auto">
                {notifications.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectTab(item.actionTab);
                      setShowNotifications(false);
                    }}
                    className="p-2.5 rounded-xl hover:bg-pink-50/70 transition-colors cursor-pointer border border-transparent hover:border-pink-100"
                  >
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-bold text-gray-800 text-xs">{item.title}</h4>
                      <span className="text-[10px] text-gray-400 whitespace-nowrap">{item.time}</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-2">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="pt-2 mt-2 border-t border-pink-50 text-center">
                <button
                  onClick={() => {
                    onSelectTab('orders');
                    setShowNotifications(false);
                  }}
                  className="text-brand-darkpink font-semibold text-[11px] hover:underline"
                >
                  Xem tất cả hoạt động
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
