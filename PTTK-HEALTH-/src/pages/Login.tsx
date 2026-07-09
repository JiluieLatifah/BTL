import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, PhoneCall, Check, AlertCircle } from 'lucide-react';

export const Login: React.FC = () => {
  const { bookingState, setPhoneNumber, verifyOtp } = useBooking();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(12);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Validate phone number (9 to 11 digits)
  const isPhoneValid = /^[0-9]{9,11}$/.test(phone);
  const isOtpValid = otp.length === 6;

  useEffect(() => {
    let interval: any;
    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isPhoneValid) {
      setPhoneNumber(phone);
      setStep(2);
      setTimer(12);
      setIsTimerActive(true);
      setErrorMessage('');
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isOtpValid) {
      const success = verifyOtp(otp);
      if (success) {
        // Chuyển hướng người dùng về trang danh sách phòng khám sau khi đăng nhập thành công
        if (bookingState.selectedClinic) {
          navigate('/booking');
        } else {
          navigate('/clinics');
        }
      } else {
        setErrorMessage('Mã OTP không đúng. Vui lòng kiểm tra lại!');
      }
    }
  };

  const startResendTimer = () => {
    setTimer(12);
    setIsTimerActive(true);
    setOtp('');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Column - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-16 relative">
        {/* Back Button */}
        <div>
          <button
            onClick={() => step === 2 ? setStep(1) : navigate(-1)}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors inline-flex items-center gap-1 text-sm font-semibold"
          >
            <ArrowLeft size={18} />
            <span>Quay lại</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto my-auto py-12">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <div className="h-10 w-10 bg-logo text-white rounded-lg flex items-center justify-center font-bold text-xl">P</div>
            <span className="font-extrabold text-2xl tracking-wider text-logo">PTTK</span>
            <span className="text-xs bg-radiant-light text-radiant-dark border border-radiant/25 px-2 py-0.5 rounded font-bold">Đặt khám nhanh</span>
          </div>

          {step === 1 ? (
            /* Step 1: Phone input */
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Đăng nhập tài khoản</h2>
                <p className="text-sm text-gray-500">Nhập số điện thoại để tạo tài khoản hoặc đăng nhập hệ thống.</p>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">Số điện thoại</label>
                <div className="flex rounded-xl border border-gray-300 focus-within:border-radiant focus-within:ring-2 focus-within:ring-radiant/20 overflow-hidden shadow-sm transition-all">
                  <div className="bg-gray-50 border-r border-gray-300 px-4 py-3 flex items-center gap-1 text-gray-600 font-semibold select-none">
                    <span>🇻🇳</span>
                    <span>+84</span>
                  </div>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Nhập số điện thoại (ví dụ: 912345678)"
                    className="w-full px-4 py-3 text-gray-800 focus:outline-none font-medium"
                    maxLength={10}
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!isPhoneValid}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-md transition-all duration-300 ${
                  isPhoneValid
                    ? 'bg-radiant hover:bg-radiant-dark active:scale-[0.98]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Tiếp tục
              </button>
            </form>
          ) : (
            /* Step 2: OTP input */
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-gray-900">Nhập mã OTP</h2>
                <p className="text-sm text-gray-500">Mã xác thực đã được gửi đến số điện thoại:</p>
                <div className="font-bold text-gray-800 bg-gray-50 border border-gray-100 rounded-lg py-2 px-3 inline-block select-none">
                  🇻🇳 +84 {phone}
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-bold text-gray-700">Mã OTP (6 chữ số)</label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="Nhập 6 chữ số (Mẫu: 123456)"
                  className="w-full px-4 py-3.5 rounded-xl border border-gray-300 focus:border-radiant focus:ring-2 focus:ring-radiant/20 focus:outline-none text-center tracking-[0.5em] font-extrabold text-xl shadow-sm transition-all"
                  maxLength={6}
                  autoFocus
                />
              </div>

              {errorMessage && (
                <div className="flex items-center gap-2 text-rose-600 bg-rose-50 border border-rose-100 rounded-xl p-3 text-sm font-semibold">
                  <AlertCircle size={18} />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Không nhận được mã?</span>
                {isTimerActive ? (
                  <span className="text-radiant font-bold">Gửi lại mã sau ({timer}s)</span>
                ) : (
                  <button
                    type="button"
                    onClick={startResendTimer}
                    className="text-radiant hover:text-radiant-dark font-extrabold hover:underline"
                  >
                    Gửi lại mã
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={!isOtpValid}
                className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-md transition-all duration-300 ${
                  isOtpValid
                    ? 'bg-radiant hover:bg-radiant-dark active:scale-[0.98]'
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Xác thực & Đăng nhập
              </button>
            </form>
          )}
        </div>

        {/* Footer Support Info */}
        <div className="flex items-center justify-center gap-2 text-gray-500 text-sm border-t border-gray-100 pt-6">
          <PhoneCall size={16} />
          <span>Gặp khó khăn? Gọi hỗ trợ:</span>
          <a href="tel:19002115" className="text-radiant font-bold hover:underline">1900 2115</a>
        </div>
      </div>

      {/* Right Column - Image Placeholder */}
      <div className="hidden lg:block lg:w-1/2 relative bg-rose-950">
        {/* User will add login.png here */}
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-950 via-[#c77890] to-[#dc91a8] flex flex-col justify-center items-center px-12 text-center text-white">
          <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-pink-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4.828 21l-.02.02-.021-.02H4.828z" />
              <path d="M19 16c1.657 0 3-1.343 3-3V6c0-1.657-1.343-3-3-3H5C3.343 3 2 4.343 2 6v7c0 1.657 1.343 3 3 3h14z" />
              <path d="M12 8v4M10 10h4" />
            </svg>
          </div>
          <h2 className="text-3xl font-extrabold mb-4 tracking-tight">Hệ Thống Đặt Lịch Khám Bệnh</h2>
          <p className="text-pink-100/80 max-w-md leading-relaxed text-sm">
            Nhanh chóng, tiện lợi, tiết kiệm thời gian chờ đợi. Trải nghiệm dịch vụ chăm sóc sức khỏe hiện đại và đáng tin cậy.
          </p>
        </div>
      </div>
    </div>
  );
};
