// src/components/JobSequencingPage.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResultPage from './ResultPage';
import "../css/JobSequencingPage.css";

const JobSequencingPage = () => {
    // const [jobs, setJobs] = useState({
    //     jobNameArrayInput: '',
    //     weightArrayInput: '',
    //     profitArrayInput: '',
    //   });
    const [jobs, setJobs] = useState([]);
  const [result, setResult] = useState(null);
  const [executionTimes, setExecutionTimes] = useState([]);
  const [profitArrayInput, setProfitArrayInput] = useState('');
  const [weightArrayInput, setWeightArrayInput] = useState('');
  const [jobNameArrayInput, setJobNameArrayInput] = useState('');

  const handleProfitArrayChange = (e) => {
    const { value } = e.target;
    setProfitArrayInput(value);
  };

  const handleWeightArrayChange = (e) => {
    const { value } = e.target;
    setWeightArrayInput(value);
  };

  const handleJobNameArrayChange = (e) => {
    const { value } = e.target;
    setJobNameArrayInput(value);
  };

  
  const setResultAndCalculate = () => {
    const iterations = 100;
    const times = [];

    const updatedJobs = [...jobs]; // Create a copy of the current jobs array
    console.log(jobs)
    for (let i = 0; i < iterations; i++) {
      const startTime = performance.now();
      calculateJobSequencing(updatedJobs); // Pass the updated jobs array
      const endTime = performance.now();
      times.push(endTime - startTime);
    }

    setExecutionTimes(times);
    console.log(updatedJobs);
    setResult(calculateJobSequencing(updatedJobs)); // Pass the updated jobs array
    setProfitArrayInput('');
    setWeightArrayInput('');
    setJobNameArrayInput('');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setResultAndCalculate();
  };
  const calculateJobSequencing = (jobs) => {
    const profitArray = profitArrayInput.split(',').map((value) => parseInt(value.trim()));
    const weightArray = weightArrayInput.split(',').map((value) => parseInt(value.trim()));
    const jobNameArray = jobNameArrayInput.split(',').map((value) => value.trim());
    console.log(profitArray)
    console.log(weightArray)
    console.log(jobNameArray)
    if (
      profitArray.length === weightArray.length &&
      weightArray.length === jobNameArray.length &&
      profitArray.length > 0
    ) {
      const newJobs = profitArray.map((profit, index) => ({
        id: jobs.length + index + 1,
        name: jobNameArray[index],
        deadline: weightArray[index],
        profit,
      }));
      console.log(newJobs);
      setJobs((prevJobs) => [...prevJobs, ...newJobs]);

    console.log(jobs);

    const sortedJobs = [...jobs, ...newJobs].sort((a, b) => b.profit - a.profit);

    console.log(sortedJobs);

      let sequence = [];
      let executionOrder = '';
      let totalProfit = 0;
      let selectedItems = [];

      const slotOccupied = Array(sortedJobs.length).fill(false);

      for (const job of sortedJobs) {
        for (let i = Math.min(sortedJobs.length, job.deadline) - 1; i >= 0; i--) {
          if (!slotOccupied[i]) {
            sequence.push(job.id);
            executionOrder += `Job ${job.id}, `;
            totalProfit += job.profit;
            selectedItems.push({ id: job.id, name: job.name, deadline: job.deadline, profit: job.profit });
            slotOccupied[i] = true;
            break;
          }
        }
      }
      console.log(sequence);
      console.log(totalProfit);

      return { sequence, executionOrder: executionOrder.slice(0, -2), totalProfit, selectedItems };
    } else {
      // Handle invalid input
      console.error('Invalid input format. Please ensure profit, weight, and job name arrays have the same length.');
      return null; // Return null for invalid input
    }
  };

  return (
    <div className="job-sequencing-page">
      {result ? (
        <React.Fragment>
          <ResultPage
            algorithmName="Job Sequencing"
            result={result}
            executionTime={executionTimes.reduce((sum, time) => sum + time, 0) / executionTimes.length}
          />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <h2>Job Sequencing Problem</h2>
          <form onSubmit={(e) => { e.preventDefault(); setResultAndCalculate(jobs); }}>
            <label>
              Profit Array:
              <input
                type="text"
                name='profit'
                value={jobs.profitArrayInput} 
                onChange={handleProfitArrayChange} />
            </label>
            <label>
              Deadline Array:
              <input 
                type="text" 
                name='deadline'
                value={jobs.weightArrayInput} 
                onChange={handleWeightArrayChange} />
            </label>
            <label>
              Job Name Array:
              <input 
                type="text"
                name='jobName'
                value={jobs.jobNameArrayInput} 
                onChange={handleJobNameArrayChange} />
            </label>
            <button type="submit" onClick={() => setResultAndCalculate(jobs)}>Solve</button>
          </form>
          <Link to="/" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold', margin: '20px' }}>Back to Home</Link>
          </React.Fragment>
        )}
      </div>
    );
  };
  
  export default JobSequencingPage;