// Web Audio API Mosquito Buzz Synthesizer

let audioCtx = null;
let activeBuzzNodes = [];

export const playMosquitoBuzz = (duration = 1.5) => {
  try {
    // Initialize AudioContext on user interaction
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }

    // Resume context if suspended (browser security policies)
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    // Gain node for master volume control (mosquitoes are quiet but irritating)
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.35, now + 0.1); // Quick ramp up
    masterGain.gain.setValueAtTime(0.35, now + duration - 0.3);
    masterGain.gain.linearRampToValueAtTime(0, now + duration); // Smooth fade out

    // Highpass filter to remove low frequencies and make it sound thin & tinny
    const highpass = audioCtx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(800, now);

    // Bandpass filter to peak around the whiny mosquito frequency range
    const bandpass = audioCtx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.setValueAtTime(1000, now);
    bandpass.Q.setValueAtTime(1.5, now);

    // Primary oscillator: Wingbeat fundamental pitch (between 450Hz and 600Hz)
    const osc1 = audioCtx.createOscillator();
    osc1.type = 'sawtooth';
    // Randomize pitch slightly to simulate individual mosquito characters
    const baseFreq = 480 + Math.random() * 80; 
    osc1.frequency.setValueAtTime(baseFreq, now);

    // LFO (Low Frequency Oscillator) to modulate frequency (simulates flight movement & wind resistance)
    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(12 + Math.random() * 6, now); // 12-18Hz vibration

    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(25, now); // Frequency swing of +/- 25Hz

    // High Harmonic Oscillator (to capture the ultra-annoying ear buzz)
    const osc2 = audioCtx.createOscillator();
    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(baseFreq * 2.5, now); // High pitch nasal overtone

    const osc2Gain = audioCtx.createGain();
    osc2Gain.gain.setValueAtTime(0.12, now); // Quieter than primary

    // Connections
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency); // Modulate primary frequency
    lfoGain.connect(osc2.frequency); // Modulate harmonic frequency

    osc1.connect(highpass);
    osc2.connect(osc2Gain);
    osc2Gain.connect(highpass);

    highpass.connect(bandpass);
    bandpass.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    // Start nodes
    lfo.start(now);
    osc1.start(now);
    osc2.start(now);

    // Stop nodes
    lfo.stop(now + duration);
    osc1.stop(now + duration);
    osc2.stop(now + duration);

    const nodeRef = { lfo, osc1, osc2, masterGain, stopTime: now + duration };
    activeBuzzNodes.push(nodeRef);

    // Clean up finished nodes from tracking array
    setTimeout(() => {
      activeBuzzNodes = activeBuzzNodes.filter(n => n !== nodeRef);
    }, duration * 1000 + 500);

    return nodeRef;
  } catch (error) {
    console.warn("Web Audio API not supported or blocked by security settings", error);
    return null;
  }
};

export const startContinuousBuzz = () => {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0, now);
    masterGain.gain.linearRampToValueAtTime(0.3, now + 0.5); // Slow fade in

    const highpass = audioCtx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(900, now);

    const osc = audioCtx.createOscillator();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(500, now);

    const lfo = audioCtx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(14, now);

    const lfoGain = audioCtx.createGain();
    lfoGain.gain.setValueAtTime(20, now);

    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);
    osc.connect(highpass);
    highpass.connect(masterGain);
    masterGain.connect(audioCtx.destination);

    lfo.start(now);
    osc.start(now);

    return {
      stop: () => {
        const stopNow = audioCtx.currentTime;
        masterGain.gain.cancelScheduledValues(stopNow);
        masterGain.gain.setValueAtTime(masterGain.gain.value, stopNow);
        masterGain.gain.linearRampToValueAtTime(0, stopNow + 0.3); // Smooth fade out
        setTimeout(() => {
          lfo.stop();
          osc.stop();
        }, 500);
      }
    };
  } catch (err) {
    console.error("Continuous buzz error", err);
    return { stop: () => {} };
  }
};
