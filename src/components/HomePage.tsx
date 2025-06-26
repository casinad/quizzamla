import React from 'react';
import QRCodeGenerator from './QRCodeGenerator';
import { Gift } from 'lucide-react';

interface HomePageProps {
  onStartQuiz: () => void;
  isQuizActive: boolean;
  timeRemaining: number;
}

const HomePage: React.FC<HomePageProps> = ({ onStartQuiz, isQuizActive, timeRemaining }) => {
  const currentUrl = window.location.href;
  const quizUrl = `${currentUrl}?quiz=true`;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-32 h-32 bg-white rounded-full mb-6 shadow-lg p-4">
            <img 
              src="/Celluloplast.png" 
              alt="Celluloplast Production" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Tombola
          </h1>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* QR Code Section */}
            <div className="text-center">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="flex justify-center mb-6">
                  <QRCodeGenerator value={quizUrl} size={280} />
                </div>
                
                {isQuizActive && (
                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-4">
                    <p className="text-red-800 font-semibold mb-2">Quiz en cours</p>
                    <p className="text-red-600 text-sm">
                      Temps restant: {formatTime(timeRemaining)}
                    </p>
                  </div>
                )}
              </div>
              
              <button
                onClick={onStartQuiz}
                disabled={isQuizActive}
                className={`mt-6 inline-flex items-center px-8 py-4 font-semibold rounded-xl transition-all duration-300 shadow-lg ${
                  isQuizActive 
                    ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                {isQuizActive ? 'Quiz en cours...' : 'Commencer le quiz'}
              </button>
            </div>

            {/* Prize Section */}
            <div className="text-center lg:text-left">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl p-8 border-2 border-yellow-200 shadow-xl">
                <div className="flex justify-center lg:justify-start mb-6">
                  <div className="w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                    <Gift className="w-16 h-16 text-white" />
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Gagnez des prix !
                </h2>
                
                <p className="text-lg text-gray-700 leading-relaxed">
                  Répondez correctement aux questions de notre quiz médical pour avoir une chance de remporter de magnifiques cadeaux.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;