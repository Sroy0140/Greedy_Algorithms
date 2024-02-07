// src/components/DijkstraPage.js

import React, { useState , useEffect} from 'react';
import ResultPage from './ResultPage';
import '../css/DijkstraPage.css';
import { Link } from 'react-router-dom';

const DijkstraPage = () => {
  const [graph, setGraph] = useState('');
  const [sourceVertex, setSourceVertex] = useState('');
  const [result, setResult] = useState(null);
  const [executionTimes, setExecutionTimes] = useState(null);

  const [inputHistory, setInputHistory] = useState([]); // Added state for input history

  // Load input history from local storage on component mount
  useEffect(() => {
    const storedInputHistory = JSON.parse(localStorage.getItem('dijkstraInputHistory')) || [];
    setInputHistory(storedInputHistory);
  }, []);

  // Save input history to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('dijkstraInputHistory', JSON.stringify(inputHistory));
  }, [inputHistory]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate and process form data
    if (validateFormData()) {
      // Measure the execution time
      const startTime = performance.now();

      // Process the form data and set the result
      const dijkstraResult = calculateDijkstra(graph, sourceVertex);

      // Measure the execution time again after processing
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;

      // Set the result and execution time
      setResult(dijkstraResult);
      setExecutionTimes(elapsedTime);

      // Add the current input to the history
      const currentInput = { graph, sourceVertex };
      setInputHistory([currentInput, ...inputHistory]);
    }
  };

  const validateFormData = () => {
    // Validate that both graph and sourceVertex are provided
    if (!graph.trim() || !sourceVertex.trim()) {
      alert('Please provide both the graph and the source vertex.');
      return false;
    }

    // Add more specific validation as needed

    return true;
  };

  const calculateDijkstra = (graph, sourceVertex) => {
    // Parse the graph string into a matrix
    const matrix = graph.split('\n').map(row => row.split(',').map(Number));

    // Validate the matrix
    if (!matrix.every(row => row.length === matrix.length)) {
      alert('Invalid adjacency matrix. Make sure it is a square matrix.');
      return null;
    }

    // Initialize distances and visited arrays
    const distances = Array(matrix.length).fill(Number.POSITIVE_INFINITY);
    const visited = Array(matrix.length).fill(false);

    // Convert sourceVertex to numeric index
    const sourceIndex = parseInt(sourceVertex) - 1;

    // Validate the sourceIndex
    if (isNaN(sourceIndex) || sourceIndex < 0 || sourceIndex >= matrix.length) {
      alert('Invalid source vertex. Please provide a valid numeric index.');
      return null;
    }

    // Initialize the distance to the source vertex as 0
    distances[sourceIndex] = 0;

    // Dijkstra's algorithm
    for (let i = 0; i < matrix.length; i++) {
      // Find the vertex with the minimum distance
      const minIndex = getMinDistanceIndex(distances, visited);
      visited[minIndex] = true;

      // Update distances for adjacent vertices
      for (let j = 0; j < matrix.length; j++) {
        if (!visited[j] && matrix[minIndex][j] !== 0 && distances[minIndex] !== Number.POSITIVE_INFINITY &&
          distances[minIndex] + matrix[minIndex][j] < distances[j]) {
          distances[j] = distances[minIndex] + matrix[minIndex][j];
        }
      }
    }

    // Return the result object
    const shortestPaths = distances.map((distance, index) => ({ [`Vertex ${index + 1}`]: distance }));
    return { shortestPaths };
  };

  const getMinDistanceIndex = (distances, visited) => {
    let minDistance = Number.POSITIVE_INFINITY;
    let minIndex = -1;

    for (let i = 0; i < distances.length; i++) {
      if (!visited[i] && distances[i] < minDistance) {
        minDistance = distances[i];
        minIndex = i;
      }
    }

    return minIndex;
  };

  return (
    <div className="dijkstra-page">
      <h2>Dijkstra's Algorithm</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>
            Graph (in adjacency matrix format):
            <textarea
            
              value={graph}
              name='graph'
              onChange={(e) => setGraph(e.target.value)}
              rows="5"
              cols="30"
            />
          </label>
        </div>
        <div className="input-container">
          <label>
            Source Vertex:
            <input
              type="text"
              name="sourceVertex"
              value={sourceVertex}
              onChange={(e) => setSourceVertex(e.target.value)}
            />
          </label>
        </div>
        <button type="submit">Solve</button>
      </form>
      {result && (
        <ResultPage
          algorithmName="Dijkstra's Algorithm"
          result={result}
          executionTime={executionTimes}
        />
      )}
      <Link to="/" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold', margin: '20px' }}>Back to Home</Link>
    </div>
  );
};

export default DijkstraPage;
