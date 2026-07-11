import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle, Building, Clock, TestTube, Video, Activity, Landmark, MoreHorizontal } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showOtherServices, setShowOtherServices] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/clinics?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/clinics');
    }
  };

  const secondaryServices = [
    { title: "Đặt khám ngoài giờ", desc: "Khám buổi tối hoặc cuối tuần", icon: <Clock size={24} className="text-indigo-500" /> },
    { title: "Đặt lịch xét nghiệm", desc: "Xét nghiệm máu, nước tiểu...", icon: <TestTube size={24} className="text-amber-500" /> },
    { title: "Gọi video với bác sĩ", desc: "Tư vấn từ xa tại nhà", icon: <Video size={24} className="text-rose-500" /> },
    { title: "Đặt khám chuyên khoa", desc: "Khám với chuyên gia", icon: <Activity size={24} className="text-sky-500" /> },
    { title: "Khám doanh nghiệp", desc: "Gói khám sức khỏe định kỳ", icon: <Landmark size={24} className="text-teal-500" /> }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-500 via-[#dc91a8] to-rose-600 text-white py-16 md:py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#dc91a8] opacity-15 rounded-full blur-3xl transform -translate-x-20 translate-y-20"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Kết nối Người Dân với Cơ sở &<br className="hidden md:inline" /> Dịch vụ Y tế hàng đầu
          </h1>
          
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-10">
            <div className="flex items-center bg-white rounded-full p-2 shadow-xl border border-pink-200">
              <div className="pl-4 text-gray-400"><Search size={22} /></div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bác sĩ, bệnh viện, chuyên khoa..."
                className="w-full pl-3 pr-4 py-3 text-gray-800 font-medium focus:outline-none rounded-full"
              />
              <button type="submit" className="bg-radiant text-white font-semibold px-6 md:px-8 py-3 rounded-full hover:bg-radiant-dark transition-all shadow-md shrink-0">
                Tìm kiếm
              </button>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left border-t border-white/20 pt-8">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-rose-200 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-pink-100">Đặt khám nhanh - Lấy số trực tuyến - Tư vấn từ xa</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-rose-200 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-pink-100">Đặt khám theo giờ - Ưu tiên số thứ tự thấp nhất</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-rose-200 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-pink-100">Hoàn tiền khi hủy khám - Nhận ưu đãi hoàn tiền</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - GOM NHÓM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12">
          Dịch vụ đặt lịch y tế trực tuyến
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Card 1: Core */}
          <div onClick={() => navigate('/clinics')} className="group cursor-pointer bg-white rounded-2xl p-6 shadow-sm border border-radiant ring-2 ring-radiant/20 transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="mb-5 p-3 w-fit bg-radiant-light rounded-xl"><Building size={32} className="text-medical" /></div>
            <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
              Đặt khám tại cơ sở 
              <span className="text-xs bg-radiant-light text-radiant-dark font-bold px-2 py-0.5 rounded-full">Khuyên dùng</span>
            </h3>
            <p className="text-sm text-gray-500 leading-relaxed">Đặt lịch khám trực tiếp tại bệnh viện, phòng khám</p>
          </div>

          {/* Card 2: Gom nhóm */}
          <div onClick={() => setShowOtherServices(!showOtherServices)} className={`group cursor-pointer bg-white rounded-2xl p-6 shadow-sm border border-gray-200 transition-all hover:shadow-lg hover:-translate-y-1 ${showOtherServices ? 'border-radiant' : 'hover:border-radiant/50'}`}>
            <div className="mb-5 p-3 w-fit bg-gray-50 rounded-xl group-hover:bg-gray-100 transition-colors"><MoreHorizontal size={32} className="text-gray-500" /></div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Dịch vụ y tế khác</h3>
            <p className="text-sm text-gray-500 leading-relaxed">Đặt khám ngoài giờ, xét nghiệm, gọi video với bác sĩ...</p>
          </div>
        </div>

        {/* Danh sách dịch vụ phụ */}
        {showOtherServices && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 animate-in fade-in slide-in-from-top-4 duration-300">
            {secondaryServices.map((srv, idx) => (
              <div key={idx} onClick={() => alert('Tính năng đang phát triển!')} className="bg-white p-5 rounded-xl border border-gray-200 flex items-center gap-4 cursor-pointer hover:border-radiant transition-all hover:shadow-md">
                {srv.icon}
                <div>
                  <h4 className="font-bold text-sm text-gray-800">{srv.title}</h4>
                  <p className="text-xs text-gray-400 mt-1">{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};