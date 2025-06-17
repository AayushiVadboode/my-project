import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { BreathingExercise as BreathingExerciseType } from '../../types';

interface BreathingExerciseProps {
  exercise: BreathingExerciseType;
}

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ exercise }) => {
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0); // 0: inhale, 1: hold, 2: exhale, 3: hold
  const [timeRemaining, setTimeRemaining] = useState(exercise.pattern[0]);
  const [cycle, setCycle] = useState(0);

  const phases = ['Inhale', 'Hold', 'Exhale', 'Hold'];
  const phaseColors = ['bg-blue-500', 'bg-purple-500', 'bg-green-500', 'bg-yellow-500'];

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && timeRemaining > 0) {
      interval = setInterval(() => {
        setTimeRemaining(time => time - 1);
      }, 1000);
    } else if (isActive && timeRemaining === 0) {
      // Move to next phase
      const nextPhase = (currentPhase + 1) % 4;
      setCurrentPhase(nextPhase);
      setTimeRemaining(exercise.pattern[nextPhase]);

      if (nextPhase === 0) {
        setCycle(c => c + 1);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeRemaining, currentPhase, exercise.pattern]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase(0);
    setTimeRemaining(exercise.pattern[0]);
    setCycle(0);
  };

  const getCircleScale = () => {
    if (currentPhase === 0) return 'scale-150'; // Inhale - expand
    if (currentPhase === 2) return 'scale-75';  // Exhale - contract
    return 'scale-125'; // Hold phases
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{exercise.name}</h3>
      <p className="text-gray-600 mb-6">{exercise.description}</p>

      {/* Breathing Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative w-48 h-48 flex items-center justify-center">
          <div 
            className={`absolute w-32 h-32 rounded-full ${phaseColors[currentPhase]} transition-all duration-1000 ${getCircleScale()}`}
            style={{ opacity: 0.3 }}
          />
          <div className="relative z-10 text-center">
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {phases[currentPhase]}
            </div>
            <div className="text-4xl font-mono text-gray-800">
              {timeRemaining}
            </div>
            <div className="text-sm text-gray-600 mt-2">
              Cycle {cycle + 1}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className={`h-2 rounded-full transition-all duration-1000 ${phaseColors[currentPhase]}`}
          style={{ 
            width: `${((exercise.pattern[currentPhase] - timeRemaining) / exercise.pattern[currentPhase]) * 100}%` 
          }}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-center space-x-4 mb-6">
        {!isActive ? (
          <button
            onClick={handleStart}
            className="flex items-center space-x-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
          >
            <Play className="w-5 h-5" />
            <span>Start</span>
          </button>
        ) : (
          <button
            onClick={handlePause}
            className="flex items-center space-x-2 bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <Pause className="w-5 h-5" />
            <span>Pause</span>
          </button>
        )}
        
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Reset</span>
        </button>
      </div>

      {/* Instructions */}
      <div className="bg-white rounded-lg p-4">
        <h4 className="font-semibold text-gray-800 mb-2">Instructions:</h4>
        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
          {exercise.steps.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};