import { Routes, Route } from 'react-router-dom';
import React from 'react';
import Greeting from './features/Greeting';

const App = () => (
  <Routes>
    <Route path="/" element={<Greeting />} />
  </Routes>
);

export default App;
