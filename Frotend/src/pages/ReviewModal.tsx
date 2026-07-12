import React, { useState } from 'react';
import { Star, X, Loader2 } from 'lucide-react';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointmentId: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, appointmentId }) => {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Vui lòng chọn số sao đánh giá!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/v1/booking/review', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          appointment_id: appointmentId, 
          rating, 
          comment 
        }),
      });

      if (!response.ok) throw new Error('Không thể gửi đánh giá');
      
      alert('Cảm ơn bạn đã đánh giá dịch vụ!');
      onClose();
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra, vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-extrabold text-gray-800">Đánh giá dịch vụ</h3>
          <button 
            onClick={onClose} 
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        {/* Khu vực chọn số sao */}
        <div className="flex gap-2 justify-center mb-6">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={36}
              className={`cursor-pointer transition-all duration-200 ${
                star <= (hover || rating) 
                  ? 'text-yellow-400 fill-yellow-400 scale-110' 
                  : 'text-gray-300 hover:text-yellow-200'
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
            />
          ))}
        </div>

        {/* Khu vực nhập bình luận */}
        <textarea
          className="w-full border-2 border-gray-100 rounded-xl p-4 mb-6 text-sm focus:border-medical outline-none transition-colors resize-none"
          placeholder="Chia sẻ trải nghiệm của bạn về buổi khám..."
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        {/* Nút Gửi */}
        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-medical text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-medical/20 transition-all flex items-center justify-center gap-2"
        >
          {loading ? (
            <><Loader2 size={20} className="animate-spin" /> Đang gửi...</>
          ) : (
            'Gửi đánh giá'
          )}
        </button>
      </div>
    </div>
  );
};