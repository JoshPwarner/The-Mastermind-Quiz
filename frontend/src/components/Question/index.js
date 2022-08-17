import React, { useState, useEffect, useRef } from "react";
// import { useSelector } from "react-redux";
import { flushSync } from "react-dom";

import "./Question.css";
import Image from "../../assets/quest-img.png";

const Questions = ({ query, totalQuestions, currentQuestion, setAnswer }) => {
  // const questions = useSelector((state) => state.quiz);
  const [selectedOption, setSelectedOption] = useState("");

  // const [answersLog, setAnswersLog] = useState(null);
  const timer = useRef(null);
  const progressBar = useRef(null);

  // questions.result.results.map((value, index, array) => {
  //   const check = Object.entries(array);
  //   for (const [key, { correct_answer, incorrect_answers }] of check) {
  //     const newOptions = [...incorrect_answers, correct_answer];
  //     newOptions.sort();

  //     // console.log(typeof newOptions);

  //     // for (const i of newOptions) {
  //     //   console.log(i);
  //     // }
  //   }
  // });

  // const set1 = ";,/?:@&=+$";

  // const encodedQuestion = encodeURIComponent(query.question).replace(
  //   /z/g,
  //   (c) => `%${c.charCodeAt(0).toString(16).toUpperCase()}`
  // );

  function containsEncodedComponents(
    question,
    correct_answer,
    incorrect_answers
  ) {
    return decodeURIComponent(question, correct_answer, incorrect_answers);
  }
  const decodedQuestion = containsEncodedComponents(query.question);
  console.log(query.question);

  const decodedAnswer = containsEncodedComponents(query.correct_answer);

  const decodedWrongAnswer = query.incorrect_answers.map((a) => {
    return decodeURIComponent(a);
  });

  // const decodedwrongAnswer = containsEncodedComponents(
  //   ...query.incorrect_answers
  // );
  // console.log(...query.incorrect_answers);

  // const options = [query.correct_answer, ...query.incorrect_answers];
  // const shuffleOptions = options.sort();

  const options = [decodedAnswer, ...decodedWrongAnswer];
  const shuffleOptions = options.sort();

  // const getAnswersLog = () => {
  //   for (const i of options) {
  //     if (i === query.correct_answer) {
  //       setAnswersLog(options.indexOf(i));
  //     }
  //   }
  // };

  function gotoNextQuestion() {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setAnswer(selectedOption);
    // flushSync(() => {
    //   setAnswer(selectedOption);
    //   // collectAnswer(answersLog);
    // });
    setSelectedOption(null);
    // setAnswersLog(null);
  }

  useEffect(() => {
    progressBar.current.classList.remove("active");
    setTimeout(() => {
      progressBar.current.classList.add("active");
    }, 15);
    timer.current = setTimeout(gotoNextQuestion, 15 * 1000);

    // return gotoNextQuestion;
  }, [query]);

  return (
    <div className="question-container">
      <img src={Image} alt="background" className="question-page-img"></img>
      <span className="timer-texts">Timer</span>
      <div className="progress-bar-box">
        <div className="progress-bar" ref={progressBar}></div>
      </div>
      <div className="question-box">
        <div className="question-count">
          <b>{currentQuestion}</b>
          of
          <b>{totalQuestions}</b>
        </div>
        <div className="main">
          <div className="question-box-container">
            <span className="question-title">Question:</span>
            <div className="question-text-box">
              <p className="question-text">{decodedQuestion}</p>
            </div>
          </div>
        </div>
        <div className="options-container">
          <div className="options">
            {shuffleOptions.map((option, index) => {
              return (
                <div
                  className={
                    option == selectedOption ? "option active" : "option"
                  }
                  key={option}
                  onClick={() => {
                    setSelectedOption(option);
                    // getAnswersLog(index);
                  }}
                >
                  {option}
                </div>
              );
            })}
          </div>
        </div>
        <div className="control">
          <button className="next-btn" onClick={gotoNextQuestion}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Questions;
