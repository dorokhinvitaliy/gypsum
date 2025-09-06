import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Animator from './pages/Animator/Animator';
import Demo from './pages/Demo/Demo';
import { Layout } from '@/components';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/animator" element={<Animator />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </Layout>
  );
}

export default App;
