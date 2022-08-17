import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { HomePage, Lobby, SetGame, QuizPage } from "./Pages";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/waitingroom" element={<Lobby />} />
        <Route exact path="/game" element={<SetGame />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </div>
  );
};

export default App;
