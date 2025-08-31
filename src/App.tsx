import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Animator from './pages/Animator/Animator';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/animator" element={<Animator />} />
    </Routes>
  );
}

export default App;
