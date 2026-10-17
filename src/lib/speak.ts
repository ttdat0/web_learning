/**
 * Phát âm tiếng Việt.
 * - Nếu có file giọng thu sẵn (public/audio/<id>.mp3) thì phát file.
 * - Ngược lại dùng giọng TTS có sẵn của trình duyệt (Web Speech API).
 * Tự kiểm tra file 1 lần rồi nhớ kết quả trong phiên, nên chỉ cần
 * thả file mp3 đúng tên vào public/audio/ là app dùng ngay, không cần
 * sửa code hay khai báo gì thêm.
 */
export function speak(text: string, id?: string) {
  stopSpeak();
  if (!id) {
    speakTts(text);
    return;
  }
  void hasAudio(id).then(ok => {
    if (ok) playAudioFile(id, () => speakTts(text));
    else speakTts(text);
  });
}

/** Nhớ kết quả kiểm tra file trong phiên để không request lại. */
const audioCache = new Map<string, boolean>();

async function hasAudio(id: string): Promise<boolean> {
  const cached = audioCache.get(id);
  if (cached !== undefined) return cached;
  try {
    const res = await fetch(`audio/${id}.mp3`, { method: 'HEAD' });
    // Dev server / static host có thể trả index.html (text/html) cho file
    // không tồn tại (SPA fallback) — loại trường hợp này ra.
    const ct = res.headers.get('content-type') || '';
    const ok = res.ok && !ct.includes('html');
    audioCache.set(id, ok);
    return ok;
  } catch {
    audioCache.set(id, false);
    return false;
  }
}

let currentAudio: HTMLAudioElement | null = null;

function playAudioFile(id: string, onError: () => void) {
  try {
    const audio = new Audio(`audio/${id}.mp3`);
    currentAudio = audio;
    audio.addEventListener(
      'error',
      () => {
        if (currentAudio === audio) currentAudio = null;
        onError();
      },
      { once: true }
    );
    audio.addEventListener(
      'ended',
      () => {
        if (currentAudio === audio) currentAudio = null;
      },
      { once: true }
    );
    void audio.play().catch(() => {
      if (currentAudio === audio) currentAudio = null;
      onError();
    });
  } catch {
    onError();
  }
}

function speakTts(text: string) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'vi-VN';
    utter.rate = 0.9;
    utter.pitch = 1.1;
    const voices = window.speechSynthesis.getVoices();
    const viVoices = voices.filter(v => v.lang.toLowerCase().startsWith('vi'));
    // Ưu tiên giọng Google Tiếng Việt (rõ và tự nhiên nhất).
    const viVoice =
      viVoices.find(v => v.name.toLowerCase().includes('google')) ?? viVoices[0];
    if (viVoice) utter.voice = viVoice;
    window.speechSynthesis.speak(utter);
  } catch {
    /* bỏ qua nếu trình duyệt chặn */
  }
}

export function stopSpeak() {
  if (currentAudio) {
    try {
      currentAudio.pause();
    } catch {
      /* bỏ qua */
    }
    currentAudio = null;
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {
      /* bỏ qua */
    }
  }
}
