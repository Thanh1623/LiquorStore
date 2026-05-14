# Spec: Category Image Support
Date: 2026-05-14

## Mục tiêu
Cho phép quản lý ảnh đại diện cho từng Category để hiển thị sinh động tại trang chủ.

## Thay đổi dự kiến
1. **Database (Prisma):** Thêm field `imageUrl String?` vào model `Category`.
2. **Backend/API:**
   - Cập nhật DTO/API endpoints để bao gồm `imageUrl` khi fetch categories.
   - Cập nhật logic upload ảnh (hoặc URL ảnh) trong Admin Panel khi tạo/cập nhật category.
3. **Frontend (Admin):**
   - Thêm input field để nhập URL ảnh (hoặc file upload) vào form tạo/sửa Category.
4. **Frontend (User/Homepage):**
   - Cập nhật component hiển thị danh sách category tại trang chủ để sử dụng `imageUrl` mới thay vì hardcode.

## Quy trình thực hiện
1. Migration database.
2. Cập nhật các service/API liên quan.
3. Cập nhật Admin UI.
4. Cập nhật Home UI.
5. Test kiểm tra.
