import React from 'react';
import { 
  PieChart, 
  Receipt, 
  Boxes, 
  MessageSquare, 
  Ticket, 
  RotateCcw, 
  Star, 
  Megaphone, 
  Settings, 
  Sparkles,
  Flower2,
  X
} from 'lucide-react';
import { TabType } from '../types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  orderCount: number;
  productCount: number;
  chatUnreadCount: number;
  returnsCount: number;
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  orderCount,
  productCount,
  chatUnreadCount,
  returnsCount,
  isMobileOpen = false,
  onCloseMobile
}) => {
  const navItems = [
    {
      id: 'overview' as TabType,
      label: 'Tổng quan',
      icon: PieChart,
      badge: null
    },
    {
      id: 'orders' as TabType,
      label: 'Quản lý đơn hàng',
      icon: Receipt,
      badge: orderCount > 0 ? { text: orderCount.toString(), color: 'bg-pink-100 text-brand-darkpink' } : null
    },
    {
      id: 'products' as TabType,
      label: 'Quản lý sản phẩm',
      icon: Boxes,
      badge: { text: productCount.toString(), color: 'bg-gray-100 text-gray-600' }
    },
    {
      id: 'chat' as TabType,
      label: 'Trò chuyện với KH',
      icon: MessageSquare,
      badge: chatUnreadCount > 0 ? { text: chatUnreadCount.toString(), color: 'bg-red-100 text-red-600 animate-pulse' } : null
    },
    {
      id: 'promotions' as TabType,
      label: 'Khuyến mãi & Voucher',
      icon: Ticket,
      badge: null
    },
    {
      id: 'returns' as TabType,
      label: 'Khách trả hàng',
      icon: RotateCcw,
      badge: returnsCount > 0 ? { text: returnsCount.toString(), color: 'bg-amber-100 text-amber-700' } : null
    },
    {
      id: 'reviews' as TabType,
      label: 'Đánh giá',
      icon: Star,
      badge: { text: '4.9 ★', color: 'bg-amber-50 text-amber-600 font-bold' }
    },
    {
      id: 'ads' as TabType,
      label: 'Chạy quảng cáo',
      icon: Megaphone,
      badge: null
    },
    {
      id: 'settings' as TabType,
      label: 'Cài đặt cửa hàng',
      icon: Settings,
      badge: null
    }
  ];

  const handleSelectTab = (tab: TabType) => {
    setActiveTab(tab);
    if (onCloseMobile) {
      onCloseMobile();
    }
  };

  const content = (
    <div className="h-full flex flex-col justify-between overflow-y-auto">
      <div>
        {/* Logo Brand Header */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-pink-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-darkpink to-pink-300 flex items-center justify-center text-white shadow-md shadow-pink-200">
              <Flower2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-gray-900 block leading-tight">
                Blossom Garden
              </span>
              <span className="text-[10px] text-brand-darkgreen font-semibold tracking-wider uppercase flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Admin Bình Thạnh
              </span>
            </div>
          </div>
          {onCloseMobile && (
            <button 
              onClick={onCloseMobile}
              className="md:hidden p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Quick status bar */}
        <div className="mx-4 my-3 px-3 py-2 rounded-xl bg-pink-50/60 border border-pink-100/60 flex items-center justify-between text-xs">
          <span className="text-gray-600 text-[11px] font-medium flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-brand-darkpink" />
            Ca trực: Sáng - Chiều
          </span>
          <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-md font-semibold">
            Đang mở cửa
          </span>
        </div>

        {/* Navigation items */}
        <nav className="p-4 space-y-1.5 text-sm font-medium">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-brand-darkpink text-white shadow-sm font-semibold'
                    : 'text-gray-600 hover:bg-pink-50 hover:text-brand-darkpink'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-brand-darkpink'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? 'bg-white/20 text-white' : item.badge.color
                    }`}
                  >
                    {item.badge.text}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Admin Profile Footer */}
      <div className="p-3 border-t border-pink-50 bg-pink-50/40 m-4 rounded-2xl flex items-center gap-3">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
            alt="Quản trị viên"
            className="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white"></span>
        </div>
        <div className="overflow-hidden flex-1">
          <h6 className="font-bold text-xs text-gray-800 truncate">Quản trị viên</h6>
          <span className="text-[11px] text-brand-darkgreen font-medium block truncate">
            Chi nhánh Bình Thạnh
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="w-64 bg-white border-r border-pink-100 flex-col justify-between hidden md:flex sticky top-0 h-screen shadow-sm z-20">
        {content}
      </aside>

      {/* Mobile drawer backdrop */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-xs transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Mobile drawer panel */}
      <aside
        className={`fixed inset-y-0 left-0 w-72 bg-white z-50 md:hidden shadow-xl transform transition-transform duration-200 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {content}
      </aside>
    </>
  );
};
