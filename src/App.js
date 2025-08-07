import React, { useState } from 'react';
import './App.css';

const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Michelangelo"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    correctAnswer: "2"
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const handleAnswerSelect = (answer) => {
    if (showFeedback) return;
    
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    if (answer === quizData[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prevQuestion => prevQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (quizFinished) {
    return (
      <div className="quiz-container">
        <h1>Quiz Complete!</h1>
        <div className="score">
          <p>Your final score: {score} out of {quizData.length}</p>
          <p>{Math.round((score / quizData.length) * 100)}% correct</p>
        </div>
        <button className="restart-button" onClick={restartQuiz}>
          Restart Quiz
        </button>
      </div>
    );
  }

  const currentQuizData = quizData[currentQuestion];

  return (
    <div className="quiz-container">
      <h1>React Quiz App</h1>
      <div className="question-number">
        Question {currentQuestion + 1} of {quizData.length}
      </div>
      
      <div className="question">
        {currentQuizData.question}
      </div>
      
      <div className="options">
        {currentQuizData.options.map((option, index) => (
          <div
            key={index}
            className={`option ${selectedAnswer === option ? 'selected' : ''} 
              ${showFeedback && option === currentQuizData.correctAnswer ? 'correct' : ''}
              ${showFeedback && selectedAnswer === option && option !== currentQuizData.correctAnswer ? 'incorrect' : ''}`}
            onClick={() => handleAnswerSelect(option)}
          >
            {option}
          </div>
        ))}
      </div>
      
      {showFeedback && (
        <div className={`feedback ${selectedAnswer === currentQuizData.correctAnswer ? 'correct' : 'incorrect'}`}>
          {selectedAnswer === currentQuizData.correctAnswer ? 'Correct!' : 'Incorrect!'}
        </div>
      )}
      
      {showFeedback && (
        <button className="next-button" onClick={handleNextQuestion}>
          {currentQuestion < quizData.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      )}
    </div>
  );
}

export default App;
