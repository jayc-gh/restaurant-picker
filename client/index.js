import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome/Welcome';
import Restaurants from './pages/Restaurants/Restaurants';

const App = () => {
  const [params, setParams] = useState({});
  const handleSetParams = newParams => {
    setParams(newParams);
  };

  return (
    <div className="max-w-screen-sm mx-auto font-mono">
      <Router>
        <Routes>
          <Route
            path="/"
            element={<Welcome handleSetParams={handleSetParams} />}
          />
          <Route
            path="/restaurants"
            element={<Restaurants params={params} />}
          />
        </Routes>
      </Router>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
