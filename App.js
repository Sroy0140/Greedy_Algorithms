// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from 'Header.js';
import HomePage from 'HomePage.js';
import Footer from 'Footer.js';
import FractionalKnapsackPage from 'FractionalKnapsackPage.js';
import 'App.css';
import JobSequencingPage from 'JobSequencingPage.js';
import HuffmanCodingPage from 'HuffmanCodingPage.js';
import DijkstraPage from 'DijkstraPage.js';

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
