# PTTK Health - Hệ Thống Đặt Lịch Khám Bệnh Trực Tuyến

Chào mừng bạn đến với mã nguồn Frontend của dự án **PTTK Health** – Ứng dụng hỗ trợ tìm kiếm cơ sở y tế và đặt lịch khám bệnh trực tuyến nhanh chóng, tiện lợi, tích hợp thanh toán điện tử.

Dự án được xây dựng bằng công nghệ **React (Vite) + TypeScript + Tailwind CSS** và tối ưu hóa giao diện đa thiết bị (Responsive).

---

## 🚀 Tính Năng Chính
Hệ thống bao gồm đầy đủ luồng nghiệp vụ liên hoàn từ đặt khám đến in phiếu:
1. **Trang Chủ (Home):** Banner giới thiệu, thanh tìm kiếm thông minh, danh mục dịch vụ khuyên dùng và các thế mạnh vượt trội.
2. **Đăng Nhập (Login):** Trình giả lập đăng nhập bằng số điện thoại & nhận mã xác thực OTP (6 chữ số).
3. **Danh Sách Cơ Sở (Clinics):** Tìm kiếm, lọc bệnh viện/phòng khám theo tab và xem đánh giá chất lượng.
4. **Form Đăng Ký Khám (Booking Form):** Đăng ký 3 bước (Chọn chuyên khoa/dịch vụ/phòng khám/ngày giờ -> Nhập thông tin bệnh nhân -> Xác nhận thông tin chi phí).
5. **Thanh Toán (Payment):** Lựa chọn cổng thanh toán (MoMo, VNPAY, ZaloPay).
6. **Thanh Toán MoMo QR (MoMo Pay):** Trình giả lập quét mã QR MoMo và tự động chuyển hướng sau khi giao dịch thành công.
7. **Chi Tiết Phiếu Khám (Ticket Detail):** Hiển thị mã phiếu dạng QR code, hỗ trợ **In Phiếu trực tiếp (Print Layout)** hoặc **Tải về điện thoại**.

---

## 🎨 Theme & Nhận Diện Thương Hiệu (Radiant Theme)
Hệ thống sử dụng bộ màu sắc thương hiệu mới rực rỡ và chuyên nghiệp:
* **Màu chủ đạo (Primary):** `#dc91a8` (Radiant Pink - Hồng phấn tạo cảm giác ấm áp, tận tâm).
* **Màu Logo:** `#ff5777` (Hồng san hô nổi bật nhận diện thương hiệu).
* **Màu Trạng thái:**
  * Thành công: `#10B981` (Xanh lá)
  * Chờ khám/Cảnh báo: `#F59E0B` (Vàng cam/Hổ phách)

---

## 🛠️ Công Nghệ Sử Dụng
* **Thư viện chính:** React 18 + TypeScript + React Router DOM 6.
* **Styling:** Tailwind CSS (quản lý tiện ích CSS) + Lucide Icons (bộ icon tối giản).
* **Quản lý trạng thái:** React Context API (`BookingContext.tsx` quản lý luồng chọn cơ sở -> đặt lịch -> thanh toán -> sinh phiếu).
* **Công cụ xây dựng:** Vite (cho tốc độ HMR cực nhanh).

---

## 💻 Hướng Dẫn Chạy Dưới Local

### 1. Yêu cầu hệ thống
* Máy tính đã cài đặt **Node.js** (Khuyên dùng phiên bản LTS từ 18.x trở lên).

### 2. Cài đặt thư viện
Tại thư mục gốc dự án, chạy lệnh:
```bash
npm install
```

### 3. Chạy môi trường phát triển (Dev Mode)
Để khởi chạy ứng dụng cục bộ:
```bash
npm run dev
```
👉 Truy cập ứng dụng tại địa chỉ mặc định: [http://localhost:5173](http://localhost:5173)

### 4. Build sản phẩm (Production)
Tạo phiên bản đóng gói tối ưu để triển khai:
```bash
npm run build
```
Thư mục sản phẩm sau khi build thành công sẽ nằm ở `/dist`.

---
