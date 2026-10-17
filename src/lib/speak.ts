import { AUDIO_IDS } from './audioManifest';

/**
 * Phát âm tiếng Việt.
 * - Nếu thẻ đã có file giọng thu sẵn (public/audio/<id>.mp3) thì phát file.
 * - Ngược lại dùng giọng TTS có sẵn của trình duyệt (Web Speech API).
 */
export function speak(text: string, id?: string) {
  if (id && AUDIO_IDS.has(id)) {
    playAudioFile(id, () => speakTts(text));
    return;
  }
  speakTts(text);
}

let currentAudio: HTMLAudioElement | null = null;

function playAudioFile(id: string, onError: () => void) {
  try {
    stopSpeak();
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
