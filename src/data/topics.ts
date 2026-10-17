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
    desc: 'Học 29 chữ cái tiếng Việt',
    gradient: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
    items: [
      { id: 'a', label: 'A', sub: 'Áo', subEmoji: '👕', visual: { kind: 'text', text: 'A' }, speak: 'A. Áo' },
      { id: 'ă', label: 'Ă', sub: 'Ăn', subEmoji: '🍚', visual: { kind: 'text', text: 'Ă' }, speak: 'Ă. Ăn cơm' },
      { id: 'â', label: 'Â', sub: 'Nhạc', subEmoji: '🎵', visual: { kind: 'text', text: 'Â' }, speak: 'Â. Âm nhạc' },
      { id: 'b', label: 'B', sub: 'Bóng', subEmoji: '⚽', visual: { kind: 'text', text: 'B' }, speak: 'Bê. Quả bóng' },
      { id: 'c', label: 'C', sub: 'Cá', subEmoji: '🐟', visual: { kind: 'text', text: 'C' }, speak: 'Xê. Con cá' },
      { id: 'd', label: 'D', sub: 'Diều', subEmoji: '🪁', visual: { kind: 'text', text: 'D' }, speak: 'Dê. Con diều' },
      { id: 'đ', label: 'Đ', sub: 'Đèn', subEmoji: '💡', visual: { kind: 'text', text: 'Đ' }, speak: 'Đê. Cái đèn' },
      { id: 'e', label: 'E', sub: 'Ếch', subEmoji: '🐸', visual: { kind: 'text', text: 'E' }, speak: 'E. Con ếch' },
      { id: 'ê', label: 'Ê', sub: 'Bể', subEmoji: '🐠', visual: { kind: 'text', text: 'Ê' }, speak: 'Ê. Bể cá' },
      { id: 'g', label: 'G', sub: 'Gà', subEmoji: '🐔', visual: { kind: 'text', text: 'G' }, speak: 'Gờ. Con gà' },
      { id: 'h', label: 'H', sub: 'Hoa', subEmoji: '🌸', visual: { kind: 'text', text: 'H' }, speak: 'Hắt. Bông hoa' },
      { id: 'i', label: 'I', sub: 'Im', subEmoji: '🤫', visual: { kind: 'text', text: 'I' }, speak: 'I. Im lặng' },
      { id: 'k', label: 'K', sub: 'Kẹo', subEmoji: '🍬', visual: { kind: 'text', text: 'K' }, speak: 'Ca. Cái kẹo' },
      { id: 'l', label: 'L', sub: 'Lá', subEmoji: '🍃', visual: { kind: 'text', text: 'L' }, speak: 'E lờ. Chiếc lá' },
      { id: 'm', label: 'M', sub: 'Mèo', subEmoji: '🐱', visual: { kind: 'text', text: 'M' }, speak: 'Em mờ. Con mèo' },
      { id: 'n', label: 'N', sub: 'Nón', subEmoji: '👒', visual: { kind: 'text', text: 'N' }, speak: 'En nờ. Cái nón' },
      { id: 'o', label: 'O', sub: 'Ong', subEmoji: '🐝', visual: { kind: 'text', text: 'O' }, speak: 'O. Con ong' },
      { id: 'ô', label: 'Ô', sub: 'Ô tô', subEmoji: '🚗', visual: { kind: 'text', text: 'Ô' }, speak: 'Ô. Ô tô' },
      { id: 'ơ', label: 'Ơ', sub: 'Ơn', subEmoji: '🙏', visual: { kind: 'text', text: 'Ơ' }, speak: 'Ơ. Cảm ơn' },
      { id: 'p', label: 'P', sub: 'Pin', subEmoji: '🔋', visual: { kind: 'text', text: 'P' }, speak: 'Pê. Cục pin' },
      { id: 'q', label: 'Q', sub: 'Quả', subEmoji: '🍎', visual: { kind: 'text', text: 'Q' }, speak: 'Cu. Quả táo' },
      { id: 'r', label: 'R', sub: 'Rùa', subEmoji: '🐢', visual: { kind: 'text', text: 'R' }, speak: 'E rờ. Con rùa' },
      { id: 's', label: 'S', sub: 'Sữa', subEmoji: '🥛', visual: { kind: 'text', text: 'S' }, speak: 'Ét sờ. Sữa' },
      { id: 't', label: 'T', sub: 'Tay', subEmoji: '👋', visual: { kind: 'text', text: 'T' }, speak: 'Tê. Bàn tay' },
      { id: 'u', label: 'U', sub: 'Uống', subEmoji: '🥤', visual: { kind: 'text', text: 'U' }, speak: 'U. Uống nước' },
      { id: 'ư', label: 'Ư', sub: 'Ướt', subEmoji: '💧', visual: { kind: 'text', text: 'Ư' }, speak: 'Ư. Bị ướt' },
      { id: 'v', label: 'V', sub: 'Vịt', subEmoji: '🦆', visual: { kind: 'text', text: 'V' }, speak: 'Vê. Con vịt' },
      { id: 'x', label: 'X', sub: 'Xe đạp', subEmoji: '🚲', visual: { kind: 'text', text: 'X' }, speak: 'Ích. Xe đạp' },
      { id: 'y', label: 'Y', sub: 'Yêu', subEmoji: '❤️', visual: { kind: 'text', text: 'Y' }, speak: 'I grét. Yêu thương' }
    ]
  },
  {
    id: 'so-dem',
    name: 'Số đếm',
    icon: '🔢',
    desc: 'Tập đếm từ 1 đến 20',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    items: [
      { id: 'n1', label: '1', sub: 'Một', count: 1, countEmoji: '🍎', visual: { kind: 'text', text: '1' }, speak: 'Một' },
      { id: 'n2', label: '2', sub: 'Hai', count: 2, countEmoji: '🍎', visual: { kind: 'text', text: '2' }, speak: 'Hai' },
      { id: 'n3', label: '3', sub: 'Ba', count: 3, countEmoji: '🍎', visual: { kind: 'text', text: '3' }, speak: 'Ba' },
      { id: 'n4', label: '4', sub: 'Bốn', count: 4, countEmoji: '🍎', visual: { kind: 'text', text: '4' }, speak: 'Bốn' },
      { id: 'n5', label: '5', sub: 'Năm', count: 5, countEmoji: '🍎', visual: { kind: 'text', text: '5' }, speak: 'Năm' },
      { id: 'n6', label: '6', sub: 'Sáu', count: 6, countEmoji: '🍎', visual: { kind: 'text', text: '6' }, speak: 'Sáu' },
      { id: 'n7', label: '7', sub: 'Bảy', count: 7, countEmoji: '🍎', visual: { kind: 'text', text: '7' }, speak: 'Bảy' },
      { id: 'n8', label: '8', sub: 'Tám', count: 8, countEmoji: '🍎', visual: { kind: 'text', text: '8' }, speak: 'Tám' },
      { id: 'n9', label: '9', sub: 'Chín', count: 9, countEmoji: '🍎', visual: { kind: 'text', text: '9' }, speak: 'Chín' },
      { id: 'n10', label: '10', sub: 'Mười', count: 10, countEmoji: '🍎', visual: { kind: 'text', text: '10' }, speak: 'Mười' },
      { id: 'n11', label: '11', sub: 'Mười một', count: 11, countEmoji: '🍎', visual: { kind: 'text', text: '11' }, speak: 'Mười một' },
      { id: 'n12', label: '12', sub: 'Mười hai', count: 12, countEmoji: '🍎', visual: { kind: 'text', text: '12' }, speak: 'Mười hai' },
      { id: 'n13', label: '13', sub: 'Mười ba', count: 13, countEmoji: '🍎', visual: { kind: 'text', text: '13' }, speak: 'Mười ba' },
      { id: 'n14', label: '14', sub: 'Mười bốn', count: 14, countEmoji: '🍎', visual: { kind: 'text', text: '14' }, speak: 'Mười bốn' },
      { id: 'n15', label: '15', sub: 'Mười lăm', count: 15, countEmoji: '🍎', visual: { kind: 'text', text: '15' }, speak: 'Mười lăm' },
      { id: 'n16', label: '16', sub: 'Mười sáu', count: 16, countEmoji: '🍎', visual: { kind: 'text', text: '16' }, speak: 'Mười sáu' },
      { id: 'n17', label: '17', sub: 'Mười bảy', count: 17, countEmoji: '🍎', visual: { kind: 'text', text: '17' }, speak: 'Mười bảy' },
      { id: 'n18', label: '18', sub: 'Mười tám', count: 18, countEmoji: '🍎', visual: { kind: 'text', text: '18' }, speak: 'Mười tám' },
      { id: 'n19', label: '19', sub: 'Mười chín', count: 19, countEmoji: '🍎', visual: { kind: 'text', text: '19' }, speak: 'Mười chín' },
      { id: 'n20', label: '20', sub: 'Hai mươi', count: 20, countEmoji: '🍎', visual: { kind: 'text', text: '20' }, speak: 'Hai mươi' }
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
