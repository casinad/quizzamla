import React, { useState, useEffect } from 'react';
import { Question } from '../data/questions';
import { CheckCircle, XCircle, RotateCcw, Clock } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  onNewQuestion: () => void;
  onQuizEnd: () => void;
  timeRemaining: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  question, 
  onNewQuestion, 
  onQuizEnd, 
  timeRemaining 
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
    setShowResult(true);
  };

  const handleNewQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    onNewQuestion();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  // Auto end quiz when timer reaches 0
  useEffect(() => {
    if (timeRemaining <= 0) {
      onQuizEnd();
    }
  }, [timeRemaining, onQuizEnd]);

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full mb-4 shadow-lg p-2">
          <img 
            src="/Celluloplast.png" 
            alt="Celluloplast" 
            className="w-full h-full object-contain"
          />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Quiz Tombola</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full mb-4"></div>
        
        {/* Timer Display */}
        <div className="inline-flex items-center px-4 py-2 bg-blue-50 border-2 border-blue-200 rounded-full">
          <Clock className="w-5 h-5 text-blue-600 mr-2" />
          <span className="text-blue-800 font-semibold">
            Temps restant: {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6 leading-relaxed">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => {
            let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium ";
            
            if (!showResult) {
              buttonClass += "border-gray-200 hover:border-blue-400 hover:bg-blue-50 hover:shadow-md cursor-pointer";
            } else {
              if (index === question.correctAnswer) {
                buttonClass += "border-green-500 bg-green-50 text-green-800";
              } else if (index === selectedAnswer && selectedAnswer !== question.correctAnswer) {
                buttonClass += "border-red-500 bg-red-50 text-red-800";
              } else {
                buttonClass += "border-gray-200 bg-gray-50 text-gray-600";
              }
            }

            return (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={buttonClass}
                disabled={showResult}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm md:text-base">{option}</span>
                  {showResult && (
                    <div className="flex-shrink-0 ml-3">
                      {index === question.correctAnswer ? (
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      ) : index === selectedAnswer ? (
                        <XCircle className="w-6 h-6 text-red-600" />
                      ) : null}
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {showResult && (
        <div className="text-center">
          <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold mb-6 ${
            isCorrect 
              ? 'bg-green-100 text-green-800 border-2 border-green-200' 
              : 'bg-red-100 text-red-800 border-2 border-red-200'
          }`}>
            {isCorrect ? (
              <>
                <CheckCircle className="w-6 h-6 mr-2" />
                Bonne réponse !
              </>
            ) : (
              <>
                <XCircle className="w-6 h-6 mr-2" />
                Mauvaise réponse
              </>
            )}
          </div>

          <button
            onClick={handleNewQuestion}
            className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Nouvelle question
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;