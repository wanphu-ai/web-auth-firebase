# AuthHub - Hệ thống Đăng ký, Đăng nhập & Quản lý Profile với ReactJS & Firebase

Website Authentication & Profile chuyên nghiệp được xây dựng bằng **ReactJS (Vite)**, **Firebase Authentication**, **Cloud Firestore Database**, và **TailwindCSS**. Dự án được thiết kế theo kiến trúc chuẩn Clean Code, Component Reusable, Responsive hoàn hảo và bảo mật thông tin với Protected Route.

👉 **Demo Live Website**: [https://web-auth-firebase.vercel.app](https://web-auth-firebase.vercel.app)

---

## 🚀 Công nghệ sử dụng

* **Core**: ReactJS (Vite)
* **Routing**: React Router DOM (v6)
* **Authentication**: Firebase Authentication (Email/Password)
* **Database**: Firebase Cloud Firestore
* **Styling**: TailwindCSS (Modern Dark & Glassmorphism Design)
* **Form & Validation**: React Hook Form + Zod Validation
* **Notifications**: React Hot Toast
* **Icons**: Lucide React Icons

---

## 📂 Cấu trúc thư mục

```
src/
│
├── assets/                 # Hình ảnh và tài nguyên tĩnh
│
├── components/             # Reusable UI Components
│   ├── common/             # InputField, Button, etc.
│   ├── forms/              # Form components
│   └── layout/             # Navbar, Footer
│
├── pages/                  # Các trang màn hình chính
│   ├── Login/              # Trang Đăng nhập (LoginPage.jsx)
│   ├── Register/           # Trang Đăng ký (RegisterPage.jsx)
│   └── Profile/            # Trang Profile (ProfilePage.jsx)
│
├── routes/                 # Điều hướng & bảo mật tuyến đường
│   ├── ProtectedRoute.jsx  # Yêu cầu phải đăng nhập
│   └── PublicRoute.jsx     # Dành cho khách chưa đăng nhập
│
├── services/               # Xử lý logic API & Firebase
│   ├── authService.js      # Đăng ký, Đăng nhập, Đăng xuất
│   └── userService.js      # Đọc & Ghi dữ liệu Firestore
│
├── firebase/               # Khởi tạo và cấu hình Firebase SDK
│   └── firebaseConfig.js
│
├── hooks/                  # Custom React Hooks
│   └── useAuth.js
│
├── contexts/               # React Context API Quản lý State Auth
│   └── AuthContext.jsx
│
├── validations/            # Zod validation schemas
│   └── authSchema.js
│
├── utils/                  # Helper utilities (Chuyển đổi lỗi Firebase)
│   └── firebaseErrorMessages.js
│
├── App.jsx                 # Cấu hình Route chính & Toast Provider
└── main.jsx                # Entry point của ứng dụng
```

---

## 🛠️ Cài đặt & Chạy ứng dụng Local

### 1. Yêu cầu chuẩn bị
* Node.js phiên bản >= 18.0.0
* npm hoặc yarn

### 2. Cài đặt các thư viện
mở terminal tại thư mục dự án và chạy:
```bash
npm install
```

### 3. Cấu hình Biến môi trường Firebase (.env)
Tạo file `.env` tại thư mục gốc của dự án với các thông số từ Firebase Console của bạn:
```env
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID
```

### 4. Chạy dự án ở môi trường Local
```bash
npm run dev
```
Truy cập địa chỉ `http://localhost:5173` trên trình duyệt.

---

## 📜 Hướng dẫn Cấu hình Firebase Chi tiết (Chi tiết từng bước)

1. **Tạo Firebase Project**:
   * Truy cập [Firebase Console](https://console.firebase.google.com/).
   * Nhấn **Add Project** (Tạo dự án mới), đặt tên cho dự án và nhấn **Continue**.

2. **Enable Authentication**:
   * Vào menu bên trái chọn **Build** -> **Authentication**.
   * Nhấn **Get Started**.
   * Tại tab **Sign-in method**, chọn **Email/Password**.
   * Bật công tắc **Enable** ở mục đầu tiên và chọn **Save**.

3. **Tạo Cloud Firestore Database**:
   * Vào menu **Build** -> **Firestore Database**.
   * Nhấn **Create database**, chọn vị trí server (location) phù hợp và nhấn **Next**.
   * Chọn chế độ **Start in test mode** (sau đó cập nhật Security Rules bên dưới).

4. **Cấu hình Firestore Security Rules**:
   Tại tab **Rules** trong Firestore Database, cập nhật quy tắc bảo mật như sau:
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /users/{userId} {
         allow read: if request.auth != null;
         allow write: if request.auth != null && request.auth.uid == userId;
       }
     }
   }
   ```

5. **Lấy thông số Firebase Config**:
   * Nhấn vào biểu tượng Bánh răng (Project Settings) ở menu góc trên bên trái.
   * Tại mục **Your apps**, chọn biểu tượng **Web (`</>`)**.
   * Đặt tên ứng dụng và nhấn **Register app**.
   * Sao chép các đoạn mã trong `firebaseConfig` dán vào file `.env` hoặc file `src/firebase/firebaseConfig.js`.

---

## 🚀 Hướng dẫn Deploy lên Vercel

1. **Đẩy mã nguồn lên GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: authentication system"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Kết nối dự án với Vercel**:
   * Đăng nhập vào [Vercel](https://vercel.com/).
   * Nhấn **Add New...** -> **Project**.
   * Chọn Repository từ GitHub của bạn và chọn **Import**.

3. **Cấu hình Environment Variables trên Vercel**:
   * Trong phần thiết lập Project trên Vercel, mở mục **Environment Variables**.
   * Thêm toàn bộ các biến trong file `.env` (`VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, etc.).

4. **Build & Deploy**:
   * Framework Preset: Chọn **Vite**.
   * Nhấn **Deploy**.

5. **Xử lý lỗi Refresh Route khi dùng React Router DOM trên Vercel**:
   * Dự án đã được tạo sẵn file `vercel.json` ở thư mục gốc để điều hướng toàn bộ request về `index.html`. Tránh lỗi `404 Not Found` khi người dùng refresh ở các route như `/profile` hay `/register`.

---

## 🧪 Quy trình Kiểm thử (Testing Checklist)

1. **Test Register**:
   * Thử nhập Email sai định dạng -> Kiểm tra thông báo lỗi.
   * Thử nhập Mật khẩu chưa đủ 8 ký tự, thiếu chữ hoa hoặc ký tự đặc biệt -> Báo lỗi "Password is too weak".
   * Thử nhập Mật khẩu xác nhận không khớp -> Báo lỗi không trùng.
   * Đăng ký thành công -> Nhận toast "Successfully" và chuyển sang trang Đăng nhập.
2. **Test Login**:
   * Nhập sai Email / Sai Mật khẩu -> Hiển thị toast lỗi chuẩn từ Firebase.
   * Đăng nhập thành công -> Nhận toast thành công và tự động chuyển sang trang Profile.
3. **Test Update Profile**:
   * Tại trang Profile, bấm nút **Edit Profile**.
   * Chỉnh sửa Họ và tên đệm, Tên, Số điện thoại, Địa chỉ.
   * Bấm **Save Profile** -> Dữ liệu cập nhật ngay lập tức vào Firestore và hiển thị trên giao diện, hiển thị toast "Profile updated successfully".
