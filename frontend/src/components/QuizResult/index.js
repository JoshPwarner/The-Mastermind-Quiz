import React from "react";
import { useNavigate } from "react-router-dom";
import "./QuizResult.css";
import Image from "../../assets/MM-LOGO.png";

const QuizResult = ({ result }) => {
  const navigator = useNavigate();

  const handleRestartOptions = (e) => {
    e.preventDefault();
    navigator("../join");
  };
  return (
    <div className="result-screen-container">
      <img src={Image} alt="background" className="results-page-img"></img>
      <div className="result-card">
        <h2>Result: {result.percentage}%</h2>
        <p className="result-txt">
          Selected
          <span>
            <strong>{result.correct}</strong>
          </span>
          correct options out of
          <span>
            <strong>{result.total}</strong>
          </span>
          questions.
        </p>
        <button className="retry-btn" onClick={handleRestartOptions}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
