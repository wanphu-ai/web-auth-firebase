# Kỹ Năng Kỹ Thuật (Skill Matrix) - AuthHub Project

Tài liệu này tổng hợp toàn bộ các kỹ năng lập trình Frontend, Bảo mật và Quản lý Cơ sở dữ liệu được áp dụng thực tế trong dự án xây dựng Website Authentication.

---

## 🎨 Frontend Development

### ReactJS
* **Functional Components & Custom Hooks**: Xây dựng cấu trúc component hướng đối tượng sạch sẽ, áp dụng custom hooks (`useAuth`).
* **State Management & Context API**: Sử dụng `AuthContext` quản lý trạng thái xác thực toàn cục (`currentUser`, `userProfile`, `loading`) kết hợp với `onAuthStateChanged` từ Firebase.
* **Component Architecture**: Phân tách rõ ràng giữa Component dùng chung (`InputField`, `Button`), Component Bố cục (`Navbar`), và trang chính (`LoginPage`, `RegisterPage`, `ProfilePage`).

### React Router DOM (v6)
* **SPA Routing**: Cấu hình điều hướng ứng dụng trang đơn mà không cần reload.
* **Route Guards (Protected & Public Route)**:
  * `ProtectedRoute`: Ngăn chặn truy cập trái phép vào trang `/profile` khi chưa đăng nhập.
  * `PublicRoute`: Tự động điều hướng người dùng đã đăng nhập sang `/profile` khi cố truy cập `/login` hoặc `/register`.

### TailwindCSS & Responsive Design
* **Glassmorphism Design System**: Sử dụng hiệu ứng mờ kính (`backdrop-blur-xl`), dải màu gradient sống động, shadow phát sáng và các bo góc bo tròn hiện đại.
* **Mobile-First Responsive**: Thiết kế tối ưu hiển thị mượt mà trên tất cả các màn hình (Mobile, Tablet, Desktop) sử dụng các breakpoint `sm:`, `md:`, `lg:`.

---

## 📝 Form Handling & Validation

### React Hook Form
* Quản lý trạng thái form hiệu quả mà không gây re-render dư thừa.
* Tích hợp mượt mà với các component UI tùy chỉnh thông qua `forwardRef`.

### Zod Validation
* Viết Schema kiểm tra dữ liệu đầu vào mạnh mẽ (`authSchema.js`):
  * **Email**: Bắt buộc và đúng định dạng RFC.
  * **Password**: Tối thiểu 8 ký tự, chứa ít nhất 1 chữ hoa, 1 chữ thường và 1 ký tự đặc biệt theo chuẩn Regex `/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/`.
  * **Confirm Password**: Tự động so sánh kiểm tra sự trùng khớp với ô Password bằng hàm `.refine()`.
  * **Profile Edit**: Kiểm tra định dạng số điện thoại và tính bắt buộc của địa chỉ, họ tên.

---

## 🔒 Authentication & Database

### Firebase Authentication
* Đăng ký tài khoản mới (`createUserWithEmailAndPassword`).
* Đăng nhập người dùng (`signInWithEmailAndPassword`).
* Quản lý phiên làm việc tự động với Token và hàm lắng nghe sự thay đổi trạng thái (`onAuthStateChanged`).
* Khôi phục mật khẩu qua Email (`sendPasswordResetEmail`).
* Xử lý và chuẩn hóa toàn bộ mã lỗi từ Firebase Auth (`auth/invalid-email`, `auth/wrong-password`, `auth/email-already-in-use`, v.v.) sang thông báo tiếng Anh/Việt thân thiện.

### Firebase Cloud Firestore Database
* Cấu trúc Document-Collection chuẩn xác theo đúng yêu cầu:
  ```json
  Collection: "users"
  Document ID: "uid"
  {
    "uid": "string",
    "email": "string",
    "username": "string",
    "avatar": "string",
    "firstName": "string",
    "lastName": "string",
    "phone": "string",
    "address": "string",
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  }
  ```
* Thực thi thao tác bất đồng bộ đọc (`getDoc`), ghi lần đầu (`setDoc`), và cập nhật (`updateDoc`) với `serverTimestamp()`.

---

## 🚀 Deployment & DevOps

### Deployment (Vercel)
* Tối ưu build artifact ứng dụng Single Page Application (SPA) bằng Vite.
* Cấu hình Environment Variables (`.env`) bảo mật API Keys.
* Thiết lập `vercel.json` rewrite để xử lý triệt để lỗi 404 khi làm mới trang (refresh) ở các đường dẫn động.

### Git & GitHub Workflow
* Quản lý phiên bản mã nguồn chuyên nghiệp với Git.
* Đặt tên commit tuân thủ quy chuẩn Conventional Commits:
  * `feat: authentication system`
  * `feat: firebase integration`
  * `feat: profile management`
  * `style: responsive UI`
  * `docs: add README and Skill`
