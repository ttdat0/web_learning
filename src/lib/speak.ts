/** Đọc phát âm tiếng Việt bằng Web Speech API (có sẵn trên trình duyệt). */
export function speak(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'vi-VN';
    utter.rate = 0.9;
    utter.pitch = 1.1;
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(v => v.lang.toLowerCase().startsWith('vi'));
    if (viVoice) utter.voice = viVoice;
    window.speechSynthesis.speak(utter);
  } catch {
    /* bỏ qua nếu trình duyệt chặn */
  }
}

export function stopSpeak() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
