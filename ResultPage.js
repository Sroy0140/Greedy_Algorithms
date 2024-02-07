import React from 'react';
import "../css/ResultPage.css";
import { Link } from 'react-router-dom';

const ResultPage = ({ algorithmName, result, executionTime }) => {
  return (
    <div className="result-page">
      <h2>{algorithmName} Result</h2>

      {result ? (
        <React.Fragment>
          {result.maxValue !== undefined ? ( // Check if it's a Fractional Knapsack result
            <React.Fragment>
              <p>Maximum Value: {result.maxValue}</p>
              <ul>
                {result.selectedItems.map((item, index) => (
                  <li key={index}>
                    Weight: {item.weight}, Value: {item.value}, Fraction: {item.fraction || 1}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Execution Time: {executionTime} milliseconds</p>
            </React.Fragment>
          ) : result.totalProfit !== undefined ? ( // Check if it's a Job Sequencing result
            <React.Fragment>
              <p>Total Profit: {result.totalProfit}</p>
              <p>Execution Order: {result.executionOrder}</p>
              <ul>
                {result.selectedItems.map((item, index) => (
                  <li key={index}>
                    Job {item.id}: {item.name}, Deadline: {item.deadline}, Profit: {item.profit}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Execution Time: {executionTime} milliseconds</p>
            </React.Fragment>
          ) : result.fixedLengthCodes !== undefined ? (
            <React.Fragment>
              <div>
                <h3>Fixed Length Codes:</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Character</th>
                      <th>Code</th>
                      <th>Bits Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.fixedLengthCodes.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.character}</td>
                        <td>{entry.code}</td>
                        <td>{entry.bitsRequired}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p>Total Bits Required: {result.totalBitsFixedLength}</p>
              </div>

              <div>
                <h3>Huffman Codes:</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Character</th>
                      <th>Code</th>
                      <th>Bits Required</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.huffmanCodes.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.character}</td>
                        <td>{entry.code}</td>
                        <td>{entry.bitsRequired}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p>Total Bits Required: {result.totalBitsHuffmanCodes}</p>
              </div>

              <p>Bits Saved by Using Huffman Coding: {result.bitsSaved}</p>
              <p style={{ fontSize: '18px', fontWeight: 'bold' }}>Execution Time: {executionTime} milliseconds</p>
            </React.Fragment>
          ): result.shortestPaths !== undefined ? (
            <React.Fragment>
              <h3>Shortest Paths from Source Vertex</h3>
              <table>
                <thead>
                  <tr>
                    <th>Vertex</th>
                    <th>Distance</th>
                  </tr>
                </thead>
                <tbody>
                  {result.shortestPaths.map((path, index) => (
                    <tr key={index}>
                      {Object.entries(path).map(([vertex, distance]) => (
                        <React.Fragment key={vertex}>
                          <td>{vertex}</td>
                          <td>{distance}</td>
                        </React.Fragment>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ fontSize: '16px', fontWeight: 'bold' }}>Execution Time: {executionTime} milliseconds</p>
            </React.Fragment>
          ) : (
            <p>Unknown result format.</p>
          )}
          
        </React.Fragment>
      ) : (
        <p>No result available.</p>
      )}
      <Link to="/" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold', margin: '20px' }}>Back to Home</Link>
    </div>
  );
};

export default ResultPage;
