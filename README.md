# USER_MANAGEMENT

## Mô tả dự án backend dùng Nodejs, Express, Mongoose, JSON Web Token và Bcrypt

**Mục tiêu:**

Dự án này hướng đến việc xây dựng một backend API RESTful đầy đủ chức năng với Nodejs, Express, Mongoose, JSON Web Token và Bcrypt. 

**Công nghệ:**

* **Nodejs:** Nền tảng Javascript để phát triển ứng dụng web server-side.
* **Express:** Framework Javascript nhẹ và linh hoạt để xây dựng API.
* **Mongoose:** ODM (Object Document Mapper) giúp thao tác với MongoDB dễ dàng hơn.
* **JSON Web Token (JWT):** Tiêu chuẩn mã hóa token để xác thực và ủy quyền người dùng.
* **Bcrypt:** Thư viện mã hóa mật khẩu an toàn.

**Tính năng:**

* Quản lý người dùng:
    * Đăng ký
    * Đăng nhập
    * Quên mật khẩu
    * Cập nhật thông tin
* Quản lý quyền truy cập:
    * Phân quyền dựa trên vai trò
    * Sử dụng JWT để xác thực và ủy quyền
* Xử lý lỗi:
    * Trả về thông báo lỗi chi tiết
    * Ghi nhật ký lỗi

**Cấu trúc thư mục:**
```
└── server.js
└── src
    ├── config
    │   └── connect.js
    ├── controllers
    │   └── auth.controller.js
    │   └── user.controller.js
    ├── models
    │   └── user.model.js
    ├── routes
    │   └── auth.route.js
    │   └── user.route.js
    └── utils
        └── jwt.service.js
        └── http.service.js
```


**Hướng dẫn cài đặt:**

1. Cài đặt Nodejs và yarn.
2. Khởi tạo dự án mới với `yarn init`.
3. Cài đặt các thư viện phụ thuộc:

```yarn add mongoose bcrypt-nodejs jsonwebtoken morgan passport passport-jwt```

4. Cấu hình database MongoDB.
5. Chạy với nodemon `yarn dev`.
6. Khởi tạo server với `yarn start`.

**Sử dụng Postman:**

1. Cài đặt Postman.
2. Tạo request mới với phương thức POST và địa chỉ API.
3. Gửi request và kiểm tra kết quả.

**Lưu ý:**

* Cấu hình database và mật khẩu cần được bảo mật.
* Nên sử dụng HTTPS để bảo vệ API.
* Tham khảo tài liệu chính thức của các thư viện để sử dụng hiệu quả.

**Tài liệu tham khảo:**

* Nodejs: [https://nodejs.org/en](https://nodejs.org/en)
* Express: [https://expressjs.com/](https://expressjs.com/)
* Mongoose: [https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/](https://www.mongodb.com/developer/languages/javascript/getting-started-with-mongodb-and-mongoose/)
* JSON Web Token: [https://jwt.io/](https://jwt.io/)
* Bcrypt: [https://www.npmjs.com/package/bcrypt](https://www.npmjs.com/package/bcrypt)
* Xác thực REST API của Node, Express, Mongoose và Passport.js: [https://viblo.asia/p/xac-thuc-rest-api-cua-node-express-mongoose-va-passportjs-YWOZrxnY5Q0](https://viblo.asia/p/xac-thuc-rest-api-cua-node-express-mongoose-va-passportjs-YWOZrxnY5Q0)


