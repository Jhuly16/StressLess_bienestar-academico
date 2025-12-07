import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Heart, Leaf, Wind, Sun } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Meditation: React.FC = () => {
  const { user, addXP, soundEnabled } = useApp();
  const [activeExercise, setActiveExercise] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [cycleCount, setCycleCount] = useState(0);
  const [breathingIntensity, setBreathingIntensity] = useState(1);

  // Customize exercises based on user's stress type
  const getCustomizedExercises = () => {
    const baseExercises = [
    {
      id: 'deep-breathing',
      title: '1️⃣Respiración Profunda',
      description: 'Técnica básica de respiración 4-7-8',
      duration: user.stressType === 'fatigue' ? 2 : 3,
      icon: Wind,
      color: 'blue',
      instruction: user.stressType === 'fatigue' 
        ? 'Respiración suave para energizar sin agotar'
        : 'Inhala por 4 segundos, mantén por 7, exhala por 8'
    },
    {
      id: 'mindfulness',
      title: '2️⃣Mindfulness Básico',
      description: 'Meditación de atención plena',
      duration: user.stressType === 'anxiety' ? 3 : 5,
      icon: Leaf,
      color: 'green',
      instruction: user.stressType === 'anxiety'
        ? 'Observa tus pensamientos sin juzgarlos, como nubes que pasan'
        : 'Concéntrate en tu respiración natural'
    },
    {
      id: 'progressive-relaxation',
      title: '3️⃣Relajación Progresiva',
      description: 'Relaja cada grupo muscular',
      duration: user.stressType === 'overwhelm' ? 8 : 10,
      icon: Heart,
      color: 'purple',
      instruction: user.stressType === 'overwhelm'
        ? 'Libera la tensión acumulada paso a paso'
        : 'Tensa y relaja cada parte de tu cuerpo'
    },
    {
      id: 'energy-boost',
      title: 'Energía Matutina',
      description: 'Respiración energizante',
      duration: user.stressType === 'fatigue' ? 3 : 2,
      icon: Sun,
      color: 'orange',
      instruction: user.stressType === 'fatigue'
        ? 'Respiraciones revitalizantes para despertar tu energía'
        : 'Respiraciones rápidas y energéticas'
    }
    ];
    
    return baseExercises;
  };

  const exercises = getCustomizedExercises();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        
        // Breathing pattern for deep breathing exercise
        if (activeExercise === 'deep-breathing') {
          const totalCycleTime = 19; // 4 + 7 + 8
          const currentPosition = (timeLeft - 1) % totalCycleTime;
          
          if (currentPosition >= 15) { // 0-3 (4 seconds)
            setPhase('inhale');
          } else if (currentPosition >= 8) { // 4-10 (7 seconds)
            setPhase('hold');
          } else { // 11-18 (8 seconds)
            setPhase('exhale');
          }
          
          if (currentPosition === 18) {
            setCycleCount(prev => prev + 1);
          }
          
          // Simulate breathing vibration/visual cue
          if (soundEnabled) {
            setBreathingIntensity(
              phase === 'inhale' ? 1.2 : phase === 'hold' ? 1.1 : 0.8
            );
          }
        }
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setActiveExercise(null);
      addXP(20); // Reward for completing exercise
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, activeExercise, addXP, phase, soundEnabled]);

  const startExercise = (exerciseId: string, duration: number) => {
    setActiveExercise(exerciseId);
    setTimeLeft(duration * 60);
    setIsActive(true);
    setPhase('inhale');
    setCycleCount(0);
  };

  const pauseExercise = () => {
    setIsActive(false);
  };

  const resumeExercise = () => {
    setIsActive(true);
  };

  const resetExercise = () => {
    setIsActive(false);
    setActiveExercise(null);
    setTimeLeft(0);
    setCycleCount(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getBreathingInstruction = () => {
    switch (phase) {
      case 'inhale':
        return 'Inhala lentamente...';
      case 'hold':
        return 'Mantén la respiración...';
      case 'exhale':
        return 'Exhala completamente...';
    }
  };

  const getLessyEncouragement = () => {
    const messages = {
      fatigue: "Respira conmigo, vamos a recuperar tu energía suavemente 🌿",
      anxiety: "Estoy aquí contigo, cada respiración te trae más calma 🦋",
      overwhelm: "Vamos paso a paso, no hay prisa, solo paz 🌸",
      general: "Respira conmigo, encontremos juntos tu centro de calma 💙"
    };
    return messages[user.stressType] || messages.general;
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Active Exercise */}
      {activeExercise && (
        <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-2">
              {exercises.find(e => e.id === activeExercise)?.title}
            </h2>
            <div className="text-6xl font-mono font-bold mb-4">
              {formatTime(timeLeft)}
            </div>
            
            {activeExercise === 'deep-breathing' && (
              <div className="mb-6">
                <div className={`
                  w-32 h-32 mx-auto rounded-full border-4 border-white/30 flex items-center justify-center mb-4 relative
                  ${soundEnabled ? 'animate-pulse' : ''}
                  transition-all duration-1000 ease-in-out
                `}
                style={{ transform: `scale(${breathingIntensity})` }}>
                  <div className="text-2xl">💨</div>
                </div>
                <p className="text-xl mb-2">{getBreathingInstruction()}</p>
                <div className="bg-white/20 rounded-lg p-3 mb-4">
                  <div className="text-lg mb-1">🐱</div>
                  <p className="text-sm text-white/90">
                    {getLessyEncouragement()}
                  </p>
                </div>
                <p className="text-white/80">Ciclo: {cycleCount}</p>
              </div>
            )}
            
            <div className="flex justify-center space-x-4">
              {isActive ? (
                <button
                  onClick={pauseExercise}
                  className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-colors"
                >
                  <Pause className="w-6 h-6" />
                </button>
              ) : (
                <button
                  onClick={resumeExercise}
                  className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-colors"
                >
                  <Play className="w-6 h-6" />
                </button>
              )}
              <button
                onClick={resetExercise}
                className="bg-white/20 hover:bg-white/30 p-4 rounded-full transition-colors"
              >
                <RotateCcw className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exercise Cards */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-6">🧘 Hora de Meditar</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {exercises.map((exercise) => {
            const Icon = exercise.icon;
            return (
              <div
                key={exercise.id}
                className={`
                  p-6 rounded-xl border-2 border-${exercise.color}-100 
                  bg-gradient-to-br from-${exercise.color}-50 to-white
                  hover:border-${exercise.color}-200 hover:shadow-lg
                  transition-all duration-300 transform hover:scale-105
                `}
              >
                <div className={`w-16 h-16 bg-${exercise.color}-100 rounded-full flex items-center justify-center mb-4`}>
                  <Icon className={`w-8 h-8 text-${exercise.color}-600`} />
                </div>
                
                <h4 className="text-lg font-semibold text-gray-800 mb-2">
                  {exercise.title}
                </h4>
                <p className="text-sm text-gray-600 mb-4">
                  {exercise.description}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {exercise.instruction}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">
                    {exercise.duration} min
                  </span>
                  <button
                    onClick={() => startExercise(exercise.id, exercise.duration)}
                    disabled={!!activeExercise}
                    className={`
                      bg-gradient-to-r from-${exercise.color}-500 to-${exercise.color}-600 
                      text-white px-4 py-2 rounded-lg hover:from-${exercise.color}-600 
                      hover:to-${exercise.color}-700 transition-all disabled:opacity-50 
                      disabled:cursor-not-allowed flex items-center space-x-2
                    `}
                  >
                    <Play className="w-4 h-4" />
                    <span>Iniciar</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tips Section */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6">💡Instrucciones para una correcta Práctica</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-800">1️⃣¿QUE HACER PRIMERO?</h4>
                <p className="text-sm text-gray-600">Primero debes realizar la 'Respiración profunda'</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-800">2️⃣¿CUÁL ES EL SEGUNDO PASO?</h4>
                <p className="text-sm text-gray-600">Luego de hacer la respiración profunda, realiza el 'Mindfulness Básico'</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-800">3️⃣Tercer paso</h4>
                <p className="text-sm text-gray-600">Como tercer paso, luego de realizar la 'Respiración profunda' y el 'Mindfulness Básico', debes hacer la 'Relajación progresiva'</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
              <div>
                <h4 className="font-medium text-gray-800">No juzgues y sé constante</h4>
                <p className="text-sm text-gray-600">Sigue cada paso según las indicaciones.Es normal que tu mente divague, simplemente regresa al ejercicio y lee las indicaciones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};