import React, { useState } from 'react';
import { Megaphone, Plus, TrendingUp, MousePointerClick, ShoppingBag, Pause, Play, Sparkles } from 'lucide-react';
import { AdCampaign } from '../../types';

interface AdsTabProps {
  ads: AdCampaign[];
  onToggleAdStatus: (adId: string) => void;
  onAddAdCampaign: (campaign: AdCampaign) => void;
}

export const AdsTab: React.FC<AdsTabProps> = ({
  ads,
  onToggleAdStatus,
  onAddAdCampaign
}) => {
  const [showNewAdModal, setShowNewAdModal] = useState(false);
  const [name, setName] = useState('');
  const [platform, setPlatform] = useState<'Facebook' | 'Google' | 'TikTok'>('Facebook');
  const [budget, setBudget] = useState<number | ''>(1000000);

  const totalSpent = ads.reduce((acc, a) => acc + a.spent, 0);
  const totalClicks = ads.reduce((acc, a) => acc + a.clicks, 0);
  const totalOrders = ads.reduce((acc, a) => acc + a.orders, 0);

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || budget === '') return;

    const newAd: AdCampaign = {
      id: `ad-${Date.now()}`,
      name,
      platform,
      budget: Number(budget),
      spent: 0,
      clicks: 0,
      orders: 0,
      status: 'Đang chạy'
    };

    onAddAdCampaign(newAd);
    setShowNewAdModal(false);
    setName('');
    setBudget(1000000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-5">
        {/* Header */}
        <div className="flex justify-between items-center flex-wrap gap-3">
          <div>
            <h3 className="text-base font-bold text-gray-900">
              Chiến Dịch Quảng Cáo Facebook & Google Ads
            </h3>
            <p className="text-xs text-gray-500">
              Quảng bá hoa tươi giao nhanh khu vực Bình Thạnh và các tòa nhà văn phòng lân cận.
            </p>
          </div>
          <button
            onClick={() => setShowNewAdModal(true)}
            className="px-4 py-2 bg-brand-darkpink text-white rounded-xl text-xs font-bold shadow-xs hover:opacity-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            Tạo Quảng Cáo Mới
          </button>
        </div>

        {/* Aggregate Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-pink-50/40 rounded-2xl border border-pink-100/60">
            <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider block">
              Tổng Ngân Sách Đã Chi
            </span>
            <span className="text-xl font-bold text-gray-900 mt-1 block">
              {totalSpent.toLocaleString('vi-VN')} đ
            </span>
          </div>

          <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-100/60">
            <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider block">
              Lượt Nhấp Chuột (Clicks)
            </span>
            <span className="text-xl font-bold text-blue-700 mt-1 block">
              {totalClicks.toLocaleString('vi-VN')}
            </span>
          </div>

          <div className="p-4 bg-emerald-50/40 rounded-2xl border border-emerald-100/60">
            <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider block">
              Đơn Hàng Chuyển Đổi
            </span>
            <span className="text-xl font-bold text-emerald-700 mt-1 block">
              {totalOrders} đơn thành công
            </span>
          </div>
        </div>

        {/* Ad Campaign Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ads.map((ad) => (
            <div
              key={ad.id}
              className="p-5 border border-pink-100 rounded-3xl space-y-3 bg-pink-50/20 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-darkpink bg-pink-100/70 px-2 py-0.5 rounded-md">
                      {ad.platform} Ads
                    </span>
                    <h4 className="font-bold text-sm text-gray-900 mt-1.5">{ad.name}</h4>
                  </div>
                  <span
                    className={`px-2.5 py-0.5 text-[10px] font-bold rounded-full ${
                      ad.status === 'Đang chạy'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {ad.status}
                  </span>
                </div>

                <p className="text-xs text-gray-600 mt-2">
                  Ngân sách: <strong className="text-gray-900">{ad.budget.toLocaleString('vi-VN')} đ</strong> / chiến dịch
                </p>
                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-brand-darkpink h-full rounded-full"
                    style={{ width: `${Math.min(100, Math.round((ad.spent / ad.budget) * 100))}%` }}
                  />
                </div>
                <span className="text-[10px] text-gray-400 block mt-1">
                  Đã tiêu: {ad.spent.toLocaleString('vi-VN')} đ ({Math.min(100, Math.round((ad.spent / ad.budget) * 100))}%)
                </span>
              </div>

              <div className="flex justify-between items-center text-xs pt-3 border-t border-pink-50">
                <span>
                  Lượt click: <strong className="text-gray-900">{ad.clicks.toLocaleString('vi-VN')}</strong>
                </span>
                <span>
                  Đã ra đơn: <strong className="text-emerald-700">{ad.orders} đơn</strong>
                </span>
                <button
                  onClick={() => onToggleAdStatus(ad.id)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                    ad.status === 'Đang chạy'
                      ? 'bg-amber-100 hover:bg-amber-200 text-amber-800'
                      : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-800'
                  }`}
                >
                  {ad.status === 'Đang chạy' ? (
                    <>
                      <Pause className="w-3 h-3" /> Tạm dừng
                    </>
                  ) : (
                    <>
                      <Play className="w-3 h-3" /> Tiếp tục
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Ad Modal */}
      {showNewAdModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-pink-100">
            <div className="p-5 border-b border-pink-50 flex items-center justify-between">
              <h4 className="font-bold text-sm text-gray-900">Khởi Tạo Chiến Dịch Quảng Cáo Mới</h4>
              <button
                onClick={() => setShowNewAdModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateAd} className="p-5 space-y-4 text-xs">
              <div>
                <label className="font-bold text-gray-700 block mb-1">Tên Chiến Dịch (*)</label>
                <input
                  type="text"
                  required
                  placeholder="VD: Hoa Tốt Nghiệp HUTECH & UEF Bình Thạnh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 border rounded-xl focus:ring-1 focus:ring-brand-pink focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Nền Tảng</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value as any)}
                    className="w-full p-2.5 border rounded-xl bg-white focus:outline-none"
                  >
                    <option value="Facebook">Facebook Ads</option>
                    <option value="Google">Google Ads</option>
                    <option value="TikTok">TikTok Ads</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Ngân Sách (VNĐ)</label>
                  <input
                    type="number"
                    required
                    placeholder="1000000"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value ? Number(e.target.value) : '')}
                    className="w-full p-2.5 border rounded-xl font-bold focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewAdModal(false)}
                  className="px-4 py-2 rounded-xl border text-gray-600 hover:bg-gray-50"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-brand-darkpink text-white font-bold hover:opacity-95 shadow-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Kích Hoạt
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
