// src/components/HuffmanCodingPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResultPage from './ResultPage';
import '../css/HuffmanCodingPage.css';

//huffman-coding
const HuffmanCodingPage = () => {
  const [charactersInput, setCharactersInput] = useState('');
  const [frequencyInput, setFrequencyInput] = useState('');

  const [result, setResult] = useState(null);
  const [executionTimes, setExecutionTimes] = useState([]);

  const handleCharactersChange = (e) => {
    const { value } = e.target;
    setCharactersInput(value);
  };

  const handleFrequencyChange = (e) => {
    const { value } = e.target;
    setFrequencyInput(value);
  };

  const setResultAndCalculate = () => {
    setResult(calculateHuffmanCoding());
  };

  const calculateHuffmanCoding = () => {
    const characters = charactersInput.split(',').map((char) => char.trim());
    const frequency = frequencyInput.split(',').map((freq) => parseInt(freq.trim()));

    // Validate input lengths
    if (characters.length !== frequency.length || characters.length === 0) {
      console.error('Invalid input format. Please ensure characters and frequency arrays have the same length.');
      return null;
    }

    // Build the Huffman Tree
    const huffmanTree = buildHuffmanTree(characters, frequency);

    // Calculate fixed length codes and total bits
    const fixedLengthCodes = calculateFixedLengthCodes(characters);
    const totalBitsFixedLength = calculateTotalBitsFixedLength(characters, frequency);

    // Calculate variable length codes and total bits using Huffman Coding
    const startTime = performance.now(); // Record the start time
    const huffmanCodes = calculateHuffmanCodes(huffmanTree);
    const totalBitsHuffmanCodes = calculateTotalBitsHuffmanCodes(characters, frequency, huffmanCodes);
    const endTime = performance.now(); // Record the end time
    setExecutionTimes(endTime - startTime); // Calculate the execution time
    // Calculate the number of bits saved
    const bitsSaved = totalBitsFixedLength - totalBitsHuffmanCodes;

    return { fixedLengthCodes, huffmanCodes,totalBitsFixedLength,totalBitsHuffmanCodes, bitsSaved, executionTimes };
  };

  const buildHuffmanTree = (characters, frequency) => {
    const nodes = characters.map((char, index) => ({
      character: char,
      frequency: frequency[index],
      left: null,
      right: null,
    }));
  
    while (nodes.length > 1) {
      nodes.sort((a, b) => a.frequency - b.frequency);
  
      const left = nodes.shift();
      const right = nodes.shift();
  
      const newNode = {
        character: null,
        frequency: left.frequency + right.frequency,
        left,
        right,
      };
  
      nodes.push(newNode);
    }
  
    return nodes[0];
  };
  
  const calculateFixedLengthCodes = (characters) => {
    return characters.map((char) => ({
      character: char,
      code: char.charCodeAt(0).toString(2),
      bitsRequired: char.charCodeAt(0).toString(2).length,
    }));
  };
  

  const calculateTotalBitsFixedLength = (characters, frequency) => {
    const fixedLengthCodes = calculateFixedLengthCodes(characters);
  
    return fixedLengthCodes.reduce((totalBits, entry) => {
      const charIndex = characters.indexOf(entry.character);
      return totalBits + entry.bitsRequired * frequency[charIndex];
    }, 0);
  };
  

  const calculateHuffmanCodes = (huffmanTree) => {
    const huffmanCodes = [];
  
    const traverseTree = (node, code) => {
      if (node.character !== null) {
        huffmanCodes.push({
          character: node.character,
          code,
          bitsRequired: code.length,
        });
      } else {
        traverseTree(node.left, code + '0');
        traverseTree(node.right, code + '1');
      }
    };
  
    traverseTree(huffmanTree, '');
  
    return huffmanCodes;
  };
  

  const calculateTotalBitsHuffmanCodes = (characters, frequency, huffmanCodes) => {
    return huffmanCodes.reduce((totalBits, entry) => {
      const charIndex = characters.indexOf(entry.character);
      return totalBits + entry.bitsRequired * frequency[charIndex];
    }, 0);
  };
  

  return (
    <div className="huffman-coding-page">
      {result ? (
        <ResultPage
          algorithmName="Huffman Coding"
          result={result}
          executionTime={executionTimes} // Assuming no significant execution time for this calculation
        />
      ) : (
        <React.Fragment>
          <h2>Huffman Coding</h2>
          <form onSubmit={(e) => { e.preventDefault(); setResultAndCalculate(); }}>
            <div className="input-container">
              <label>
                Characters:
                <input
                  type="text"
                  value={charactersInput}
                  onChange={handleCharactersChange}
                />
              </label>
            </div>
            <div className="input-container">
              <label>
                Frequency:
                <input
                  type="text"
                  value={frequencyInput}
                  onChange={handleFrequencyChange}
                />
              </label>
            </div>
            <button type="submit" onClick={() => setResultAndCalculate()}>Solve</button>
          </form>
          <Link to="/" style={{ textDecoration: 'none', color: 'blue', fontWeight: 'bold',margin: '20px'}}>Back to Home</Link>
        </React.Fragment>
      )}
    </div>
  );
};

export default HuffmanCodingPage;
