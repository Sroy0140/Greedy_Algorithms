// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import Footer from './components/Footer';
import FractionalKnapsackPage from './components/FractionalKnapsackPage';
import './css/App.css';
import JobSequencingPage from './components/JobSequencingPage';
import HuffmanCodingPage from './components/HuffmanCodingPage';
import DijkstraPage from './components/DijkstraPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/fractional-knapsack" element={<FractionalKnapsackPage/>} />
          <Route path="/job-sequencing" element={<JobSequencingPage/>} />
          <Route path="/huffman-coding" element={<HuffmanCodingPage/>}/>
          <Route path='/dijkstra' element={<DijkstraPage/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
