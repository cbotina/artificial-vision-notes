import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { EntropyStochasticProcess } from './pages/EntropyStochasticProcess';
import { SamplingRateExercise } from './pages/SamplingRateExercise';
import { OhmsLaw } from './pages/OhmsLaw';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/entropy-stochastic-process" element={<EntropyStochasticProcess />} />
      <Route path="/sampling-rate-exercise" element={<SamplingRateExercise />} />
      <Route path="/ohms-law" element={<OhmsLaw />} />
    </Routes>
  );
}

export default App;
