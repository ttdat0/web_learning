# Giọng đọc thu sẵn

Đặt file mp3 vào thư mục này, tên file = id của thẻ. Ví dụ:
- Thẻ chữ B (id `b`) → `b.mp3` (nội dung: "Bờ. Quả bóng")
- Thẻ số 1 (id `n1`) → `n1.mp3` (nội dung: "Một")

Sau khi thêm file, nhớ thêm id vào `AUDIO_IDS` trong
`src/lib/audioManifest.ts` để app dùng file thay cho giọng TTS.
