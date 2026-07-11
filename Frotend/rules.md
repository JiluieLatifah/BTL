# BỘ QUY TẮC PHÁT TRIỂN FRONTEND (RULES & GUIDELINES)

Tài liệu này định nghĩa các tiêu chuẩn, cấu trúc dự án và quy tắc lập trình mà các AI Agents phải tuân thủ nghiêm ngặt khi phát triển giao diện người dùng (Frontend) cho **Hệ thống đặt lịch khám bệnh trực tuyến PTTK**.

---

## 1. CÔNG NGHỆ VÀ THƯ VIỆN ĐỀ XUẤT (TECH STACK)
*   **Framework chính:** React (sử dụng **Vite** để khởi tạo dự án nhanh và tối ưu).
*   **Ngôn ngữ:** TypeScript (để kiểm soát kiểu chặt chẽ) hoặc JavaScript (ES6+).
*   **Styling:** **Tailwind CSS** (kết hợp với CSS Variables trong `index.css` cho các màu thương hiệu).
*   **Quản lý State:** React Context API hoặc Redux Toolkit (cho trạng thái đặt lịch, thông tin người dùng và giỏ hàng/thanh toán).
*   **Routing:** React Router DOM (v6+).
*   **Icons:** Lucide React hoặc FontAwesome (cho các biểu tượng sức khỏe, tìm kiếm, mũi tên).

---

## 2. CẤU TRÚC THƯ MỤC DỰ ÁN (PROJECT STRUCTURE)
Dự án phải được tổ chức khoa học, tách biệt rõ ràng giữa components, pages, hooks và assets:

```text
src/
├── assets/             # Hình ảnh, logo, hình minh họa (copy từ img_tmp)
├── components/         # Các component dùng chung (Re-usable Components)
│   ├── common/         # Button, Input, Dropdown, Modal, Card, Spinner
│   └── layout/         # Header, Footer, Sidebar, Navigation
├── context/            # Quản lý State toàn cục (AuthContext, BookingContext)
├── hooks/              # Custom Hooks (sử dụng cho gọi API, validation)
├── pages/              # Các trang tương ứng với các màn hình thiết kế
│   ├── Home.tsx        # Trang giới thiệu (gioi_thieu.png)
│   ├── Login.tsx       # Trang đăng nhập (login.png & login_2.png)
│   ├── ClinicList.tsx  # Danh sách cơ sở y tế (datkham.png)
│   ├── BookingForm.tsx # Nhập thông tin khám (nhap_thong_tin.png)
│   ├── Payment.tsx     # Chọn phương thức (thanh_toan.png)
│   ├── MoMoPay.tsx     # Cổng MoMo QR (thong_tin_thanh_toan.png & hoanthanh_thanhtoan.png)
│   └── TicketDetail.tsx# Chi tiết phiếu khám (chi_tiet_phieu_kham.png)
├── services/           # Gọi API (Axios instance, các endpoint mockup)
├── styles/             # Cấu hình Tailwind, CSS chung
└── utils/              # Các hàm bổ trợ (định dạng tiền tệ, định dạng ngày tháng)
```

---

## 3. TIÊU CHUẨN THIẾT KẾ UI/UX (DESIGN SYSTEM & UX STANDARDS)

### 3.1. Hệ màu sắc chủ đạo (Color Palette)
Các màu sắc phải được khai báo trong cấu hình Tailwind hoặc CSS variables:
*   **Màu chủ đạo (Primary - Radiant Theme):** Hồng phấn rực rỡ `#dc91a8` (hoặc prefix `radiant` / `medical` trong Tailwind) - đại diện cho sự tươi mới, ấm áp và tận tâm.
*   **Màu Logo:** Hồng san hô `#ff5777` (prefix `logo` trong Tailwind) - làm điểm nhấn thương hiệu nổi bật.
*   **Màu phụ (Secondary/MoMo Brand):** Hồng/Đỏ MoMo `#A50064` (hoặc `#D946EF` cho các nút thanh toán).
*   **Màu văn bản (Text):**
    *   Tiêu đề: `#1F2937` (Gray 800)
    *   Nội dung: `#4B5563` (Gray 600)
    *   Chú thích: `#9CA3AF` (Gray 400)
*   **Màu nền (Background):** `#F9FAFB` hoặc `#F3F4F6` (Xám nhạt).
*   **Màu trạng thái (Status):**
    *   Thành công: Xanh lá `#10B981`
    *   Cảnh báo/Chờ khám: Vàng cam `#F59E0B`
    *   Lỗi: Đỏ `#EF4444`

