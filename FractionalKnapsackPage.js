// src/components/FractionalKnapsackPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import {Link} from "react-router-dom";
import '../css/FractionalKnapsackPage.css';
import ResultPage from "./ResultPage";

const FractionalKnapsackPage = () => {
  const [values, setValues] = useState({
    weights: '',
    values: '',
    capacity: '',
  });

  const [result, setResult] = useState(null);
  const [executionTimes, setExecutionTimes] = useState(0); // Added state for execution time


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleHover = (field) => {
    // Implement tooltip display logic here
    console.log(`Hovering over ${field}`);
  };

  const setResultAndCalculate = (values) => {
    const iterations = 100; // Adjust the number of iterations as needed
    const times = [];

    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      calculateFractionalKnapsack(values);
      const endTime = performance.now();
      times.push(endTime - startTime);
    }

    setExecutionTimes(times);
    setResult(calculateFractionalKnapsack(values));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setResultAndCalculate(values);
  };

  const calculateFractionalKnapsack = (values) => {
    const { weights, values: itemValues, capacity } = values;
  
    // Parse input strings into arrays
    const weightArray = weights.split(',').map(Number);
    const valueArray = itemValues.split(',').map(Number);
  
    // Create an array of objects with weight, value, and value-to-weight ratio
    const items = weightArray.map((weight, index) => ({
      weight,
      value: valueArray[index],
      ratio: valueArray[index] / weight,
    }));
  
    // Sort items based on value-to-weight ratio in descending order
    items.sort((a, b) => b.ratio - a.ratio);
  
    let remainingCapacity = capacity;
    let maxValue = 0;
    const selectedItems = [];
  
    // Iterate through items and select based on the ratio until the knapsack is full
    for (const item of items) {
      if (remainingCapacity >= item.weight) {
        selectedItems.push(item);
        maxValue += item.value;
        remainingCapacity -= item.weight;
      } else {
        const fraction = remainingCapacity / item.weight;
        selectedItems.push({ ...item, fraction });
        maxValue += item.value * fraction;
        break;
      }
    }
  
    return { maxValue, selectedItems };
  };

  return (
    <div className="fractional-knapsack-page">
      {result ? (
        <ResultPage 
        algorithmName="Fractional Knapsack" 
        result={result} 
        executionTime={executionTimes.reduce((sum, time) => sum + time, 0) / executionTimes.length}/>
      ) : (
        <React.Fragment>
          <h2>Fractional Knapsack Problem</h2>
      <form onSubmit={(e) => { e.preventDefault(); setResultAndCalculate(values); }}>
        <div className="input-container">
          <label>
            Weights:
            <input
              type="text"
              name="weights"
              value={values.weights}
              onChange={handleInputChange}
              onMouseOver={() => handleHover('weights')}
            />
            <span className="tooltip">Enter weights separated by commas</span>
          </label>
        </div>
        <div className="input-container">
          <label>
            Values:
            <input
              type="text"
              name="values"
              value={values.values}
              onChange={handleInputChange}
              onMouseOver={() => handleHover('values')}
            />
            <span className="tooltip">Enter values separated by commas</span>
          </label>
        </div>
        <div className="input-container">
          <label>
            Knapsack Capacity:
            <input
              type="text"
              name="capacity"
              value={values.capacity}
              onChange={handleInputChange}
              onMouseOver={() => handleHover('capacity')}
            />
            <span className="tooltip">Enter the capacity of the knapsack</span>
          </label>
        </div>
        <button type="submit" onClick={() => setResultAndCalculate(values)}>Solve</button>
      </form>
      <Link to="/" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold' ,margin: '20px'}}>Back to Home</Link>
      </React.Fragment>
      )}
    </div>
  );
};

export default FractionalKnapsackPage;
