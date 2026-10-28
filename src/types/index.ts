export type TabType = 
  | 'overview' 
  | 'orders' 
  | 'products' 
  | 'chat' 
  | 'promotions' 
  | 'returns' 
  | 'reviews' 
  | 'ads' 
  | 'settings';

export type ProductCategory = 'Hoa tươi' | 'Hoa lụa' | 'Sự kiện' | 'Phụ kiện';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
  image: string;
  stock: number;
  isAvailable: boolean;
  description?: string;
}

export type OrderStatus = 'Chờ xác nhận' | 'Đang giao' | 'Hoàn thành' | 'Đã hủy';

export interface Order {
  id: string; // e.g. BLS-8921
  customerName: string;
  customerPhone: string;
  recipientName: string;
  recipientAddress: string;
  productName: string;
  productDetails: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  paymentMethod: 'Chuyển khoản' | 'Tiền mặt khi nhận (COD)';
  note?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'customer' | 'admin';
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  customerName: string;
  customerPhone: string;
  avatarText: string;
  avatarBg: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  relatedOrder?: string;
  messages: ChatMessage[];
}

export interface Voucher {
  id: string;
  code: string;
  title: string;
  discountDisplay: string;
  discountValue: number;
  discountType: 'fixed' | 'percent';
  expiryDate: string;
  status: 'Đang hoạt động' | 'Sắp diễn ra' | 'Đã kết thúc';
  usedCount: number;
}

export interface ReturnRequest {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  reason: string;
  refundAmount: number;
  refundDisplay: string;
  status: 'Chờ xử lý' | 'Đã hoàn tiền' | 'Từ chối';
  createdAt: string;
}

export interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  productName: string;
  createdAt: string;
  reply?: string;
  replyDate?: string;
}

export interface AdCampaign {
  id: string;
  name: string;
  platform: 'Facebook' | 'Google' | 'TikTok';
  budget: number;
  spent: number;
  clicks: number;
  orders: number;
  status: 'Đang chạy' | 'Tạm dừng' | 'Đã kết thúc';
}

export interface StoreSettings {
  storeName: string;
  workshopAddress: string;
  hotline: string;
  zalo: string;
  openingHours: string;
  bankName: string;
  bankAccount: string;
  bankOwner: string;
  autoReplyMsg: string;
}
