import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft, CreditCard, ShieldCheck } from 'lucide-react';

export const Payment: React.FC = () => {
  const { bookingState, selectPayment } = useBooking();
  const navigate = useNavigate();

  // If no consultation is selected, redirect to clinics list
  if (!bookingState.selectedClinic || !bookingState.service) {
    React.useEffect(() => {
      navigate('/clinics');
    }, []);
    return null;
  }

  const amount = bookingState.service.price;
  const invoiceId = '#106515'; // Mã hóa đơn khớp với thiết kế thanh_toan.png

  const [paymentMethod, setPaymentMethod] = useState<'MoMo' | 'ZaloPay' | 'VNPAY'>('MoMo');

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    selectPayment(paymentMethod);

    if (paymentMethod === 'MoMo') {
      navigate('/momo-pay');
    } else {
      alert(`Đang kết nối tới cổng thanh toán ${paymentMethod}...`);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Column - Payment Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 md:p-16 relative">
        {/* Back Button */}
        <div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors inline-flex items-center gap-1 text-sm font-semibold"
          >
            <ArrowLeft size={18} />
            <span>Quay lại</span>
          </button>
        </div>

        {/* Form Container */}
        <div className="max-w-md w-full mx-auto my-auto py-12">
          {/* Header Title */}
          <div className="space-y-2 mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Thanh toán hóa đơn</h2>
            <p className="text-sm text-gray-500">Vui lòng chọn phương thức thanh toán phù hợp bên dưới.</p>
          </div>

          {/* Invoice Summary Card */}
          <div className="bg-gray-50 rounded-2xl border border-gray-100 p-5 mb-6 flex justify-between items-center">
            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase">Mã hóa đơn</span>
              <span className="font-bold text-gray-800 text-lg">{invoiceId}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-400 font-semibold block uppercase">Cần thanh toán</span>
              <span className="font-extrabold text-gray-900 text-xl">{amount.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>

          {/* Payment Methods Selection Form */}
          <form onSubmit={handlePaymentSubmit} className="space-y-6">
            <div className="space-y-3">
              <label className="block text-sm font-bold text-gray-700">Chọn phương thức thanh toán</label>
              
              {/* MoMo Option */}
              <label
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'MoMo'
                    ? 'border-momo bg-momo-light/35'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="MoMo"
                    checked={paymentMethod === 'MoMo'}
                    onChange={() => setPaymentMethod('MoMo')}
                    className="text-momo focus:ring-momo h-4 w-4"
                  />
                  <div className="flex items-center gap-2">
                    {/* MoMo logo mini placeholder */}
                    <div className="h-8 w-8 bg-momo text-white rounded-lg flex items-center justify-center font-bold text-xs">M</div>
                    <span className="font-bold text-sm text-gray-800">Ví điện tử MoMo</span>
                  </div>
                </div>
                <span className="text-xs bg-momo text-white font-bold px-2 py-0.5 rounded-full scale-90">Mặc định</span>
              </label>

              {/* ZaloPay Option */}
              <label
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'ZaloPay'
                    ? 'border-blue-500 bg-blue-50/20'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="ZaloPay"
                    checked={paymentMethod === 'ZaloPay'}
                    onChange={() => setPaymentMethod('ZaloPay')}
                    className="text-blue-500 focus:ring-blue-500 h-4 w-4"
                  />
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-blue-500 text-white rounded-lg flex items-center justify-center font-bold text-xs">Z</div>
                    <span className="font-bold text-sm text-gray-800">Ví điện tử ZaloPay</span>
                  </div>
                </div>
              </label>

              {/* VNPAY Option */}
              <label
                className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${
                  paymentMethod === 'VNPAY'
                    ? 'border-red-500 bg-red-50/20'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="payment"
                    value="VNPAY"
                    checked={paymentMethod === 'VNPAY'}
                    onChange={() => setPaymentMethod('VNPAY')}
                    className="text-red-500 focus:ring-red-500 h-4 w-4"
                  />
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 bg-red-600 text-white rounded-lg flex items-center justify-center font-bold text-xs">V</div>
                    <span className="font-bold text-sm text-gray-800">Cổng thanh toán VNPAY QR</span>
                  </div>
                </div>
              </label>
            </div>

            {/* Dynamic Payment Action Button */}
            <button
              type="submit"
              className={`w-full py-4 px-4 rounded-xl font-bold text-white shadow-md transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 ${
                paymentMethod === 'MoMo'
                  ? 'bg-momo hover:bg-momo-dark'
                  : paymentMethod === 'ZaloPay'
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              <CreditCard size={18} />
              <span>Thanh toán hóa đơn: {amount.toLocaleString('vi-VN')}đ</span>
            </button>
          </form>
        </div>

        {/* Security badge footer */}
        <div className="flex items-center justify-center gap-2 text-gray-400 text-xs border-t border-gray-100 pt-6">
          <ShieldCheck size={16} className="text-emerald-500" />
          <span>Thông tin thanh toán được mã hóa & bảo mật tuyệt đối.</span>
        </div>
      </div>

      {/* Right Column - Brand image container */}
      <div className="hidden lg:block lg:w-1/2 relative bg-gray-50">
        <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 to-gray-800 flex flex-col justify-center items-center px-12 text-center text-white">
          <div className="h-16 w-16 bg-white/10 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md">
            <ShieldCheck size={40} className="text-emerald-400" />
          </div>
          <h2 className="text-3xl font-extrabold mb-4 tracking-tight">Cổng Thanh Toán Điện Tử</h2>
          <p className="text-gray-300 max-w-sm leading-relaxed text-sm">
            Kết nối trực tiếp tới các cổng thanh toán uy tín và bảo mật bậc nhất. Hỗ trợ thanh toán nhanh bằng mã QR.
          </p>
        </div>
      </div>
    </div>
  );
};
