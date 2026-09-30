// Web Audio API ambient soundscape generator
// Creates warm, soothing ambient chords and gentle chimes without external dependencies

class AmbientSoundscape {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.gainNode = null;
    this.currentTrack = 'piano';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.gainNode = this.ctx.createGain();
        this.gainNode.gain.setValueAtTime(0.35, this.ctx.currentTime);
        this.gainNode.connect(this.ctx.destination);
      }
    }
  }

  playNote(frequency, duration = 3, type = 'sine', decay = 2) {
    if (!this.ctx) return;
    try {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      
      osc.type = type;
      osc.frequency.setValueAtTime(frequency, this.ctx.currentTime);
      
      // Warm low-pass filter to make it sound soft, warm and nostalgic
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);

      noteGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      noteGain.gain.exponentialRampToValueAtTime(0.2, this.ctx.currentTime + 0.3);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(filter);
      filter.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio note error:", e);
    }
  }

  playChord(frequencies) {
    frequencies.forEach((freq, idx) => {
      setTimeout(() => {
        this.playNote(freq, 4.5, 'sine');
      }, idx * 120);
    });
  }

  start(track = 'piano') {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isPlaying = true;
    this.currentTrack = track;

    // Chords: D Major 9, G Major 7, B Minor 7, A Sus 4 (emotional, nostalgic progression)
    const progressions = [
      [293.66, 369.99, 440.0, 554.37], // Dmaj9
      [196.00, 246.94, 293.66, 369.99], // Gmaj7
      [246.94, 293.66, 369.99, 440.0],  // Bm7
      [220.00, 293.66, 329.63, 440.0]   // Asus4
    ];

    let chordIdx = 0;
    this.playChord(progressions[0]);

    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      chordIdx = (chordIdx + 1) % progressions.length;
      this.playChord(progressions[chordIdx]);
    }, 4200);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  playSealBreakChime() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    // Delicate chime on opening wax seal
    const chimes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chimes.forEach((f, i) => {
      setTimeout(() => {
        this.playNote(f, 2.5, 'triangle');
      }, i * 90);
    });
  }
}

export const soundscape = new AmbientSoundscape();
