/**
 * Danh sách id các thẻ ĐÃ CÓ file giọng đọc thu sẵn.
 *
 * Quy ước: file `public/audio/<id>.mp3` — ví dụ thẻ id 'b' dùng file
 * `public/audio/b.mp3` với nội dung đọc đúng chuỗi `speak` của thẻ đó.
 *
 * Khi user gửi file mp3 mới, thêm id vào Set này rồi push.
 * Thẻ nào chưa có file sẽ tự dùng giọng TTS của trình duyệt.
 */
export const AUDIO_IDS = new Set<string>([
  // ví dụ: 'b', 'n1',
]);
