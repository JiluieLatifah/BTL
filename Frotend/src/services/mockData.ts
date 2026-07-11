export interface Clinic {
  id: string;
  name: string;
  address: string;
  rating: number;
  imagePlaceholderColor: string;
}

export const mockClinics: Clinic[] = [
  {
    id: "bv-115",
    name: "Bệnh viện Nhân dân 115",
    address: "527 Sư Vạn Hạnh, Phường 12, Quận 10, Thành phố Hồ Chí Minh",
    rating: 5,
    imagePlaceholderColor: "bg-emerald-100 text-emerald-800"
  },
  {
    id: "bv-cho-ray",
    name: "Bệnh viện Chợ Rẫy",
    address: "201B Nguyễn Chí Thanh, Phường 12, Quận 5, Thành phố Hồ Chí Minh",
    rating: 5,
    imagePlaceholderColor: "bg-blue-100 text-blue-800"
  },
  {
    id: "bv-dai-hoc-y-duoc",
    name: "Bệnh viện Đại học Y Dược TP.HCM",
    address: "215 Hồng Bàng, Phường 11, Quận 5, Thành phố Hồ Chí Minh",
    rating: 5,
    imagePlaceholderColor: "bg-indigo-100 text-indigo-800"
  },
  {
    id: "pk-viet-sing",
    name: "Phòng khám Đa khoa VietSing",
    address: "83B Lý Thường Kiệt, Cửa Nam, Hoàn Kiếm, Hà Nội",
    rating: 4,
    imagePlaceholderColor: "bg-rose-100 text-rose-800"
  },
  {
    id: "bv-bach-mai",
    name: "Bệnh viện Bạch Mai",
    address: "78 Giải Phóng, Phương Mai, Đống Đa, Hà Nội",
    rating: 5,
    imagePlaceholderColor: "bg-teal-100 text-teal-800"
  },
  {
    id: "pk-nhi-dong",
    name: "Phòng khám Nhi đồng Thành phố",
    address: "312 Đường số 7, Bình Trị Đông B, Bình Tân, Thành phố Hồ Chí Minh",
    rating: 4,
    imagePlaceholderColor: "bg-amber-100 text-amber-800"
  }
];

export const mockSpecialties = [
  "Nội tổng quát",
  "Tim mạch",
  "Nhi khoa",
  "Tai Mũi Họng",
  "Răng Hàm Mặt",
  "Da liễu",
  "Cơ xương khớp"
];

export const mockServices = [
  { id: "srv-thuong", name: "Khám thường", price: 150000 },
  { id: "srv-dich-vu", name: "Khám dịch vụ chất lượng cao", price: 399000 },
  { id: "srv-chuyen-gia", name: "Khám chuyên gia", price: 500000 }
];

export const mockRooms = [
  "Phòng 201 - Tầng 2",
  "Phòng 205 - Tầng 2",
  "Phòng 302 - Tầng 3",
  "Phòng 310 - Tầng 3"
];

export const mockTimeSlots = [
  "07:30 - 08:30",
  "08:30 - 09:30",
  "09:30 - 10:30",
  "10:30 - 11:30",
  "13:30 - 14:30",
  "14:30 - 15:30",
  "15:30 - 16:30"
];
