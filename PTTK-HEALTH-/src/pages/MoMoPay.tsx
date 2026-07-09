import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { ShieldCheck, Info, CheckCircle2, RotateCw } from 'lucide-react';

export const MoMoPay: React.FC = () => {
  const { bookingState, generateTicket } = useBooking();
  const navigate = useNavigate();

  // If no service is selected, redirect to clinics list
  if (!bookingState.selectedClinic || !bookingState.service) {
    React.useEffect(() => {
      navigate('/clinics');
    }, []);
    return null;
  }

  const amount = bookingState.service.price;
  const merchantName = "Doanh nghiệp cung cấp dịch vụ khám sức khỏe PTTK";
  const orderId = "140171002454595";

  // Status state: 'scanning' | 'success'
  const [status, setStatus] = useState<'scanning' | 'success'>('scanning');
  const [timer, setTimer] = useState(600); // 10 minutes in seconds

  // Countdown timer for scanning phase
  useEffect(() => {
    if (status !== 'scanning') return;

    const interval = setInterval(() => {
      setTimer(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  // Format time (MM:SS)
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Simulate scanning - auto redirect after 6 seconds to success screen
  useEffect(() => {
    if (status !== 'scanning') return;

    const scanTimeout = setTimeout(() => {
      setStatus('success');
    }, 6000);

    return () => clearTimeout(scanTimeout);
  }, [status]);

  // Simulate success redirect - auto redirect back to clinic app ticket details after 3 seconds
  useEffect(() => {
    if (status !== 'success') return;

    const successTimeout = setTimeout(() => {
      handleFinalize();
    }, 4000);

    return () => clearTimeout(successTimeout);
  }, [status]);

  const handleFinalize = () => {
    generateTicket();
    navigate('/ticket-detail');
  };

  return (
    <div className="min-h-screen bg-[#F3F4F6] flex flex-col font-sans">
      {/* MoMo Gateways Header */}
      <header className="bg-[#A50064] text-white shadow-sm py-4 px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-white text-[#A50064] rounded-xl flex items-center justify-center font-extrabold text-xl shadow-md">
            M
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-wide uppercase">Cổng Thanh Toán MoMo</h1>
            <p className="text-[10px] text-pink-200 uppercase tracking-widest font-semibold">Giả lập thanh toán an toàn</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs bg-black/10 px-3 py-1 rounded-full font-semibold border border-white/10 text-pink-100">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>PCI-DSS Secured</span>
        </div>
      </header>

      {/* Simulator bar helper */}
      <div className="bg-amber-500 text-white text-xs font-bold text-center py-2 px-4 shadow-inner flex items-center justify-center gap-2">
        <RotateCw size={12} className="animate-spin" />
        {status === 'scanning' ? (
          <span>[GIẢ LẬP]: Đang chờ người dùng quét mã. Hệ thống sẽ tự động quét thành công sau 6 giây...</span>
        ) : (
          <span>[GIẢ LẬP]: Thanh toán thành công! Sẽ tự động chuyển hướng về trang bệnh viện sau 4 giây...</span>
        )}
      </div>

      {status === 'scanning' ? (
        /* MÀN HÌNH 7: CỔNG THANH TOÁN MOMO QR CODE (Scanning) */
        <main className="max-w-5xl mx-auto w-full px-4 py-8 md:py-12 flex-grow flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden w-full grid grid-cols-1 md:grid-cols-2">
            
            {/* Left Column: Invoice Info */}
            <div className="p-8 md:p-12 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Nhà cung cấp</h2>
                  <p className="font-bold text-gray-800 text-sm leading-snug">{merchantName}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Mã đơn hàng</h2>
                    <p className="font-bold text-gray-800 text-sm">{orderId}</p>
                  </div>
                  <div>
                    <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Số tiền</h2>
                    <p className="font-extrabold text-[#A50064] text-lg">{amount.toLocaleString('vi-VN')}đ</p>
                  </div>
                </div>
              </div>

              {/* Timer info */}
              <div className="mt-12 bg-pink-50 border border-pink-100/50 rounded-2xl p-5 flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-pink-100 flex items-center justify-center text-[#A50064] font-bold text-lg">
                  {formatTime(timer).split(':')[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm">Giao dịch sẽ hết hạn sau</h3>
                  <p className="text-xs text-gray-500 font-medium">Vui lòng quét mã trước khi thời gian về <span className="text-[#A50064] font-bold">{formatTime(timer)}</span></p>
                </div>
              </div>
            </div>

            {/* Right Column: QR Code scanning area */}
            <div className="p-8 md:p-12 flex flex-col items-center justify-center text-center">
              <div className="bg-white p-4 rounded-3xl border-2 border-dashed border-pink-200/60 shadow-inner mb-6">
                {/* CSS Based QR Code representation */}
                <div className="w-48 h-48 bg-gray-900 rounded-xl relative p-2 flex flex-wrap items-center justify-center">
                  <div className="absolute w-8 h-8 bg-white top-2 left-2 rounded-md flex items-center justify-center border-4 border-gray-900">
                    <div className="w-3 h-3 bg-gray-900 rounded-xs"></div>
                  </div>
                  <div className="absolute w-8 h-8 bg-white top-2 right-2 rounded-md flex items-center justify-center border-4 border-gray-900">
                    <div className="w-3 h-3 bg-gray-900 rounded-xs"></div>
                  </div>
                  <div className="absolute w-8 h-8 bg-white bottom-2 left-2 rounded-md flex items-center justify-center border-4 border-gray-900">
                    <div className="w-3 h-3 bg-gray-900 rounded-xs"></div>
                  </div>
                  
                  {/* Fake QR content */}
                  <div className="w-full h-full border-4 border-gray-900 rounded-lg flex flex-col justify-between p-6 opacity-80 select-none">
                    <div className="flex justify-around"><span className="text-white text-[8px] font-mono">■□■□</span><span className="text-white text-[8px] font-mono">□■□■</span></div>
                    <div className="flex justify-around"><span className="text-white text-[8px] font-mono">□■□■</span><span className="text-white text-[8px] font-mono">■□■□</span></div>
                    <div className="flex justify-around"><span className="text-white text-[8px] font-mono">■□■□</span><span className="text-white text-[8px] font-mono">□■□■</span></div>
                  </div>
                  
                  {/* Central MoMo logo */}
                  <div className="absolute h-9 w-9 bg-[#A50064] text-white rounded-lg flex items-center justify-center font-bold text-sm border-2 border-white shadow-md">
                    M
                  </div>
                </div>
              </div>

              <h2 className="font-bold text-gray-800 text-lg mb-1">Quét mã QR để thanh toán</h2>
              <p className="text-xs text-gray-400 max-w-xs mb-4 leading-normal">
                Sử dụng ứng dụng MoMo trên điện thoại để quét mã QR hiển thị ở trên.
              </p>
              <a href="#" className="text-xs text-[#A50064] font-extrabold hover:underline flex items-center gap-1">
                <Info size={14} />
                <span>Xem Hướng dẫn</span>
              </a>
            </div>

          </div>
        </main>
      ) : (
        /* MÀN HÌNH 8: THANH TOÁN THÀNH CÔNG (Success State) */
        <main className="max-w-xl mx-auto w-full px-4 py-12 flex-grow flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden w-full p-8 md:p-12 text-center flex flex-col items-center gap-6">
            
            {/* Checked mark icon animation */}
            <div className="h-20 w-20 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-inner">
              <CheckCircle2 size={48} className="fill-current text-white stroke-emerald-500 stroke-2" />
            </div>

            <div className="space-y-1">
              <h2 className="font-extrabold text-2xl text-gray-900">Thanh toán thành công</h2>
              <p className="text-sm text-gray-500">Mã giao dịch: MoMo_{orderId}</p>
            </div>

            {/* Paid amount */}
            <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100/50 px-8 py-4 font-extrabold text-emerald-800 text-2xl">
              {amount.toLocaleString('vi-VN')}đ
            </div>

            {/* Automatic redirection message info */}
            <div className="space-y-4 pt-4 border-t border-gray-100 w-full">
              <p className="text-xs text-gray-400 font-medium">
                MoMo sẽ tự động đưa bạn về lại trang của Nhà cung cấp.
              </p>
              
              <div className="flex justify-center">
                <RotateCw size={20} className="animate-spin text-[#A50064] opacity-80" />
              </div>

              {/* Action buttons manually trigger */}
              <button
                onClick={handleFinalize}
                className="text-xs text-[#A50064] font-extrabold hover:underline uppercase tracking-wider block mx-auto mt-2"
              >
                Quay về
              </button>
            </div>

          </div>
        </main>
      )}

      {/* Footer copyright logo */}
      <footer className="py-6 text-center text-xs text-gray-400 border-t border-gray-200/50 bg-white">
        © 2026 Cổng thanh toán MoMo. Bản quyền được bảo vệ pháp luật.
      </footer>
    </div>
  );
};
