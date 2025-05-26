# HealthFitness

Dự án **HealthFitness** của Nhóm 7 gồm hai phần:

- **Backend**: Spring Boot (Java 17+)
- **Frontend**: ReactJS (TypeScript)

---


## 1. Yêu cầu cài đặt (Prerequisites)

- **Java 17+** và thiết lập biến môi trường `JAVA_HOME`  
- **Maven 3.6+** (nếu dùng Maven) hoặc **Gradle** (nếu dùng Gradle)  
- **Node.js v16+** & **npm**  
- **MongoDB** (chạy local tại `mongodb://localhost:27017`)

---

## 2. Tải project về máy

1. Truy cập trang GitHub của dự án:
2. Nhấn nút **Code** → **Download ZIP**  
3. Giải nén file `.zip` vào thư mục bạn muốn, ví dụ `D:\MNM\my-project_nhom7`

---

## 3. Chạy Backend (Spring Boot)

1. Mở terminal (PowerShell hoặc cmd), di chuyển vào thư mục backend:  

    cd `my-project_nhom7\backend\healthfitness`

2. Cài phụ thuộc và build:

  `mvn clean install`
  
3. Khởi động server:

  `mvn spring-boot:run`

## 4. Chạy Frontend (ReactJS)
1 .Mở terminal mới, di chuyển vào thư mục frontend:

cd `my-project_nhom7\frontend\reactjs\healthfitness`

2 .Cài đặt các gói npm:

`npm install`

3. Khởi động ứng dụng:

`npm start`






