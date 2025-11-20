import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SignalVisualization } from '../components/SignalVisualization';
import { FormulaBreakdown } from '../components/FormulaBreakdown';
import { NSlider } from '../components/NSlider';
import { generateSignal, type SignalPoint } from '../utils/entropyCalculator';

export function EntropyStochasticProcess() {
  const [N, setN] = useState(20);
  const [signal, setSignal] = useState<SignalPoint[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate signal when N changes
  useEffect(() => {
    setIsAnimating(true);
    // Small delay for smooth transition
    const timer = setTimeout(() => {
      const newSignal = generateSignal(N, 0.5);
      setSignal(newSignal);
      setCurrentStep(0);
      setIsAnimating(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, [N]);

  // Auto-advance steps for demonstration
  useEffect(() => {
    if (signal.length === 0) return;
    
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        const maxSteps = 4; // We have 4 steps in the breakdown
        if (prev < maxSteps - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 2000); // Change step every 2 seconds
    
    return () => clearInterval(timer);
  }, [signal.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Navigation */}
        <nav className="mb-6">
          <Link
            to="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Menu
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Entropy of a Stochastic Process
          </h1>
          <p className="text-lg text-gray-600">
            Interactive visualization of how entropy H_N is calculated for a signal of length N
          </p>
        </header>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Left column: Signal visualization */}
          <div>
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Signal Visualization</h2>
            <SignalVisualization
              signal={signal}
              width={600}
              height={300}
            />
          </div>

          {/* Right column: N slider */}
          <div>
            <NSlider
              value={N}
              min={5}
              max={50}
              onChange={setN}
            />
          </div>
        </div>

        {/* Formula breakdown - full width */}
        <div className="mb-6">
          <FormulaBreakdown
            signal={signal}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
          />
        </div>

        {/* Information section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Understanding the Formula</h2>
          <div className="prose max-w-none">
            <p className="text-gray-700 mb-4">
              The entropy <strong>H_N</strong> of a stochastic process measures the average information 
              content (or uncertainty) in a signal of length N. The formula shows:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>
                <strong>H_N</strong> = Expected value of the negative log-probability of the joint distribution
              </li>
              <li>
                As <strong>N increases</strong>, more samples are included, potentially increasing entropy
              </li>
              <li>
                The <strong>joint PDF p(x₁, x₂, ..., x_N)</strong> captures the probability of observing 
                the entire sequence of values
              </li>
              <li>
                Higher entropy means <strong>more uncertainty</strong> and less predictability in the signal
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

