import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateEntropy } from '../utils/entropyCalculator';
import type { SignalPoint } from '../utils/entropyCalculator';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface FormulaBreakdownProps {
  signal: SignalPoint[];
  currentStep: number;
  onStepChange: (step: number) => void;
}

export function FormulaBreakdown({ signal, currentStep, onStepChange }: FormulaBreakdownProps) {
  const [expandedSteps, setExpandedSteps] = useState<Set<number>>(new Set());
  const { entropy, stepByStep } = calculateEntropy(signal);
  const N = signal.length;
  
  const formulaParts = [
    {
      id: 'formula',
      latex: `H_N = E\\{-\\log_2[p(x_1, x_2, \\ldots, x_N)]\\}`,
      description: 'Theoretical formula for entropy of a stochastic process'
    },
    {
      id: 'integral',
      latex: `= -\\int_{-\\infty}^{\\infty} \\log_2[p(x_1, \\ldots, x_N)] \\cdot p(x_1, \\ldots, x_N) \\, dx_1 \\ldots dx_N`,
      description: 'Expressed as an N-dimensional integral over the joint PDF'
    },
    {
      id: 'simplified',
      latex: `\\approx -\\sum_{i=1}^{M} p_i \\log_2(p_i)`,
      description: 'Simplified discrete approximation using histogram (Shannon entropy)'
    },
    {
      id: 'result',
      latex: `H_{${N}} = ${entropy.toFixed(4)} \\text{ bits}`,
      description: `Calculated entropy for N = ${N} samples`
    }
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Entropy Formula Breakdown</h2>
      
      {/* Formula Display */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6 border-l-4 border-blue-500">
        <div className="space-y-3">
          {formulaParts.map((part, index) => (
            <motion.div
              key={part.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3"
            >
              <div className="text-blue-600 font-mono text-lg mt-1">
                {index < formulaParts.length - 1 ? '=' : ''}
              </div>
              <div className="flex-1">
                <div className="text-lg text-gray-800 mb-1">
                  <InlineMath math={part.latex} />
                </div>
                <div className="text-sm text-gray-600 italic">{part.description}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Step-by-step calculation */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">Step-by-Step Calculation</h3>
        <div className="space-y-2">
          <AnimatePresence mode="wait">
            {stepByStep.map((step, index) => {
              const isExpanded = expandedSteps.has(index);
              
              const toggleExpand = (e: React.MouseEvent) => {
                e.stopPropagation();
                const newExpanded = new Set(expandedSteps);
                if (isExpanded) {
                  newExpanded.delete(index);
                } else {
                  newExpanded.add(index);
                }
                setExpandedSteps(newExpanded);
              };

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ 
                    opacity: currentStep >= index ? 1 : 0.5,
                    y: 0,
                    backgroundColor: currentStep === index ? '#dbeafe' : 'transparent'
                  }}
                  transition={{ duration: 0.3 }}
                  className={`p-3 rounded-lg border-l-4 ${
                    currentStep === index 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-300'
                  }`}
                >
                  <div 
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => onStepChange(index)}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      currentStep === index 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{step.description}</div>
                      {step.value !== undefined && (
                        <div className="text-sm text-gray-600 mt-1">
                          Value: <span className="font-mono">{step.value.toFixed(4)}</span>
                        </div>
                      )}
                    </div>
                    {step.detailedExplanation && (
                      <button
                        onClick={toggleExpand}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                          isExpanded
                            ? 'bg-blue-500 text-white hover:bg-blue-600'
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        }`}
                        title="Show detailed explanation"
                        aria-label="Toggle detailed explanation"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                  
                  {/* Detailed Explanation */}
                  {step.detailedExplanation && (
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 ml-11 overflow-hidden"
                        >
                          <div className="bg-white rounded-lg p-4 border-2 border-blue-200 shadow-sm">
                            <h4 className="font-semibold text-lg text-gray-800 mb-3">
                              {step.detailedExplanation.title}
                            </h4>
                            
                            {step.detailedExplanation.formula && (
                              <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                                <div className="text-base">
                                  <InlineMath math={step.detailedExplanation.formula} />
                                </div>
                              </div>
                            )}
                            
                            <ul className="space-y-2">
                              {step.detailedExplanation.substeps.map((substep, subIndex) => (
                                <motion.li
                                  key={subIndex}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: subIndex * 0.05 }}
                                  className="flex items-start gap-2 text-sm text-gray-700"
                                >
                                  <span className="text-blue-500 mt-1">•</span>
                                  <span>{substep}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Navigation buttons */}
      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onStepChange(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          ← Previous Step
        </button>
        <button
          onClick={() => onStepChange(Math.min(stepByStep.length - 1, currentStep + 1))}
          disabled={currentStep === stepByStep.length - 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next Step →
        </button>
        <button
          onClick={() => onStepChange(stepByStep.length - 1)}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ml-auto"
        >
          Show Final Result
        </button>
      </div>
      
      {/* Note about simplification */}
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg">
        <div className="text-sm text-yellow-800">
          <strong>Note:</strong> The actual formula requires computing an N-dimensional joint PDF and 
          N-dimensional integral, which is computationally expensive. This visualization uses a 
          simplified discrete approximation (histogram-based) to demonstrate the concept in real-time.
        </div>
      </div>
    </div>
  );
}

