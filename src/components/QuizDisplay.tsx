import React, { useEffect, useState } from 'react';
import { Question } from '../data/questions';
import { Clock } from 'lucide-react';

interface QuizDisplayProps {
  question: Question | null;
  timeRemaining: number;
  isActive: boolean;
}

const QuizDisplay: React.FC<QuizDisplayProps> = ({ question, timeRemaining, isActive }) => {
  const [currentAnswer, setCurrentAnswer] = useState<number | null>(null);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Listen for answer updates from other participants
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'currentAnswer') {
        setCurrentAnswer(e.newValue ? parseInt(e.newValue) : null);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Check for existing answer
    const existingAnswer = localStorage.getItem('currentAnswer');
    if (existingAnswer) {
      setCurrentAnswer(parseInt(existingAnswer));
    }

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!isActive || !question) {
    return (
      <div className="fixed top-4 right-4 bg-white rounded-xl shadow-lg p-4 border-2 border-gray-200 max-w-sm">
        <div className="text-center">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2">
            <img 
              src="/Celluloplast.png" 
              alt="Celluloplast" 
              className="w-8 h-8 object-contain"
            />
          </div>
          <p className="text-gray-600 text-sm">Aucun quiz actif</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed top-4 right-4 bg-white rounded-xl shadow-2xl p-6 border-2 border-blue-200 max-w-md z-50">
      <div className="text-center mb-4">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow-md">
          <img 
            src="/Celluloplast.png" 
            alt="Celluloplast" 
            className="w-8 h-8 object-contain"
          />
        </div>
        <h3 className="text-lg font-bold text-gray-800">Quiz en cours</h3>
        
        {/* Timer */}
        <div className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 rounded-full mt-2">
          <Clock className="w-4 h-4 text-blue-600 mr-1" />
          <span className="text-blue-800 font-semibold text-sm">
            {formatTime(timeRemaining)}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-sm font-semibold text-gray-800 mb-3 leading-tight">
          {question.question}
        </h4>

        <div className="space-y-2">
          {question.options.map((option, index) => (
            <div
              key={index}
              className={`p-2 text-xs rounded-lg border transition-all duration-300 ${
                currentAnswer === index
                  ? 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-gray-200 bg-gray-50 text-gray-600'
              }`}
            >
              <div className="flex items-center">
                <span className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-current flex items-center justify-center mr-2 text-xs font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="text-xs leading-tight">{option}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {currentAnswer !== null && (
        <div className="text-center">
          <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
            Réponse sélectionnée: {String.fromCharCode(65 + currentAnswer)}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizDisplay;