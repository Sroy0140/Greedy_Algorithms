// src/components/HomePage.js
import React from 'react';
import AlgorithmCard from './AlgorithmCard';
import '../css/HomePage.css';
import FractionalKnapsackPage from './FractionalKnapsackPage';
import JobSequencingPage from './JobSequencingPage';
import HuffmanCodingPage from './HuffmanCodingPage';

const algorithms = [
  {
    title: 'Fractional Knapsack Problem',
    description: 'Optimize knapsack to maximize value with fractional items.',
    timeComplexity: 'O(n log n)', // n is the number of items
    linkTo: "/fractional-knapsack"
  },
  {
    title: 'Job Sequencing Problem',
    description: 'Maximize total profit by scheduling jobs within deadlines.',
    timeComplexity: 'O(n log n)', // n is the number of jobs
    linkTo: "/job-sequencing"
  },
  {
    title: 'Huffman Coding',
    description: 'Variable-length codes to compress data with optimal prefix-free encoding.',
    timeComplexity: 'O(n log n)', // n is the number of characters
    linkTo: "/huffman-coding"
  },
  {
    title: "Dijkstra's Algorithm",
    description: 'Find shortest paths from a source vertex in a weighted graph.',
    timeComplexity: 'O((V + E) log V)', // V is the number of vertices, E is the number of edges
    linkTo: "/dijkstra"
  }
];

const HomePage = () => {
  return (
    <div className="home-page">
      <div className="algorithm-list">
        {algorithms.map((algorithm, index) => (
          <AlgorithmCard key={index} title={algorithm.title} description={algorithm.description} timeComplexity={algorithm.timeComplexity} linkTo={algorithm.linkTo}/>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
