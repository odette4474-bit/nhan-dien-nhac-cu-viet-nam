/**
 * Web Audio API based acoustic synthesizer for Vietnamese Traditional Instruments.
 * Accurately models the physical sound characteristics of:
 * Đàn Bầu, Đàn Tranh, Đàn Nguyệt, Đàn Đáy, Đàn Nhị, Sáo Trúc, T'rưng, K'lông Pút, Cồng Chiêng, Trống Đồng.
 */

class TraditionalAudioSynthesizer {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private activeMelodyTimeoutIds: number[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (muted) {
      this.stopMelody();
    }
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  /**
   * Play a note of a specific traditional instrument preset.
   */
  public playNote(
    preset: string,
    freq: number = 440,
    duration: number = 1.2,
    bendAmount: number = 0
  ) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    const ctx = this.ctx;
    const now = ctx.currentTime;

    switch (preset) {
      case 'dan_bau':
        this.playDanBau(ctx, now, freq, duration);
        break;
      case 'dan_tranh':
        this.playDanTranh(ctx, now, freq, duration);
        break;
      case 'dan_nguyet':
      case 'dan_tinh':
        this.playDanNguyet(ctx, now, freq, duration);
        break;
      case 'dan_day':
        this.playDanDay(ctx, now, freq, duration);
        break;
      case 'dan_nhi':
        this.playDanNhi(ctx, now, freq, duration);
        break;
      case 'sao_truc':
      case 'khen_mong':
        this.playSaoTruc(ctx, now, freq, duration);
        break;
      case 'trung':
        this.playTrung(ctx, now, freq, duration);
        break;
      case 'klong_put':
        this.playKlongPut(ctx, now, freq, duration);
        break;
      case 'cong_chieng':
        this.playCongChieng(ctx, now, freq, duration);
        break;
      case 'trong_dong':
      case 'trong_com':
        this.playTrongDong(ctx, now, freq, duration);
        break;
      default:
        this.playDanTranh(ctx, now, freq, duration);
        break;
    }
  }

  /**
   * ĐÀN BẦU (Độc Huyền Cầm)
   * Physics: Single string struck while thumb isolates harmonic node.
   * Characteristic: Singing, expressive overtone with distinctive vibrato & pitch bend (cần đàn uốn lượn).
   */
  private playDanBau(ctx: AudioContext, now: number, freq: number, duration: number) {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    // Harmonics: Đàn Bầu is played on harmonics (2nd, 3rd, 4th, 5th harmonic)
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Subtle pitch bend imitating flexible bamboo wand (cần đàn)
    osc1.frequency.exponentialRampToValueAtTime(freq * 1.015, now + 0.15);
    osc1.frequency.exponentialRampToValueAtTime(freq, now + 0.35);

    // Warm second harmonic
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Gourd resonator body formant
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.5, now);
    filter.Q.setValueAtTime(3.5, now);

    // Vibrato LFO (rung cần đàn)
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(4.8, now); // ~5Hz human vibrato
    lfoGain.gain.setValueAtTime(freq * 0.02, now);
    lfo.connect(osc1.frequency);
    lfo.connect(osc2.frequency);
    lfo.start(now + 0.2);
    lfo.stop(now + duration);

