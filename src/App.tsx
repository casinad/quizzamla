import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import QuizQuestion from './components/QuizQuestion';
import QuizDisplay from './components/QuizDisplay';
import { questions, Question } from './data/questions';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    // Check if URL has quiz parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('quiz') === 'true') {
      startQuiz();
    }

    // Listen for quiz state changes
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'quizState') {
        const state = e.newValue ? JSON.parse(e.newValue) : null;
        if (state) {
          setIsQuizActive(state.isActive);
          setTimeRemaining(state.timeRemaining);
          if (state.currentQuestion) {
            setCurrentQuestion(state.currentQuestion);
          }
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check for existing quiz state
    const existingState = localStorage.getItem('quizState');
    if (existingState) {
      const state = JSON.parse(existingState);
      setIsQuizActive(state.isActive);
      setTimeRemaining(state.timeRemaining);
      if (state.currentQuestion) {
        setCurrentQuestion(state.currentQuestion);
      }
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isQuizActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(prev => {
          const newTime = prev - 1;
          
          // Update localStorage
          const quizState = {
            isActive: newTime > 0,
            timeRemaining: newTime,
            currentQuestion: currentQuestion
          };
          localStorage.setItem('quizState', JSON.stringify(quizState));
          
          if (newTime <= 0) {
            setIsQuizActive(false);
            setCurrentQuestion(null);
            localStorage.removeItem('quizState');
            localStorage.removeItem('currentAnswer');
          }
          
          return newTime;
        });
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isQuizActive, timeRemaining, currentQuestion]);

  const getRandomQuestion = (): Question => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  const startQuiz = () => {
    if (isQuizActive) return; // Prevent starting if already active
    
    const question = getRandomQuestion();
    setCurrentQuestion(question);
    setShowQuiz(true);
    setIsQuizActive(true);
    setTimeRemaining(60); // 1 minute timer
    
    // Store quiz state in localStorage for synchronization
    const quizState = {
      isActive: true,
      timeRemaining: 60,
      currentQuestion: question
    };
    localStorage.setItem('quizState', JSON.stringify(quizState));
    localStorage.removeItem('currentAnswer'); // Clear previous answer
    
    // Update URL without quiz parameter to clean it up
    window.history.replaceState({}, document.title, window.location.pathname);
  };

  const handleNewQuestion = () => {
    const question = getRandomQuestion();
    setCurrentQuestion(question);
    setTimeRemaining(60); // Reset timer
    
    // Update localStorage
    const quizState = {
      isActive: true,
      timeRemaining: 60,
      currentQuestion: question
    };
    localStorage.setItem('quizState', JSON.stringify(quizState));
    localStorage.removeItem('currentAnswer'); // Clear previous answer
  };

  const handleQuizEnd = () => {
    setIsQuizActive(false);
    setShowQuiz(false);
    setCurrentQuestion(null);
    setTimeRemaining(0);
    
    // Clear localStorage
    localStorage.removeItem('quizState');
    localStorage.removeItem('currentAnswer');
  };

  const handleBackToHome = () => {
    setShowQuiz(false);
  };

  // Update answer in localStorage when selected
  const updateCurrentAnswer = (answerIndex: number) => {
    localStorage.setItem('currentAnswer', answerIndex.toString());
  };

  if (showQuiz && currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 py-8 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center px-6 py-2 text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
            >
              ← Retour à l'accueil
            </button>
          </div>
          <QuizQuestion 
            question={currentQuestion} 
            onNewQuestion={handleNewQuestion}
            onQuizEnd={handleQuizEnd}
            timeRemaining={timeRemaining}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <HomePage 
        onStartQuiz={startQuiz} 
        isQuizActive={isQuizActive}
        timeRemaining={timeRemaining}
      />
      <QuizDisplay 
        question={currentQuestion}
        timeRemaining={timeRemaining}
        isActive={isQuizActive}
      />
    </>
  );
}

export default App;