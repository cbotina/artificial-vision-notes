import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SamplingVisualization } from '../components/SamplingVisualization';
import { SIGNAL_CONFIG, getSamplingStatus } from '../utils/samplingCalculator';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export function SamplingRateExercise() {
  const [samplingRate, setSamplingRate] = useState(500);
  const [showReconstruction, setShowReconstruction] = useState(true);
  
  const { nyquistRate, fMax } = SIGNAL_CONFIG;
  const sampleStatus = getSamplingStatus(samplingRate);
  const timeWindow: [number, number] = [0, 0.02]; // 20ms window

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
            Exercise: Determining Minimum Sampling Rate
          </h1>
          <p className="text-lg text-gray-600">
            Interactive visualization of the Nyquist-Shannon sampling theorem
          </p>
        </header>

        {/* Problem Statement */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Problem Statement</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              Consider the following signal:
            </p>
            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
              <div className="text-lg font-mono mb-2">
                <InlineMath math="x(t) = \cos(100\pi t) + \sin(200\pi t) + \cos(500\pi t + \pi/4) + 7" />
              </div>
            </div>
            <p className="text-gray-700">
              <strong>Problem:</strong> Determine the minimum sampling rate required to perfectly reconstruct this signal.
            </p>
          </div>
        </div>

        {/* Solution Steps */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Solution</h2>
          <div className="space-y-4">
            <p className="text-gray-700">
              To find the minimum sampling rate, we need to identify the maximum frequency component in the signal:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
              <li>
                <InlineMath math="\cos(100\pi t)" />: <InlineMath math="f_1 = 50 \text{ Hz}" />
              </li>
              <li>
                <InlineMath math="\sin(200\pi t)" />: <InlineMath math="f_2 = 100 \text{ Hz}" />
              </li>
              <li>
                <InlineMath math="\cos(500\pi t + \pi/4)" />: <InlineMath math="f_3 = 250 \text{ Hz}" />
              </li>
              <li>
                Constant term: <InlineMath math="f_0 = 0 \text{ Hz}" /> (DC component)
              </li>
            </ul>
            <p className="text-gray-700">
              The maximum frequency is <InlineMath math={`f_{\\text{max}} = ${fMax} \\text{ Hz}`} />.
            </p>
            <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
              <p className="text-gray-800 font-semibold mb-2">Nyquist-Shannon Theorem:</p>
              <div className="text-lg mb-2">
                <InlineMath math={`f_s \\geq 2f_{\\text{max}} = 2 \\times ${fMax} = ${nyquistRate} \\text{ Hz}`} />
              </div>
              <p className="text-gray-700">
                Therefore, the <strong>minimum sampling rate (Nyquist rate)</strong> required is{' '}
                <strong>{nyquistRate} Hz</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Interactive Visualization</h2>
          
          {/* Sampling Rate Slider */}
          <div className="mb-6">
            <label className="block text-lg font-semibold text-gray-800 mb-2">
              Sampling Rate (f_s)
            </label>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600 w-16">100 Hz</span>
              <input
                type="range"
                min="100"
                max="1000"
                step="10"
                value={samplingRate}
                onChange={(e) => setSamplingRate(parseInt(e.target.value))}
                className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-sm text-gray-600 w-16">1000 Hz</span>
            </div>
            <div className="mt-2 text-center">
              <motion.span
                key={samplingRate}
                initial={{ scale: 1.2, color: '#3b82f6' }}
                animate={{ scale: 1, color: '#1f2937' }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold text-gray-800"
              >
                f_s = {samplingRate} Hz
              </motion.span>
            </div>
            
            {/* Status indicator */}
            <div className={`mt-4 p-3 rounded-lg border-l-4 ${
              sampleStatus.status === 'adequate' 
                ? 'bg-green-50 border-green-500' 
                : sampleStatus.status === 'nyquist'
                ? 'bg-orange-50 border-orange-500'
                : 'bg-red-50 border-red-500'
            }`}>
              <p className={`font-semibold ${
                sampleStatus.status === 'adequate'
                  ? 'text-green-700'
                  : sampleStatus.status === 'nyquist'
                  ? 'text-orange-700'
                  : 'text-red-700'
              }`}>
                {sampleStatus.message}
              </p>
            </div>
          </div>

          {/* Toggle Reconstruction */}
          <div className="mb-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showReconstruction}
                onChange={(e) => setShowReconstruction(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="text-gray-700">Show reconstructed signal (sinc interpolation)</span>
            </label>
          </div>
        </div>

        {/* Visualization */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Signal Visualization</h2>
          <div className="mb-4 text-sm text-gray-600">
            <p className="mb-2">
              <span className="inline-block w-3 h-3 bg-blue-500 mr-2"></span>
              <strong>Blue line:</strong> Original continuous signal
            </p>
            <p className="mb-2">
              <span className={`inline-block w-3 h-3 mr-2 ${
                sampleStatus.status === 'adequate'
                  ? 'bg-green-500'
                  : sampleStatus.status === 'nyquist'
                  ? 'bg-orange-500'
                  : 'bg-red-500'
              }`}></span>
              <strong>Colored dots:</strong> Sampled signal points
            </p>
            {showReconstruction && (
              <p>
                <span className={`inline-block w-3 h-3 border-2 mr-2 ${
                  sampleStatus.status === 'adequate'
                    ? 'border-green-500'
                    : sampleStatus.status === 'nyquist'
                    ? 'border-orange-500'
                    : 'border-red-500'
                }`}></span>
                <strong>Dashed line:</strong> Reconstructed signal using sinc interpolation
              </p>
            )}
          </div>
          <SamplingVisualization
            samplingRate={samplingRate}
            timeWindow={timeWindow}
            width={900}
            height={400}
            showReconstruction={showReconstruction}
          />
        </div>

        {/* Explanation */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Understanding the Results</h2>
          <div className="space-y-4 text-gray-700">
            <div>
              <h3 className="font-semibold text-lg mb-2 text-green-700">
                ✓ Adequate Sampling (f_s &gt; 500 Hz)
              </h3>
              <p>
                When sampling above the Nyquist rate, the reconstructed signal perfectly matches the original.
                All frequency components are preserved, and perfect reconstruction is possible using sinc interpolation.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-orange-700">
                ⚠ Nyquist Rate Sampling (f_s = 500 Hz)
              </h3>
              <p>
                At exactly the Nyquist rate, perfect reconstruction is theoretically possible. This is the
                minimum sampling rate that allows perfect reconstruction. The sinc interpolation should match
                the original signal.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2 text-red-700">
                ✗ Insufficient Sampling (f_s &lt; 500 Hz)
              </h3>
              <p>
                When sampling below the Nyquist rate, <strong>aliasing</strong> occurs. High-frequency components
                (especially the 250 Hz component) are folded back into lower frequencies, making them
                indistinguishable from actual low-frequency components. The reconstructed signal will not match
                the original, and perfect reconstruction is impossible.
              </p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 border-l-4 border-yellow-400 mt-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> The reconstruction uses sinc interpolation (Whittaker-Shannon interpolation formula).
                In practice, perfect reconstruction requires an infinite number of samples, so this visualization uses
                a finite approximation. The reconstruction quality improves as you sample closer to or above the Nyquist rate.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

