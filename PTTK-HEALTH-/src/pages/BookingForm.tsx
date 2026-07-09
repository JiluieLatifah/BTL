import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { mockSpecialties, mockServices, mockRooms, mockTimeSlots } from '../services/mockData';
import { Stethoscope, User, CheckSquare, Wallet, ArrowRight, Building, Calendar, Clock, UserCheck } from 'lucide-react';

export const BookingForm: React.FC = () => {
  const { bookingState, setConsultation, setPatient } = useBooking();
  const navigate = useNavigate();

  // If clinic is not selected, redirect to clinic list
  const clinic = bookingState.selectedClinic;
  if (!clinic) {
    React.useEffect(() => {
      navigate('/clinics');
    }, []);
    return null;
  }

  // Multi-step local state
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form Fields - Step 1: Consultation Details
  const [specialty, setSpecialty] = useState(bookingState.specialty || mockSpecialties[0]);
  const [serviceIndex, setServiceIndex] = useState(1); // Mặc định là Khám dịch vụ chất lượng cao (399.000đ)
  const [room, setRoom] = useState(bookingState.room || mockRooms[1]); // Mặc định phòng 205 - Tầng 2
  const [selectedDate, setSelectedDate] = useState('03/07/2026'); // Cố định ngày giống chi_tiet_phieu_kham.png
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('09:30 - 10:30'); // Khớp với 09:30 trong ảnh chi tiết

  // Form Fields - Step 2: Patient Info
  const [patientName, setPatientName] = useState(bookingState.patientInfo?.name || 'Nguyễn Văn An');
  const [patientDob, setPatientDob] = useState(bookingState.patientInfo?.dob || '1990-03-15');
  const [patientGender, setPatientGender] = useState(bookingState.patientInfo?.gender || 'Nam');

  const selectedService = mockServices[serviceIndex];

  // Dates slider options
  const dates = [
    { dayOfWeek: 'Thứ 2', dateStr: '02/07/2026', label: '02/07' },
    { dayOfWeek: 'Thứ 3', dateStr: '03/07/2026', label: '03/07' }, // Mặc định khớp mẫu
    { dayOfWeek: 'Thứ 4', dateStr: '04/07/2026', label: '04/07' },
    { dayOfWeek: 'Thứ 5', dateStr: '05/07/2026', label: '05/07' },
    { dayOfWeek: 'Thứ 6', dateStr: '06/07/2026', label: '06/07' },
    { dayOfWeek: 'Thứ 7', dateStr: '07/07/2026', label: '07/07' },
    { dayOfWeek: 'Chủ Nhật', dateStr: '08/07/2026', label: '08/07' },
  ];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setConsultation({
      specialty,
      service: selectedService,
      room,
      date: selectedDate,
      timeSlot: selectedTimeSlot,
    });
    setCurrentStep(2);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientDob || !patientGender) {
      alert('Vui lòng nhập đầy đủ thông tin bệnh nhân!');
      return;
    }
    setPatient({
      name: patientName,
      dob: patientDob,
      gender: patientGender,
    });
    setCurrentStep(3);
  };

  const handleConfirm = () => {
    navigate('/payment');
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Breadcrumbs */}
      <nav className="bg-white border-b border-gray-200 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-xs font-semibold text-gray-500 flex items-center gap-2">
          <span className="hover:text-medical cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
          <span>&gt;</span>
          <span className="hover:text-medical cursor-pointer" onClick={() => navigate('/clinics')}>{clinic.name}</span>
          <span>&gt;</span>
          <span className="text-gray-800">Đặt lịch khám</span>
        </div>
      </nav>

      {/* Main content grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Clinic summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm sticky top-6">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Cơ sở y tế đã chọn</h3>
            <div className="flex items-start gap-4 mb-4">
              <div className={`h-14 w-14 rounded-xl flex items-center justify-center font-bold text-lg select-none shrink-0 ${clinic.imagePlaceholderColor}`}>
                {clinic.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold text-gray-900 leading-snug text-base">{clinic.name}</h4>
                <p className="text-xs text-gray-500 mt-1 leading-normal">{clinic.address}</p>
              </div>
            </div>

            {/* If step 2 or 3, show selected booking info */}
            {currentStep > 1 && (
              <div className="border-t border-gray-100 pt-4 mt-4 space-y-3 text-sm">
                <h4 className="font-bold text-gray-700">Thông tin lịch khám:</h4>
                <div className="flex gap-2 text-gray-600">
                  <Stethoscope size={16} className="mt-0.5 shrink-0 text-medical" />
                  <span>{specialty} - {selectedService.name}</span>
                </div>
                <div className="flex gap-2 text-gray-600">
                  <Calendar size={16} className="mt-0.5 shrink-0 text-medical" />
                  <span>{selectedDate}</span>
                </div>
                <div className="flex gap-2 text-gray-600">
                  <Clock size={16} className="mt-0.5 shrink-0 text-medical" />
                  <span>{selectedTimeSlot} ({room})</span>
                </div>
              </div>
            )}

            {/* If step 3, show patient info */}
            {currentStep === 3 && (
              <div className="border-t border-gray-100 pt-4 mt-4 space-y-3 text-sm">
                <h4 className="font-bold text-gray-700">Bệnh nhân:</h4>
                <div className="flex gap-2 text-gray-600">
                  <UserCheck size={16} className="mt-0.5 shrink-0 text-medical" />
                  <span>{patientName} ({patientGender}) - Sinh năm {new Date(patientDob).getFullYear()}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: 4-Step Stepper & main form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stepper progress indicator */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex justify-between items-center text-xs md:text-sm font-semibold select-none">
            <div className={`flex flex-col md:flex-row items-center gap-2 ${currentStep >= 1 ? 'text-medical' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${currentStep >= 1 ? 'bg-medical' : 'bg-gray-300'}`}>
                <Stethoscope size={16} />
              </div>
              <span>Thông tin khám</span>
            </div>

            <div className="h-0.5 bg-gray-200 flex-grow mx-2"></div>

            <div className={`flex flex-col md:flex-row items-center gap-2 ${currentStep >= 2 ? 'text-medical' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${currentStep >= 2 ? 'bg-medical' : 'bg-gray-300'}`}>
                <User size={16} />
              </div>
              <span>Hồ sơ bệnh nhân</span>
            </div>

            <div className="h-0.5 bg-gray-200 flex-grow mx-2"></div>

            <div className={`flex flex-col md:flex-row items-center gap-2 ${currentStep >= 3 ? 'text-medical' : 'text-gray-400'}`}>
              <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-white shadow-sm ${currentStep >= 3 ? 'bg-medical' : 'bg-gray-300'}`}>
                <CheckSquare size={16} />
              </div>
              <span>Xác nhận</span>
            </div>

            <div className="h-0.5 bg-gray-200 flex-grow mx-2"></div>

            <div className="flex flex-col md:flex-row items-center gap-2 text-gray-400">
              <div className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-white bg-gray-300 shadow-sm">
                <Wallet size={16} />
              </div>
              <span>Thanh toán</span>
            </div>
          </div>

          {/* Step Contents */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6 md:p-8 shadow-sm">
            {currentStep === 1 && (
              /* Step 1: Booking options */
              <form onSubmit={handleStep1Submit} className="space-y-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Chọn thông tin đăng ký khám</h3>
                
                {/* Specialty select */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Chuyên khoa</label>
                  <select
                    value={specialty}
                    onChange={(e) => setSpecialty(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-medical focus:ring-2 focus:ring-medical/20 focus:outline-none font-medium text-sm shadow-sm"
                  >
                    {mockSpecialties.map((s, idx) => (
                      <option key={idx} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Service select */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Dịch vụ</label>
                  <select
                    value={serviceIndex}
                    onChange={(e) => setServiceIndex(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-medical focus:ring-2 focus:ring-medical/20 focus:outline-none font-medium text-sm shadow-sm"
                  >
                    {mockServices.map((srv, idx) => (
                      <option key={idx} value={idx}>{srv.name} ({srv.price.toLocaleString('vi-VN')}đ)</option>
                    ))}
                  </select>
                </div>

                {/* Clinic Room select */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Phòng khám</label>
                  <select
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-medical focus:ring-2 focus:ring-medical/20 focus:outline-none font-medium text-sm shadow-sm"
                  >
                    {mockRooms.map((r, idx) => (
                      <option key={idx} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                {/* Date Slider Selector */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-bold text-gray-700">Chọn ngày khám</label>
                    <button type="button" className="text-xs text-medical font-bold hover:underline">Chọn ngày khác</button>
                  </div>
                  <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                    {dates.map((d, idx) => {
                      const isSelected = selectedDate === d.dateStr;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedDate(d.dateStr)}
                          className={`flex flex-col items-center justify-center py-3 px-4 rounded-xl border min-w-[70px] transition-all shadow-xs ${
                            isSelected
                              ? 'bg-medical text-white border-medical'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-medical/40'
                          }`}
                        >
                          <span className="text-[10px] font-semibold uppercase">{d.dayOfWeek}</span>
                          <span className="text-sm font-bold mt-1">{d.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Time Slot Grid Selector */}
                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Chọn khung giờ khám</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {mockTimeSlots.map((ts, idx) => {
                      const isSelected = selectedTimeSlot === ts;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedTimeSlot(ts)}
                          className={`py-3 px-4 rounded-xl border text-sm font-bold text-center transition-all shadow-xs ${
                            isSelected
                              ? 'bg-medical text-white border-medical'
                              : 'bg-white text-gray-600 border-gray-200 hover:border-medical/40'
                          }`}
                        >
                          {ts}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-end">
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-medical text-white font-bold px-6 py-3 rounded-xl hover:bg-radiant-dark transition-all shadow-md active:scale-[0.98]"
                  >
                    <span>Tiếp tục</span>
                    <ArrowRight size={18} />
                  </button>
                </div>
              </form>
            )}

            {currentStep === 2 && (
              /* Step 2: Patient Info Form */
              <form onSubmit={handleStep2Submit} className="space-y-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Nhập thông tin hồ sơ bệnh nhân</h3>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Họ và tên bệnh nhân</label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Nhập họ và tên viết hoa có dấu"
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-medical focus:ring-2 focus:ring-medical/20 focus:outline-none font-bold text-sm shadow-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Ngày tháng năm sinh</label>
                  <input
                    type="date"
                    value={patientDob}
                    onChange={(e) => setPatientDob(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-medical focus:ring-2 focus:ring-medical/20 focus:outline-none font-medium text-sm shadow-sm"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-bold text-gray-700">Giới tính</label>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-sm">
                      <input
                        type="radio"
                        name="gender"
                        value="Nam"
                        checked={patientGender === 'Nam'}
                        onChange={() => setPatientGender('Nam')}
                        className="text-medical focus:ring-medical h-4 w-4"
                      />
                      <span>Nam</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer font-semibold text-sm">
                      <input
                        type="radio"
                        name="gender"
                        value="Nữ"
                        checked={patientGender === 'Nữ'}
                        onChange={() => setPatientGender('Nữ')}
                        className="text-medical focus:ring-medical h-4 w-4"
                      />
                      <span>Nữ</span>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm"
                  >
                    Quay lại
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-medical text-white font-bold px-6 py-3 rounded-xl hover:bg-radiant-dark transition-all shadow-md active:scale-[0.98] text-sm"
                  >
                    <span>Tiếp tục</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </form>
            )}

            {currentStep === 3 && (
              /* Step 3: Confirmation Summary */
              <div className="space-y-6">
                <h3 className="text-xl font-extrabold text-gray-900 border-b border-gray-100 pb-3">Xác nhận thông tin đặt lịch</h3>
                
                <div className="bg-radiant-light/50 rounded-2xl p-6 border border-radiant/20 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400 block font-semibold uppercase text-[10px]">Cơ sở y tế</span>
                      <span className="font-bold text-gray-800">{clinic.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-semibold uppercase text-[10px]">Chuyên khoa / Dịch vụ</span>
                      <span className="font-bold text-gray-800">{specialty} - {selectedService.name}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-semibold uppercase text-[10px]">Thời gian & Phòng khám</span>
                      <span className="font-bold text-gray-800">{selectedTimeSlot} | {selectedDate} ({room})</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-semibold uppercase text-[10px]">Thông tin bệnh nhân</span>
                      <span className="font-bold text-gray-800">{patientName} ({patientGender}) - NS: {new Date(patientDob).toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>

                  <div className="border-t border-radiant/20 pt-4 flex items-center justify-between font-bold">
                    <span className="text-gray-700">Tổng chi phí khám:</span>
                    <span className="text-radiant-dark text-xl">{selectedService.price.toLocaleString('vi-VN')}đ</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100 flex justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="px-6 py-3 border border-gray-300 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="flex items-center gap-2 bg-medical text-white font-bold px-6 py-3 rounded-xl hover:bg-radiant-dark transition-all shadow-md active:scale-[0.98] text-sm"
                  >
                    <span>Tiếp tục thanh toán</span>
                    <ArrowRight size={16} />
                  </button>
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
