import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { mockSpecialties, mockServices, mockRooms, mockTimeSlots } from '../services/mockData';
import { Stethoscope, User, CheckSquare, ArrowRight } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const { bookingState, setConsultation, setPatient } = useBooking();
  const navigate = useNavigate();
  const clinic = bookingState.selectedClinic;

  // Lấy ngày hiện tại để làm giới hạn cho ngày sinh (YYYY-MM-DD)
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    if (!clinic) {
      navigate('/clinics');
    }
  }, [clinic, navigate]);

  if (!clinic) return null;

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Logic tự động tạo 7 ngày bắt đầu từ hôm nay
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    const label = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}`;
    const dateStr = `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
    const dayNames = ['Chủ Nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'];
    const dayOfWeek = i === 0 ? 'Hôm nay' : dayNames[d.getDay()];
    return { dayOfWeek, dateStr, label };
  });

  const [specialty, setSpecialty] = useState(bookingState.specialty || mockSpecialties[0]);
  const [serviceIndex, setServiceIndex] = useState(1);
  const [room, setRoom] = useState(bookingState.room || mockRooms[1]);
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString('vi-GB'));
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(mockTimeSlots[0]);

  const [patientName, setPatientName] = useState('');
  const [patientDob, setPatientDob] = useState('');
  const [patientGender, setPatientGender] = useState('');

  const selectedService = mockServices[serviceIndex];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultation({ specialty, service: selectedService, room, date: selectedDate, timeSlot: selectedTimeSlot });
    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setPatient({ name: patientName, dob: patientDob, gender: patientGender });
    setCurrentStep(3);
  };

  const handleConfirm = () => navigate('/payment');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <nav className="bg-white border-b border-gray-200 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-semibold text-gray-500 flex items-center gap-2">
          <span className="hover:text-medical cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
          <span>&gt;</span>
          <span className="hover:text-medical cursor-pointer" onClick={() => navigate('/clinics')}>{clinic.name}</span>
          <span>&gt;</span>
          <span className="text-gray-800">Đặt lịch khám</span>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Cơ sở y tế</h3>
            <div className="flex items-start gap-4 mb-4">
              <div className={`h-14 w-14 rounded-xl flex items-center justify-center font-bold text-lg select-none shrink-0 ${clinic.imagePlaceholderColor}`}>
                {clinic.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 leading-snug text-base">{clinic.name}</h4>
                <p className="text-xs text-gray-500 mt-1 leading-normal">{clinic.address}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex justify-between items-center text-xs md:text-sm font-semibold select-none">
            <div className={`flex items-center gap-2 ${currentStep >= 1 ? 'text-medical' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${currentStep >= 1 ? 'bg-medical' : 'bg-gray-300'}`}><Stethoscope size={16} /></div>
              <span>Thông tin</span>
            </div>
            <div className="h-0.5 bg-gray-200 flex-grow mx-2"></div>
            <div className={`flex items-center gap-2 ${currentStep >= 2 ? 'text-medical' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${currentStep >= 2 ? 'bg-medical' : 'bg-gray-300'}`}><User size={16} /></div>
              <span>Bệnh nhân</span>
            </div>
            <div className="h-0.5 bg-gray-200 flex-grow mx-2"></div>
            <div className={`flex items-center gap-2 ${currentStep >= 3 ? 'text-medical' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${currentStep >= 3 ? 'bg-medical' : 'bg-gray-300'}`}><CheckSquare size={16} /></div>
              <span>Xác nhận</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            {currentStep === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Chọn thông tin khám</h3>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Chuyên khoa</label>
                  <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-medical outline-none text-sm font-medium">
                    {mockSpecialties.map((s, idx) => (<option key={idx} value={s}>{s}</option>))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Dịch vụ</label>
                  <select value={serviceIndex} onChange={(e) => setServiceIndex(Number(e.target.value))} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-medical outline-none text-sm font-medium">
                    {mockServices.map((srv, idx) => (<option key={idx} value={idx}>{srv.name} ({srv.price.toLocaleString('vi-VN')}đ)</option>))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Chọn ngày</label>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                    {dates.map((d, idx) => (
                      <button key={idx} type="button" onClick={() => setSelectedDate(d.dateStr)} className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl border min-w-[70px] transition-all ${selectedDate === d.dateStr ? 'bg-medical text-white border-medical' : 'bg-white text-gray-600 border-gray-200'}`}>
                        <span className="text-[10px] font-semibold uppercase">{d.dayOfWeek}</span>
                        <span className="text-sm font-bold mt-1">{d.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Khung giờ</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {mockTimeSlots.map((ts, idx) => (
                      <button key={idx} type="button" onClick={() => setSelectedTimeSlot(ts)} className={`py-3 px-4 rounded-xl border text-sm font-bold ${selectedTimeSlot === ts ? 'bg-medical text-white border-medical' : 'bg-white text-gray-600 border-gray-200'}`}>
                        {ts}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button type="submit" className="flex items-center gap-2 bg-medical text-white font-bold px-6 py-3 rounded-xl shadow-md">Tiếp tục <ArrowRight size={18} /></button>
                </div>
              </form>
            )}

            {currentStep === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Thông tin bệnh nhân</h3>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Họ và tên <span className="text-red-500">*</span></label>
                  <input type="text" value={patientName} onChange={(e) => setPatientName(e.target.value)} placeholder="VD: Nguyễn Văn A" className={`w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-medical outline-none text-sm font-bold shadow-sm ${patientName ? 'text-gray-900' : 'text-gray-400 placeholder:text-gray-400'}`} required />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Ngày sinh <span className="text-red-500">*</span></label>
                  <input type="date" max={today} value={patientDob} onChange={(e) => setPatientDob(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-medical outline-none text-sm font-medium shadow-sm" required />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Giới tính <span className="text-red-500">*</span></label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold"><input type="radio" name="gender" value="Nam" onChange={(e) => setPatientGender(e.target.value)} required /> Nam</label>
                    <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold"><input type="radio" name="gender" value="Nữ" onChange={(e) => setPatientGender(e.target.value)} required /> Nữ</label>
                  </div>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(1)} className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl font-bold hover:bg-gray-50 text-sm">Quay lại</button>
                  <button type="submit" className="flex items-center gap-2 bg-medical text-white font-bold px-6 py-3 rounded-xl shadow-md text-sm">Tiếp tục <ArrowRight size={16} /></button>
                </div>
              </form>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Xác nhận</h3>
                <div className="bg-gray-50 rounded-2xl p-6 border space-y-4">
                  <p><strong>Cơ sở:</strong> {clinic.name}</p>
                  <p><strong>Lịch hẹn:</strong> {selectedTimeSlot} ngày {selectedDate}</p>
                  <p><strong>Bệnh nhân:</strong> {patientName}</p>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between">
                  <button type="button" onClick={() => setCurrentStep(2)} className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl font-bold hover:bg-gray-50 text-sm">Quay lại</button>
                  <button onClick={handleConfirm} className="flex items-center gap-2 bg-medical text-white font-bold px-6 py-3 rounded-xl shadow-md text-sm">Thanh toán <ArrowRight size={16} /></button>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};