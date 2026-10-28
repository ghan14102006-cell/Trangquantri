import React, { useState } from 'react';
import { Star, MessageCircle, Send, CheckCircle2, Heart } from 'lucide-react';
import { Review } from '../../types';

interface ReviewsTabProps {
  reviews: Review[];
  onReplyReview: (reviewId: string, replyText: string) => void;
}

export const ReviewsTab: React.FC<ReviewsTabProps> = ({
  reviews,
  onReplyReview
}) => {
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});
  const [activeReplyId, setActiveReplyId] = useState<string | null>(null);

  const handleSendReply = (reviewId: string) => {
    const text = replyInputs[reviewId]?.trim();
    if (!text) return;
    onReplyReview(reviewId, text);
    setActiveReplyId(null);
    setReplyInputs((prev) => ({ ...prev, [reviewId]: '' }));
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-5">
        {/* Header & Rating Highlights */}
        <div className="flex justify-between items-center flex-wrap gap-4 border-b border-pink-50 pb-5">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Đánh Giá Từ Khách Hàng (Bình Thạnh)
            </h3>
            <p className="text-xs text-gray-500">
              Phản hồi thực tế từ khách mua hoa tại quầy 142/5 Điện Biên Phủ và đặt giao tận nơi.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-pink-50/60 px-4 py-2.5 rounded-2xl border border-pink-100">
            <div className="text-center">
              <span className="text-xl font-black text-brand-darkpink block leading-tight">4.9</span>
              <span className="text-[10px] text-gray-400">/ 5.0 sao</span>
            </div>
            <div className="space-y-0.5">
              <div className="flex text-amber-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-[11px] text-gray-500 font-medium block">
                128 lượt đánh giá (98% hài lòng)
              </span>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="p-4 bg-gray-50/70 rounded-2xl border border-gray-100 space-y-2 hover:bg-white hover:border-pink-100 hover:shadow-xs transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-xs text-gray-900 block">{rev.customerName}</span>
                  <span className="text-[10px] text-gray-400 font-mono">{rev.createdAt}</span>
                </div>
                <div className="flex text-amber-400 text-xs">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
              </div>

              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                "{rev.comment}"
              </p>

              <div className="flex items-center justify-between text-[11px] pt-1">
                <span className="text-gray-400">
                  Đánh giá sản phẩm: <strong className="text-brand-darkpink">{rev.productName}</strong>
                </span>

                {!rev.reply && activeReplyId !== rev.id && (
                  <button
                    onClick={() => setActiveReplyId(rev.id)}
                    className="text-brand-darkpink font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Trả lời khách
                  </button>
                )}
              </div>

              {/* Existing shop reply */}
              {rev.reply && (
                <div className="mt-2.5 p-3 bg-pink-50/80 rounded-xl border border-pink-100/70 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-brand-darkpink text-[11px]">
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>Phản hồi từ Blossom Garden ({rev.replyDate || 'Hôm nay'}):</span>
                  </div>
                  <p className="text-gray-700 text-[11px] leading-relaxed">{rev.reply}</p>
                </div>
              )}

              {/* Reply Input Form */}
              {activeReplyId === rev.id && (
                <div className="mt-3 p-3 bg-white rounded-xl border border-pink-200 space-y-2">
                  <span className="text-[11px] font-bold text-gray-700 block">
                    Gửi phản hồi cảm ơn khách hàng:
                  </span>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Cảm ơn bạn đã tin tưởng Blossom Garden Bình Thạnh..."
                      value={replyInputs[rev.id] || ''}
                      onChange={(e) =>
                        setReplyInputs({ ...replyInputs, [rev.id]: e.target.value })
                      }
                      className="flex-1 p-2 border rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-pink"
                    />
                    <button
                      onClick={() => handleSendReply(rev.id)}
                      className="px-4 py-2 bg-brand-darkpink text-white font-bold rounded-xl text-xs flex items-center gap-1 shadow-2xs hover:opacity-95 cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                      Gửi
                    </button>
                    <button
                      onClick={() => setActiveReplyId(null)}
                      className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs cursor-pointer"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
