/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Order, Product, Conversation, Voucher, ReturnRequest, Review, AdCampaign, StoreSettings, OrderStatus } from './types';
import { 
  INITIAL_PRODUCTS, 
  INITIAL_ORDERS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_VOUCHERS, 
  INITIAL_RETURNS, 
  INITIAL_REVIEWS, 
  INITIAL_ADS, 
  INITIAL_SETTINGS 
} from './data/initialData';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { OverviewTab } from './components/tabs/OverviewTab';
import { OrdersTab } from './components/tabs/OrdersTab';
import { ProductsTab } from './components/tabs/ProductsTab';
import { ChatTab } from './components/tabs/ChatTab';
import { PromotionsTab } from './components/tabs/PromotionsTab';
import { ReturnsTab } from './components/tabs/ReturnsTab';
import { ReviewsTab } from './components/tabs/ReviewsTab';
import { AdsTab } from './components/tabs/AdsTab';
import { SettingsTab } from './components/tabs/SettingsTab';
import { OrderDetailsModal } from './components/modals/OrderDetailsModal';
import { NewOrderModal } from './components/modals/NewOrderModal';
import { ProductModal } from './components/modals/ProductModal';
import { VoucherModal } from './components/modals/VoucherModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  // Load state from localStorage or initial datasets
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('blossom_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('blossom_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('blossom_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [vouchers, setVouchers] = useState<Voucher[]>(() => {
    const saved = localStorage.getItem('blossom_vouchers');
    return saved ? JSON.parse(saved) : INITIAL_VOUCHERS;
  });

  const [returns, setReturns] = useState<ReturnRequest[]>(() => {
    const saved = localStorage.getItem('blossom_returns');
    return saved ? JSON.parse(saved) : INITIAL_RETURNS;
  });

  const [reviews, setReviews] = useState<Review[]>(() => {
    const saved = localStorage.getItem('blossom_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [ads, setAds] = useState<AdCampaign[]>(() => {
    const saved = localStorage.getItem('blossom_ads');
    return saved ? JSON.parse(saved) : INITIAL_ADS;
  });

  const [settings, setSettings] = useState<StoreSettings>(() => {
    const saved = localStorage.getItem('blossom_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  // Modals state
  const [selectedOrderForModal, setSelectedOrderForModal] = useState<Order | null>(null);
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [isVoucherModalOpen, setIsVoucherModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Toast notification banner
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('blossom_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('blossom_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('blossom_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('blossom_vouchers', JSON.stringify(vouchers));
  }, [vouchers]);

  useEffect(() => {
    localStorage.setItem('blossom_returns', JSON.stringify(returns));
  }, [returns]);

  useEffect(() => {
    localStorage.setItem('blossom_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('blossom_ads', JSON.stringify(ads));
  }, [ads]);

  useEffect(() => {
    localStorage.setItem('blossom_settings', JSON.stringify(settings));
  }, [settings]);

  // Order Handlers
  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    if (selectedOrderForModal && selectedOrderForModal.id === orderId) {
      setSelectedOrderForModal((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(`Đã cập nhật đơn hàng ${orderId} sang trạng thái "${newStatus}"!`);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    showToast(`Đã xóa đơn hàng ${orderId}!`, 'info');
  };

  const handleCreateOrder = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    showToast(`Đã tạo thành công đơn hàng mới ${newOrder.id}!`);
  };

  // Product Handlers
  const handleSaveProduct = (product: Product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? product : p));
      }
      return [product, ...prev];
    });
    showToast(`Đã cập nhật sản phẩm "${product.name}" vào kho!`);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    showToast('Đã xóa mẫu hoa khỏi kho!', 'info');
  };

  const handleToggleProductAvailability = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId ? { ...p, isAvailable: !p.isAvailable } : p
      )
    );
  };

  // Chat Handlers
  const handleSendMessage = (conversationId: string, text: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    
    setConversations((prev) =>
      prev.map((conv) => {
        if (conv.id === conversationId) {
          const newMsg = {
            id: `msg-${Date.now()}`,
            sender: 'admin' as const,
            text,
            time: timeStr
          };
          return {
            ...conv,
            lastMessage: text,
            time: 'Vừa xong',
            unreadCount: 0,
            messages: [...conv.messages, newMsg]
          };
        }
        return conv;
      })
    );

    // Simulate realistic customer reply after 1.5 seconds if asked
    setTimeout(() => {
      setConversations((prev) =>
        prev.map((conv) => {
          if (conv.id === conversationId) {
            const customerReplies = [
              'Dạ vâng em cảm ơn shop nhiều nhé, shipper đến nơi gọi em số này nha!',
              'Dạ shop chuẩn bị giúp em tone hồng tươi xinh xắn nha ❤️',
              'Tuyệt vời quá ạ, em chuyển khoản VietQR xong rồi nhé shop!',
              'Dạ vâng shop gửi ảnh trước khi giao giúp em với nha.'
            ];
            const randomReply = customerReplies[Math.floor(Math.random() * customerReplies.length)];
            const autoMsg = {
              id: `msg-reply-${Date.now()}`,
              sender: 'customer' as const,
              text: randomReply,
              time: 'Vừa xong'
            };
            return {
              ...conv,
              lastMessage: randomReply,
              time: 'Vừa xong',
              messages: [...conv.messages, autoMsg]
            };
          }
          return conv;
        })
      );
    }, 1600);
  };

  // Voucher Handlers
  const handleSaveVoucher = (newVoucher: Voucher) => {
    setVouchers((prev) => [newVoucher, ...prev]);
    showToast(`Đã tạo mã giảm giá ${newVoucher.code}!`);
  };

  const handleToggleVoucherStatus = (voucherId: string) => {
    setVouchers((prev) =>
      prev.map((v) =>
        v.id === voucherId
          ? {
              ...v,
              status: v.status === 'Đang hoạt động' ? 'Đã kết thúc' : 'Đang hoạt động'
            }
          : v
      )
    );
    showToast('Đã thay đổi trạng thái mã giảm giá!');
  };

  const handleDeleteVoucher = (voucherId: string) => {
    setVouchers((prev) => prev.filter((v) => v.id !== voucherId));
    showToast('Đã xóa mã voucher!', 'info');
  };

  // Return Handlers
  const handleApproveRefund = (returnId: string) => {
    setReturns((prev) =>
      prev.map((r) => (r.id === returnId ? { ...r, status: 'Đã hoàn tiền' } : r))
    );
    showToast('Đã xác nhận bồi hoàn thành công cho khách hàng!');
  };

  const handleRejectRefund = (returnId: string) => {
    setReturns((prev) =>
      prev.map((r) => (r.id === returnId ? { ...r, status: 'Từ chối' } : r))
    );
    showToast('Đã từ chối yêu cầu bồi hoàn.', 'info');
  };

  // Review Handlers
  const handleReplyReview = (reviewId: string, replyText: string) => {
    setReviews((prev) =>
      prev.map((rev) =>
        rev.id === reviewId
          ? {
              ...rev,
              reply: replyText,
              replyDate: 'Hôm nay'
            }
          : rev
      )
    );
    showToast('Đã đăng phản hồi cảm ơn khách hàng!');
  };

  // Ad Handlers
  const handleToggleAdStatus = (adId: string) => {
    setAds((prev) =>
      prev.map((ad) =>
        ad.id === adId
          ? {
              ...ad,
              status: ad.status === 'Đang chạy' ? 'Tạm dừng' : 'Đang chạy'
            }
          : ad
      )
    );
    showToast('Đã cập nhật trạng thái chiến dịch quảng cáo!');
  };

  const handleAddAdCampaign = (campaign: AdCampaign) => {
    setAds((prev) => [campaign, ...prev]);
    showToast(`Đã kích hoạt chiến dịch "${campaign.name}"!`);
  };

  // Settings Handlers
  const handleSaveSettings = (newSettings: StoreSettings) => {
    setSettings(newSettings);
    showToast('Đã lưu thành công cài đặt cửa hàng!');
  };

  const chatUnreadCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const returnsPendingCount = returns.filter((r) => r.status === 'Chờ xử lý').length;

  return (
    <div className="bg-[#fcf8f9] text-gray-800 antialiased min-h-screen flex selection:bg-pink-200 selection:text-pink-900 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-gray-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom duration-200">
          {toast.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        orderCount={orders.length}
        productCount={products.length}
        chatUnreadCount={chatUnreadCount}
        returnsCount={returnsPendingCount}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Wrapper */}
      <div className="flex-grow flex flex-col min-h-screen overflow-x-hidden">
        {/* Top Header */}
        <Header
          activeTab={activeTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
          onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
          onSelectTab={setActiveTab}
          onSelectOrder={(order) => setSelectedOrderForModal(order)}
          orders={orders}
          products={products}
        />

        {/* Dynamic Content Area */}
        <main className="p-4 sm:p-6 flex-grow space-y-6 max-w-7xl w-full mx-auto">
          {activeTab === 'overview' && (
            <OverviewTab
              orders={orders}
              productCount={products.length}
              onSwitchTab={setActiveTab}
              onSelectOrder={(order) => setSelectedOrderForModal(order)}
              onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
              onOpenNewProductModal={() => {
                setProductToEdit(null);
                setIsProductModalOpen(true);
              }}
            />
          )}

          {activeTab === 'orders' && (
            <OrdersTab
              orders={orders}
              onSelectOrder={(order) => setSelectedOrderForModal(order)}
              onUpdateStatus={handleUpdateOrderStatus}
              onDeleteOrder={handleDeleteOrder}
              onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
            />
          )}

          {activeTab === 'products' && (
            <ProductsTab
              products={products}
              onOpenProductModal={(prod) => {
                setProductToEdit(prod || null);
                setIsProductModalOpen(true);
              }}
              onDeleteProduct={handleDeleteProduct}
              onToggleAvailability={handleToggleProductAvailability}
            />
          )}

          {activeTab === 'chat' && (
            <ChatTab
              conversations={conversations}
              onSendMessage={handleSendMessage}
              onSelectOrderDetails={(orderId) => {
                const found = orders.find((o) => o.id === orderId);
                if (found) setSelectedOrderForModal(found);
              }}
            />
          )}

          {activeTab === 'promotions' && (
            <PromotionsTab
              vouchers={vouchers}
              onOpenVoucherModal={() => setIsVoucherModalOpen(true)}
              onToggleStatus={handleToggleVoucherStatus}
              onDeleteVoucher={handleDeleteVoucher}
            />
          )}

          {activeTab === 'returns' && (
            <ReturnsTab
              returns={returns}
              onApproveRefund={handleApproveRefund}
              onRejectRefund={handleRejectRefund}
            />
          )}

          {activeTab === 'reviews' && (
            <ReviewsTab
              reviews={reviews}
              onReplyReview={handleReplyReview}
            />
          )}

          {activeTab === 'ads' && (
            <AdsTab
              ads={ads}
              onToggleAdStatus={handleToggleAdStatus}
              onAddAdCampaign={handleAddAdCampaign}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsTab
              settings={settings}
              onSaveSettings={handleSaveSettings}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <OrderDetailsModal
        order={selectedOrderForModal}
        onClose={() => setSelectedOrderForModal(null)}
        onUpdateStatus={handleUpdateOrderStatus}
      />

      <NewOrderModal
        products={products}
        isOpen={isNewOrderModalOpen}
        onClose={() => setIsNewOrderModalOpen(false)}
        onCreateOrder={handleCreateOrder}
      />

      <ProductModal
        isOpen={isProductModalOpen}
        productToEdit={productToEdit}
        onClose={() => {
          setIsProductModalOpen(false);
          setProductToEdit(null);
        }}
        onSave={handleSaveProduct}
      />

      <VoucherModal
        isOpen={isVoucherModalOpen}
        onClose={() => setIsVoucherModalOpen(false)}
        onSave={handleSaveVoucher}
      />
    </div>
  );
}
