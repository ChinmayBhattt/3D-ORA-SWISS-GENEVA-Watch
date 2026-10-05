// Web Audio API synthesized mechanical watch escapement sound
// Produces an authentic 4Hz (28,800 vph) escapement tick and lever click

class HorologyAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private gainNode: GainNode | null = null;
  private tickVariant: boolean = false;

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.value = 0.15;
        this.gainNode.connect(this.ctx.destination);
      }
    }
  }

  public playTick() {
    if (!this.ctx || !this.gainNode) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    this.tickVariant = !this.tickVariant;

    // Metallic escapement click (impulse noise filtered through bandpass)
    const bufferSize = this.ctx.sampleRate * 0.015; // 15ms short click
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.18));
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = this.tickVariant ? 4200 : 3800; // Alternating pallet stone impulse
    filter.Q.value = 8;

    const clickGain = this.ctx.createGain();
    clickGain.gain.setValueAtTime(this.tickVariant ? 0.35 : 0.28, t);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);

    noise.connect(filter);
    filter.connect(clickGain);
    clickGain.connect(this.gainNode);

    noise.start(t);
  }

  public start() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    // 28,800 vibrations/hour = 8 beats per second (every 125ms)
    this.intervalId = window.setInterval(() => {
      this.playTick();
    }, 125);
  }

  public stop() {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    this.isPlaying = false;
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public isMuted(): boolean {
    return !this.isPlaying;
  }
}

export const horologyAudio = new HorologyAudioEngine();
