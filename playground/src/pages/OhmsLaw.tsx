import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CircuitVisualization } from '../components/CircuitVisualization';
import { InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export function OhmsLaw() {
  const [voltage, setVoltage] = useState(12); // Volts
  const [current, setCurrent] = useState(2); // Amperes
  const [resistance, setResistance] = useState(6); // Ohms
  const [activeVariable, setActiveVariable] = useState<'voltage' | 'current' | 'resistance'>('voltage');

  // Calculate based on Ohm's Law: V = I × R
  useEffect(() => {
    if (activeVariable === 'voltage') {
      // V = I × R
      setVoltage(current * resistance);
    } else if (activeVariable === 'current') {
      // I = V / R
      setCurrent(voltage / resistance);
    } else if (activeVariable === 'resistance') {
      // R = V / I
      setResistance(voltage / current);
    }
  }, [voltage, current, resistance, activeVariable]);

  const handleVoltageChange = (value: number) => {
    setActiveVariable('voltage');
    setVoltage(value);
    setCurrent(value / resistance);
  };

  const handleCurrentChange = (value: number) => {
    setActiveVariable('current');
    setCurrent(value);
    setResistance(voltage / value);
  };

  const handleResistanceChange = (value: number) => {
    setActiveVariable('resistance');
    setResistance(value);
    setCurrent(voltage / value);
  };

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
            Ohm's Law: Understanding Current, Voltage, and Resistance
          </h1>
          <p className="text-lg text-gray-600">
            Interactive visualization of the fundamental relationship in electrical circuits
          </p>
        </header>

        {/* Ohm's Law Formula */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Ohm's Law</h2>
          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500">
            <div className="text-2xl mb-2">
              <InlineMath math="V = I \\times R" />
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Where:</p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li><strong>V</strong> = Voltage (Volts, V)</li>
                <li><strong>I</strong> = Current (Amperes, A)</li>
                <li><strong>R</strong> = Resistance (Ohms, Ω)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Concept Explanations */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Voltage */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Voltage (V)</h3>
            </div>
            <p className="text-gray-700 mb-3">
              Voltage is the <strong>electrical potential difference</strong> between two points. 
              It's like the "pressure" that pushes electric charges through a circuit.
            </p>
            <div className="bg-yellow-50 rounded p-3 text-sm">
              <p className="font-semibold mb-1">Analogy:</p>
              <p className="text-gray-700">
                Think of voltage like water pressure in a pipe. Higher voltage = more "push" 
                for the electric charges.
              </p>
            </div>
          </motion.div>

          {/* Current */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">→</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Current (I)</h3>
            </div>
            <p className="text-gray-700 mb-3">
              Current is the <strong>rate of flow of electric charge</strong>. It measures 
              how many electrons pass through a point per second.
            </p>
            <div className="bg-blue-50 rounded p-3 text-sm">
              <p className="font-semibold mb-1">Analogy:</p>
              <p className="text-gray-700">
                Think of current like the flow rate of water. Higher current = more electrons 
                flowing per second.
              </p>
            </div>
          </motion.div>

          {/* Resistance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-lg shadow-lg p-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-2xl">⛔</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-800">Resistance (R)</h3>
            </div>
            <p className="text-gray-700 mb-3">
              Resistance is the <strong>opposition to the flow of current</strong>. Materials 
              with high resistance make it harder for electrons to flow.
            </p>
            <div className="bg-red-50 rounded p-3 text-sm">
              <p className="font-semibold mb-1">Analogy:</p>
              <p className="text-gray-700">
                Think of resistance like a narrow pipe. Higher resistance = narrower pipe = 
                less flow for the same pressure.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Interactive Circuit Visualization */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Interactive Circuit</h2>
          <p className="text-gray-600 mb-4">
            Adjust the sliders below to see how changing voltage, current, or resistance affects 
            the circuit. Watch the electrons flow and the brightness change!
          </p>
          
          <CircuitVisualization
            voltage={voltage}
            current={current}
            resistance={resistance}
            width={800}
            height={400}
          />
        </div>

        {/* Interactive Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Voltage Slider */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">⚡</span>
                  Voltage (V)
                </label>
                <motion.span
                  key={voltage}
                  initial={{ scale: 1.2, color: '#fbbf24' }}
                  animate={{ scale: 1, color: '#1f2937' }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-gray-800"
                >
                  {voltage.toFixed(1)} V
                </motion.span>
              </div>
              <input
                type="range"
                min="1"
                max="24"
                step="0.1"
                value={voltage}
                onChange={(e) => handleVoltageChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 V</span>
                <span>24 V</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Effect:</strong> Increasing voltage increases the "push" on electrons, 
                causing more current to flow (if resistance stays constant).
              </p>
            </div>
          </div>

          {/* Current Slider */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">→</span>
                  Current (A)
                </label>
                <motion.span
                  key={current}
                  initial={{ scale: 1.2, color: '#3b82f6' }}
                  animate={{ scale: 1, color: '#1f2937' }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-gray-800"
                >
                  {current.toFixed(2)} A
                </motion.span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={current}
                onChange={(e) => handleCurrentChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>0.1 A</span>
                <span>10 A</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Effect:</strong> Current is the result of voltage divided by resistance. 
                Higher current means more electrons flowing per second.
              </p>
            </div>
          </div>

          {/* Resistance Slider */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  <span className="text-2xl">⛔</span>
                  Resistance (Ω)
                </label>
                <motion.span
                  key={resistance}
                  initial={{ scale: 1.2, color: '#ef4444' }}
                  animate={{ scale: 1, color: '#1f2937' }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-bold text-gray-800"
                >
                  {resistance.toFixed(1)} Ω
                </motion.span>
              </div>
              <input
                type="range"
                min="1"
                max="20"
                step="0.1"
                value={resistance}
                onChange={(e) => handleResistanceChange(parseFloat(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>1 Ω</span>
                <span>20 Ω</span>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>
                <strong>Effect:</strong> Increasing resistance reduces current flow (if voltage 
                stays constant). It's like making the pipe narrower.
              </p>
            </div>
          </div>
        </div>

        {/* Real-time Formula Display */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Real-time Calculation</h2>
          <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-500">
            <div className="text-lg mb-2">
              <InlineMath math={`V = I \\times R`} />
            </div>
            <div className="text-lg font-mono text-gray-800">
              <InlineMath math={`${voltage.toFixed(1)} = ${current.toFixed(2)} \\times ${resistance.toFixed(1)}`} />
            </div>
            <div className="mt-3 text-sm text-gray-600">
              {activeVariable === 'voltage' && (
                <p>You're adjusting <strong>voltage</strong>. Current and resistance are calculated to maintain the relationship.</p>
              )}
              {activeVariable === 'current' && (
                <p>You're adjusting <strong>current</strong>. Resistance is calculated based on voltage and current.</p>
              )}
              {activeVariable === 'resistance' && (
                <p>You're adjusting <strong>resistance</strong>. Current is calculated based on voltage and resistance.</p>
              )}
            </div>
          </div>
        </div>

        {/* Understanding Section */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Key Insights</h2>
          <div className="space-y-4 text-gray-700">
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Direct Proportionality</h3>
              <p>
                Voltage and current are <strong>directly proportional</strong> when resistance is constant. 
                Double the voltage, and you double the current.
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Inverse Proportionality</h3>
              <p>
                Current and resistance are <strong>inversely proportional</strong> when voltage is constant. 
                Double the resistance, and you halve the current.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg mb-2">Power Relationship</h3>
              <p>
                Power dissipated in a resistor is <InlineMath math="P = V \\times I = I^2 \\times R = \\frac{V^2}{R}" />. 
                Notice how increasing resistance affects power differently depending on what's held constant!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

