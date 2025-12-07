import React, { useState, useEffect } from 'react';
import { Flower2, Palette, Puzzle, Droplets, Sparkles, Award } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Garden: React.FC = () => {
  const { user, addCalmPoints, addXP } = useApp();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [mandalaColors, setMandalaColors] = useState(['#3B82F6', '#10B981', '#F59E0B', '#EF4444']);
  const [currentMandala, setCurrentMandala] = useState<string[]>([]);
  const [puzzleProgress, setPuzzleProgress] = useState(0);
  const [bubbles, setBubbles] = useState<Array<{id: number, x: number, y: number}>>([]);
  const [plants, setPlants] = useState([
    { id: 1, type: 'seed', name: 'Semilla de la Paciencia', progress: 0, maxProgress: 5 },
    { id: 2, type: 'sprout', name: 'Brote de la Calma', progress: 0, maxProgress: 8 },
    { id: 3, type: 'flower', name: 'Flor de la Serenidad', progress: 0, maxProgress: 12 }
  ]);

  const games = [
    {
      id: 'mandala',
      title: 'Mandalas de Calma',
      description: 'Colorea patrones relajantes',
      icon: Palette,
      color: 'purple',
      points: 15
    },
    {
      id: 'puzzle',
      title: 'Puzzles Zen',
      description: 'Arma paisajes tranquilos',
      icon: Puzzle,
      color: 'blue',
      points: 20
    },
    {
      id: 'bubbles',
      title: 'Burbujas de Paz',
      description: 'Explota burbujas relajantes',
      icon: Droplets,
      color: 'cyan',
      points: 10
    },
    {
      id: 'plants',
      title: 'Jardín Emocional',
      description: 'Cultiva tu crecimiento interior',
      icon: Flower2,
      color: 'green',
      points: 25
    }
  ];

  const colorPalettes = [
    { name: 'Océano', colors: ['#0EA5E9', '#06B6D4', '#0891B2', '#0E7490'] },
    { name: 'Bosque', colors: ['#10B981', '#059669', '#047857', '#065F46'] },
    { name: 'Atardecer', colors: ['#F59E0B', '#D97706', '#B45309', '#92400E'] },
    { name: 'Lavanda', colors: ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6'] }
  ];

  const generateBubbles = () => {
    const newBubbles = Array.from({ length: 10 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 300,
      y: Math.random() * 200
    }));
    setBubbles(newBubbles);
  };

  const popBubble = (bubbleId: number) => {
    setBubbles(prev => prev.filter(b => b.id !== bubbleId));
    addCalmPoints(2);
    
    if (bubbles.length === 1) {
      addXP(10);
      setTimeout(generateBubbles, 1000);
    }
  };

  const waterPlant = (plantId: number) => {
    setPlants(prev => prev.map(plant => {
      if (plant.id === plantId && plant.progress < plant.maxProgress) {
        const newProgress = plant.progress + 1;
        if (newProgress === plant.maxProgress) {
          addXP(25);
          addCalmPoints(30);
        } else {
          addCalmPoints(5);
        }
        return { ...plant, progress: newProgress };
      }
      return plant;
    }));
  };

  const getPlantEmoji = (plant: any) => {
    const progressRatio = plant.progress / plant.maxProgress;
    if (progressRatio === 0) return '🌱';
    if (progressRatio < 0.5) return '🌿';
    if (progressRatio < 1) return '🌸';
    return '🌺';
  };

  const completeMandala = () => {
    addCalmPoints(15);
    addXP(20);
    setCurrentMandala([]);
    alert('¡Hermoso mandala completado! 🎨 +15 puntos de calma');
  };

  const completePuzzle = () => {
    setPuzzleProgress(prev => {
      const newProgress = prev + 10;
      if (newProgress >= 100) {
        addCalmPoints(20);
        addXP(25);
        alert('¡Puzzle completado! 🧩 +20 puntos de calma');
        return 0;
      }
      addCalmPoints(2);
      return newProgress;
    });
  };

  useEffect(() => {
    if (activeGame === 'bubbles' && bubbles.length === 0) {
      generateBubbles();
    }
  }, [activeGame]);

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header with Lessy */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-6xl animate-bounce">🐱</div>
            <div>
              <h2 className="text-3xl font-bold">Jardín de Calma</h2>
              <p className="text-green-100">Lessy dice: "¡Vamos a jugar y relajarnos juntos! 🌿"</p>
            </div>
          </div>
          <div className="text-right">
            <div className="bg-white/20 rounded-lg p-3">
              <p className="text-sm">Puntos de Calma</p>
              <p className="text-2xl font-bold">{user.calmPoints}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Game Selection */}
      {!activeGame && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">🎮 Elige tu Actividad Relajante</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {games.map((game) => {
              const Icon = game.icon;
              return (
                <button
                  key={game.id}
                  onClick={() => setActiveGame(game.id)}
                  className={`
                    p-6 rounded-xl border-2 border-${game.color}-100 
                    bg-gradient-to-br from-${game.color}-50 to-white
                    hover:border-${game.color}-200 hover:shadow-lg
                    transition-all duration-300 transform hover:scale-105
                    text-left
                  `}
                >
                  <div className={`w-16 h-16 bg-${game.color}-100 rounded-full flex items-center justify-center mb-4`}>
                    <Icon className={`w-8 h-8 text-${game.color}-600`} />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    {game.title}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {game.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium text-${game.color}-600`}>
                      +{game.points} puntos
                    </span>
                    <Sparkles className={`w-4 h-4 text-${game.color}-500`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Mandala Game */}
      {activeGame === 'mandala' && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">🎨 Mandalas de Calma</h3>
            <button
              onClick={() => setActiveGame(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Volver
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-gray-800 mb-4">Elige tu Paleta de Colores</h4>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {colorPalettes.map((palette) => (
                  <button
                    key={palette.name}
                    onClick={() => setMandalaColors(palette.colors)}
                    className="p-3 border border-gray-200 rounded-lg hover:border-purple-300 transition-colors"
                  >
                    <p className="text-sm font-medium mb-2">{palette.name}</p>
                    <div className="flex space-x-1">
                      {palette.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-6 h-6 rounded-full"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                <div className="text-4xl mb-2">🐱</div>
                <p className="text-sm text-purple-700">
                  <strong>Lessy susurra:</strong> "Respira profundo mientras coloreas. 
                  Cada trazo es un momento de paz 🌸"
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="bg-white p-8 rounded-lg border border-gray-200 mb-4">
                <div className="w-64 h-64 mx-auto bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center">
                  <div className="text-6xl">🌸</div>
                </div>
              </div>
              <button
                onClick={completeMandala}
                className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-pink-700 transition-all"
              >
                Completar Mandala
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bubble Game */}
      {activeGame === 'bubbles' && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">💧 Burbujas de Paz</h3>
            <button
              onClick={() => setActiveGame(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Volver
            </button>
          </div>

          <div className="bg-gradient-to-b from-blue-100 to-cyan-100 rounded-lg p-8 relative h-80 overflow-hidden">
            {bubbles.map((bubble) => (
              <button
                key={bubble.id}
                onClick={() => popBubble(bubble.id)}
                className="absolute w-12 h-12 bg-blue-300 rounded-full opacity-70 hover:opacity-100 transition-all transform hover:scale-110 animate-pulse"
                style={{ left: bubble.x, top: bubble.y }}
              >
                💧
              </button>
            ))}
            
            <div className="absolute bottom-4 left-4 bg-white/80 rounded-lg p-3">
              <div className="text-2xl mb-1">🐱</div>
              <p className="text-xs text-gray-600">
                Lessy: "¡Toca las burbujas suavemente! 🫧"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Plant Garden */}
      {activeGame === 'plants' && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-800">🌱 Jardín Emocional</h3>
            <button
              onClick={() => setActiveGame(null)}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Volver
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plants.map((plant) => (
              <div key={plant.id} className="bg-green-50 p-6 rounded-lg border border-green-200 text-center">
                <div className="text-6xl mb-4">{getPlantEmoji(plant)}</div>
                <h4 className="font-semibold text-gray-800 mb-2">{plant.name}</h4>
                <div className="bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(plant.progress / plant.maxProgress) * 100}%` }}
                  />
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  {plant.progress}/{plant.maxProgress} cuidados
                </p>
                <button
                  onClick={() => waterPlant(plant.id)}
                  disabled={plant.progress >= plant.maxProgress}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  💧 Regar
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 bg-green-50 p-4 rounded-lg border border-green-200">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🐱</div>
              <div>
                <p className="text-sm text-green-700">
                  <strong>Lessy explica:</strong> "Cada planta representa un aspecto de tu crecimiento emocional. 
                  Cuídalas con paciencia y verás florecer tu bienestar 🌺"
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Achievements */}
      <div className="bg-white/70 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">🏆 Logros del Jardín</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="text-2xl mb-2">🎨</div>
            <h4 className="font-semibold text-gray-800">Artista Zen</h4>
            <p className="text-sm text-gray-600">Completa 5 mandalas</p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="text-2xl mb-2">🫧</div>
            <h4 className="font-semibold text-gray-800">Cazador de Burbujas</h4>
            <p className="text-sm text-gray-600">Explota 100 burbujas</p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="text-2xl mb-2">🌺</div>
            <h4 className="font-semibold text-gray-800">Jardinero Maestro</h4>
            <p className="text-sm text-gray-600">Haz florecer todas las plantas</p>
          </div>
        </div>
      </div>
    </div>
  );
};