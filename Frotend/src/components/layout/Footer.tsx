import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 bg-logo text-white rounded-md flex items-center justify-center font-bold">P</div>
            <span className="font-extrabold text-white text-lg tracking-wider">PTTK HEALTH</span>
          </div>
          <p className="text-sm leading-relaxed mb-4">
            Hệ thống kết nối người dân với các cơ sở y tế hàng đầu Việt Nam. Hỗ trợ đặt khám nhanh, tư vấn từ xa và lấy số thứ tự trực tuyến nhanh chóng, tiện lợi.
          </p>
          <p className="text-xs">© 2026 PTTK Health. Tất cả quyền được bảo lưu.</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Dịch vụ</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Đặt khám tại cơ sở</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Đặt khám chuyên khoa</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Đặt lịch xét nghiệm</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Tư vấn từ xa</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Liên hệ</h4>
          <ul className="space-y-2 text-sm">
            <li>Hotline: <a href="tel:19002115" className="text-white hover:underline">1900 2115</a></li>
            <li>Email: support@pttkhealth.vn</li>
            <li>Địa chỉ: Quận 10, TP. Hồ Chí Minh</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