### 3.2. Typography (Phông chữ)
*   Sử dụng phông chữ **Inter** hoặc **Roboto** sạch sẽ, hiện đại.
*   Kích thước chữ tiêu chuẩn:
    *   H1 (Trang chủ/Banner): `2.25rem` (36px), `bold`
    *   H2 (Tiêu đề phần): `1.5rem` (24px), `semibold`
    *   H3 (Tiêu đề card/form): `1.25rem` (20px), `semibold`
    *   Body text: `1rem` (16px), `normal`
    *   Small/Caption: `0.875rem` (14px), `medium`

### 3.3. Hiệu ứng động (Micro-animations)
*   **Hover effects:** Tất cả các nút bấm, clinic cards, menu navigation phải có hiệu ứng hover mượt mà (`transition-all duration-300`).
*   **Loading States:** Khi bấm nút hoặc chuyển trang, hiển thị Spinner hoặc Skeleton screens để tăng trải nghiệm người dùng.
*   **Chuyển trang:** Sử dụng hiệu ứng Fade-in nhẹ nhàng khi người dùng chuyển đổi giữa các bước đặt lịch.

---

## 4. QUY TẮC VIẾT CODE (CODING CONVENTIONS)

*   **Tên file & Thư mục:**
    *   Component & Page: PascalCase (ví dụ: `ClinicCard.tsx`, `BookingForm.tsx`).
    *   Hooks, Utils, Services: camelCase (ví dụ: `useAuth.ts`, `formatCurrency.ts`).
    *   CSS & Assets: kebab-case (ví dụ: `main-logo.png`).
*   **Sử dụng Component tái sử dụng:**
    *   Không viết lại các khối mã trùng lặp (ví dụ: Header, Footer, Stepper).
    *   Tách nhỏ các component lớn thành các sub-components.
*   **Kiểm soát Form & Validation:**
    *   Sử dụng `React Hook Form` kết hợp với `Yup` hoặc `Zod` để validate form nhập liệu (Số điện thoại, OTP, Thông tin khám).
    *   Hiển thị thông điệp lỗi rõ ràng dưới mỗi trường nhập liệu không hợp lệ.
*   **Tính Responsive (Thích ứng thiết bị):**
    *   Giao diện phải hiển thị hoàn hảo trên cả Mobile (dưới 768px), Tablet (768px - 1024px) và Desktop (trên 1024px).
    *   Sử dụng Grid và Flexbox linh hoạt với tiền tố `sm:`, `md:`, `lg:` của Tailwind.

---

## 5. LUỒNG DỮ LIỆU & QUẢN LÝ TRẠNG THÁI (DATA FLOW & STATE MANAGEMENT)
Để hoàn thành luồng đặt lịch liền mạch từ Bước 1 đến Bước 9, Agent cần quản lý trạng thái đặt lịch (`BookingState`) tập trung:

```typescript
interface BookingState {
  user: {
    phoneNumber: string;
    isLoggedIn: boolean;
  } | null;
  selectedClinic: {
    id: string;
    name: string;
    address: string;
  } | null;
  consultation: {
    specialty: string;
    service: string;
    clinicRoom: string;
    date: string;
    timeSlot: string;
  } | null;
  payment: {
    method: 'ZaloPay' | 'VNPAY' | 'MoMo' | null;
    invoiceId: string;
    amount: number;
    status: 'pending' | 'success' | 'failed';
  } | null;
}
```

*   Trạng thái này phải được lưu trong **React Context** để chia sẻ dữ liệu dễ dàng giữa các trang mà không bị mất dữ liệu khi chuyển bước.

---

## 6. HƯỚNG DẪN DÀNH RIÊNG CHO AI AGENTS KHI TRIỂN KHAI
1.  **Đọc kỹ tài liệu yêu cầu:** Đọc file `agents_req.md` trước khi bắt đầu viết bất kỳ dòng code nào.
2.  **Khởi tạo Mock Data trước:** Do hệ thống chưa kết nối backend thực tế, Agent cần tạo file `src/services/mockData.ts` chứa dữ liệu giả lập cho danh sách bệnh viện, chuyên khoa, dịch vụ, giờ khám để render giao diện.
3.  **Hoàn thiện luồng đi (Happy Path) trước:** Đảm bảo luồng từ Đăng nhập -> Chọn Bệnh viện -> Đặt khám -> Chọn Thanh toán -> Quét QR MoMo -> Xem phiếu khám hoạt động mượt mà trước khi tinh chỉnh các trường hợp biên (Edge Cases).
4.  **Kiểm tra tính hiển thị của ảnh:** Đảm bảo tất cả đường dẫn ảnh tĩnh được trỏ đúng thư mục `src/assets`.
