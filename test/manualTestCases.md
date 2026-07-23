# KỊCH BẢN KIỂM THỬ THỦ CÔNG (MANUAL TEST CASES MATRIX)

Tài liệu này tổng hợp toàn bộ các trường hợp kiểm thử (Test Cases) thực tế trên giao diện ứng dụng Web Authentication & User Profile.

---

## 📋 1. Màn hình Đăng ký (Register Page - `/register`)

| STT | Tên Test Case | Các bước thực hiện | Kết quả mong đợi (Expected Result) | Trạng thái |
| :--- | :--- | :--- | :--- | :---: |
| **TC01** | Bỏ trống toàn bộ form | Bấm nút **Đăng ký** mà không nhập gì. | Hiển thị lỗi bên dưới các trường: *"Email là bắt buộc"*, *"Mật khẩu là bắt buộc"*, *"Xác nhận mật khẩu là bắt buộc"*. | ✅ Pass |
| **TC02** | Email sai định dạng | Nhập Email: `abcxyz` -> Bấm Đăng ký. | Hiển thị lỗi *"Invalid Email"*. | ✅ Pass |
| **TC03** | Mật khẩu ít hơn 8 ký tự | Nhập Mật khẩu: `Pass1!` (<8 ký tự) -> Bấm Đăng ký. | Hiển thị lỗi *"Password is too weak"*. | ✅ Pass |
| **TC04** | Mật khẩu thiếu chữ hoa | Nhập Mật khẩu: `password123!` -> Bấm Đăng ký. | Hiển thị lỗi *"Password is too weak"*. | ✅ Pass |
| **TC05** | Mật khẩu thiếu ký tự đặc biệt | Nhập Mật khẩu: `Password123` -> Bấm Đăng ký. | Hiển thị lỗi *"Password is too weak"*. | ✅ Pass |
| **TC06** | Xác nhận mật khẩu không trùng | Nhập Password: `Password123!`, Confirm: `Password999!` | Hiển thị lỗi *"Mật khẩu xác nhận không trùng khớp"*. | ✅ Pass |
| **TC07** | Đăng ký với Email đã tồn tại | Đăng ký lại bằng Email đã có trên hệ thống. | Hiển thị Toast thông báo lỗi *"Email already exists"*. | ✅ Pass |
| **TC08** | Đăng ký thành công | Nhập Email hợp lệ + Mật khẩu chuẩn `Password123!` | Hiển thị Toast **`Successfully`**, tự động chuyển sang trang Login, đồng thời lưu thông tin vào Firestore. | ✅ Pass |

---

## 🔒 2. Màn hình Đăng nhập (Login Page - `/login`)

| STT | Tên Test Case | Các bước thực hiện | Kết quả mong đợi (Expected Result) | Trạng thái |
| :--- | :--- | :--- | :--- | :---: |
| **TC09** | Bỏ trống ô đăng nhập | Bấm nút **Đăng nhập** khi chưa điền thông tin. | Báo lỗi bắt buộc nhập Email và Password. | ✅ Pass |
| **TC10** | Đăng nhập Email không tồn tại | Nhập Email chưa đăng ký -> Bấm Đăng nhập. | Hiển thị Toast thông báo lỗi *"User not found"*. | ✅ Pass |
| **TC11** | Đăng nhập sai Mật khẩu | Nhập Email đúng + Mật khẩu sai. | Hiển thị Toast thông báo lỗi *"Wrong password"*. | ✅ Pass |
| **TC12** | Đăng nhập thành công | Nhập đúng Email + Mật khẩu đã đăng ký. | Hiển thị Toast đăng nhập thành công, lưu User vào Context API và chuyển sang trang Profile. | ✅ Pass |
| **TC13** | Ẩn/Hiện mật khẩu | Bấm vào biểu tượng Con mắt ở ô Mật khẩu. | Mật khẩu chuyển đổi linh hoạt giữa dạng ẩn `••••••` và chữ rõ. | ✅ Pass |
| **TC14** | Quên mật khẩu | Nhập Email -> Bấm link **Quên mật khẩu?** | Gửi email chứa link khôi phục mật khẩu từ Firebase Auth về hộp thư của user. | ✅ Pass |

---

## 👤 3. Màn hình Profile (Profile Page - `/profile`)

| STT | Tên Test Case | Các bước thực hiện | Kết quả mong đợi (Expected Result) | Trạng thái |
| :--- | :--- | :--- | :--- | :---: |
| **TC15** | Đọc dữ liệu Profile | Chuyển vào trang Profile sau khi Login. | Tải và hiển thị chính xác Avatar, Username, Email, Số điện thoại, Địa chỉ từ Cloud Firestore. | ✅ Pass |
| **TC16** | Khóa trường Email & UID | Xem các trường thông tin trong chế độ Edit. | Không cho phép chỉnh sửa UID và Email (Disabled). | ✅ Pass |
| **TC17** | Chỉnh sửa Profile thành công | Nhập Họ tên đệm, Tên, Số điện thoại, Địa chỉ -> Bấm **Save Profile**. | Cập nhật Firestore database, cập nhật giao diện lập tức, hiển thị Toast **`Profile updated successfully`**. | ✅ Pass |
| **TC18** | Đăng xuất | Bấm nút **Đăng xuất** ở thanh Navbar. | Đăng xuất phiên làm việc Firebase Auth, xóa Context user, chuyển về trang Login. | ✅ Pass |
| **TC19** | Bảo vệ tuyến đường (Protected Route) | Truy cập trực tiếp đường dẫn `/profile` khi chưa đăng nhập. | Tự động chuyển hướng về `/login`. | ✅ Pass |
