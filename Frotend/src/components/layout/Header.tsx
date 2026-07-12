import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { Phone, User, LogOut, Star } from 'lucide-react';
import { ReviewModal } from './ReviewModal';

export const Header: React.FC = () => {
  const { bookingState, logout } = useBooking();
  const navigate = useNavigate();
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  
  const isLoggedIn = bookingState.user?.isLoggedIn;
  const phoneNumber = bookingState.user?.phoneNumber;

  const handleAuthClick = () => {
    if (isLoggedIn) {
      if (confirm('Bạn có muốn đăng xuất tài khoản này?')) {
        logout();
        navigate('/');
      }
    } else {
      navigate('/login');
    }
  };

  // Logic kiểm tra đăng nhập trước khi mở Modal đánh giá
  const handleReviewClick = () => {
    if (isLoggedIn) {
      setIsReviewOpen(true);
    } else {
      alert('Vui lòng đăng nhập để thực hiện đánh giá dịch vụ!');
      navigate('/login');
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      {/* Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        {/* Left Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 bg-logo text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-sm">
              P
            </div>
            <span className="font-extrabold text-xl tracking-wider bg-gradient-to-r from-logo to-radiant bg-clip-text text-transparent">
              PTTK
            </span>
          </Link>
        </div>

        {/* Middle Social Icons */}
        <div className="hidden md:flex items-center gap-4 text-gray-400">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mr-2">Kết nối:</span>
          <a href="#" className="hover:text-medical transition-colors text-sm font-medium">TikTok</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-medical transition-colors text-sm font-medium">Zalo</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-medical transition-colors text-sm font-medium">Facebook</a>
          <span className="text-gray-200">|</span>
          <a href="#" className="hover:text-medical transition-colors text-sm font-medium">YouTube</a>
        </div>

        {/* Right Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-1.5 text-sm font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            Tải ứng dụng
          </button>
          
          {/* Nút Đánh giá với Logic kiểm tra đăng nhập */}
          <button
            onClick={handleReviewClick}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-gray-600 hover:text-medical transition-colors"
          >
            <Star size={16} />
            <span>Đánh giá</span>
          </button>
          
          <button
            onClick={handleAuthClick}
            className="flex items-center gap-2 px-4 py-1.5 text-sm font-medium text-white bg-medical rounded-full hover:bg-medical-dark shadow-sm transition-all"
          >
            <User size={16} />
            <span>{isLoggedIn ? `SĐT: ${phoneNumber}` : 'Tài khoản'}</span>
            {isLoggedIn && <LogOut size={14} className="ml-1" />}
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="bg-gray-50 border-t border-gray-100 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-gray-600">
            <Link to="/clinics" className="hover:text-medical transition-colors">Cơ sở y tế</Link>
            <a href="#" className="hover:text-medical transition-colors">Dịch vụ y tế</a>
            <a href="#" className="hover:text-medical transition-colors text-center">Khám doanh nghiệp</a>
            <a href="#" className="hover:text-medical transition-colors">Tin tức</a>
            <a href="#" className="hover:text-medical transition-colors">Hướng dẫn</a>
            <a href="#" className="hover:text-medical transition-colors">Liên hệ hợp tác</a>
          </nav>

          <a
            href="tel:19002115"
            className="flex items-center gap-2 bg-medical text-white font-bold px-5 py-2 rounded-full shadow-md hover:bg-medical-dark hover:scale-105 transition-all text-sm animate-pulse"
          >
            <Phone size={16} className="fill-current" />
            <span>TƯ VẤN & ĐẶT KHÁM: 1900 2115</span>
          </a>
        </div>
      </div>

      {/* Modal Đánh giá */}
      <ReviewModal 
        isOpen={isReviewOpen} 
        onClose={() => setIsReviewOpen(false)} 
        appointmentId="GENERAL-FEEDBACK" 
      />
    </header>
  );
};