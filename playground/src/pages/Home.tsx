import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export function Home() {
  const menuItems = [
    {
      title: 'Entropy of a Stochastic Process',
      description: 'Interactive visualization of how entropy H_N is calculated for a signal of length N',
      path: '/entropy-stochastic-process',
      icon: '📊',
      color: 'from-blue-500 to-indigo-600'
    },
    {
      title: 'Determining Minimum Sampling Rate',
      description: 'Interactive exercise demonstrating the Nyquist-Shannon sampling theorem with adjustable sampling rates',
      path: '/sampling-rate-exercise',
      icon: '📈',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: "Ohm's Law",
      description: 'Interactive circuit visualization exploring the relationship between voltage, current, and resistance',
      path: '/ohms-law',
      icon: '⚡',
      color: 'from-yellow-500 to-orange-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Interactive Formula Playground
          </h1>
          <p className="text-xl text-gray-600">
            Explore mathematical concepts through interactive visualizations
          </p>
        </motion.header>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                to={item.path}
                className="block h-full"
              >
                <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group h-full flex flex-col">
                  {/* Icon/Header */}
                  <div className={`bg-gradient-to-br ${item.color} p-6 text-white`}>
                    <div className="text-5xl mb-2">{item.icon}</div>
                    <h2 className="text-2xl font-bold">{item.title}</h2>
                  </div>
                  
                  {/* Description */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-gray-600 mb-4 flex-1">{item.description}</p>
                    
                    {/* CTA */}
                    <div className="mt-auto pt-4 border-t border-gray-200">
                      <div className="flex items-center justify-between text-blue-600 group-hover:text-blue-700">
                        <span className="font-semibold">Explore →</span>
                        <svg
                          className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Footer/Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center text-gray-600"
        >
          <p className="text-sm">
            Select a topic above to start exploring interactive visualizations
          </p>
        </motion.div>
      </div>
    </div>
  );
}

