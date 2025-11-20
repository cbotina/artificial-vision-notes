import { motion } from 'framer-motion';

interface NSliderProps {
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
}

export function NSlider({ value, min, max, onChange }: NSliderProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-4">
        <label className="block text-lg font-semibold text-gray-800 mb-2">
          Signal Length (N)
        </label>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 w-12">{min}</span>
          <input
            type="range"
            min={min}
            max={max}
            value={value}
            onChange={(e) => onChange(parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <span className="text-sm text-gray-600 w-12">{max}</span>
        </div>
        <div className="mt-2 text-center">
          <motion.span
            key={value}
            initial={{ scale: 1.2, color: '#3b82f6' }}
            animate={{ scale: 1, color: '#1f2937' }}
            transition={{ duration: 0.3 }}
            className="text-2xl font-bold text-gray-800"
          >
            N = {value}
          </motion.span>
        </div>
      </div>
      
      <div className="text-sm text-gray-600 mt-4">
        <p>
          Adjust the slider to change the number of samples in the signal. 
          Watch how the entropy H_N changes as you add more samples to the stochastic process.
        </p>
      </div>
    </div>
  );
}

