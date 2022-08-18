import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from 'react';
import "./QuizResult.css";
import axios from "axios";
import Image from "../../assets/MM-LOGO.png";

const QuizResult = ({ result }) => {
  const navigate = useNavigate();
  const username = useSelector((state) => state.user.user.username);
  const handleRestartOptions = () => {
    
    navigate("../");
  };

  const score = result.correct;
  const sendResults = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const options = {
          headers: { "Content-Type": "application/json" },
        };
        const results = {
          player: username,
          score: score,
        };

        const { data } = await axios.post(
          `https://obscure-brushlands-72357.herokuapp.com/scoreBoard`,
          results,
          options
        );

        if (data.err) {
          throw Error(data.err);
        }
        resolve("Scores sent to leaderboard!");
      } catch (err) {
        reject(`Can't send results: ${err}`);
      }
    });
  };
    
    useEffect(() => {
      if (score > 0) {
        sendResults();
        console.log("sent results");
      } 
    }, []);
  
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
        <button className="retry-btn" onClick={handleRestartOptions()}>
          Play Again
        </button>
      </div>
    </div>
  );
};

export default QuizResult;
