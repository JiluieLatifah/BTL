import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, Loader2 } from 'lucide-react';
import OtpInput from 'react-otp-input';
import toast from 'react-hot-toast';

export const Login: React.FC = () => {
  const { bookingState, setPhoneNumber, verifyOtp } = useBooking();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const isPhoneValid = phone.length >= 9 && phone.length <= 10;
  const isOtpValid = otp.length === 6;

  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isPhoneValid || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone }),
      });

      if (response.ok) {
        setPhoneNumber(phone);
        setStep(2);
        toast.success("Mã OTP đã được gửi đến điện thoại của bạn!");
      } else {
        const errorData = await response.json().catch(() => ({}));
        toast.error(errorData.detail || 'Không thể gửi mã OTP.');
      }
    } catch (error) {
      toast.error('Lỗi kết nối tới máy chủ.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isOtpValid || isLoading) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone_number: phone, otp: otp }),
      });

      const data = await response.json();

      if (response.ok) {
        // Kiểm tra xem là người dùng mới (Đăng ký) hay cũ (Đăng nhập)
        const isNew = data.is_new_user === true;
        toast.success(isNew ? "Đăng ký thành công!" : "Đăng nhập thành công!");
        
        // Gọi hàm xác thực từ Context
        verifyOtp(otp, isNew);
        
        // Chuyển hướng
        navigate(bookingState.selectedClinic ? '/booking' : '/clinics');
      } else {
        toast.error(data.detail || 'Mã OTP không chính xác!');
      }
    } catch (error) {
      toast.error('Không thể xác thực. Vui lòng kiểm tra lại kết nối.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-16 relative">
        <button
          onClick={() => step === 2 ? setStep(1) : navigate(-1)}
          disabled={isLoading}
          className="p-2 text-gray-500 hover:text-gray-800 rounded-full transition-colors inline-flex items-center gap-1 text-sm font-semibold disabled:opacity-50"
        >
          <ArrowLeft size={18} /> <span>Quay lại</span>
        </button>

        <div className="max-w-md w-full mx-auto my-auto py-12">
          <div className="flex items-center gap-2 mb-8">
            <div className="h-10 w-10 bg-logo text-white rounded-lg flex items-center justify-center font-bold text-xl">P</div>
            <span className="font-extrabold text-2xl tracking-wider text-logo">PTTK</span>
          </div>

          {step === 1 ? (
            <form onSubmit={handlePhoneSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Đăng nhập / Đăng ký</h2>
              
              <div className="flex items-center w-full px-4 py-3 rounded-xl border border-gray-300 focus-within:border-medical focus-within:ring-2 focus-within:ring-medical/20 transition-all shadow-sm">
                <span className="font-bold text-gray-500 border-r border-gray-200 pr-3 mr-3 whitespace-nowrap">VN +84</span>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, '');
                      if (val.length <= 10) setPhone(val);
                  }}
                  placeholder="0912 345 678"
                  className="w-full outline-none font-medium text-gray-900"
                  maxLength={10}
                />
              </div>

              <button type="submit" disabled={!isPhoneValid || isLoading} className="w-full py-3.5 bg-medical text-white rounded-xl font-bold hover:bg-rose-600 transition-all shadow-md">
                {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Tiếp tục"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900">Nhập mã OTP</h2>
              <p className="text-sm text-gray-500">Mã xác thực đã được gửi đến số điện thoại: <span className="font-bold text-gray-900">0{phone.slice(1)}</span></p>
              
              <div className="flex justify-center">
                <OtpInput
                  value={otp}
                  onChange={(val: string) => setOtp(val.replace(/\D/g, ''))}
                  numInputs={6}
                  renderSeparator={<span className="w-2"></span>}
                  renderInput={(props) => (
                    <input
                      {...props}
                      className="w-12 h-14 text-center text-xl font-bold border-2 border-gray-200 rounded-xl focus:border-medical focus:outline-none transition-all shadow-sm"
                    />
                  )}
                />
              </div>

              <button type="submit" disabled={!isOtpValid || isLoading} className="w-full py-3.5 bg-medical text-white rounded-xl font-bold hover:bg-rose-600 transition-all shadow-md">
                {isLoading ? <Loader2 className="animate-spin mx-auto" /> : "Xác thực & Đăng nhập"}
              </button>
            </form>
          )}
        </div>
      </div>
      
      <div className="hidden lg:block lg:w-1/2 relative bg-rose-950">
        <div className="absolute inset-0 bg-gradient-to-tr from-rose-950 to-[#dc91a8] flex flex-col justify-center items-center text-white p-12 text-center">
          <h2 className="text-3xl font-extrabold mb-4">Hệ Thống Đặt Lịch Khám Bệnh</h2>
          <p className="text-pink-100/80 text-sm">Nhanh chóng, tiện lợi, tiết kiệm thời gian chờ đợi.</p>
        </div>
      </div>
    </div>
  );
};