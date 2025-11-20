/**
 * Simplified entropy calculation for stochastic processes
 * Uses discretization/histogram approach to approximate the joint PDF
 */

export interface SignalPoint {
  index: number;
  value: number;
}

/**
 * Generate a signal with Gaussian noise
 */
export function generateSignal(N: number, noiseVariance: number = 0.5): SignalPoint[] {
  const signal: SignalPoint[] = [];
  
  for (let i = 1; i <= N; i++) {
    // Generate a value with some pattern + noise
    const baseValue = Math.sin((i / N) * 2 * Math.PI) * 0.5;
    const noise = (Math.random() - 0.5) * 2 * Math.sqrt(noiseVariance);
    const value = baseValue + noise;
    
    signal.push({
      index: i,
      value: Math.max(-2, Math.min(2, value)) // Clamp to [-2, 2]
    });
  }
  
  return signal;
}

/**
 * Discretize signal values into bins
 */
function discretizeSignal(signal: SignalPoint[], numBins: number = 20): number[] {
  const min = -2;
  const max = 2;
  const binWidth = (max - min) / numBins;
  
  return signal.map(point => {
    const bin = Math.floor((point.value - min) / binWidth);
    return Math.max(0, Math.min(numBins - 1, bin));
  });
}

/**
 * Calculate joint probability using histogram approach
 * For simplicity, we use a 1D histogram (marginal distribution)
 * In the real formula, this would be an N-dimensional joint PDF
 */
function calculateJointProbability(signal: SignalPoint[], numBins: number = 20): number[] {
  const discretized = discretizeSignal(signal, numBins);
  const counts = new Array(numBins).fill(0);
  
  discretized.forEach(bin => {
    counts[bin]++;
  });
  
  // Normalize to get probabilities
  const total = signal.length;
  return counts.map(count => count / total);
}

/**
 * Calculate entropy H_N using simplified approach
 * Real formula: H_N = -∫ log₂[p(x₁, x₂, ..., x_N)] · p(x₁, x₂, ..., x_N) dx₁...dx_N
 * Simplified: We use the marginal distribution and Shannon's entropy formula
 */
export function calculateEntropy(signal: SignalPoint[]): {
  entropy: number;
  probabilities: number[];
  stepByStep: {
    step: string;
    value: number;
    description: string;
    detailedExplanation?: {
      title: string;
      substeps: string[];
      formula?: string;
    };
  }[];
} {
  if (signal.length === 0) {
    return {
      entropy: 0,
      probabilities: [],
      stepByStep: []
    };
  }
  
  const numBins = 20;
  const probabilities = calculateJointProbability(signal, numBins);
  
  const stepByStep: { step: string; value: number; description: string }[] = [];
  let entropy = 0;
  
  stepByStep.push({
    step: '1',
    value: signal.length,
    description: `Signal length N = ${signal.length} samples`,
    detailedExplanation: {
      title: 'Understanding Signal Length',
      substeps: [
        'A stochastic process is represented as a sequence of N random variable realizations',
        `In this case, we have ${signal.length} samples: x₁, x₂, ..., x_${signal.length}`,
        'Each sample x_i represents a measurement at time index i',
        'The length N determines the dimensionality of the joint probability distribution',
        'Longer signals contain more information, potentially increasing entropy'
      ],
      formula: `\\mathbf{x} = x_1, x_2, \\ldots, x_${signal.length}`
    }
  });
  
  stepByStep.push({
    step: '2',
    value: probabilities.filter(p => p > 0).length,
    description: `Discretize signal into bins and count occurrences`,
    detailedExplanation: {
      title: 'Discretization Process',
      substeps: [
        'Since computing the full N-dimensional joint PDF is computationally expensive, we use a simplified approach',
        'We divide the signal value range into discrete bins (typically 20 bins)',
        'Each signal value is assigned to a bin based on its magnitude',
        'We count how many samples fall into each bin',
        `This gives us a histogram approximation of the probability distribution`,
        `Currently, ${probabilities.filter(p => p > 0).length} bins contain samples (non-zero probability)`,
        'The probability of each bin is calculated as: p_i = (number of samples in bin) / (total samples)'
      ],
      formula: `p_i = \\frac{\\text{count in bin } i}{N}`
    }
  });
  
  // Calculate entropy: H = -Σ p_i · log₂(p_i)
  const contributions: number[] = [];
  probabilities.forEach((p, i) => {
    if (p > 0) {
      const logP = Math.log2(p);
      const contribution = -p * logP;
      contributions.push(contribution);
      entropy += contribution;
    }
  });
  
  stepByStep.push({
    step: '3',
    value: entropy,
    description: `Calculate H_N = -Σ p_i · log₂(p_i) for each bin`,
    detailedExplanation: {
      title: 'Shannon Entropy Calculation',
      substeps: [
        'For each bin i with probability p_i > 0, we calculate the information content: -log₂(p_i)',
        'Less probable values carry more information (surprise effect)',
        'The entropy contribution from bin i is: -p_i · log₂(p_i)',
        'We sum all contributions to get the total entropy',
        `Mathematically: H_N = -Σ_{i=1}^{M} p_i · log₂(p_i) where M is the number of bins`,
        `This is Shannon's entropy formula applied to the discretized distribution`,
        `The result represents the average information content (in bits) per sample`
      ],
      formula: `H_N = -\\sum_{i=1}^{M} p_i \\log_2(p_i)`
    }
  });
  
  stepByStep.push({
    step: '4',
    value: entropy,
    description: `Final entropy H_N = ${entropy.toFixed(4)} bits`,
    detailedExplanation: {
      title: 'Interpreting the Result',
      substeps: [
        `The final entropy value is H_N = ${entropy.toFixed(4)} bits`,
        'This represents the average information content in the signal',
        'Higher entropy means more uncertainty and less predictability',
        'Lower entropy indicates more regular, predictable patterns',
        'In the context of stochastic processes, entropy measures the complexity of the signal',
        'If we add noise to the signal, entropy typically increases',
        'The theoretical formula uses the full joint PDF, but this approximation gives us a practical estimate'
      ],
      formula: `H_N = ${entropy.toFixed(4)} \\text{ bits}`
    }
  });
  
  return {
    entropy: Math.max(0, entropy), // Ensure non-negative
    probabilities,
    stepByStep
  };
}

/**
 * Format formula with current values
 */
export function formatFormula(N: number, entropy: number): string {
  return `H_${N} = E\\{-\\log_2[p(x_1, x_2, \\ldots, x_${N})]\\} = ${entropy.toFixed(4)}`;
}

