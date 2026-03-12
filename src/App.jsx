import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;