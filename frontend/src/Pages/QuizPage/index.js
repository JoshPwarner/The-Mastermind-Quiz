import React, { useState } from "react";
import { useSelector } from "react-redux";
import Questions from "../../components/Question";
import QuizResult from "../../components/QuizResult";
import "./QuizPage.css";

const QuizPage = ({ retry, query }) => {
  const questions = useSelector((state) => state.quiz);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [markedAnswers, setMarkedAnswers] = useState(
    new Array(questions.result.results)
  );
  console.log(questions);
  // const [rightAnswers, setRightAnswers] = useState(
  //   new Array(questions.result.results)
  // );

  const isQuestionEnd = currentQuestionIndex == questions.amount;

  console.log(typeof isQuestionEnd);

  // questions.result.results.forEach((result, index) => {
  //   const results = Object.entries(result);

  //   console.log(results);

  //   for (const [key, value] of results) {
  //     console.log(value);
  //   }
  // });

  function calculateResult() {
    let correct = 0;
    questions.result.results.forEach((result) => {
      const check = Object.entries(result);
      for (const [key, value] of check) {
        console.log(value, key);
        if (value == markedAnswers) {
          correct++;
          // console.log(value);
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
            setMarkedAnswers((arr) => {
              let newArr = [...arr];
              newArr[currentQuestionIndex] = index;
              return newArr;
            });
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
          }}
          // collectAnswer={(index) => {
          //   setRightAnswers((arr) => {
          //     let newAns = [...arr];
          //     newAns[currentQuestionIndex] = index;

          //     return newAns;
          //   });
          // }}
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
    </div>
  );
};

export default QuizPage;
