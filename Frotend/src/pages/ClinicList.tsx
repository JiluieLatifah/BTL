import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { mockClinics, Clinic } from '../services/mockData';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Search, Star, Building2, ShieldAlert } from 'lucide-react';

export const ClinicList: React.FC = () => {
  // SỬA LỖI: Lấy context đầy đủ, sau đó trích xuất hàm để tránh lỗi scope
  const bookingContext = useBooking();
  const { bookingState, selectClinic } = bookingContext;
  
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [activeTab, setActiveTab] = useState<'all' | 'hospital' | 'clinic'>('all');
  const [filteredClinics, setFilteredClinics] = useState<Clinic[]>(mockClinics);

  // Sync search query from URL search parameters if any
  useEffect(() => {
    const q = searchParams.get('search');
    if (q) setSearchQuery(q);
  }, [searchParams]);

  // Handle Search and Filter Tabs
  useEffect(() => {
    let result = mockClinics;

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) || c.address.toLowerCase().includes(q)
      );
    }

    // Tab filter
    if (activeTab === 'hospital') {
      result = result.filter(c => c.name.startsWith('Bệnh viện'));
    } else if (activeTab === 'clinic') {
      result = result.filter(c => c.name.startsWith('Phòng khám'));
    }

    setFilteredClinics(result);
  }, [searchQuery, activeTab]);

  const handleBooking = (clinic: Clinic) => {
    // Gọi hàm từ biến context đã trích xuất an toàn
    if (typeof selectClinic === 'function') {
      selectClinic(clinic);
    } else {
      console.error("selectClinic không phải là một hàm!");
      return;
    }
    
    // Check authentication
    if (bookingState.user?.isLoggedIn) {
      navigate('/booking');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      {/* Banner */}
      <section className="bg-gradient-to-r from-pink-400 via-[#dc91a8] to-rose-500 py-10 px-4 text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-wide">
              ĐẶT KHÁM TẠI CƠ SỞ
            </h1>
            <p className="text-pink-100 text-sm mt-1">
              Tìm kiếm và chọn lựa bệnh viện, phòng khám uy tín nhất cả nước.
            </p>
          </div>
          <div className="hidden md:block">
            <Building2 size={64} className="text-white/20" />
          </div>
        </div>
      </section>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        {/* Search and Filters controls */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 w-full md:w-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === 'all'
                  ? 'border-radiant text-radiant'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setActiveTab('hospital')}
              className={`px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === 'hospital'
                  ? 'border-radiant text-radiant'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Bệnh viện
            </button>
            <button
              onClick={() => setActiveTab('clinic')}
              className={`px-5 py-3 text-sm font-bold border-b-2 transition-all ${
                activeTab === 'clinic'
                  ? 'border-radiant text-radiant'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Phòng khám / Xét nghiệm
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tên hoặc địa chỉ..."
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-xl focus:border-radiant focus:ring-2 focus:ring-radiant/20 focus:outline-none text-sm shadow-sm transition-all"
            />
          </div>
        </div>

        {/* Clinics Grid */}
        {filteredClinics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredClinics.map((clinic) => (
              <div
                key={clinic.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className={`h-40 flex items-center justify-center font-bold text-lg select-none ${clinic.imagePlaceholderColor}`}>
                    <div className="text-center p-4">
                      <Building2 size={36} className="mx-auto mb-2 opacity-80" />
                      <span className="text-xs uppercase tracking-wider">{clinic.name}</span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 text-lg mb-1 leading-snug">
                      {clinic.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2 min-h-[2rem] leading-normal mb-3">
                      {clinic.address}
                    </p>

                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < clinic.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                        />
                      ))}
                      <span className="text-xs font-semibold text-gray-500 ml-1">({clinic.rating}.0)</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => alert(`Chi tiết cơ sở: ${clinic.name}`)}
                    className="py-2.5 px-4 text-xs font-bold border border-radiant text-radiant rounded-xl hover:bg-radiant-light transition-all text-center"
                  >
                    Xem chi tiết
                  </button>
                  <button
                    onClick={() => handleBooking(clinic)}
                    className="py-2.5 px-4 text-xs font-bold bg-radiant text-white rounded-xl hover:bg-radiant-dark shadow-sm transition-all text-center"
                  >
                    Đặt khám ngay
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-300">
            <ShieldAlert size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-700">Không tìm thấy cơ sở y tế nào</h3>
            <p className="text-sm text-gray-500 mt-1">Vui lòng thay đổi từ khóa tìm kiếm hoặc chọn bộ lọc khác.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};