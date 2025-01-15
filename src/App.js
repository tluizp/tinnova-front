import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VeiculosList from './components/VeiculosList';
import VeiculoForm from './components/VeiculoForm';
import Estatisticas from './components/Estatisticas';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VeiculosList />} />
        <Route path="/novo" element={<VeiculoForm />} />
        <Route path="/estatisticas" element={<Estatisticas />} />
      </Routes>
    </Router>
  );
}

export default App;