import React, { useState } from "react";
import { useSelector } from "react-redux";
import Questions from "../../components/Question";
import QuizResult from "../../components/QuizResult";
import "./QuizPage.css";
const QuizPage = ({ retry }) => {
  const questions = useSelector((state) => state.quiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [markedAnswers, setMarkedAnswers] = useState("");
  console.log(questions);
  const isQuestionEnd = currentQuestionIndex == questions.amount;
  function calculateResult() {
    let correct = 0;
    questions.result.results.forEach((result) => {
      const check = Object.entries(result);
      for (const [key, value] of check) {
        console.log(value);
        if (decodeURIComponent(value) == markedAnswers) {
          correct++;
        } else {
          console.log("no chance!");
        }
      }
    });
    return {
      total: questions.result.results.length,
      correct,
      percentage: Math.trunc((correct / questions.result.results.length) * 100),
    };
  }
  const showResult = () => {
    if (questions.loading) {
      return <p>Loading . . .</p>;
    } else {
      return (
        <Questions
          query={questions.result.results[currentQuestionIndex]}
          totalQuestions={questions.result.results.length}
          currentQuestion={currentQuestionIndex + 1}
          setAnswer={(index) => {
            setMarkedAnswers(index);
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            // setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          }}
        />
      );
    }
  };
  console.log(isQuestionEnd);
  return (
    <div className="quiz-screen-container">
      {isQuestionEnd ? (
        <QuizResult result={calculateResult()} retry={retry} />
      ) : (
        showResult()
      )}
      <p>this a an app</p>
    </div>
  );
};
export default QuizPage;

