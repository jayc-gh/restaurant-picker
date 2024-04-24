import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
import Restaurants from './pages/Restaurants/Restaurants';

const App = () => {
  return (
    <div className="max-w-screen-sm mx-auto font-mono">
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/restaurants" element={<Restaurants />} />
        </Routes>
      </Router>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
