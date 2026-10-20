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
    desc: 'Tập đếm từ 1 đến 100',
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
      { id: 'n20', label: '20', sub: 'Hai mươi', visual: { kind: 'text', text: '20' }, speak: 'Hai mươi' },
      { id: 'n21', label: '21', sub: 'Hai mươi mốt', visual: { kind: 'text', text: '21' }, speak: 'Hai mươi mốt' },
      { id: 'n22', label: '22', sub: 'Hai mươi hai', visual: { kind: 'text', text: '22' }, speak: 'Hai mươi hai' },
      { id: 'n23', label: '23', sub: 'Hai mươi ba', visual: { kind: 'text', text: '23' }, speak: 'Hai mươi ba' },
      { id: 'n24', label: '24', sub: 'Hai mươi bốn', visual: { kind: 'text', text: '24' }, speak: 'Hai mươi bốn' },
      { id: 'n25', label: '25', sub: 'Hai mươi lăm', visual: { kind: 'text', text: '25' }, speak: 'Hai mươi lăm' },
      { id: 'n26', label: '26', sub: 'Hai mươi sáu', visual: { kind: 'text', text: '26' }, speak: 'Hai mươi sáu' },
      { id: 'n27', label: '27', sub: 'Hai mươi bảy', visual: { kind: 'text', text: '27' }, speak: 'Hai mươi bảy' },
      { id: 'n28', label: '28', sub: 'Hai mươi tám', visual: { kind: 'text', text: '28' }, speak: 'Hai mươi tám' },
      { id: 'n29', label: '29', sub: 'Hai mươi chín', visual: { kind: 'text', text: '29' }, speak: 'Hai mươi chín' },
      { id: 'n30', label: '30', sub: 'Ba mươi', visual: { kind: 'text', text: '30' }, speak: 'Ba mươi' },
      { id: 'n31', label: '31', sub: 'Ba mươi mốt', visual: { kind: 'text', text: '31' }, speak: 'Ba mươi mốt' },
      { id: 'n32', label: '32', sub: 'Ba mươi hai', visual: { kind: 'text', text: '32' }, speak: 'Ba mươi hai' },
      { id: 'n33', label: '33', sub: 'Ba mươi ba', visual: { kind: 'text', text: '33' }, speak: 'Ba mươi ba' },
      { id: 'n34', label: '34', sub: 'Ba mươi bốn', visual: { kind: 'text', text: '34' }, speak: 'Ba mươi bốn' },
      { id: 'n35', label: '35', sub: 'Ba mươi lăm', visual: { kind: 'text', text: '35' }, speak: 'Ba mươi lăm' },
      { id: 'n36', label: '36', sub: 'Ba mươi sáu', visual: { kind: 'text', text: '36' }, speak: 'Ba mươi sáu' },
      { id: 'n37', label: '37', sub: 'Ba mươi bảy', visual: { kind: 'text', text: '37' }, speak: 'Ba mươi bảy' },
      { id: 'n38', label: '38', sub: 'Ba mươi tám', visual: { kind: 'text', text: '38' }, speak: 'Ba mươi tám' },
      { id: 'n39', label: '39', sub: 'Ba mươi chín', visual: { kind: 'text', text: '39' }, speak: 'Ba mươi chín' },
      { id: 'n40', label: '40', sub: 'Bốn mươi', visual: { kind: 'text', text: '40' }, speak: 'Bốn mươi' },
      { id: 'n41', label: '41', sub: 'Bốn mươi mốt', visual: { kind: 'text', text: '41' }, speak: 'Bốn mươi mốt' },
      { id: 'n42', label: '42', sub: 'Bốn mươi hai', visual: { kind: 'text', text: '42' }, speak: 'Bốn mươi hai' },
      { id: 'n43', label: '43', sub: 'Bốn mươi ba', visual: { kind: 'text', text: '43' }, speak: 'Bốn mươi ba' },
      { id: 'n44', label: '44', sub: 'Bốn mươi bốn', visual: { kind: 'text', text: '44' }, speak: 'Bốn mươi bốn' },
      { id: 'n45', label: '45', sub: 'Bốn mươi lăm', visual: { kind: 'text', text: '45' }, speak: 'Bốn mươi lăm' },
      { id: 'n46', label: '46', sub: 'Bốn mươi sáu', visual: { kind: 'text', text: '46' }, speak: 'Bốn mươi sáu' },
      { id: 'n47', label: '47', sub: 'Bốn mươi bảy', visual: { kind: 'text', text: '47' }, speak: 'Bốn mươi bảy' },
      { id: 'n48', label: '48', sub: 'Bốn mươi tám', visual: { kind: 'text', text: '48' }, speak: 'Bốn mươi tám' },
      { id: 'n49', label: '49', sub: 'Bốn mươi chín', visual: { kind: 'text', text: '49' }, speak: 'Bốn mươi chín' },
      { id: 'n50', label: '50', sub: 'Năm mươi', visual: { kind: 'text', text: '50' }, speak: 'Năm mươi' },
      { id: 'n51', label: '51', sub: 'Năm mươi mốt', visual: { kind: 'text', text: '51' }, speak: 'Năm mươi mốt' },
      { id: 'n52', label: '52', sub: 'Năm mươi hai', visual: { kind: 'text', text: '52' }, speak: 'Năm mươi hai' },
      { id: 'n53', label: '53', sub: 'Năm mươi ba', visual: { kind: 'text', text: '53' }, speak: 'Năm mươi ba' },
      { id: 'n54', label: '54', sub: 'Năm mươi bốn', visual: { kind: 'text', text: '54' }, speak: 'Năm mươi bốn' },
      { id: 'n55', label: '55', sub: 'Năm mươi lăm', visual: { kind: 'text', text: '55' }, speak: 'Năm mươi lăm' },
      { id: 'n56', label: '56', sub: 'Năm mươi sáu', visual: { kind: 'text', text: '56' }, speak: 'Năm mươi sáu' },
      { id: 'n57', label: '57', sub: 'Năm mươi bảy', visual: { kind: 'text', text: '57' }, speak: 'Năm mươi bảy' },
      { id: 'n58', label: '58', sub: 'Năm mươi tám', visual: { kind: 'text', text: '58' }, speak: 'Năm mươi tám' },
      { id: 'n59', label: '59', sub: 'Năm mươi chín', visual: { kind: 'text', text: '59' }, speak: 'Năm mươi chín' },
      { id: 'n60', label: '60', sub: 'Sáu mươi', visual: { kind: 'text', text: '60' }, speak: 'Sáu mươi' },
      { id: 'n61', label: '61', sub: 'Sáu mươi mốt', visual: { kind: 'text', text: '61' }, speak: 'Sáu mươi mốt' },
      { id: 'n62', label: '62', sub: 'Sáu mươi hai', visual: { kind: 'text', text: '62' }, speak: 'Sáu mươi hai' },
      { id: 'n63', label: '63', sub: 'Sáu mươi ba', visual: { kind: 'text', text: '63' }, speak: 'Sáu mươi ba' },
      { id: 'n64', label: '64', sub: 'Sáu mươi bốn', visual: { kind: 'text', text: '64' }, speak: 'Sáu mươi bốn' },
      { id: 'n65', label: '65', sub: 'Sáu mươi lăm', visual: { kind: 'text', text: '65' }, speak: 'Sáu mươi lăm' },
      { id: 'n66', label: '66', sub: 'Sáu mươi sáu', visual: { kind: 'text', text: '66' }, speak: 'Sáu mươi sáu' },
      { id: 'n67', label: '67', sub: 'Sáu mươi bảy', visual: { kind: 'text', text: '67' }, speak: 'Sáu mươi bảy' },
      { id: 'n68', label: '68', sub: 'Sáu mươi tám', visual: { kind: 'text', text: '68' }, speak: 'Sáu mươi tám' },
      { id: 'n69', label: '69', sub: 'Sáu mươi chín', visual: { kind: 'text', text: '69' }, speak: 'Sáu mươi chín' },
      { id: 'n70', label: '70', sub: 'Bảy mươi', visual: { kind: 'text', text: '70' }, speak: 'Bảy mươi' },
      { id: 'n71', label: '71', sub: 'Bảy mươi mốt', visual: { kind: 'text', text: '71' }, speak: 'Bảy mươi mốt' },
      { id: 'n72', label: '72', sub: 'Bảy mươi hai', visual: { kind: 'text', text: '72' }, speak: 'Bảy mươi hai' },
      { id: 'n73', label: '73', sub: 'Bảy mươi ba', visual: { kind: 'text', text: '73' }, speak: 'Bảy mươi ba' },
      { id: 'n74', label: '74', sub: 'Bảy mươi bốn', visual: { kind: 'text', text: '74' }, speak: 'Bảy mươi bốn' },
      { id: 'n75', label: '75', sub: 'Bảy mươi lăm', visual: { kind: 'text', text: '75' }, speak: 'Bảy mươi lăm' },
      { id: 'n76', label: '76', sub: 'Bảy mươi sáu', visual: { kind: 'text', text: '76' }, speak: 'Bảy mươi sáu' },
      { id: 'n77', label: '77', sub: 'Bảy mươi bảy', visual: { kind: 'text', text: '77' }, speak: 'Bảy mươi bảy' },
      { id: 'n78', label: '78', sub: 'Bảy mươi tám', visual: { kind: 'text', text: '78' }, speak: 'Bảy mươi tám' },
      { id: 'n79', label: '79', sub: 'Bảy mươi chín', visual: { kind: 'text', text: '79' }, speak: 'Bảy mươi chín' },
      { id: 'n80', label: '80', sub: 'Tám mươi', visual: { kind: 'text', text: '80' }, speak: 'Tám mươi' },
      { id: 'n81', label: '81', sub: 'Tám mươi mốt', visual: { kind: 'text', text: '81' }, speak: 'Tám mươi mốt' },
      { id: 'n82', label: '82', sub: 'Tám mươi hai', visual: { kind: 'text', text: '82' }, speak: 'Tám mươi hai' },
      { id: 'n83', label: '83', sub: 'Tám mươi ba', visual: { kind: 'text', text: '83' }, speak: 'Tám mươi ba' },
      { id: 'n84', label: '84', sub: 'Tám mươi bốn', visual: { kind: 'text', text: '84' }, speak: 'Tám mươi bốn' },
      { id: 'n85', label: '85', sub: 'Tám mươi lăm', visual: { kind: 'text', text: '85' }, speak: 'Tám mươi lăm' },
      { id: 'n86', label: '86', sub: 'Tám mươi sáu', visual: { kind: 'text', text: '86' }, speak: 'Tám mươi sáu' },
      { id: 'n87', label: '87', sub: 'Tám mươi bảy', visual: { kind: 'text', text: '87' }, speak: 'Tám mươi bảy' },
      { id: 'n88', label: '88', sub: 'Tám mươi tám', visual: { kind: 'text', text: '88' }, speak: 'Tám mươi tám' },
      { id: 'n89', label: '89', sub: 'Tám mươi chín', visual: { kind: 'text', text: '89' }, speak: 'Tám mươi chín' },
      { id: 'n90', label: '90', sub: 'Chín mươi', visual: { kind: 'text', text: '90' }, speak: 'Chín mươi' },
      { id: 'n91', label: '91', sub: 'Chín mươi mốt', visual: { kind: 'text', text: '91' }, speak: 'Chín mươi mốt' },
      { id: 'n92', label: '92', sub: 'Chín mươi hai', visual: { kind: 'text', text: '92' }, speak: 'Chín mươi hai' },
      { id: 'n93', label: '93', sub: 'Chín mươi ba', visual: { kind: 'text', text: '93' }, speak: 'Chín mươi ba' },
      { id: 'n94', label: '94', sub: 'Chín mươi bốn', visual: { kind: 'text', text: '94' }, speak: 'Chín mươi bốn' },
      { id: 'n95', label: '95', sub: 'Chín mươi lăm', visual: { kind: 'text', text: '95' }, speak: 'Chín mươi lăm' },
      { id: 'n96', label: '96', sub: 'Chín mươi sáu', visual: { kind: 'text', text: '96' }, speak: 'Chín mươi sáu' },
      { id: 'n97', label: '97', sub: 'Chín mươi bảy', visual: { kind: 'text', text: '97' }, speak: 'Chín mươi bảy' },
      { id: 'n98', label: '98', sub: 'Chín mươi tám', visual: { kind: 'text', text: '98' }, speak: 'Chín mươi tám' },
      { id: 'n99', label: '99', sub: 'Chín mươi chín', visual: { kind: 'text', text: '99' }, speak: 'Chín mươi chín' },
      { id: 'n100', label: '100', sub: 'Một trăm', visual: { kind: 'text', text: '100' }, speak: 'Một trăm' }
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
