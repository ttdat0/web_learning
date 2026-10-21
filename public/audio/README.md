# Thư mục giọng đọc thu sẵn

## Cách dùng (rất đơn giản)
1. Thu/xuất giọng đọc bằng CapCut (xem `DANH_SACH.txt` để biết 189 câu cần thu).
2. Đặt tên file đúng theo id: `<id>.mp3` — ví dụ `b.mp3`, `n1.mp3`, `do.mp3`.
3. Copy file mp3 vào thẳng thư mục này (`public/audio/`).
4. `git add`, `git commit`, `git push` như bình thường.

Không cần sửa code gì thêm — app tự phát hiện file có hay chưa:
thẻ nào có mp3 thì phát file, thẻ nào chưa có thì dùng giọng máy.

Có thể làm từng đợt (ví dụ 29 chữ cái trước), app nhận đúng những file đã có.
