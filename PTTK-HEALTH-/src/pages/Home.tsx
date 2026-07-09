import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle, Building, Clock, TestTube, Video, Activity, Landmark } from 'lucide-react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/clinics?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/clinics');
    }
  };

  const services = [
    {
      title: "Đặt khám tại cơ sở",
      desc: "Đặt lịch khám trực tiếp tại bệnh viện, phòng khám",
      icon: <Building size={32} className="text-medical" />,
      action: () => navigate('/clinics'),
      highlight: true
    },
    {
      title: "Đặt khám ngoài giờ",
      desc: "Phù hợp cho người bận rộn, khám buổi tối hoặc cuối tuần",
      icon: <Clock size={32} className="text-indigo-500" />,
      action: () => alert('Tính năng đang được phát triển!'),
      highlight: false
    },
    {
      title: "Đặt lịch xét nghiệm",
      desc: "Xét nghiệm máu, nước tiểu, chẩn đoán hình ảnh nhanh chóng",
      icon: <TestTube size={32} className="text-amber-500" />,
      action: () => alert('Tính năng đang được phát triển!'),
      highlight: false
    },
    {
      title: "Gọi video với bác sĩ",
      desc: "Tư vấn sức khỏe từ xa tiện lợi ngay tại nhà",
      icon: <Video size={32} className="text-rose-500" />,
      action: () => alert('Tính năng đang được phát triển!'),
      highlight: false
    },
    {
      title: "Đặt khám chuyên khoa",
      desc: "Khám trực tiếp với bác sĩ chuyên khoa đầu ngành",
      icon: <Activity size={32} className="text-sky-500" />,
      action: () => alert('Tính năng đang được phát triển!'),
      highlight: false
    },
    {
      title: "Khám doanh nghiệp",
      desc: "Gói khám sức khỏe định kỳ cho công ty, doanh nghiệp",
      icon: <Landmark size={32} className="text-teal-500" />,
      action: () => alert('Tính năng đang được phát triển!'),
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-pink-500 via-[#dc91a8] to-rose-600 text-white py-16 md:py-24 px-4 overflow-hidden">
        {/* Background Decorative Circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl transform translate-x-20 -translate-y-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#dc91a8] opacity-15 rounded-full blur-3xl transform -translate-x-20 translate-y-20"></div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight mb-6">
            Kết nối Người Dân với Cơ sở &<br className="hidden md:inline" /> Dịch vụ Y tế hàng đầu
          </h1>
          
          {/* Search Bar Form */}
          <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-10">
            <div className="flex items-center bg-white rounded-full p-2 shadow-xl border border-pink-200">
              <div className="pl-4 text-gray-400">
                <Search size={22} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm bác sĩ, bệnh viện, chuyên khoa..."
                className="w-full pl-3 pr-4 py-3 text-gray-800 font-medium focus:outline-none rounded-full"
              />
              <button
                type="submit"
                className="bg-radiant text-white font-semibold px-6 md:px-8 py-3 rounded-full hover:bg-radiant-dark transition-all shadow-md shrink-0"
              >
                Tìm kiếm
              </button>
            </div>
          </form>

          {/* Benefits Checkmarks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left border-t border-white/20 pt-8">
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-rose-200 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-pink-100">
                Đặt khám nhanh - Lấy số thứ tự trực tuyến - Tư vấn sức khỏe từ xa
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-rose-200 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-pink-100">
                Đặt khám theo giờ - Đặt càng sớm để có thể có số thứ tự thấp nhất
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle size={20} className="text-rose-200 shrink-0 mt-0.5" />
              <p className="text-sm font-medium text-pink-100">
                Được hoàn tiền khi hủy khám - Có cơ hội nhận ưu đãi hoàn tiền
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-12">
          Dịch vụ đặt lịch y tế trực tuyến
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, idx) => (
            <div
              key={idx}
              onClick={srv.action}
              className={`group cursor-pointer bg-white rounded-2xl p-6 shadow-sm border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                srv.highlight
                  ? 'border-radiant ring-2 ring-radiant/20'
                  : 'border-gray-200 hover:border-radiant/50'
              }`}
            >
              <div className="mb-5 p-3 w-fit bg-gray-50 rounded-xl group-hover:bg-radiant-light transition-colors">
                {srv.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center gap-2">
                {srv.title}
                {srv.highlight && (
                  <span className="text-xs bg-radiant-light text-radiant-dark font-bold px-2 py-0.5 rounded-full">
                    Khuyên dùng
                  </span>
                )}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {srv.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};