    // Pluck amplitude envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.03); // Quick pluck
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration);
    osc2.stop(now + duration);
  }

  /**
   * ĐÀN TRANH (Thập Lục Cầm)
   * Physics: Plucked metal/silk zither strings with high crisp treble and crystalline ring.
   */
  private playDanTranh(ctx: AudioContext, now: number, freq: number, duration: number) {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Highpass & Lowpass bright string character
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 6, now);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.5, now + duration * 0.5);

    // Fast pick pluck
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.12, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration * 1.2);
    osc2.stop(now + duration * 1.2);
  }

  /**
   * ĐÀN NGUYỆT (Đàn Kìm)
   * Physics: Round wooden box, 2 high-raised frets, deeply expressive pressing/bending.
   */
  private playDanNguyet(ctx: AudioContext, now: number, freq: number, duration: number) {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);
    // Expressive subtle scoop on note attack characteristic of Đờn Ca Tài Tử
    osc.frequency.setValueAtTime(freq * 0.98, now);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.06);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.Q.setValueAtTime(2.0, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.15, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * ĐÀN ĐÁY (Vô Đề Cầm - Ca Trù)
   * Physics: Long neck, trapezoid body, matte acoustic warmth, subtle damping.
   */
  private playDanDay(ctx: AudioContext, now: number, freq: number, duration: number) {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sine';
    // Đàn Đáy plays lower octave
    const lowFreq = freq * 0.5;
    osc.frequency.setValueAtTime(lowFreq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.9);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration * 0.9);
  }

  /**
   * ĐÀN NHỊ (Đàn Cò)
   * Physics: Bowed two-string with python snake skin resonator, saw wave friction.
   */
  private playDanNhi(ctx: AudioContext, now: number, freq: number, duration: number) {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);

    // Warm nasal resonance of python skin ống đàn
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.8, now);
    filter.Q.setValueAtTime(2.2, now);

    // Bowing envelope (soft attack, sustained, then soft release)
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.28, now + 0.08);
    gain.gain.setValueAtTime(0.24, now + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    // Gentle finger vibrato
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(5.5, now);
    lfoGain.gain.setValueAtTime(freq * 0.015, now);
    lfo.connect(osc.frequency);
    lfo.start(now + 0.1);
    lfo.stop(now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  /**
   * SÁO TRÚC (Bamboo Flute)
   * Physics: Airy breath noise + pure sine harmonics with vibrato & flutter tonguing.
   */
  private playSaoTruc(ctx: AudioContext, now: number, freq: number, duration: number) {
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const breathGain = ctx.createGain();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    // Octave overtone
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // Breath noise simulation using buffer
    const bufferSize = ctx.sampleRate * 0.1;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(freq * 1.5, now);
    noiseFilter.Q.setValueAtTime(5.0, now);

    breathGain.gain.setValueAtTime(0.04, now);
    breathGain.gain.exponentialRampToValueAtTime(0.005, now + duration);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(breathGain);
    breathGain.connect(gain);

    // Flute vibrato LFO
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.frequency.setValueAtTime(5.0, now);
    lfoGain.gain.setValueAtTime(freq * 0.012, now);
    lfo.connect(osc.frequency);
    lfo.start(now + 0.15);
    lfo.stop(now + duration);

    // Breath envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.06);
    gain.gain.setValueAtTime(0.25, now + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc2.start(now);
    whiteNoise.start(now);
    osc.stop(now + duration);
    osc2.stop(now + duration);
    whiteNoise.stop(now + duration);
  }

  /**
   * T'RƯNG (Bamboo Xylophone Tây Nguyên)
   * Physics: Bamboo resonant tubes struck with rubber-wrapped stick, hollow wooden ring.
   */
  private playTrung(ctx: AudioContext, now: number, freq: number, duration: number) {
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // Inharmonic bamboo overtone (approx 2.76x)
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, now);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.2, now);
    filter.Q.setValueAtTime(4.0, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.008); // Sharp wooden mallet strike
    gain.gain.exponentialRampToValueAtTime(0.1, now + 0.18);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.8);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration * 0.8);
    osc2.stop(now + duration * 0.8);
  }

  /**
   * K'LÔNG PÚT (Highland Aerophone)
   * Physics: Air pumped into bamboo column through clapping hollowed cupped hands.
   */
  private playKlongPut(ctx: AudioContext, now: number, freq: number, duration: number) {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq * 0.75, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 1.5, now);
    filter.Q.setValueAtTime(6.0, now);

    // Hollow air puff envelope
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.7);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration * 0.7);
  }

  /**
   * CỒNG CHIÊNG (Gong of Tây Nguyên)
   * Physics: Cast bronze disc with center knob (cồng) or flat surface (chiêng).
   * Characteristic: Complex metallic beating, wash of shimmering overtones.
   */
  private playCongChieng(ctx: AudioContext, now: number, freq: number, duration: number) {
    const fund = freq * 0.6; // Deep bronze resonance
    const partials = [fund, fund * 1.48, fund * 2.05, fund * 2.82];
    const gain = ctx.createGain();

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 2.5);

    partials.forEach((pFreq, idx) => {
      const osc = ctx.createOscillator();
      const pGain = ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      // Detune slightly for bronze beating effect
      osc.frequency.setValueAtTime(pFreq * (1 + (idx - 1.5) * 0.005), now);
      pGain.gain.setValueAtTime(1 / (idx + 1.2), now);

      osc.connect(pGain);
      pGain.connect(gain);

      osc.start(now);
      osc.stop(now + duration * 2.5);
    });

    gain.connect(ctx.destination);
  }

  /**
   * TRỐNG ĐỒNG (Dong Son Bronze Drum) & TRỐNG CƠM
   * Physics: Massive bronze surface or rice-paste membrane strike with sub-bass acoustic boom.
   */
  private playTrongDong(ctx: AudioContext, now: number, freq: number, duration: number) {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    // Deep punch down
    osc.frequency.setValueAtTime(freq * 0.7, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.12);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.65, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.15, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.5);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + duration * 1.5);
  }

  /**
   * Play an entire traditional melody note by note.
   */
  public playMelody(
    preset: string,
    notes: { freq: number; duration: number }[],
    onNotePlay?: (noteIndex: number) => void,
    onComplete?: () => void
  ) {
    this.stopMelody();
    let accumulatedTime = 0;

    notes.forEach((item, index) => {
      const timeoutId = window.setTimeout(() => {
        this.playNote(preset, item.freq, item.duration);
        if (onNotePlay) onNotePlay(index);

        if (index === notes.length - 1 && onComplete) {
          const endTimeout = window.setTimeout(() => {
            onComplete();
          }, item.duration * 1000);
          this.activeMelodyTimeoutIds.push(endTimeout);
        }
      }, accumulatedTime * 1000);

      this.activeMelodyTimeoutIds.push(timeoutId);
      accumulatedTime += item.duration;
    });
  }

  /**
   * Stop any running sequence.
   */
  public stopMelody() {
    this.activeMelodyTimeoutIds.forEach((id) => clearTimeout(id));
    this.activeMelodyTimeoutIds = [];
  }
}

export const audioSynth = new TraditionalAudioSynthesizer();
