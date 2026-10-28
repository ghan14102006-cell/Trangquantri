import React, { useState } from 'react';
import { Save, Store, MapPin, Phone, Clock, CreditCard, MessageSquare, CheckCircle } from 'lucide-react';
import { StoreSettings } from '../../types';

interface SettingsTabProps {
  settings: StoreSettings;
  onSaveSettings: (settings: StoreSettings) => void;
}

export const SettingsTab: React.FC<SettingsTabProps> = ({
  settings,
  onSaveSettings
}) => {
  const [formData, setFormData] = useState<StoreSettings>({ ...settings });
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-150">
      <div className="bg-white p-6 rounded-3xl border border-pink-100 shadow-xs space-y-5 max-w-2xl">
        <div className="flex justify-between items-center pb-2 border-b border-pink-50">
          <div>
            <h3 className="text-base font-bold text-gray-900">Cài Đặt Thông Tin Chi Nhánh</h3>
            <p className="text-xs text-gray-500">
              Cập nhật thông tin liên hệ, xưởng cắm hoa và tài khoản VietQR nhận tiền của chi nhánh.
            </p>
          </div>
          {showSavedToast && (
            <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1.5 animate-in fade-in">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              Đã lưu thành công!
            </span>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 flex items-center gap-1.5 mb-1">
              <Store className="w-3.5 h-3.5 text-brand-darkpink" />
              Tên cửa hàng:
            </label>
            <input
              type="text"
              required
              value={formData.storeName}
              onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-brand-pink focus:outline-none"
            />
          </div>

          <div>
            <label className="font-bold text-gray-700 flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-brand-darkgreen" />
              Địa chỉ xưởng cắm hoa & nhận hàng:
            </label>
            <input
              type="text"
              required
              value={formData.workshopAddress}
              onChange={(e) => setFormData({ ...formData, workshopAddress: e.target.value })}
              className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-brand-pink focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 flex items-center gap-1.5 mb-1">
                <Phone className="w-3.5 h-3.5 text-brand-darkpink" />
                Hotline nhận đơn:
              </label>
              <input
                type="text"
                required
                value={formData.hotline}
                onChange={(e) => setFormData({ ...formData, hotline: e.target.value })}
                className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-brand-pink focus:outline-none"
              />
            </div>
            <div>
              <label className="font-bold text-gray-700 flex items-center gap-1.5 mb-1">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                Giờ mở cửa phục vụ:
              </label>
              <input
                type="text"
                value={formData.openingHours}
                onChange={(e) => setFormData({ ...formData, openingHours: e.target.value })}
                className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-brand-pink focus:outline-none"
              />
            </div>
          </div>

          {/* VietQR Bank Account Settings */}
          <div className="p-4 bg-pink-50/40 rounded-2xl border border-pink-100 space-y-3">
            <div className="flex items-center gap-1.5 font-bold text-gray-800 text-xs">
              <CreditCard className="w-4 h-4 text-brand-darkpink" />
              <span>Tài Khoản Nhận Tiền VietQR MBBank</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-gray-600 block mb-1 font-medium">Ngân hàng:</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none"
                />
              </div>
              <div>
                <label className="text-gray-600 block mb-1 font-medium">Số tài khoản:</label>
                <input
                  type="text"
                  value={formData.bankAccount}
                  onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                  className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs font-mono font-bold text-brand-darkpink focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="text-gray-600 block mb-1 font-medium">Tên chủ tài khoản:</label>
              <input
                type="text"
                value={formData.bankOwner}
                onChange={(e) => setFormData({ ...formData, bankOwner: e.target.value })}
                className="w-full p-2 bg-white border border-gray-200 rounded-xl text-xs uppercase font-bold focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 flex items-center gap-1.5 mb-1">
              <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
              Tin nhắn tự động phản hồi nhanh:
            </label>
            <textarea
              rows={2}
              value={formData.autoReplyMsg}
              onChange={(e) => setFormData({ ...formData, autoReplyMsg: e.target.value })}
              className="w-full p-2.5 border border-gray-200 rounded-xl focus:ring-1 focus:ring-brand-pink focus:outline-none"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="px-6 py-2.5 bg-brand-darkpink text-white font-bold rounded-xl text-xs shadow-xs hover:opacity-95 flex items-center gap-2 cursor-pointer transition-all"
            >
              <Save className="w-4 h-4" />
              Lưu Thay Đổi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
