# 🎈 Bé Học Vui — Website học tập cho trẻ nhỏ

Website học tập vui nhộn dành cho trẻ nhỏ, xây dựng bằng **React 19 + Rsbuild +
Tailwind CSS 4**. Giao diện thẻ dùng component
[Bounce Cards](https://reactbits.dev/components/bounce-cards) của React Bits:
các thẻ nảy vào với hiệu ứng vật lý lò xo, xòe ra khi di chuột/chạm vào.

## Nội dung học

| Chủ đề    | Nội dung                          |
| --------- | --------------------------------- |
| 🔤 Chữ cái | A, Ă, Â, B, C kèm từ ví dụ        |
| 🔢 Số đếm  | Đếm 1–5 với minh họa trực quan    |
| 🎨 Màu sắc | Đỏ, vàng, xanh lá, xanh dương, cam |
| 🐾 Con vật | Mèo, chó, gà, vịt, cá             |
| ⭐ Hình khối | Tròn, vuông, tam giác, sao, tim |

Nhấn vào thẻ để mở chi tiết và **nghe phát âm tiếng Việt** (Web Speech API).

## Setup

```bash
npm install
```

## Get started

```bash
npm run dev      # chạy dev server tại http://localhost:3000
npm run build    # build production
npm run preview  # xem thử bản production
```

## Thêm nội dung mới

Sửa file `src/data/topics.ts` — thêm `Topic` hoặc `LearnItem` mới, website tự
động hiển thị mà không cần sửa giao diện.
