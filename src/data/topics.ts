export type ShapeKind = 'circle' | 'square' | 'triangle' | 'star' | 'heart';

export type Visual =
  | { kind: 'text'; text: string }
  | { kind: 'emoji'; emoji: string }
  | { kind: 'color'; hex: string }
  | { kind: 'shape'; shape: ShapeKind; color: string };

export interface LearnItem {
  id: string;
  /** Từ hiển thị chính trên thẻ, vd: "A", "1", "Màu đỏ", "Con mèo" */
  label: string;
  /** Từ ví dụ phụ, vd: "Áo", "Một" */
  sub?: string;
  subEmoji?: string;
  /** Dùng cho chủ đề đếm số: số lượng emoji minh họa */
  count?: number;
  countEmoji?: string;
  visual: Visual;
  /** Câu đọc phát âm tiếng Việt */
  speak: string;
  /** Nền riêng của thẻ (mặc định dùng gradient của chủ đề) */
  cardBg?: string;
  darkText?: boolean;
}

export interface Topic {
  id: string;
  name: string;
  icon: string;
  desc: string;
  gradient: string;
  items: LearnItem[];
}

export const TOPICS: Topic[] = [
  {
    id: 'chu-cai',
    name: 'Chữ cái',
    icon: '🔤',
    desc: 'Làm quen với các chữ cái',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    items: [
      { id: 'a', label: 'A', sub: 'Áo', subEmoji: '👕', visual: { kind: 'text', text: 'A' }, speak: 'A. Áo' },
      { id: 'ă', label: 'Ă', sub: 'Ăn', subEmoji: '🍚', visual: { kind: 'text', text: 'Ă' }, speak: 'Ă. Ăn cơm' },
      { id: 'â', label: 'Â', sub: 'Nhạc', subEmoji: '🎵', visual: { kind: 'text', text: 'Â' }, speak: 'Â. Âm nhạc' },
      { id: 'b', label: 'B', sub: 'Bóng', subEmoji: '⚽', visual: { kind: 'text', text: 'B' }, speak: 'Bê. Quả bóng' },
      { id: 'c', label: 'C', sub: 'Cá', subEmoji: '🐟', visual: { kind: 'text', text: 'C' }, speak: 'Xê. Con cá' }
    ]
  },
  {
    id: 'so-dem',
    name: 'Số đếm',
    icon: '🔢',
    desc: 'Tập đếm từ 1 đến 5',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    items: [
      { id: 'n1', label: '1', sub: 'Một', count: 1, countEmoji: '🍎', visual: { kind: 'text', text: '1' }, speak: 'Một' },
      { id: 'n2', label: '2', sub: 'Hai', count: 2, countEmoji: '🍎', visual: { kind: 'text', text: '2' }, speak: 'Hai' },
      { id: 'n3', label: '3', sub: 'Ba', count: 3, countEmoji: '🍎', visual: { kind: 'text', text: '3' }, speak: 'Ba' },
      { id: 'n4', label: '4', sub: 'Bốn', count: 4, countEmoji: '🍎', visual: { kind: 'text', text: '4' }, speak: 'Bốn' },
      { id: 'n5', label: '5', sub: 'Năm', count: 5, countEmoji: '🍎', visual: { kind: 'text', text: '5' }, speak: 'Năm' }
    ]
  },
  {
    id: 'mau-sac',
    name: 'Màu sắc',
    icon: '🎨',
    desc: 'Nhận biết các màu sắc',
    gradient: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
    items: [
      { id: 'do', label: 'Màu đỏ', visual: { kind: 'color', hex: '#ef4444' }, speak: 'Màu đỏ', cardBg: '#ef4444' },
      { id: 'vang', label: 'Màu vàng', visual: { kind: 'color', hex: '#facc15' }, speak: 'Màu vàng', cardBg: '#facc15', darkText: true },
      { id: 'xanh-la', label: 'Màu xanh lá', visual: { kind: 'color', hex: '#22c55e' }, speak: 'Màu xanh lá', cardBg: '#22c55e' },
      { id: 'xanh-duong', label: 'Màu xanh dương', visual: { kind: 'color', hex: '#3b82f6' }, speak: 'Màu xanh dương', cardBg: '#3b82f6' },
      { id: 'cam', label: 'Màu cam', visual: { kind: 'color', hex: '#fb923c' }, speak: 'Màu cam', cardBg: '#fb923c' }
    ]
  },
  {
    id: 'con-vat',
    name: 'Con vật',
    icon: '🐾',
    desc: 'Các con vật đáng yêu',
    gradient: 'linear-gradient(135deg, #22c55e 0%, #84cc16 100%)',
    items: [
      { id: 'meo', label: 'Con mèo', visual: { kind: 'emoji', emoji: '🐱' }, speak: 'Con mèo' },
      { id: 'cho', label: 'Con chó', visual: { kind: 'emoji', emoji: '🐶' }, speak: 'Con chó' },
      { id: 'ga', label: 'Con gà', visual: { kind: 'emoji', emoji: '🐔' }, speak: 'Con gà' },
      { id: 'vit', label: 'Con vịt', visual: { kind: 'emoji', emoji: '🦆' }, speak: 'Con vịt' },
      { id: 'ca', label: 'Con cá', visual: { kind: 'emoji', emoji: '🐟' }, speak: 'Con cá' }
    ]
  },
  {
    id: 'hinh-khoi',
    name: 'Hình khối',
    icon: '⭐',
    desc: 'Hình tròn, vuông, tam giác...',
    gradient: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
    items: [
      { id: 'tron', label: 'Hình tròn', visual: { kind: 'shape', shape: 'circle', color: '#f472b6' }, speak: 'Hình tròn' },
      { id: 'vuong', label: 'Hình vuông', visual: { kind: 'shape', shape: 'square', color: '#facc15' }, speak: 'Hình vuông' },
      { id: 'tam-giac', label: 'Hình tam giác', visual: { kind: 'shape', shape: 'triangle', color: '#4ade80' }, speak: 'Hình tam giác' },
      { id: 'sao', label: 'Hình ngôi sao', visual: { kind: 'shape', shape: 'star', color: '#fb923c' }, speak: 'Hình ngôi sao' },
      { id: 'trai-tim', label: 'Hình trái tim', visual: { kind: 'shape', shape: 'heart', color: '#ef4444' }, speak: 'Hình trái tim' }
    ]
  }
];
