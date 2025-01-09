### GIỚI THIỆU PROJECT

Đây là project xây dựng website để quản lí một nhà thuốc bán lẻ. Hỗ trợ việc tìm kiếm mua bán, một cách nhanh chóng và thuận tiện cho các nhà thuốc bán lẻ nhỏ với 1 quản lý.
Project còn là đồ án môn học NMCNPM lớp 22_1/HCMUS với sự đóng góp của các thành viên:

- Trương Dương Anh Tú (22120402)
- Nông Quốc Việt (22120432)
- Lê Quang Vinh (22120433)
- Nguyễn Quang Vũ (22120440)
- Nguyễn Văn Vũ (22120442)

### CÁC CHỨC NĂNG VÀ CÁCH SỬ DỤNG

Các role user chính:

- Guest: bất kỳ ai truy cập vào trang web
- Admin: người quản lý nhà thuốc

Trang web gồm các màn hình chính:

- Trang chủ: Hiện thông tin các dược phẩm 
- Thông tin chi tiết của người dùng: hiện thông tin của người dung có thể sửa ( yêu cầu đăng nhập)
- Quản lý: dành cho quản lý( yêu cầu đăng nhập) , có thể thực hiện các thao tác thêm, xóa, sửa với người dung và sản phẩm.


### THIẾT KẾ KIẾN TRÚC
Tổng quan:
-	Áp dụng kiến trúc MVC : Phân tách logic hiển thị (View), logic điều khiển (Controller), và logic xử lý dữ liệu (Model)
-	Hỗ trợ cơ chế plugin thanh toán Paypal
Chi tiết :  (Xem rõ nét hơn ở [đây](https://www.figma.com/design/PWMPWzKTRswU7ngkBfr8WJ/The-C4-model-for-Figma-(Community)?node-id=103-401&p=f))
Context Diagram:

![Alt text](./contextDiagram.png)

Container Diagram:

![Alt text](./containerDiagram.png)

Component Diagram:

![Alt text](./componentDiagram.png)

### THIẾT KẾ DỮ LIỆU
Sơ dồ dữ liệu:

![Alt text](./so_do_du_lieu.png)

-	Cơ sở dữ liệu được sử dụng là MONGODB.
-	Dữ liệu lưu trữ dữ định dạng JSON.
-	Các file image sẽ được lưu dưới dạng base64 encoding/ decoding.

### HƯỚNG DẪN CÀI ĐẶT
- Tải source code bên Backend :
  
```terminal
git clone --branch Backend https://github.com/WangDinhk/HealthIsGold.git
```
- Tải source code bên Frontend :
```terminal
git clone --branch Frontend https://github.com/WangDinhk/HealthIsGold.git
```

- Cài đặt các dependency: 

```terminal
npm install
```
- Cấu hình file .env bên Backend với thông tin sau:
```terminal
PORT=3001
MONGO_DB=mongodb+srv://nguyenvanvu060104:12345@cluster0.mz66r.mongodb.net/
BCRYPT_SALT_ROUNDS=10
ACCESS_TOKEN=G5k!7hT@3vP9wR%yD4bN2xQ&uJ8zA*1kL3fM0qZ$eB6jS
REFRESH_TOKEN=G6^kJh8q$6g3@!H2aM3^pZn!8$hH
```
- Khởi chạy dự án:
+ Mở terminal bên Backend trước và chạy câu lệnh:  
```terminal
npm start
```

+ Mở terminal bên Frontend và chạy câu lệnh: 
```terminal
npm start
```
### HƯỚNG DẪN TRIỂN KHAI
- Triển khai trên môi trường cục bộ (local): 
- Truy cập vào localhost: http://localhost:3001
