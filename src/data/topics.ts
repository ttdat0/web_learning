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
  /** Chữ in hoa đặt ở góc thẻ (danh mục chữ cái) — vd: "G" khi chữ giữa là "g" */
  corner?: string;
  /** Từ ví dụ phụ, vd: "Áo", "Một" */
  sub?: string;
  subEmoji?: string;
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
      { id: 'a', label: 'A', corner: 'A', sub: 'Ao', subEmoji: '🏞️', visual: { kind: 'text', text: 'a' }, speak: 'A. Cái ao' },
      { id: 'ă', label: 'Ă', corner: 'Ă', sub: 'Ăn', subEmoji: '🍚', visual: { kind: 'text', text: 'ă' }, speak: 'Ă. Ăn cơm' },
      { id: 'â', label: 'Â', corner: 'Â', sub: 'Âm nhạc', subEmoji: '🎵', visual: { kind: 'text', text: 'â' }, speak: 'Â. Âm nhạc' },
      { id: 'b', label: 'B', corner: 'B', sub: 'Bóng', subEmoji: '⚽', visual: { kind: 'text', text: 'b' }, speak: 'Bờ. Quả bóng' },
      { id: 'c', label: 'C', corner: 'C', sub: 'Cá', subEmoji: '🐟', visual: { kind: 'text', text: 'c' }, speak: 'Cờ. Con cá' },
      { id: 'd', label: 'D', corner: 'D', sub: 'Diều', subEmoji: '🪁', visual: { kind: 'text', text: 'd' }, speak: 'Dờ. Con diều' },
      { id: 'đ', label: 'Đ', corner: 'Đ', sub: 'Đèn', subEmoji: '💡', visual: { kind: 'text', text: 'đ' }, speak: 'Đờ. Cái đèn' },
      { id: 'e', label: 'E', corner: 'E', sub: 'Em bé', subEmoji: '👶', visual: { kind: 'text', text: 'e' }, speak: 'E. Em bé' },
      { id: 'ê', label: 'Ê', corner: 'Ê', sub: 'Ê!', subEmoji: '👋', visual: { kind: 'text', text: 'ê' }, speak: 'Ê. Ê!' },
      { id: 'g', label: 'G', corner: 'G', sub: 'Gà', subEmoji: '🐔', visual: { kind: 'text', text: 'g' }, speak: 'Gờ. Con gà' },
      { id: 'h', label: 'H', corner: 'H', sub: 'Hoa', subEmoji: '🌸', visual: { kind: 'text', text: 'h' }, speak: 'Hờ. Bông hoa' },
      { id: 'i', label: 'I', corner: 'I', sub: 'Im', subEmoji: '🤫', visual: { kind: 'text', text: 'i' }, speak: 'I. Im lặng' },
      { id: 'k', label: 'K', corner: 'K', sub: 'Kẹo', subEmoji: '🍬', visual: { kind: 'text', text: 'k' }, speak: 'Cờ. Cái kẹo' },
      { id: 'l', label: 'L', corner: 'L', sub: 'Lá', subEmoji: '🍃', visual: { kind: 'text', text: 'l' }, speak: 'Lờ. Chiếc lá' },
      { id: 'm', label: 'M', corner: 'M', sub: 'Mèo', subEmoji: '🐱', visual: { kind: 'text', text: 'm' }, speak: 'Mờ. Con mèo' },
      { id: 'n', label: 'N', corner: 'N', sub: 'Nón', subEmoji: '👒', visual: { kind: 'text', text: 'n' }, speak: 'Nờ. Cái nón' },
      { id: 'o', label: 'O', corner: 'O', sub: 'Ong', subEmoji: '🐝', visual: { kind: 'text', text: 'o' }, speak: 'O. Con ong' },
      { id: 'ô', label: 'Ô', corner: 'Ô', sub: 'Ô tô', subEmoji: '🚗', visual: { kind: 'text', text: 'ô' }, speak: 'Ô. Ô tô' },
      { id: 'ơ', label: 'Ơ', corner: 'Ơ', sub: 'Ơn', subEmoji: '🙏', visual: { kind: 'text', text: 'ơ' }, speak: 'Ơ. Cảm ơn' },
      { id: 'p', label: 'P', corner: 'P', sub: 'Pin', subEmoji: '🔋', visual: { kind: 'text', text: 'p' }, speak: 'Pờ. Cục pin' },
      { id: 'q', label: 'Q', corner: 'Q', sub: 'Quả', subEmoji: '🍎', visual: { kind: 'text', text: 'q' }, speak: 'Quờ. Quả táo' },
      { id: 'r', label: 'R', corner: 'R', sub: 'Rùa', subEmoji: '🐢', visual: { kind: 'text', text: 'r' }, speak: 'Rờ. Con rùa' },
      { id: 's', label: 'S', corner: 'S', sub: 'Sữa', subEmoji: '🥛', visual: { kind: 'text', text: 's' }, speak: 'Sờ. Sữa' },
      { id: 't', label: 'T', corner: 'T', sub: 'Tay', subEmoji: '👋', visual: { kind: 'text', text: 't' }, speak: 'Tờ. Bàn tay' },
      { id: 'u', label: 'U', corner: 'U', sub: 'Uống', subEmoji: '🥤', visual: { kind: 'text', text: 'u' }, speak: 'U. Uống nước' },
      { id: 'ư', label: 'Ư', corner: 'Ư', sub: 'Ướt', subEmoji: '💧', visual: { kind: 'text', text: 'ư' }, speak: 'Ư. Bị ướt' },
      { id: 'v', label: 'V', corner: 'V', sub: 'Vịt', subEmoji: '🦆', visual: { kind: 'text', text: 'v' }, speak: 'Vờ. Con vịt' },
      { id: 'x', label: 'X', corner: 'X', sub: 'Xe đạp', subEmoji: '🚲', visual: { kind: 'text', text: 'x' }, speak: 'Xờ. Xe đạp' },
      { id: 'y', label: 'Y', corner: 'Y', sub: 'Yêu', subEmoji: '❤️', visual: { kind: 'text', text: 'y' }, speak: 'I. Yêu thương' }
    ]
  },
  {
    id: 'so-dem',
    name: 'Số đếm',
    icon: '🔢',
    desc: 'Tập đếm từ 1 đến 20',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    items: [
      { id: 'n1', label: '1', sub: 'Một', visual: { kind: 'text', text: '1' }, speak: 'Một' },
      { id: 'n2', label: '2', sub: 'Hai', visual: { kind: 'text', text: '2' }, speak: 'Hai' },
      { id: 'n3', label: '3', sub: 'Ba', visual: { kind: 'text', text: '3' }, speak: 'Ba' },
      { id: 'n4', label: '4', sub: 'Bốn', visual: { kind: 'text', text: '4' }, speak: 'Bốn' },
      { id: 'n5', label: '5', sub: 'Năm', visual: { kind: 'text', text: '5' }, speak: 'Năm' },
      { id: 'n6', label: '6', sub: 'Sáu', visual: { kind: 'text', text: '6' }, speak: 'Sáu' },
      { id: 'n7', label: '7', sub: 'Bảy', visual: { kind: 'text', text: '7' }, speak: 'Bảy' },
      { id: 'n8', label: '8', sub: 'Tám', visual: { kind: 'text', text: '8' }, speak: 'Tám' },
      { id: 'n9', label: '9', sub: 'Chín', visual: { kind: 'text', text: '9' }, speak: 'Chín' },
      { id: 'n10', label: '10', sub: 'Mười', visual: { kind: 'text', text: '10' }, speak: 'Mười' },
      { id: 'n11', label: '11', sub: 'Mười một', visual: { kind: 'text', text: '11' }, speak: 'Mười một' },
      { id: 'n12', label: '12', sub: 'Mười hai', visual: { kind: 'text', text: '12' }, speak: 'Mười hai' },
      { id: 'n13', label: '13', sub: 'Mười ba', visual: { kind: 'text', text: '13' }, speak: 'Mười ba' },
      { id: 'n14', label: '14', sub: 'Mười bốn', visual: { kind: 'text', text: '14' }, speak: 'Mười bốn' },
      { id: 'n15', label: '15', sub: 'Mười lăm', visual: { kind: 'text', text: '15' }, speak: 'Mười lăm' },
      { id: 'n16', label: '16', sub: 'Mười sáu', visual: { kind: 'text', text: '16' }, speak: 'Mười sáu' },
      { id: 'n17', label: '17', sub: 'Mười bảy', visual: { kind: 'text', text: '17' }, speak: 'Mười bảy' },
      { id: 'n18', label: '18', sub: 'Mười tám', visual: { kind: 'text', text: '18' }, speak: 'Mười tám' },
      { id: 'n19', label: '19', sub: 'Mười chín', visual: { kind: 'text', text: '19' }, speak: 'Mười chín' },
      { id: 'n20', label: '20', sub: 'Hai mươi', visual: { kind: 'text', text: '20' }, speak: 'Hai mươi' }
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
