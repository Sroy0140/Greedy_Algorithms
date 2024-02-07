import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AlgorithmCard.css';

const AlgorithmCard = ({ title, description,timeComplexity, linkTo }) => {
  const navigate = useNavigate(); // Import useNavigate hook

  const handleClick = () => {
    navigate(linkTo); // Use navigate instead of history.push
  };

  return (
    <div className="algorithm-card" onClick={handleClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{timeComplexity}</p>
    </div>
  );
};

export default AlgorithmCard;