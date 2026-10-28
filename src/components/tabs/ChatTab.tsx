import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  User, 
  Phone, 
  MapPin, 
  Clock, 
  Sparkles, 
  Image as ImageIcon,
  CheckCheck,
  Search,
  Info,
  X
} from 'lucide-react';
import { Conversation, ChatMessage } from '../../types';

interface ChatTabProps {
  conversations: Conversation[];
  onSendMessage: (conversationId: string, text: string) => void;
  onSelectOrderDetails?: (orderId: string) => void;
}

export const ChatTab: React.FC<ChatTabProps> = ({
  conversations,
  onSendMessage,
  onSelectOrderDetails
}) => {
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || 'conv-1');
  const [inputText, setInputText] = useState('');
  const [showCustomerDrawer, setShowCustomerDrawer] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeConvId) || conversations[0];

  const quickReplies = [
    'Dạ hoa tươi bên em giao hỏa tốc Bình Thạnh trong 30 phút ạ!',
    'Em gửi chị xem ảnh chụp hoa thực tế trước khi shipper đi giao nhé ạ!',
    'Dạ mẫu này bên em đang có sẵn hoa tươi nhập mới sáng nay ạ ❤️',
    'Dạ chi nhánh có tặng kèm thiệp viết tay và nơ ruy băng Hàn Quốc miễn phí ạ.'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim() || !activeConversation) return;

    onSendMessage(activeConversation.id, text.trim());
    if (!textToSend) setInputText('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl border border-pink-100 shadow-xs overflow-hidden flex flex-col md:flex-row h-[620px] relative">
        {/* Left: Conversations list */}
        <div className="w-full md:w-80 border-r border-pink-100 flex flex-col bg-gray-50/50">
          <div className="p-4 border-b border-pink-50 font-bold text-sm text-gray-800 flex items-center justify-between">
            <span>Hộp thư hỗ trợ trực tuyến</span>
            <span className="text-[11px] bg-pink-100 text-brand-darkpink font-semibold px-2 py-0.5 rounded-full">
              {conversations.length} hội thoại
            </span>
          </div>

          <div className="overflow-y-auto flex-grow divide-y divide-gray-100">
            {conversations.map((conv) => {
              const isSelected = conv.id === activeConvId;
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`p-3.5 cursor-pointer flex gap-3 items-center transition-all ${
                    isSelected
                      ? 'bg-pink-50/90 border-l-4 border-brand-darkpink shadow-2xs'
                      : 'hover:bg-gray-100/70'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${conv.avatarBg}`}
                  >
                    {conv.avatarText}
                  </div>
                  <div className="flex-grow overflow-hidden">
                    <div className="flex justify-between items-center">
                      <h6 className="font-bold text-xs text-gray-900 truncate">
                        {conv.customerName}
                      </h6>
                      <span className="text-[10px] text-gray-400 shrink-0 ml-1">
                        {conv.time}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-500 truncate mt-0.5">
                      {conv.lastMessage}
                    </p>
                  </div>
                  {conv.unreadCount > 0 && (
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 shrink-0 animate-pulse"></span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Active conversation area */}
        {activeConversation ? (
          <div className="flex-grow flex flex-col justify-between bg-white relative">
            {/* Chat header */}
            <div className="p-4 border-b border-pink-50 flex items-center justify-between bg-white/95 backdrop-blur-xs z-10">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${activeConversation.avatarBg}`}
                >
                  {activeConversation.avatarText}
                </div>
                <div>
                  <h6 className="font-bold text-xs text-gray-900 flex items-center gap-1.5">
                    {activeConversation.customerName}
                    <span className="text-[10px] text-emerald-600 font-normal inline-flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Đang hoạt động
                    </span>
                  </h6>
                  <span className="text-[10px] text-gray-400">
                    SĐT: {activeConversation.customerPhone}{' '}
                    {activeConversation.relatedOrder && (
                      <span className="text-brand-darkpink font-semibold ml-1">
                        • Quan tâm đơn: {activeConversation.relatedOrder}
                      </span>
                    )}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowCustomerDrawer(!showCustomerDrawer)}
                className="text-xs text-brand-darkpink font-semibold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Info className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Xem thông tin khách hàng</span>
              </button>
            </div>

            {/* Messages body */}
            <div className="p-4 overflow-y-auto flex-grow space-y-3 bg-gray-50/30 text-xs">
              <div className="text-center my-2">
                <span className="text-[10px] bg-pink-50 text-gray-400 px-3 py-1 rounded-full">
                  Tin nhắn mã hóa bảo mật từ tiệm hoa Blossom Garden Bình Thạnh
                </span>
              </div>

              {activeConversation.messages.map((msg) => {
                const isAdmin = msg.sender === 'admin';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2 max-w-md ${
                      isAdmin ? 'ml-auto flex-row-reverse' : ''
                    }`}
                  >
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 ${
                        isAdmin
                          ? 'bg-brand-darkpink text-white'
                          : activeConversation.avatarBg
                      }`}
                    >
                      {isAdmin ? 'NV' : activeConversation.avatarText}
                    </div>
                    <div
                      className={`p-3 rounded-2xl shadow-2xs space-y-1 ${
                        isAdmin
                          ? 'bg-pink-100 text-gray-800 rounded-tr-none'
                          : 'bg-white border border-gray-100 rounded-tl-none'
                      }`}
                    >
                      <p className="leading-relaxed">{msg.text}</p>
                      <div
                        className={`text-[9px] flex items-center gap-1 ${
                          isAdmin
                            ? 'text-brand-darkgreen justify-end'
                            : 'text-gray-400 justify-start'
                        }`}
                      >
                        <span>{msg.time}</span>
                        {isAdmin && <CheckCheck className="w-3 h-3 text-brand-darkgreen" />}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies chips */}
            <div className="px-4 py-2 border-t border-pink-50 bg-pink-50/20 overflow-x-auto flex gap-1.5 scrollbar-none">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider self-center whitespace-nowrap mr-1">
                Trả lời nhanh:
              </span>
              {quickReplies.map((qr, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(qr)}
                  className="text-[11px] px-2.5 py-1 rounded-xl bg-white border border-pink-100 hover:border-brand-darkpink text-gray-700 hover:text-brand-darkpink whitespace-nowrap transition-colors shadow-2xs cursor-pointer"
                >
                  {qr}
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className="p-3 border-t border-gray-100 flex items-center gap-2 bg-white">
              <input
                type="text"
                placeholder="Nhập tin nhắn phản hồi khách hàng (Enter để gửi)..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-grow p-2.5 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-pink"
              />
              <button
                onClick={() => handleSend()}
                className="px-5 py-2.5 bg-brand-darkpink hover:opacity-95 text-white font-bold rounded-xl text-xs shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Gửi</span>
              </button>
            </div>

            {/* Customer Info Drawer (Modal on the right) */}
            {showCustomerDrawer && (
              <div className="absolute top-0 right-0 bottom-0 w-72 bg-white border-l border-pink-100 shadow-xl p-5 z-20 overflow-y-auto animate-in slide-in-from-right duration-200 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-pink-50 mb-4">
                  <h5 className="font-bold text-gray-900 text-sm">Hồ Sơ Khách Hàng</h5>
                  <button
                    onClick={() => setShowCustomerDrawer(false)}
                    className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="text-center py-2">
                    <div
                      className={`w-14 h-14 mx-auto rounded-full flex items-center justify-center font-bold text-base mb-2 ${activeConversation.avatarBg}`}
                    >
                      {activeConversation.avatarText}
                    </div>
                    <h6 className="font-bold text-sm text-gray-900">
                      {activeConversation.customerName}
                    </h6>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      Khách hàng thân thiết VIP
                    </span>
                  </div>

                  <div className="p-3 bg-gray-50 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-3.5 h-3.5 text-brand-darkpink" />
                      <span className="font-mono">{activeConversation.customerPhone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-3.5 h-3.5 text-brand-darkgreen" />
                      <span>Quận Bình Thạnh, TP.HCM</span>
                    </div>
                  </div>

                  {activeConversation.relatedOrder && (
                    <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100 space-y-1">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        Đơn hàng đang xử lý
                      </span>
                      <p className="font-mono font-bold text-brand-darkpink">
                        {activeConversation.relatedOrder}
                      </p>
                      <button
                        onClick={() => {
                          if (onSelectOrderDetails && activeConversation.relatedOrder) {
                            onSelectOrderDetails(activeConversation.relatedOrder);
                          }
                        }}
                        className="text-[11px] text-brand-darkpink font-semibold hover:underline block pt-1"
                      >
                        Mở chi tiết đơn hàng & VietQR →
                      </button>
                    </div>
                  )}

                  <div className="pt-2 text-[11px] text-gray-500 space-y-1">
                    <p>• Tổng chi tiêu: <strong>2.850.000 đ</strong></p>
                    <p>• Số lần đặt hoa: <strong>4 lần</strong></p>
                    <p>• Sở thích: Hoa tươi tone hồng pastel, bọc giấy mờ</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center text-gray-400 text-xs">
            Chọn một cuộc hội thoại để bắt đầu nhắn tin.
          </div>
        )}
      </div>
    </div>
  );
};
