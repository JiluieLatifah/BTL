import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Calendar, User, Clock, Stethoscope, MapPin, CheckCircle, ArrowRight, Printer, Download } from 'lucide-react';

export const TicketDetail: React.FC = () => {
  const { bookingState, resetBooking } = useBooking();
  const navigate = useNavigate();

  // Falling back to default mockup values if no session state exists
  const clinicName = bookingState.selectedClinic?.name || "Bệnh viện Nhân dân 115";
  const ticketId = bookingState.ticketId || "PK-2026-00142";
  const patientName = bookingState.patientInfo?.name || "Nguyễn Văn An";
  const dob = bookingState.patientInfo?.dob 
    ? new Date(bookingState.patientInfo.dob).toLocaleDateString('vi-VN') 
    : "15/03/1990";
  const gender = bookingState.patientInfo?.gender || "Nam";
  const phone = bookingState.user?.phoneNumber || "0912 345 678";
  
  // Date format
  const dateStr = bookingState.date || "03/07/2026";
  const timeSlot = bookingState.timeSlot ? bookingState.timeSlot.split(' - ')[0] : "09:30";
  const room = bookingState.room || "Phòng 205 - Tầng 2";
  const specialty = bookingState.specialty || "Nội tổng quát";
  const doctor = "BS. Trần Thị Mai";

  const handleGoHome = () => {
    resetBooking();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col font-sans">
      
      {/* Header matching chi_tiet_phieu_kham.png */}
      <header className="bg-gradient-to-r from-rose-500 to-rose-600 text-white shadow-sm py-5 px-6 relative flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Logo PTTK */}
          <div className="h-9 w-9 bg-white text-rose-600 rounded-lg flex items-center justify-center font-extrabold text-lg">
            P
          </div>
          <span className="font-extrabold text-xl tracking-wider">PTTK</span>
        </div>
        <h1 className="absolute left-1/2 transform -translate-x-1/2 font-extrabold text-lg md:text-xl uppercase tracking-wider">
          Phiếu thanh toán
        </h1>
        <div className="text-xs bg-white/20 border border-white/20 rounded-full px-3 py-1 font-bold">
          Điện tử
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-3xl mx-auto w-full px-4 py-10 flex-grow flex flex-col justify-center">
        
        {/* Ticket Details Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 relative">
          
          {/* Top colored strip indicator */}
          <div className="bg-rose-500 h-3"></div>

          <div className="p-6 md:p-8 space-y-6">
            
            {/* Header info / Booking ID */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-100 pb-4 gap-4">
              <div>
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Mã số phiếu khám</h2>
                <p className="font-black text-rose-600 text-2xl tracking-wide mt-1">{ticketId}</p>
              </div>
              <div className="sm:text-right">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Trạng thái phiếu</h2>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-50 text-amber-700 border border-amber-100 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></span>
                  <span>Chờ khám</span>
                </span>
              </div>
            </div>

            {/* Core Info Split grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              
              {/* Left & center columns - Details list */}
              <div className="md:col-span-2 space-y-4 text-sm">
                
                {/* Patient section title */}
                <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50 pb-1">Thông tin bệnh nhân</h3>
                
                <div className="grid grid-cols-2 gap-y-3">
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block">Họ tên</span>
                    <span className="font-bold text-gray-800">{patientName}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block">Ngày sinh</span>
                    <span className="font-bold text-gray-800">{dob}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block">Giới tính</span>
                    <span className="font-bold text-gray-800">{gender}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block">Số điện thoại</span>
                    <span className="font-bold text-gray-800">{phone}</span>
                  </div>
                </div>

                {/* Consultation details title */}
                <h3 className="font-bold text-gray-400 text-xs uppercase tracking-wider border-b border-gray-50 pt-2 pb-1">Thông tin lịch hẹn</h3>

                <div className="grid grid-cols-2 gap-y-3">
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block">Cơ sở khám</span>
                    <span className="font-bold text-radiant-dark">{clinicName}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block">Chuyên khoa</span>
                    <span className="font-bold text-gray-800">{specialty}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block">Bác sĩ phụ trách</span>
                    <span className="font-bold text-gray-800">{doctor}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block">Phòng khám</span>
                    <span className="font-bold text-gray-800">{room}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block">Ngày khám</span>
                    <span className="font-bold text-gray-800">{dateStr}</span>
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 font-semibold block">Giờ khám dự kiến</span>
                    <span className="font-bold text-gray-800">{timeSlot}</span>
                  </div>
                </div>
              </div>

              {/* Right column - QR Code verification */}
              <div className="md:col-span-1 border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-6 flex flex-col items-center justify-center text-center">
                <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-sm mb-3">
                  {/* Fake QR code for ticket check-in */}
                  <div className="w-36 h-36 bg-gray-900 rounded-lg p-2 relative flex items-center justify-center">
                    <div className="absolute w-6 h-6 bg-white top-2 left-2 rounded-sm border-2 border-gray-900">
                      <div className="w-2 h-2 bg-gray-900"></div>
                    </div>
                    <div className="absolute w-6 h-6 bg-white top-2 right-2 rounded-sm border-2 border-gray-900">
                      <div className="w-2 h-2 bg-gray-900"></div>
                    </div>
                    <div className="absolute w-6 h-6 bg-white bottom-2 left-2 rounded-sm border-2 border-gray-900">
                      <div className="w-2 h-2 bg-gray-900"></div>
                    </div>
                    {/* Inner QR pixels simulation */}
                    <div className="w-full h-full border-2 border-gray-900 rounded-sm flex flex-col justify-between p-4 opacity-75 select-none">
                      <div className="flex justify-around"><span className="text-white text-[6px] font-mono">■□■□</span><span className="text-white text-[6px] font-mono">□■□■</span></div>
                      <div className="flex justify-around"><span className="text-white text-[6px] font-mono">□■□■</span><span className="text-white text-[6px] font-mono">■□■□</span></div>
                      <div className="flex justify-around"><span className="text-white text-[6px] font-mono">■□■□</span><span className="text-white text-[6px] font-mono">□■□■</span></div>
                    </div>
                  </div>
                </div>
                <h4 className="font-bold text-gray-800 text-xs">Mã QR Check-in</h4>
                <p className="text-[10px] text-gray-400 mt-1 max-w-[150px] leading-normal">Quét tại quầy tiếp đón bệnh viện để lấy số thứ tự khám.</p>
              </div>

            </div>

            {/* Print & Action links */}
            <div className="pt-6 border-t border-gray-100 flex flex-wrap gap-4 justify-between items-center text-xs">
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 font-bold text-gray-600 transition-colors"
                >
                  <Printer size={14} />
                  <span>In phiếu</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert('Đã lưu phiếu khám về điện thoại thành công!')}
                  className="flex items-center gap-1.5 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 font-bold text-gray-600 transition-colors"
                >
                  <Download size={14} />
                  <span>Tải về</span>
                </button>
              </div>

              <button
                onClick={handleGoHome}
                className="flex items-center gap-1.5 bg-rose-600 text-white font-bold px-5 py-2.5 rounded-xl hover:bg-rose-700 shadow-md transition-all active:scale-[0.98]"
              >
                <span>Về trang chủ</span>
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>

        {/* Helpful instructions note */}
        <div className="mt-6 bg-amber-50 border border-amber-200/50 rounded-2xl p-4 text-xs text-amber-800 leading-relaxed font-semibold">
          Lưu ý: Quý khách vui lòng đến trước giờ khám 15 phút và mang theo phiếu khám điện tử này (hoặc tin nhắn SMS xác nhận) để làm thủ tục check-in tại Bàn tiếp đón.
        </div>

      </main>

    </div>
  );
};
