/**
 * Utilities for sampling rate exercise
 * Signal: x(t) = cos(100πt) + sin(200πt) + cos(500πt + π/4) + 7
 * Maximum frequency: f_max = 250 Hz
 * Nyquist rate: f_s = 2 * f_max = 500 Hz
 */

export const SIGNAL_CONFIG = {
  f1: 50,   // cos(100πt) = 50 Hz
  f2: 100,  // sin(200πt) = 100 Hz
  f3: 250,  // cos(500πt + π/4) = 250 Hz
  fMax: 250,
  nyquistRate: 500,
  dc: 7,    // DC component
};

/**
 * Calculate the original continuous signal
 */
export function originalSignal(t: number): number {
  const { f1, f2, f3, dc } = SIGNAL_CONFIG;
  return (
    Math.cos(2 * Math.PI * f1 * t) +
    Math.sin(2 * Math.PI * f2 * t) +
    Math.cos(2 * Math.PI * f3 * t + Math.PI / 4) +
    dc
  );
}

/**
 * Sample the signal at given time points
 */
export function sampleSignal(timePoints: number[]): number[] {
  return timePoints.map(t => originalSignal(t));
}

/**
 * Sinc function
 */
function sinc(x: number): number {
  if (Math.abs(x) < 1e-10) return 1;
  return Math.sin(Math.PI * x) / (Math.PI * x);
}

/**
 * Reconstruct signal using sinc interpolation (Whittaker-Shannon)
 * Simplified version using a finite number of samples
 * x(t) = Σ x[n] * sinc((t - n*Ts) / Ts)
 */
export function sincReconstruct(
  t: number,
  sampleTimes: number[],
  samples: number[],
  Ts: number
): number {
  let reconstructed = 0;
  
  // Use samples within a reasonable window around t
  const windowSize = 20; // Number of samples to use on each side
  const centerIndex = sampleTimes.findIndex(ts => ts >= t);
  
  if (centerIndex === -1) {
    // If t is beyond all samples, use the last windowSize samples
    const startIdx = Math.max(0, sampleTimes.length - windowSize);
    for (let i = startIdx; i < sampleTimes.length; i++) {
      const n = i;
      const t_n = sampleTimes[i];
      reconstructed += samples[i] * sinc((t - t_n) / Ts);
    }
  } else {
    // Use samples around the center
    const startIdx = Math.max(0, centerIndex - windowSize);
    const endIdx = Math.min(sampleTimes.length, centerIndex + windowSize);
    
    for (let i = startIdx; i < endIdx; i++) {
      const t_n = sampleTimes[i];
      reconstructed += samples[i] * sinc((t - t_n) / Ts);
    }
  }
  
  return reconstructed;
}

/**
 * Generate time points for continuous signal visualization
 */
export function generateContinuousTimePoints(
  start: number,
  end: number,
  numPoints: number = 1000
): number[] {
  const points: number[] = [];
  const step = (end - start) / (numPoints - 1);
  for (let i = 0; i < numPoints; i++) {
    points.push(start + i * step);
  }
  return points;
}

/**
 * Generate sample time points for a given sampling rate
 */
export function generateSampleTimePoints(
  start: number,
  end: number,
  fs: number
): number[] {
  const points: number[] = [];
  const Ts = 1 / fs;
  let t = start;
  
  while (t <= end + Ts / 2) { // Add small tolerance for floating point
    points.push(t);
    t += Ts;
  }
  
  return points;
}

/**
 * Calculate reconstruction error (mean squared error)
 */
export function calculateReconstructionError(
  original: number[],
  reconstructed: number[],
  timePoints: number[]
): number {
  if (original.length !== reconstructed.length) return Infinity;
  
  let sumSquaredError = 0;
  for (let i = 0; i < original.length; i++) {
    const error = original[i] - reconstructed[i];
    sumSquaredError += error * error;
  }
  
  return Math.sqrt(sumSquaredError / original.length);
}

/**
 * Determine sampling status based on sampling rate
 */
export function getSamplingStatus(fs: number): {
  status: 'adequate' | 'nyquist' | 'insufficient';
  color: string;
  message: string;
} {
  const { nyquistRate } = SIGNAL_CONFIG;
  
  if (fs > nyquistRate) {
    return {
      status: 'adequate',
      color: 'green',
      message: `Adequate sampling (${fs} Hz > ${nyquistRate} Hz)`
    };
  } else if (Math.abs(fs - nyquistRate) < 1) {
    return {
      status: 'nyquist',
      color: 'orange',
      message: `Nyquist rate (${fs} Hz = ${nyquistRate} Hz)`
    };
  } else {
    return {
      status: 'insufficient',
      color: 'red',
      message: `Insufficient sampling (${fs} Hz < ${nyquistRate} Hz) - Aliasing occurs!`
    };
  }
}

